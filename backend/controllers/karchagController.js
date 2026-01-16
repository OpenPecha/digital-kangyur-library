const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');

// Main Categories
const getMainCategories = (req, res, next) => {
  try {
    const { is_active } = req.query;
    let categories = [...db.karchagMainCategories];

    if (is_active === 'true') {
      categories = categories.filter(cat => cat.is_active);
    }

    // Sort by order_index
    categories.sort((a, b) => a.order_index - b.order_index);

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

const getMainCategoryById = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = findById(db.karchagMainCategories, id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Main category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createMainCategory = (req, res, next) => {
  try {
    const {
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index = 0,
      is_active = true,
    } = req.body;

    if (!name_english || !name_tibetan) {
      throw new AppError('VALIDATION_ERROR', 'name_english and name_tibetan are required', 400);
    }

    const category = create(db.karchagMainCategories, {
      name_english,
      name_tibetan,
      description_english: description_english || '',
      description_tibetan: description_tibetan || '',
      order_index,
      is_active,
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateMainCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index,
      is_active,
    } = req.body;

    const category = update(db.karchagMainCategories, id, {
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index,
      is_active,
    });

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Main category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteMainCategory = (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if category has subcategories
    const hasSubCategories = db.karchagSubCategories.some(
      sub => sub.main_category_id === id
    );

    if (hasSubCategories) {
      throw new AppError('VALIDATION_ERROR', 'Cannot delete category with subcategories', 400);
    }

    const deleted = remove(db.karchagMainCategories, id);
    if (!deleted) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Main category not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Sub Categories
const getSubCategories = (req, res, next) => {
  try {
    const { main_category_id, is_active } = req.query;
    let categories = [...db.karchagSubCategories];

    if (main_category_id) {
      categories = categories.filter(cat => cat.main_category_id === main_category_id);
    }

    if (is_active === 'true') {
      categories = categories.filter(cat => cat.is_active);
    }

    // Sort by order_index
    categories.sort((a, b) => a.order_index - b.order_index);

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

const getSubCategoryById = (req, res, next) => {
  try {
    const { id } = req.params;
    const category = findById(db.karchagSubCategories, id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createSubCategory = (req, res, next) => {
  try {
    const {
      main_category_id,
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index = 0,
      is_active = true,
    } = req.body;

    if (!main_category_id || !name_english || !name_tibetan) {
      throw new AppError('VALIDATION_ERROR', 'main_category_id, name_english and name_tibetan are required', 400);
    }

    // Verify main category exists
    const mainCategory = findById(db.karchagMainCategories, main_category_id);
    if (!mainCategory) {
      throw new AppError('VALIDATION_ERROR', 'Main category not found', 400);
    }

    const category = create(db.karchagSubCategories, {
      main_category_id,
      name_english,
      name_tibetan,
      description_english: description_english || '',
      description_tibetan: description_tibetan || '',
      order_index,
      is_active,
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateSubCategory = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      main_category_id,
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index,
      is_active,
    } = req.body;

    if (main_category_id) {
      const mainCategory = findById(db.karchagMainCategories, main_category_id);
      if (!mainCategory) {
        throw new AppError('VALIDATION_ERROR', 'Main category not found', 400);
      }
    }

    const category = update(db.karchagSubCategories, id, {
      main_category_id,
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index,
      is_active,
    });

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteSubCategory = (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if category has texts
    const hasTexts = db.karchagTexts.some(text => text.sub_category_id === id);

    if (hasTexts) {
      throw new AppError('VALIDATION_ERROR', 'Cannot delete category with texts', 400);
    }

    const deleted = remove(db.karchagSubCategories, id);
    if (!deleted) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Texts
const getTexts = (req, res, next) => {
  try {
    const { sub_category_id, is_active } = req.query;
    let texts = [...db.karchagTexts];

    if (sub_category_id) {
      texts = texts.filter(text => text.sub_category_id === sub_category_id);
    }

    if (is_active === 'true') {
      texts = texts.filter(text => text.is_active);
    }

    // Sort by order_index
    texts.sort((a, b) => a.order_index - b.order_index);

    res.json({ texts });
  } catch (error) {
    next(error);
  }
};

const getTextById = (req, res, next) => {
  try {
    const { id } = req.params;
    const text = findById(db.karchagTexts, id);

    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    res.json(text);
  } catch (error) {
    next(error);
  }
};

const createText = (req, res, next) => {
  try {
    const {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning_id,
      yana_id,
      translation_period_id,
      order_index = 0,
      is_active = true,
    } = req.body;

    if (!sub_category_id || !derge_id || !tibetan_title || !english_title) {
      throw new AppError('VALIDATION_ERROR', 'sub_category_id, derge_id, tibetan_title and english_title are required', 400);
    }

    // Verify sub category exists
    const subCategory = findById(db.karchagSubCategories, sub_category_id);
    if (!subCategory) {
      throw new AppError('VALIDATION_ERROR', 'Sub category not found', 400);
    }

    const text = create(db.karchagTexts, {
      sub_category_id,
      derge_id,
      yeshe_de_id: yeshe_de_id || '',
      tibetan_title,
      chinese_title: chinese_title || '',
      sanskrit_title: sanskrit_title || '',
      english_title,
      turning_id: turning_id || null,
      yana_id: yana_id || null,
      translation_period_id: translation_period_id || null,
      order_index,
      is_active,
    });

    res.status(201).json(text);
  } catch (error) {
    next(error);
  }
};

const updateText = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning_id,
      yana_id,
      translation_period_id,
      order_index,
      is_active,
    } = req.body;

    if (sub_category_id) {
      const subCategory = findById(db.karchagSubCategories, sub_category_id);
      if (!subCategory) {
        throw new AppError('VALIDATION_ERROR', 'Sub category not found', 400);
      }
    }

    const text = update(db.karchagTexts, id, {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning_id,
      yana_id,
      translation_period_id,
      order_index,
      is_active,
    });

    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    res.json(text);
  } catch (error) {
    next(error);
  }
};

const deleteText = (req, res, next) => {
  try {
    const { id } = req.params;

    const deleted = remove(db.karchagTexts, id);
    if (!deleted) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  // Main Categories
  getMainCategories,
  getMainCategoryById,
  createMainCategory,
  updateMainCategory,
  deleteMainCategory,
  // Sub Categories
  getSubCategories,
  getSubCategoryById,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  // Texts
  getTexts,
  getTextById,
  createText,
  updateText,
  deleteText,
};
