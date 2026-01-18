const { S3Client, PutObjectCommand, GetBucketLocationCommand } = require('@aws-sdk/client-s3');
const { AppError } = require('../utils/errors');
const config = require('../config');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
require('dotenv').config();

// Cache for bucket regions (bucket name -> region)
const bucketRegionCache = {};

// Validate S3 configuration before initializing client
if (!config.s3AccessKeyId || !config.s3SecretAccessKey || 
    (typeof config.s3AccessKeyId === 'string' && config.s3AccessKeyId.trim() === '') ||
    (typeof config.s3SecretAccessKey === 'string' && config.s3SecretAccessKey.trim() === '')) {
  console.warn('Warning: S3 credentials not configured. Uploads will fail.');
}

// Initialize S3 client with region redirect support
const s3Client = new S3Client({
  region: config.s3Region,
  credentials: {
    accessKeyId: config.s3AccessKeyId,
    secretAccessKey: config.s3SecretAccessKey,
  },
  // Enable following region redirects automatically
  // This allows the SDK to automatically retry requests with the correct region
  // if the bucket is in a different region than configured
  followRegionRedirects: true,
  // Use path-style addressing if needed (for some bucket configurations)
  forcePathStyle: false,
});

/**
 * Extract region from S3 endpoint URL
 * @param {string} endpoint - S3 endpoint URL (e.g., "bucket.s3-ap-southeast-1.amazonaws.com")
 * @returns {string} AWS region
 */
const extractRegionFromEndpoint = (endpoint) => {
  if (!endpoint) return null;
  // Match pattern: bucket.s3-REGION.amazonaws.com or bucket.s3.REGION.amazonaws.com
  // Examples: karchag.s3-ap-southeast-1.amazonaws.com -> ap-southeast-1
  const match = endpoint.match(/s3[.-]([a-z0-9-]+)\.amazonaws\.com/);
  return match ? match[1] : null;
};

/**
 * Get the actual bucket region
 * @param {string} bucket - S3 bucket name
 * @returns {Promise<string>} The bucket's actual region
 */
const getBucketRegion = async (bucket) => {
  try {
    const command = new GetBucketLocationCommand({ Bucket: bucket });
    const response = await s3Client.send(command);
    // GetBucketLocation returns 'EU' for eu-west-1, 'us-east-1' for us-east-1, etc.
    const location = response.LocationConstraint;
    // If null or empty, it's us-east-1 (default)
    return location || 'us-east-1';
  } catch (error) {
    console.warn('Could not determine bucket region:', error.message);
    return config.s3Region;
  }
};

/**
 * Construct S3 URL based on region
 * @param {string} bucket - S3 bucket name
 * @param {string} key - S3 object key
 * @param {string} region - AWS region
 * @returns {string} Public URL of the object
 */
const constructS3Url = (bucket, key, region) => {
  if (!region) {
    // Fallback to configured region if no region provided
    region = config.s3Region;
  }
  
  // us-east-1 uses a different URL format (no region in URL)
  if (region === 'us-east-1') {
    return `https://${bucket}.s3.amazonaws.com/${key}`;
  }
  // For other regions, include the region in the URL
  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

/**
 * Upload file to S3
 * @param {Object} file - Multer file object
 * @returns {Promise<Object>} Upload result with URL
 */
const uploadFileToS3 = async (file) => {
  try {
    if (!file) {
      throw new AppError('VALIDATION_ERROR', 'No file provided', 400);
    }

    // Validate S3 configuration
    if (!config.s3Bucket || !config.s3Region) {
      throw new AppError('CONFIG_ERROR', 'S3 bucket and region must be configured', 500);
    }

    if (!config.s3AccessKeyId || !config.s3SecretAccessKey || 
        (typeof config.s3AccessKeyId === 'string' && config.s3AccessKeyId.trim() === '') ||
        (typeof config.s3SecretAccessKey === 'string' && config.s3SecretAccessKey.trim() === '')) {
      throw new AppError('CONFIG_ERROR', 'S3 credentials (access key ID and secret access key) must be configured', 500);
    }

    // Generate unique filename
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;
    const key = `${config.s3UploadPrefix || 'uploads'}/${fileName}`;

    // Upload to S3
    const uploadParams = {
      Bucket: config.s3Bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    // Only add ACL if explicitly configured (newer buckets often have ACLs disabled)
    if (config.s3Acl) {
      uploadParams.ACL = config.s3Acl;
    }

    // Use cached region if available, otherwise use configured region
    const actualRegion = bucketRegionCache[config.s3Bucket] || config.s3Region;

    const command = new PutObjectCommand(uploadParams);
    
    // Create a client with the correct region if we have it cached
    let clientToUse = s3Client;
    if (bucketRegionCache[config.s3Bucket] && bucketRegionCache[config.s3Bucket] !== config.s3Region) {
      clientToUse = new S3Client({
        region: bucketRegionCache[config.s3Bucket],
        credentials: {
          accessKeyId: config.s3AccessKeyId,
          secretAccessKey: config.s3SecretAccessKey,
        },
        followRegionRedirects: true,
      });
    }
    
    await clientToUse.send(command);

    // Construct the file URL using the actual bucket region
    const fileUrl = constructS3Url(config.s3Bucket, key, actualRegion);
    console.log('Uploaded file URL:', fileUrl);
    console.log('Used region for URL:', actualRegion);

    return {
      url: fileUrl,
      filename: file.originalname,
      size: file.size,
      mime_type: file.mimetype,
      key: key,
    };
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    
    // Handle PermanentRedirect error - bucket is in a different region
    if (error.name === 'PermanentRedirect' || error.code === 'PermanentRedirect') {
      // Extract the correct region from the error endpoint
      let actualRegion = config.s3Region;
      
      // Try to extract region from endpoint if available
      // Error format: { Endpoint: "bucket.s3-REGION.amazonaws.com" }
      if (error.Endpoint) {
        const extractedRegion = extractRegionFromEndpoint(error.Endpoint);
        if (extractedRegion) {
          actualRegion = extractedRegion;
          // Cache the region for future requests
          bucketRegionCache[config.s3Bucket] = actualRegion;
          console.log(`Detected and cached bucket region from redirect endpoint: ${actualRegion}`);
        }
      }
      
      // Also check metadata headers
      const regionHeader = error.$metadata?.httpHeaders?.['x-amz-bucket-region'];
      if (regionHeader) {
        actualRegion = regionHeader;
        bucketRegionCache[config.s3Bucket] = actualRegion;
        console.log(`Detected and cached bucket region from header: ${actualRegion}`);
      }
      
      // Retry the upload with the correct region
      if (actualRegion !== config.s3Region && bucketRegionCache[config.s3Bucket]) {
        console.log(`Retrying upload with correct region: ${actualRegion}`);
        try {
          // Create a new client with the correct region
          const retryClient = new S3Client({
            region: actualRegion,
            credentials: {
              accessKeyId: config.s3AccessKeyId,
              secretAccessKey: config.s3SecretAccessKey,
            },
            followRegionRedirects: true,
          });

          const retryCommand = new PutObjectCommand({
            Bucket: config.s3Bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype,
            ...(config.s3Acl ? { ACL: config.s3Acl } : {}),
          });

          await retryClient.send(retryCommand);

          // Construct URL with correct region
          const fileUrl = constructS3Url(config.s3Bucket, key, actualRegion);
          console.log('Upload succeeded after retry with correct region');
          console.log('Uploaded file URL:', fileUrl);

          return {
            url: fileUrl,
            filename: file.originalname,
            size: file.size,
            mime_type: file.mimetype,
            key: key,
          };
        } catch (retryError) {
          console.error('Retry with correct region also failed:', retryError);
          // Fall through to error message
        }
      }
      
      const errorMessage = `S3 bucket region mismatch. Bucket "${config.s3Bucket}" is in region "${actualRegion}", but your S3_REGION is set to "${config.s3Region}". Please update your .env file: S3_REGION=${actualRegion}`;
      console.error('S3 Region Mismatch Error:', {
        configuredRegion: config.s3Region,
        actualRegion: actualRegion,
        bucket: config.s3Bucket,
        endpoint: error.Endpoint,
        error: error.message,
      });
      
      throw new AppError('CONFIG_ERROR', errorMessage, 500);
    }
    
    // Provide more detailed error information
    const errorMessage = error.message || 'Unknown error occurred';
    const errorCode = error.Code || error.code || 'UPLOAD_ERROR';
    
    // Log detailed error for debugging
    console.error('S3 Upload Error:', {
      message: errorMessage,
      code: errorCode,
      name: error.name,
      stack: error.stack,
    });
    
    throw new AppError('UPLOAD_ERROR', `Failed to upload file: ${errorMessage}`, 500);
  }
};

/**
 * Handle file upload
 */
const uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return next(new AppError('VALIDATION_ERROR', 'No file provided', 400));
    }

    const result = await uploadFileToS3(req.file);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  uploadFile,
};
