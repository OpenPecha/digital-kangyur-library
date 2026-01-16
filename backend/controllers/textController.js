const { db, findById, create, update, remove, filter } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getTexts = (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const {
      category_id,
      parent_category_id,
      search,
      lang = 'en',
      is_active = 'true',
      sort = 'order_index',
      order = 'asc',
    } = req.query;

    let texts = [...db.texts];

    // Filter by active status
    if (is_active === 'true') {
      texts = texts.filter(text => text.is_active);
    }

    // Filter by category
    if (category_id) {
      texts = texts.filter(text => text.category_id === category_id);
    }

    // Filter by parent category
    if (parent_category_id) {
      texts = texts.filter(text => text.parent_category_id === parent_category_id);
    }

    // Search
    if (search) {
      const searchLower = search.toLowerCase();
      texts = texts.filter(text =>
        text.tibetan_title?.toLowerCase().includes(searchLower) ||
        text.english_title?.toLowerCase().includes(searchLower) ||
        text.sanskrit_title?.toLowerCase().includes(searchLower)
      );
    }

    // Sort
    texts.sort((a, b) => {
      let aVal = a[sort] || 0;
      let bVal = b[sort] || 0;

      if (sort === 'title') {
        aVal = lang === 'bod' ? a.tibetan_title : a.english_title;
        bVal = lang === 'bod' ? b.tibetan_title : b.english_title;
      }

      if (typeof aVal === 'string') {
        return order === 'desc'
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }

      return order === 'desc' ? bVal - aVal : aVal - bVal;
    });

    const { items, pagination } = paginate(texts, page, limit);

    const formattedTexts = items.map(text => ({
      id: text.id,
      category_id: text.category_id,
      title: {
        tibetan: text.tibetan_title,
        english: text.english_title,
        sanskrit: text.sanskrit_title,
        chinese: text.chinese_title,
      },
      derge_text_id: text.derge_text_id,
      yeshe_text_id: text.yeshe_text_id,
      turning: text.turning,
      vehicle: text.vehicle,
      summary: text.summary,
      is_active: text.is_active,
      created_at: text.created_at,
    }));

    res.json({
      texts: formattedTexts,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getTextById = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      lang = 'en',
      include_sections = 'true',
      include_collated = 'false',
      include_metadata = 'true',
      include_editions = 'true',
    } = req.query;

    const text = findById(db.texts, id);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    const result = {
      id: text.id,
      category_id: text.category_id,
      title: {
        tibetan: text.tibetan_title,
        english: text.english_title,
        sanskrit: text.sanskrit_title,
        chinese: text.chinese_title,
      },
      catalog_identifiers: {
        derge_text_id: text.derge_text_id,
        yeshe_text_id: text.yeshe_text_id,
        derge_vol_number: text.derge_vol_number,
        derge_start_page: text.derge_start_page,
        derge_end_page: text.derge_end_page,
      },
      content_classification: {
        turning: text.turning,
        vehicle: text.vehicle,
        translation_type: text.translation_type,
      },
      sections: [],
      collated_content: null,
      metadata: [],
      editions: [],
      created_at: text.created_at,
      updated_at: text.updated_at,
    };

    if (include_sections === 'true') {
      result.sections = db.textSections
        .filter(section => section.text_id === id)
        .sort((a, b) => a.order_index - b.order_index)
        .map(section => ({
          id: section.id,
          section_type: section.section_type,
          title: {
            tibetan: section.title_tibetan,
            english: section.title_english,
          },
          content: {
            tibetan: section.content_tibetan,
            english: section.content_english,
          },
          order_index: section.order_index,
        }));
    }

    if (include_collated === 'true') {
      const collated = db.textCollatedContent.find(c => c.text_id === id);
      if (collated) {
        result.collated_content = {
          collated_text: collated.collated_text,
          english_translation: collated.english_translation,
        };
      }
    }

    if (include_metadata === 'true') {
      result.metadata = db.textMetadata
        .filter(meta => meta.text_id === id)
        .sort((a, b) => a.order_index - b.order_index)
        .map(meta => ({
          key: meta.metadata_key,
          value: meta.metadata_value,
          group: meta.metadata_group,
          label: meta.label,
        }));
    }

    if (include_editions === 'true') {
      result.editions = db.textEditions
        .filter(te => te.text_id === id)
        .map(te => {
          const edition = findById(db.editions, te.edition_id);
          return {
            edition_id: te.edition_id,
            edition_name: edition ? {
              english: edition.name_english,
              tibetan: edition.name_tibetan,
            } : null,
            source_id: te.source_id,
            volume_number: te.volume_number,
            start_page: te.start_page,
            end_page: te.end_page,
            availability: te.availability,
            link_url: te.link_url,
          };
        });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createText = (req, res, next) => {
  try {
    const {
      category_id,
      parent_category_id,
      title,
      catalog_identifiers,
      content_classification,
      summary,
      keywords,
      is_active = true,
      order_index = 0,
    } = req.body;

    if (!category_id || !title?.tibetan || !title?.english) {
      throw new AppError('VALIDATION_ERROR', 'category_id, title.tibetan, and title.english are required', 400);
    }

    // Validate category exists
    if (!findById(db.catalogCategories, category_id)) {
      throw new AppError('INVALID_CATEGORY', 'Category not found', 400);
    }

    const text = create(db.texts, {
      category_id,
      parent_category_id: parent_category_id || null,
      tibetan_title: title.tibetan,
      english_title: title.english,
      sanskrit_title: title.sanskrit,
      chinese_title: title.chinese,
      derge_text_id: catalog_identifiers?.derge_text_id,
      yeshe_text_id: catalog_identifiers?.yeshe_text_id,
      derge_vol_number: catalog_identifiers?.derge_vol_number,
      derge_start_page: catalog_identifiers?.derge_start_page,
      derge_end_page: catalog_identifiers?.derge_end_page,
      turning: content_classification?.turning,
      vehicle: content_classification?.vehicle,
      translation_type: content_classification?.translation_type,
      summary,
      keywords: keywords || [],
      is_active,
      order_index,
    });

    res.status(201).json({
      id: text.id,
      created_at: text.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateText = (req, res, next) => {
  try {
    const { id } = req.params;
    const text = findById(db.texts, id);

    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    const updateData = {};
    const { title, catalog_identifiers, content_classification, summary, keywords, is_active, order_index } = req.body;

    if (title) {
      if (title.tibetan !== undefined) updateData.tibetan_title = title.tibetan;
      if (title.english !== undefined) updateData.english_title = title.english;
      if (title.sanskrit !== undefined) updateData.sanskrit_title = title.sanskrit;
      if (title.chinese !== undefined) updateData.chinese_title = title.chinese;
    }

    if (catalog_identifiers) {
      Object.keys(catalog_identifiers).forEach(key => {
        updateData[key] = catalog_identifiers[key];
      });
    }

    if (content_classification) {
      if (content_classification.turning !== undefined) updateData.turning = content_classification.turning;
      if (content_classification.vehicle !== undefined) updateData.vehicle = content_classification.vehicle;
      if (content_classification.translation_type !== undefined) updateData.translation_type = content_classification.translation_type;
    }

    if (summary !== undefined) updateData.summary = summary;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (is_active !== undefined) updateData.is_active = is_active;
    if (order_index !== undefined) updateData.order_index = order_index;

    const updated = update(db.texts, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteText = (req, res, next) => {
  try {
    const { id } = req.params;
    const text = findById(db.texts, id);

    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    // Delete related data
    db.textSections = db.textSections.filter(s => s.text_id !== id);
    db.textCollatedContent = db.textCollatedContent.filter(c => c.text_id !== id);
    db.textMetadata = db.textMetadata.filter(m => m.text_id !== id);
    db.textEditions = db.textEditions.filter(te => te.text_id !== id);
    db.audioRecordings = db.audioRecordings.filter(a => a.text_id !== id);

    remove(db.texts, id);

    res.json({
      message: 'Text deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getTextSections = (req, res, next) => {
  try {
    const { id } = req.params;
    const { section_type, lang = 'en' } = req.query;

    let sections = db.textSections.filter(s => s.text_id === id);

    if (section_type) {
      sections = sections.filter(s => s.section_type === section_type);
    }

    sections.sort((a, b) => a.order_index - b.order_index);

    const formattedSections = sections.map(section => ({
      id: section.id,
      section_type: section.section_type,
      title: {
        tibetan: section.title_tibetan,
        english: section.title_english,
      },
      content: {
        tibetan: section.content_tibetan,
        english: section.content_english,
      },
      order_index: section.order_index,
    }));

    res.json({
      sections: formattedSections,
    });
  } catch (error) {
    next(error);
  }
};

const createTextSection = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      section_type,
      title_tibetan,
      title_english,
      content_tibetan,
      content_english,
      order_index = 0,
    } = req.body;

    if (!section_type) {
      throw new AppError('VALIDATION_ERROR', 'section_type is required', 400);
    }

    const text = findById(db.texts, id);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    const section = create(db.textSections, {
      text_id: id,
      section_type,
      title_tibetan,
      title_english,
      content_tibetan,
      content_english,
      order_index,
    });

    res.status(201).json({
      id: section.id,
      section_type: section.section_type,
      created_at: section.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateTextSection = (req, res, next) => {
  try {
    const { id, section_id } = req.params;
    const section = db.textSections.find(s => s.id === section_id && s.text_id === id);

    if (!section) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Section not found', 404);
    }

    const updateData = {};
    const { section_type, title_tibetan, title_english, content_tibetan, content_english, order_index } = req.body;

    if (section_type !== undefined) updateData.section_type = section_type;
    if (title_tibetan !== undefined) updateData.title_tibetan = title_tibetan;
    if (title_english !== undefined) updateData.title_english = title_english;
    if (content_tibetan !== undefined) updateData.content_tibetan = content_tibetan;
    if (content_english !== undefined) updateData.content_english = content_english;
    if (order_index !== undefined) updateData.order_index = order_index;

    const updated = update(db.textSections, section_id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTextSection = (req, res, next) => {
  try {
    const { id, section_id } = req.params;
    const section = db.textSections.find(s => s.id === section_id && s.text_id === id);

    if (!section) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Section not found', 404);
    }

    remove(db.textSections, section_id);

    res.json({
      message: 'Section deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTexts,
  getTextById,
  createText,
  updateText,
  deleteText,
  getTextSections,
  createTextSection,
  updateTextSection,
  deleteTextSection,
};
