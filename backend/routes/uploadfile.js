const express = require('express');
const router = express.Router();
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const { authenticate, authorize } = require('../middleware/auth');

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept all file types, but you can add validation here if needed
    cb(null, true);
  },
});

/**
 * @swagger
 * /upload:
 *   post:
 *     summary: Upload a file to S3
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: File to upload
 *     responses:
 *       200:
 *         description: File uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: Public URL of the uploaded file
 *                       example: https://bucket-name.s3.region.amazonaws.com/uploads/uuid-filename.ext
 *                     filename:
 *                       type: string
 *                       description: Original filename
 *                       example: document.pdf
 *                     size:
 *                       type: integer
 *                       description: File size in bytes
 *                       example: 1048576
 *                     mime_type:
 *                       type: string
 *                       description: MIME type of the file
 *                       example: application/pdf
 *                     key:
 *                       type: string
 *                       description: S3 object key
 *                       example: uploads/uuid-filename.ext
 *       400:
 *         description: Validation error - No file provided
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Upload error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticate, authorize('admin', 'editor'), upload.single('file'), uploadController.uploadFile);

module.exports = router;
