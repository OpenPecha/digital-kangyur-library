const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /videos:
 *   get:
 *     summary: List videos with pagination
 *     tags: [Videos]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Items per page
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Videos retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 videos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         $ref: '#/components/schemas/MultilingualTitle'
 *                       description:
 *                         type: object
 *                       video_link:
 *                         type: string
 *                       thumbnail_url:
 *                         type: string
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', videoController.getVideos);

/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get video by ID
 *     tags: [Videos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Video retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 description:
 *                   type: object
 *                 video_link:
 *                   type: string
 *                 thumbnail_url:
 *                   type: string
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', videoController.getVideoById);

/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a new video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tibetan_title
 *               - english_title
 *               - video_link
 *             properties:
 *               tibetan_title:
 *                 type: string
 *               english_title:
 *                 type: string
 *               tibetan_description:
 *                 type: string
 *               english_description:
 *                 type: string
 *               video_link:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Video created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', authenticate, authorize('admin', 'editor'), videoController.createVideo);

/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update a video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tibetan_title:
 *                 type: string
 *               english_title:
 *                 type: string
 *               tibetan_description:
 *                 type: string
 *               english_description:
 *                 type: string
 *               video_link:
 *                 type: string
 *               thumbnail_url:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Video updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticate, authorize('admin', 'editor'), videoController.updateVideo);

/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete a video
 *     tags: [Videos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Video ID
 *     responses:
 *       200:
 *         description: Video deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Video not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, authorize('admin'), videoController.deleteVideo);

module.exports = router;
