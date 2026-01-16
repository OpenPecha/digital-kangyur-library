const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');
const editionController = require('../controllers/editionController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /texts:
 *   get:
 *     summary: List texts with pagination
 *     tags: [Texts]
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
 *         name: category_id
 *         schema:
 *           type: integer
 *         description: Filter by category ID
 *       - in: query
 *         name: parent_category_id
 *         schema:
 *           type: integer
 *         description: Filter by parent category ID
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: order_index
 *         description: Sort field
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: asc
 *         description: Sort order
 *     responses:
 *       200:
 *         description: Texts retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 texts:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       category_id:
 *                         type: integer
 *                       title:
 *                         $ref: '#/components/schemas/MultilingualTitle'
 *                       derge_text_id:
 *                         type: string
 *                       yeshe_text_id:
 *                         type: string
 *                       turning:
 *                         type: string
 *                       vehicle:
 *                         type: string
 *                       summary:
 *                         type: string
 *                       is_active:
 *                         type: boolean
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   $ref: '#/components/schemas/Pagination'
 */
router.get('/', textController.getTexts);

/**
 * @swagger
 * /texts/{id}:
 *   get:
 *     summary: Get text details by ID
 *     tags: [Texts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *       - in: query
 *         name: include_sections
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Include text sections
 *       - in: query
 *         name: include_collated
 *         schema:
 *           type: string
 *           default: 'false'
 *         description: Include collated content
 *       - in: query
 *         name: include_metadata
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Include metadata
 *       - in: query
 *         name: include_editions
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Include editions
 *     responses:
 *       200:
 *         description: Text retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 category_id:
 *                   type: integer
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 catalog_identifiers:
 *                   type: object
 *                 content_classification:
 *                   type: object
 *                 sections:
 *                   type: array
 *                 collated_content:
 *                   type: object
 *                   nullable: true
 *                 metadata:
 *                   type: array
 *                 editions:
 *                   type: array
 *       404:
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', textController.getTextById);

/**
 * @swagger
 * /texts:
 *   post:
 *     summary: Create a new text
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - tibetan_title
 *               - english_title
 *             properties:
 *               category_id:
 *                 type: integer
 *               tibetan_title:
 *                 type: string
 *               english_title:
 *                 type: string
 *               sanskrit_title:
 *                 type: string
 *               chinese_title:
 *                 type: string
 *               derge_text_id:
 *                 type: string
 *               yeshe_text_id:
 *                 type: string
 *               turning:
 *                 type: string
 *               vehicle:
 *                 type: string
 *               summary:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Text created successfully
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
router.post('/', authenticate, authorize('admin', 'editor'), textController.createText);

/**
 * @swagger
 * /texts/{id}:
 *   put:
 *     summary: Update a text
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: integer
 *               tibetan_title:
 *                 type: string
 *               english_title:
 *                 type: string
 *               sanskrit_title:
 *                 type: string
 *               chinese_title:
 *                 type: string
 *               derge_text_id:
 *                 type: string
 *               yeshe_text_id:
 *                 type: string
 *               turning:
 *                 type: string
 *               vehicle:
 *                 type: string
 *               summary:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Text updated successfully
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
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', authenticate, authorize('admin', 'editor'), textController.updateText);

/**
 * @swagger
 * /texts/{id}:
 *   delete:
 *     summary: Delete a text
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *     responses:
 *       200:
 *         description: Text deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', authenticate, authorize('admin'), textController.deleteText);

/**
 * @swagger
 * /texts/{id}/sections:
 *   get:
 *     summary: Get text sections
 *     tags: [Texts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *     responses:
 *       200:
 *         description: Sections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sections:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/sections', textController.getTextSections);

/**
 * @swagger
 * /texts/{id}/sections:
 *   post:
 *     summary: Create a text section
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - section_type
 *               - title_tibetan
 *               - title_english
 *             properties:
 *               section_type:
 *                 type: string
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               content_tibetan:
 *                 type: string
 *               content_english:
 *                 type: string
 *               order_index:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Section created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       404:
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/:id/sections', authenticate, authorize('admin', 'editor'), textController.createTextSection);

/**
 * @swagger
 * /texts/{id}/sections/{section_id}:
 *   put:
 *     summary: Update a text section
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *       - in: path
 *         name: section_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Section ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               section_type:
 *                 type: string
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               content_tibetan:
 *                 type: string
 *               content_english:
 *                 type: string
 *               order_index:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Section updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *       404:
 *         description: Section not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id/sections/:section_id', authenticate, authorize('admin', 'editor'), textController.updateTextSection);

/**
 * @swagger
 * /texts/{id}/sections/{section_id}:
 *   delete:
 *     summary: Delete a text section
 *     tags: [Texts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
 *       - in: path
 *         name: section_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Section deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Section not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id/sections/:section_id', authenticate, authorize('admin', 'editor'), textController.deleteTextSection);

/**
 * @swagger
 * /texts/{id}/editions:
 *   get:
 *     summary: Get text editions
 *     tags: [Texts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Text ID
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
 *       404:
 *         description: Text not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id/editions', editionController.getTextEditions);

module.exports = router;
