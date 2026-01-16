const express = require('express');
const router = express.Router();
const audioController = require('../controllers/audioController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /audio:
 *   get:
 *     summary: List audio recordings with pagination
 *     tags: [Audio]
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
 *         name: text_id
 *         schema:
 *           type: integer
 *         description: Filter by text ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Audio recordings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 audio:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       text_id:
 *                         type: integer
 *                       title:
 *                         $ref: '#/components/schemas/MultilingualTitle'
 *                       audio_url:
 *                         type: string
 *                       duration:
 *                         type: integer
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', audioController.getAudio);

/**
 * @swagger
 * /audio/{id}:
 *   get:
 *     summary: Get audio recording by ID
 *     tags: [Audio]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audio recording ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Audio recording retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 text_id:
 *                   type: integer
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 audio_url:
 *                   type: string
 *                 duration:
 *                   type: integer
 *                 description:
 *                   type: object
 *       404:
 *         description: Audio recording not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', audioController.getAudioById);

/**
 * @swagger
 * /audio:
 *   post:
 *     summary: Create a new audio recording
 *     tags: [Audio]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text_id
 *               - title_tibetan
 *               - title_english
 *               - audio_url
 *             properties:
 *               text_id:
 *                 type: integer
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               audio_url:
 *                 type: string
 *               duration:
 *                 type: integer
 *               description_tibetan:
 *                 type: string
 *               description_english:
 *                 type: string
 *     responses:
 *       201:
 *         description: Audio recording created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
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
router.post('/', authenticate, authorize('admin', 'editor'), audioController.createAudio);

/**
 * @swagger
 * /audio/{id}:
 *   put:
 *     summary: Update an audio recording
 *     tags: [Audio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audio recording ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text_id:
 *                 type: integer
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               audio_url:
 *                 type: string
 *               duration:
 *                 type: integer
 *               description_tibetan:
 *                 type: string
 *               description_english:
 *                 type: string
 *     responses:
 *       200:
 *         description: Audio recording updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Audio recording not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticate, authorize('admin', 'editor'), audioController.updateAudio);

/**
 * @swagger
 * /audio/{id}:
 *   delete:
 *     summary: Delete an audio recording
 *     tags: [Audio]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Audio recording ID
 *     responses:
 *       200:
 *         description: Audio recording deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Audio recording not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, authorize('admin'), audioController.deleteAudio);

module.exports = router;
