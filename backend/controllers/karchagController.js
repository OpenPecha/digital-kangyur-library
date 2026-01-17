const { karchagMainCategoryService, karchagSubCategoryService, karchagTextService, karchagTextSummaryService } = require('../prisma/database');
const { AppError } = require('../utils/errors');

// Main Categories
const getMainCategories = async (req, res, next) => {
  try {
    const { is_active } = req.query;
    const options = {};
    if (is_active !== undefined) {
      options.is_active = is_active === 'true';
    }
    const categories = await karchagMainCategoryService.findAll(options);

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

const getMainCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await karchagMainCategoryService.findById(id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Main category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createMainCategory = async (req, res, next) => {
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

    const category = await karchagMainCategoryService.create({
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

const updateMainCategory = async (req, res, next) => {
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

    const category = await karchagMainCategoryService.update(id, {
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

const deleteMainCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await karchagMainCategoryService.findById(id);
    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Main category not found', 404);
    }

    // Check if category has subcategories
    if (category.subCategories && category.subCategories.length > 0) {
      throw new AppError('VALIDATION_ERROR', 'Cannot delete category with subcategories', 400);
    }

    await karchagMainCategoryService.delete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Sub Categories
const getSubCategories = async (req, res, next) => {
  try {
    const { main_category_id, is_active } = req.query;
    const options = {};
    if (is_active !== undefined) {
      options.is_active = is_active === 'true';
    }
    if (main_category_id) {
      options.main_category_id = main_category_id;
    }
    const categories = await karchagSubCategoryService.findAll(options);

    res.json({ categories });
  } catch (error) {
    next(error);
  }
};

const getSubCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await karchagSubCategoryService.findById(id);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const createSubCategory = async (req, res, next) => {
  try {
    const {
      main_category_id,
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index = 0,
      is_active = true,
      only_content = false,
      content,
    } = req.body;

    if (!main_category_id || !name_english || !name_tibetan) {
      throw new AppError('VALIDATION_ERROR', 'main_category_id, name_english and name_tibetan are required', 400);
    }

    // Verify main category exists
    const mainCategory = await karchagMainCategoryService.findById(main_category_id);
    if (!mainCategory) {
      throw new AppError('VALIDATION_ERROR', 'Main category not found', 400);
    }

    const category = await karchagSubCategoryService.create({
      main_category_id,
      name_english,
      name_tibetan,
      description_english: description_english || '',
      description_tibetan: description_tibetan || '',
      order_index,
      is_active,
      only_content,
      content: only_content ? (content || null) : null,
    });

    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

const updateSubCategory = async (req, res, next) => {
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
      only_content,
      content,
    } = req.body;

    if (main_category_id) {
      const mainCategory = await karchagMainCategoryService.findById(main_category_id);
      if (!mainCategory) {
        throw new AppError('VALIDATION_ERROR', 'Main category not found', 400);
      }
    }

    const updateData = {
      main_category_id,
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      order_index,
      is_active,
    };

    // Only include only_content and content if they are provided
    if (only_content !== undefined) {
      updateData.only_content = only_content;
      updateData.content = only_content ? (content || null) : null;
    }

    const category = await karchagSubCategoryService.update(id, updateData);

    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteSubCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const category = await karchagSubCategoryService.findById(id);
    if (!category) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Sub category not found', 404);
    }

    // Check if category has texts
    if (category.texts && category.texts.length > 0) {
      throw new AppError('VALIDATION_ERROR', 'Cannot delete category with texts', 400);
    }

    await karchagSubCategoryService.delete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Texts
const getTexts = async (req, res, next) => {
  try {
    const { sub_category_id, is_active } = req.query;
    const options = {};
    if (is_active !== undefined) {
      options.is_active = is_active === 'true';
    }
    if (sub_category_id) {
      options.sub_category_id = sub_category_id;
    }
    const texts = await karchagTextService.findAll(options);

    res.json({ texts });
  } catch (error) {
    next(error);
  }
};

const getTextById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const text = await karchagTextService.findById(id);

    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    res.json(text);
  } catch (error) {
    next(error);
  }
};

const createText = async (req, res, next) => {
  try {
    const {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      yeshe_de_volume_number,
      yeshe_de_page_start,
      yeshe_de_page_end,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning,
      yana,
      translation_period,
      pdf_url,
      order_index = 0,
      is_active = true,
    } = req.body;

    if (!sub_category_id || !derge_id || !tibetan_title || !english_title) {
      throw new AppError('VALIDATION_ERROR', 'sub_category_id, derge_id, tibetan_title and english_title are required', 400);
    }

    // Verify sub category exists
    const subCategory = await karchagSubCategoryService.findById(sub_category_id);
    if (!subCategory) {
      throw new AppError('VALIDATION_ERROR', 'Sub category not found', 400);
    }

    const text = await karchagTextService.create({
      sub_category_id,
      derge_id,
      yeshe_de_id: yeshe_de_id || null,
      yeshe_de_volume_number: yeshe_de_volume_number || null,
      yeshe_de_page_start: yeshe_de_page_start || null,
      yeshe_de_page_end: yeshe_de_page_end || null,
      tibetan_title,
      chinese_title: chinese_title || null,
      sanskrit_title: sanskrit_title || null,
      english_title,
      turning: turning || null,
      yana: yana || null,
      translation_period: translation_period || null,
      pdf_url: pdf_url || null,
      order_index,
      is_active,
    });

    res.status(201).json(text);
  } catch (error) {
    next(error);
  }
};

const updateText = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      yeshe_de_volume_number,
      yeshe_de_page_start,
      yeshe_de_page_end,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning,
      yana,
      translation_period,
      pdf_url,
      order_index,
      is_active,
    } = req.body;

    if (sub_category_id) {
      const subCategory = await karchagSubCategoryService.findById(sub_category_id);
      if (!subCategory) {
        throw new AppError('VALIDATION_ERROR', 'Sub category not found', 400);
      }
    }

    const text = await karchagTextService.update(id, {
      sub_category_id,
      derge_id,
      yeshe_de_id,
      yeshe_de_volume_number,
      yeshe_de_page_start,
      yeshe_de_page_end,
      tibetan_title,
      chinese_title,
      sanskrit_title,
      english_title,
      turning,
      yana,
      translation_period,
      pdf_url,
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

const deleteText = async (req, res, next) => {
  try {
    const { id } = req.params;

    const text = await karchagTextService.findById(id);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    await karchagTextService.delete(id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// Text Summary operations
const getTextSummary = async (req, res, next) => {
  try {
    const { textId } = req.params;
    
    // Verify text exists
    const text = await karchagTextService.findById(textId);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }
    
    const summary = await karchagTextSummaryService.findByTextId(textId);
    
    if (!summary) {
      return res.json(null);
    }
    
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

const createOrUpdateTextSummary = async (req, res, next) => {
  try {
    const { textId } = req.params;
    const {
      translation_homage_tibetan,
      translation_homage_english,
      purpose_tibetan,
      purpose_english,
      summary_text_tibetan,
      summary_text_english,
      word_meaning_tibetan,
      word_meaning_english,
      connection_tibetan,
      connection_english,
      question_answers_tibetan,
      question_answers_english,
      colophon_tibetan,
      colophon_english,
    } = req.body;
    
    // Verify text exists
    const text = await karchagTextService.findById(textId);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }
    
    const summaryData = {
      translation_homage_tibetan: translation_homage_tibetan || null,
      translation_homage_english: translation_homage_english || null,
      purpose_tibetan: purpose_tibetan || null,
      purpose_english: purpose_english || null,
      summary_text_tibetan: summary_text_tibetan || null,
      summary_text_english: summary_text_english || null,
      word_meaning_tibetan: word_meaning_tibetan || null,
      word_meaning_english: word_meaning_english || null,
      connection_tibetan: connection_tibetan || null,
      connection_english: connection_english || null,
      question_answers_tibetan: question_answers_tibetan || null,
      question_answers_english: question_answers_english || null,
      colophon_tibetan: colophon_tibetan || null,
      colophon_english: colophon_english || null,
    };
    
    const summary = await karchagTextSummaryService.upsert(textId, summaryData);
    
    res.json(summary);
  } catch (error) {
    next(error);
  }
};

const deleteTextSummary = async (req, res, next) => {
  try {
    const { textId } = req.params;
    
    // Verify text exists
    const text = await karchagTextService.findById(textId);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }
    
    const summary = await karchagTextSummaryService.findByTextId(textId);
    if (!summary) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Summary not found', 404);
    }
    
    await karchagTextSummaryService.delete(textId);
    
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
  // Text Summary
  getTextSummary,
  createOrUpdateTextSummary,
  deleteTextSummary,
};
