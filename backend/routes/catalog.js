const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get categories structure (main categories with subcategories)
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *       - in: query
 *         name: include_counts
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Include item counts
 *       - in: query
 *         name: active_only
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Show only active categories
 *     responses:
 *       200:
 *         description: Catalog structure retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       id_slug:
 *                         type: string
 *                       title:
 *                         $ref: '#/components/schemas/MultilingualTitle'
 *                       description:
 *                         type: string
 *                       count:
 *                         type: integer
 *                       children:
 *                         type: array
 *                         items:
 *                           type: object
 */
router.get('/', catalogController.getCatalog);

/**
 * @swagger
 * /categories/{id_slug}:
 *   get:
 *     summary: Get category by slug
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id_slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Category slug identifier
 *       - in: query
 *         name: lang
 *         schema:
 *           type: string
 *           default: en
 *         description: Language preference
 *       - in: query
 *         name: include_children
 *         schema:
 *           type: string
 *           default: 'true'
 *         description: Include child categories
 *       - in: query
 *         name: include_texts
 *         schema:
 *           type: string
 *           default: 'false'
 *         description: Include texts in category
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_slug:
 *                   type: string
 *                 parent_id:
 *                   type: integer
 *                   nullable: true
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 description:
 *                   type: string
 *                 count:
 *                   type: integer
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *                 texts:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id_slug', catalogController.getCategoryBySlug);

/**
 * @swagger
 * /categories/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_slug
 *               - title_tibetan
 *               - title_english
 *             properties:
 *               parent_id:
 *                 type: integer
 *                 nullable: true
 *               id_slug:
 *                 type: string
 *               title_tibetan:
 *                 type: string
 *               title_english:
 *                 type: string
 *               description:
 *                 type: string
 *               order_index:
 *                 type: integer
 *                 default: 0
 *               is_active:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_slug:
 *                   type: string
 *                 title:
 *                   $ref: '#/components/schemas/MultilingualTitle'
 *                 description:
 *                   type: string
 *                 count:
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
 *       409:
 *         description: Category slug already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/categories', authenticate, authorize('admin', 'editor'), catalogController.createCategory);

/**
 * @swagger
 * /categories/categories/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
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
 *               description:
 *                 type: string
 *               order_index:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Category updated successfully
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
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/categories/:id', authenticate, authorize('admin', 'editor'), catalogController.updateCategory);

/**
 * @swagger
 * /categories/categories/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Category has children or texts
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/categories/:id', authenticate, authorize('admin'), catalogController.deleteCategory);

module.exports = router;
