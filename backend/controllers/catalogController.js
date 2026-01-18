const { catalogCategoryService } = require('../prisma/database');
const { AppError } = require('../utils/errors');

const buildCategoryTree = (categories, parentId = null) => {
  return categories
    .filter(cat => cat.parent_id === parentId)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0))
    .map(cat => ({
      id: cat.id,
      id_slug: cat.id_slug,
      title: {
        tibetan: cat.title_tibetan,
        english: cat.title_english,
      },
      description: cat.description,
      count: cat.count,
      order_index: cat.order_index,
      children: buildCategoryTree(categories, cat.id),
    }));
};

const getCatalog = async (req, res, next) => {
  try {
    const { lang = 'en', include_counts = 'true', active_only = 'true' } = req.query;
    
    const isActiveFilter = active_only === 'true';
    const categories = await catalogCategoryService.findAll({ is_active: isActiveFilter });

    const categoryTree = buildCategoryTree(categories);
    
    res.json({
      categories: categoryTree,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = async (req, res, next) => {
  try {
    const { id_slug } = req.params;
    const { lang = 'en', include_children = 'true', include_texts = 'false' } = req.query;

    const category = await catalogCategoryService.findBySlug(id_slug);
    if (!category || (!category.is_active && req.query.active_only !== 'false')) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Category not found', 404);
    }

    const result = {
      id: category.id,
      id_slug: category.id_slug,
      parent_id: category.parent_id,
      title: {
        tibetan: category.title_tibetan,
        english: category.title_english,
      },
      description: category.description,
      count: category.count,
      order_index: category.order_index,
      children: [],
      texts: [],
    };

    if (include_children === 'true') {
      const allCategories = await catalogCategoryService.findAll({ is_active: undefined });
      result.children = buildCategoryTree(allCategories, category.id);
    }

    // Note: Texts are now managed through KarchagText model
    // If needed, this can be updated to fetch karchag texts by category
    if (include_texts === 'true') {
      result.texts = [];
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const {
      parent_id,
      id_slug,
      title_tibetan,
      title_english,
      description,
      order_index = 0,
      is_active = true,
    } = req.body;

    if (!id_slug || !title_tibetan || !title_english) {
      throw new AppError('VALIDATION_ERROR', 'id_slug, title_tibetan, and title_english are required', 400);
    }

    // Check if slug already exists
    const existing = await catalogCategoryService.findBySlug(id_slug);
    if (existing) {
      throw new AppError('DUPLICATE_RESOURCE', 'Category slug already exists', 409);
    }

    // Validate parent exists if provided
    if (parent_id) {
      const parent = await catalogCategoryService.findById(parent_id);
      if (!parent) {
        throw new AppError('INVALID_CATEGORY', 'Parent category not found', 400);
      }
    }

    const category = await catalogCategoryService.create({
      parent_id: parent_id || null,
      id_slug,
      title_tibetan,
      title_english,
      description,
      order_index,
      is_active,
      count: 0,
    });

    res.status(201).json({
      id: category.id,
      id_slug: category.id_slug,
      title: {
        tibetan: category.title_tibetan,
        english: category.title_english,
      },
      description: category.description,
      count: category.count,
      created_at: category.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await catalogCategoryService.findById(id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Category not found', 404);
    }

    const {
      title_tibetan,
      title_english,
      description,
      order_index,
      is_active,
    } = req.body;

    const updateData = {};
    if (title_tibetan !== undefined) updateData.title_tibetan = title_tibetan;
    if (title_english !== undefined) updateData.title_english = title_english;
    if (description !== undefined) updateData.description = description;
    if (order_index !== undefined) updateData.order_index = order_index;
    if (is_active !== undefined) updateData.is_active = is_active;

    const updated = await catalogCategoryService.update(id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await catalogCategoryService.findById(id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Category not found', 404);
    }

    // Check if category has children
    const hasChildren = await catalogCategoryService.hasChildren(id);
    if (hasChildren) {
      throw new AppError('DUPLICATE_RESOURCE', 'Category has children', 409);
    }

    // Note: Texts are now managed through KarchagText model
    // Category text checking is no longer needed

    await catalogCategoryService.delete(id);

    res.json({
      message: 'Category deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCatalog,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
};
