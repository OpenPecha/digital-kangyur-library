const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /news:
 *   get:
 *     summary: List news articles with pagination
 *     tags: [News]
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
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: News articles retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 news:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         $ref: '#/components/schemas/MultilingualTitle'
 *                       summary:
 *                         type: string
 *                       published_at:
 *                         type: string
 *                         format: date-time
 *                       is_active:
 *                         type: boolean
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', newsController.getNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news article by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: News article ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: News article retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 content:
 *                   type: object
 *                 summary:
 *                   type: string
 *                 published_at:
 *                   type: string
 *                   format: date-time
 *                 is_active:
 *                   type: boolean
 *       404:
 *         description: News article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', newsController.getNewsById);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title_tibetan
 *               - title_english
 *             properties:
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               content_tibetan:
 *                 type: string
 *               content_english:
 *                 type: string
 *               summary:
 *                 type: string
 *               published_at:
 *                 type: string
 *                 format: date-time
 *               is_active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: News article created successfully
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
router.post('/', authenticate, authorize('admin', 'editor'), newsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: News article ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               content_tibetan:
 *                 type: string
 *               content_english:
 *                 type: string
 *               summary:
 *                 type: string
 *               published_at:
 *                 type: string
 *                 format: date-time
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: News article updated successfully
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
 *         description: News article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticate, authorize('admin', 'editor'), newsController.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news article
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: News article ID
 *     responses:
 *       200:
 *         description: News article deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: News article not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, authorize('admin'), newsController.deleteNews);

module.exports = router;
