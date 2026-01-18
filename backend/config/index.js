require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  apiVersion: 'v1',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  // S3 Configuration
  s3Region: process.env.S3_REGION || 'us-east-1',
  s3Bucket: process.env.S3_BUCKET || '',
  s3AccessKeyId: process.env.S3_ACCESS_KEY_ID || '',
  s3SecretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
  s3UploadPrefix: process.env.S3_UPLOAD_PREFIX || 'uploads',
  s3Acl: process.env.S3_ACL || null, // Optional: 'public-read', 'private', etc. Leave empty if bucket ACLs are disabled
};
