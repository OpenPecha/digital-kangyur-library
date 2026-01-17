const { 
  textService, 
  textSectionService, 
  textMetadataService, 
  textCollatedContentService, 
  textEditionService,
  editionService,
  catalogCategoryService
} = require('../prisma/database');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getTexts = async (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const {
      category_id,
      search,
      lang = 'en',
      is_active = 'true',
      sort = 'order_index',
      order = 'asc',
    } = req.query;

    const skip = (page - 1) * limit;
    const take = limit;
    const isActiveFilter = is_active === 'true';

    const { items, total } = await textService.findAll({
      category_id,
      is_active: isActiveFilter,
      search,
      sort,
      order,
      skip,
      take
    });

    const pagination = {
      page,
      limit,
      total,
      total_pages: Math.ceil(total / limit),
      has_next: page * limit < total,
      has_prev: page > 1
    };

    // Get metadata for titles
    const formattedTexts = await Promise.all(items.map(async (text) => {
      const metadata = await textMetadataService.findByTextId(text.id);
      const tibetanTitle = metadata.find(m => m.metadata_key === 'tibetan-title')?.metadata_value;
      const englishTitle = metadata.find(m => m.metadata_key === 'english-title')?.metadata_value;
      const sanskritTitle = metadata.find(m => m.metadata_key === 'sanskrit-title')?.metadata_value;
      const chineseTitle = metadata.find(m => m.metadata_key === 'chinese-title')?.metadata_value;

      return {
        id: text.id,
        category_id: text.category_id,
        title: {
          tibetan: tibetanTitle || text.id_slug,
          english: englishTitle || text.id_slug,
          sanskrit: sanskritTitle,
          chinese: chineseTitle,
        },
        id_slug: text.id_slug,
        is_active: text.is_active,
        created_at: text.created_at,
      };
    }));

    res.json({
      texts: formattedTexts,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getTextById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      lang = 'en',
      include_sections = 'true',
      include_collated = 'false',
      include_metadata = 'true',
      include_editions = 'true',
    } = req.query;

    // Try to find by ID first, then by slug
    let text = await textService.findById(id, {
      include_sections: include_sections === 'true',
      include_collated: include_collated === 'true',
      include_metadata: include_metadata === 'true',
      include_editions: include_editions === 'true'
    });
    
    if (!text) {
      text = await textService.findBySlug(id, {
        include_sections: include_sections === 'true',
        include_collated: include_collated === 'true',
        include_metadata: include_metadata === 'true',
        include_editions: include_editions === 'true'
      });
    }
    
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    // Get metadata for titles
    const metadata = include_metadata === 'true' ? text.metadata || [] : [];
    const tibetanTitle = metadata.find(m => m.metadata_key === 'tibetan-title')?.metadata_value;
    const englishTitle = metadata.find(m => m.metadata_key === 'english-title')?.metadata_value;
    const sanskritTitle = metadata.find(m => m.metadata_key === 'sanskrit-title')?.metadata_value;
    const chineseTitle = metadata.find(m => m.metadata_key === 'chinese-title')?.metadata_value;

    const result = {
      id: text.id,
      category_id: text.category_id,
      id_slug: text.id_slug,
      title: {
        tibetan: tibetanTitle || text.id_slug,
        english: englishTitle || text.id_slug,
        sanskrit: sanskritTitle,
        chinese: chineseTitle,
      },
      sections: include_sections === 'true' ? (text.sections || []).map(section => ({
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
      })) : [],
      collated_content: include_collated === 'true' && text.collatedContent ? {
        collated_text: text.collatedContent.collated_text,
        english_translation: text.collatedContent.english_translation,
      } : null,
      metadata: include_metadata === 'true' ? (metadata || []).map(meta => ({
        key: meta.metadata_key,
        value: meta.metadata_value,
        group: meta.metadata_group,
        label: meta.label,
      })) : [],
      editions: include_editions === 'true' ? (text.textEditions || []).map(te => ({
        edition_id: te.edition_id,
        edition_name: te.edition ? {
          english: te.edition.name_english,
          tibetan: te.edition.name_tibetan,
        } : null,
        source_id: te.source_id,
        volume_number: te.volume_number,
        start_page: te.start_page,
        end_page: te.end_page,
        availability: te.availability,
        link_url: te.link_url,
      })) : [],
      created_at: text.created_at,
      updated_at: text.updated_at,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createText = async (req, res, next) => {
  try {
    const {
      category_id,
      id_slug,
      title,
      keywords,
      is_active = true,
      order_index = 0,
    } = req.body;

    if (!category_id || !id_slug) {
      throw new AppError('VALIDATION_ERROR', 'category_id and id_slug are required', 400);
    }

    // Validate category exists
    const category = await catalogCategoryService.findById(category_id);
    if (!category) {
      throw new AppError('INVALID_CATEGORY', 'Category not found', 400);
    }

    const text = await textService.create({
      category_id,
      id_slug,
      keywords: keywords || [],
      is_active,
      order_index,
    });

    // Create metadata entries for titles if provided
    if (title) {
      const metadataEntries = [];
      if (title.tibetan) {
        await textMetadataService.create({
          text_id: text.id,
          metadata_key: 'tibetan-title',
          metadata_value: title.tibetan,
          metadata_group: 'titles',
          label: 'Tibetan Title',
          order_index: 0
        });
      }
      if (title.english) {
        await textMetadataService.create({
          text_id: text.id,
          metadata_key: 'english-title',
          metadata_value: title.english,
          metadata_group: 'titles',
          label: 'English Title',
          order_index: 1
        });
      }
      if (title.sanskrit) {
        await textMetadataService.create({
          text_id: text.id,
          metadata_key: 'sanskrit-title',
          metadata_value: title.sanskrit,
          metadata_group: 'titles',
          label: 'Sanskrit Title',
          order_index: 2
        });
      }
      if (title.chinese) {
        await textMetadataService.create({
          text_id: text.id,
          metadata_key: 'chinese-title',
          metadata_value: title.chinese,
          metadata_group: 'titles',
          label: 'Chinese Title',
          order_index: 3
        });
      }
    }

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
