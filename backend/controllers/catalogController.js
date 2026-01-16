const { db, findById, findBySlug, create, update, remove, filter } = require('../models/mockDatabase');
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

const getCatalog = (req, res, next) => {
  try {
    const { lang = 'en', include_counts = 'true', active_only = 'true' } = req.query;
    
    let categories = [...db.catalogCategories];
    
    if (active_only === 'true') {
      categories = categories.filter(cat => cat.is_active);
    }

    const categoryTree = buildCategoryTree(categories);
    
    res.json({
      categories: categoryTree,
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryBySlug = (req, res, next) => {
  try {
    const { id_slug } = req.params;
    const { lang = 'en', include_children = 'true', include_texts = 'false' } = req.query;

    const category = findBySlug(db.catalogCategories, id_slug);
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
      result.children = buildCategoryTree(db.catalogCategories, category.id);
    }

    if (include_texts === 'true') {
      result.texts = db.texts
        .filter(text => text.category_id === category.id)
        .map(text => ({
          id: text.id,
          title: {
            tibetan: text.tibetan_title,
            english: text.english_title,
            sanskrit: text.sanskrit_title,
            chinese: text.chinese_title,
          },
        }));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createCategory = (req, res, next) => {
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
    if (findBySlug(db.catalogCategories, id_slug)) {
      throw new AppError('DUPLICATE_RESOURCE', 'Category slug already exists', 409);
    }

    // Validate parent exists if provided
    if (parent_id && !findById(db.catalogCategories, parent_id)) {
      throw new AppError('INVALID_CATEGORY', 'Parent category not found', 400);
    }

    const category = create(db.catalogCategories, {
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

const updateCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = findById(db.catalogCategories, id);

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

    const updated = update(db.catalogCategories, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = findById(db.catalogCategories, id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Category not found', 404);
    }

    // Check if category has children
    const hasChildren = db.catalogCategories.some(cat => cat.parent_id === id);
    if (hasChildren) {
      throw new AppError('DUPLICATE_RESOURCE', 'Category has children', 409);
    }

    // Check if category has texts
    const hasTexts = db.texts.some(text => text.category_id === id);
    if (hasTexts) {
      throw new AppError('DUPLICATE_RESOURCE', 'Category has texts', 409);
    }

    remove(db.catalogCategories, id);

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
