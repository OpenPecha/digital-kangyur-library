const express = require('express');
const router = express.Router();
const editionController = require('../controllers/editionController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /editions:
 *   get:
 *     summary: List editions with pagination
 *     tags: [Editions]
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
 *         description: Editions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 editions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                       publisher:
 *                         type: string
 *                       year:
 *                         type: integer
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', editionController.getEditions);

/**
 * @swagger
 * /editions/{id}:
 *   get:
 *     summary: Get edition by ID
 *     tags: [Editions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Edition ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *     responses:
 *       200:
 *         description: Edition retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 publisher:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 texts:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Edition not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', editionController.getEditionById);

/**
 * @swagger
 * /editions:
 *   post:
 *     summary: Create a new edition
 *     tags: [Editions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               publisher:
 *                 type: string
 *               year:
 *                 type: integer
 *               isbn:
 *                 type: string
 *     responses:
 *       201:
 *         description: Edition created successfully
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
router.post('/', authenticate, authorize('admin', 'editor'), editionController.createEdition);

module.exports = router;
