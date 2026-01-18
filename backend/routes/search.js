const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

/**
 * @swagger
 * /search:
 *   get:
 *     summary: Search across texts, news, timeline, and audio
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [all, texts, news, timeline, audio]
 *           default: all
 *         description: Type of content to search
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
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
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query:
 *                   type: string
 *                 results:
 *                   type: object
 *                   properties:
 *                     texts:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                         total:
 *                           type: integer
 *                     news:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                         total:
 *                           type: integer
 *                     timeline:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                         total:
 *                           type: integer
 *                     audio:
 *                       type: object
 *                       properties:
 *                         items:
 *                           type: array
 *                         total:
 *                           type: integer
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', searchController.search);

module.exports = router;
