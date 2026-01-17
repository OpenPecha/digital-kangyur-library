const express = require('express');
const router = express.Router();
const karchagController = require('../controllers/karchagController');
const { authenticate, authorize } = require('../middleware/auth');

// Main Categories Routes
/**
 * @swagger
 * /karchag/main-categories:
 *   get:
 *     summary: Get all main categories
 *     tags: [Karchag]
 *     parameters:
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Main categories retrieved successfully
 */
router.get('/main-categories', karchagController.getMainCategories);

/**
 * @swagger
 * /karchag/main-categories/{id}:
 *   get:
 *     summary: Get main category by ID
 *     tags: [Karchag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Main category retrieved successfully
 *       404:
 *         description: Main category not found
 */
router.get('/main-categories/:id', karchagController.getMainCategoryById);

/**
 * @swagger
 * /karchag/main-categories:
 *   post:
 *     summary: Create a new main category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name_english
 *               - name_tibetan
 *             properties:
 *               name_english:
 *                 type: string
 *               name_tibetan:
 *                 type: string
 *               description_english:
 *                 type: string
 *               description_tibetan:
 *                 type: string
 *               order_index:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Main category created successfully
 */
router.post('/main-categories', authenticate, authorize(['admin', 'editor']), karchagController.createMainCategory);

/**
 * @swagger
 * /karchag/main-categories/{id}:
 *   put:
 *     summary: Update a main category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Main category updated successfully
 *       404:
 *         description: Main category not found
 */
router.put('/main-categories/:id', authenticate, authorize(['admin', 'editor']), karchagController.updateMainCategory);

/**
 * @swagger
 * /karchag/main-categories/{id}:
 *   delete:
 *     summary: Delete a main category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Main category deleted successfully
 *       404:
 *         description: Main category not found
 */
router.delete('/main-categories/:id', authenticate, authorize(['admin']), karchagController.deleteMainCategory);

// Sub Categories Routes
/**
 * @swagger
 * /karchag/sub-categories:
 *   get:
 *     summary: Get all sub categories
 *     tags: [Karchag]
 *     parameters:
 *       - in: query
 *         name: main_category_id
 *         schema:
 *           type: string
 *         description: Filter by main category ID
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Sub categories retrieved successfully
 */
router.get('/sub-categories', karchagController.getSubCategories);

/**
 * @swagger
 * /karchag/sub-categories/{id}:
 *   get:
 *     summary: Get sub category by ID
 *     tags: [Karchag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sub category retrieved successfully
 *       404:
 *         description: Sub category not found
 */
router.get('/sub-categories/:id', karchagController.getSubCategoryById);

/**
 * @swagger
 * /karchag/sub-categories:
 *   post:
 *     summary: Create a new sub category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - main_category_id
 *               - name_english
 *               - name_tibetan
 *             properties:
 *               main_category_id:
 *                 type: string
 *               name_english:
 *                 type: string
 *               name_tibetan:
 *                 type: string
 *               description_english:
 *                 type: string
 *               description_tibetan:
 *                 type: string
 *               order_index:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Sub category created successfully
 */
router.post('/sub-categories', authenticate, authorize(['admin', 'editor']), karchagController.createSubCategory);

/**
 * @swagger
 * /karchag/sub-categories/{id}:
 *   put:
 *     summary: Update a sub category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Sub category updated successfully
 *       404:
 *         description: Sub category not found
 */
router.put('/sub-categories/:id', authenticate, authorize(['admin', 'editor']), karchagController.updateSubCategory);

/**
 * @swagger
 * /karchag/sub-categories/{id}:
 *   delete:
 *     summary: Delete a sub category
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sub category deleted successfully
 *       404:
 *         description: Sub category not found
 */
router.delete('/sub-categories/:id', authenticate, authorize(['admin']), karchagController.deleteSubCategory);

// Texts Routes
/**
 * @swagger
 * /karchag/texts:
 *   get:
 *     summary: Get all texts
 *     tags: [Karchag]
 *     parameters:
 *       - in: query
 *         name: sub_category_id
 *         schema:
 *           type: string
 *         description: Filter by sub category ID
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *         description: Filter by active status
 *     responses:
 *       200:
 *         description: Texts retrieved successfully
 */
router.get('/texts', karchagController.getTexts);

/**
 * @swagger
 * /karchag/texts/{id}:
 *   get:
 *     summary: Get text by ID
 *     tags: [Karchag]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Text retrieved successfully
 *       404:
 *         description: Text not found
 */
router.get('/texts/:id', karchagController.getTextById);

/**
 * @swagger
 * /karchag/texts:
 *   post:
 *     summary: Create a new text
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sub_category_id
 *               - derge_id
 *               - tibetan_title
 *               - english_title
 *             properties:
 *               sub_category_id:
 *                 type: string
 *               derge_id:
 *                 type: string
 *               yeshe_de_id:
 *                 type: string
 *               yeshe_de_volume_number:
 *                 type: string
 *               yeshe_de_page_start:
 *                 type: string
 *               yeshe_de_page_end:
 *                 type: string
 *               tibetan_title:
 *                 type: string
 *               chinese_title:
 *                 type: string
 *               sanskrit_title:
 *                 type: string
 *               english_title:
 *                 type: string
 *               turning:
 *                 type: string
 *               yana:
 *                 type: string
 *               translation_period:
 *                 type: string
 *               pdf_url:
 *                 type: string
 *               order_index:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Text created successfully
 */
router.post('/texts', authenticate, authorize(['admin', 'editor']), karchagController.createText);

/**
 * @swagger
 * /karchag/texts/{id}:
 *   put:
 *     summary: Update a text
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Text updated successfully
 *       404:
 *         description: Text not found
 */
router.put('/texts/:id', authenticate, authorize(['admin', 'editor']), karchagController.updateText);

/**
 * @swagger
 * /karchag/texts/{id}:
 *   delete:
 *     summary: Delete a text
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Text deleted successfully
 *       404:
 *         description: Text not found
 */
router.delete('/texts/:id', authenticate, authorize(['admin']), karchagController.deleteText);

// Text Summary Routes
/**
 * @swagger
 * /karchag/texts/{textId}/summary:
 *   get:
 *     summary: Get text summary by text ID
 *     tags: [Karchag]
 *     parameters:
 *       - in: path
 *         name: textId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Summary retrieved successfully
 *       404:
 *         description: Text or summary not found
 */
router.get('/texts/:textId/summary', karchagController.getTextSummary);

/**
 * @swagger
 * /karchag/texts/{textId}/summary:
 *   post:
 *     summary: Create or update text summary
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: textId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               translation_homage_tibetan:
 *                 type: string
 *               translation_homage_english:
 *                 type: string
 *               purpose_tibetan:
 *                 type: string
 *               purpose_english:
 *                 type: string
 *               summary_text_tibetan:
 *                 type: string
 *               summary_text_english:
 *                 type: string
 *               word_meaning_tibetan:
 *                 type: string
 *               word_meaning_english:
 *                 type: string
 *               connection_tibetan:
 *                 type: string
 *               connection_english:
 *                 type: string
 *               question_answers_tibetan:
 *                 type: string
 *               question_answers_english:
 *                 type: string
 *               colophon_tibetan:
 *                 type: string
 *               colophon_english:
 *                 type: string
 *     responses:
 *       200:
 *         description: Summary created or updated successfully
 *       404:
 *         description: Text not found
 */
router.post('/texts/:textId/summary', authenticate, authorize(['admin', 'editor']), karchagController.createOrUpdateTextSummary);

/**
 * @swagger
 * /karchag/texts/{textId}/summary:
 *   put:
 *     summary: Update text summary
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: textId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Summary updated successfully
 *       404:
 *         description: Text or summary not found
 */
router.put('/texts/:textId/summary', authenticate, authorize(['admin', 'editor']), karchagController.createOrUpdateTextSummary);

/**
 * @swagger
 * /karchag/texts/{textId}/summary:
 *   delete:
 *     summary: Delete text summary
 *     tags: [Karchag]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: textId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Summary deleted successfully
 *       404:
 *         description: Text or summary not found
 */
router.delete('/texts/:textId/summary', authenticate, authorize(['admin']), karchagController.deleteTextSummary);

module.exports = router;
