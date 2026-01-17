const { editionService, textService, textEditionService } = require('../prisma/database');
const { AppError } = require('../utils/errors');

const getEditions = async (req, res, next) => {
  try {
    const { is_active = 'true', lang = 'en' } = req.query;

    const isActiveFilter = is_active === 'true';
    const editions = await editionService.findAll({ is_active: isActiveFilter });

    const formattedEditions = editions.map(edition => ({
      id: edition.id,
      name: {
        english: edition.name_english,
        tibetan: edition.name_tibetan,
      },
      description: {
        english: edition.description_english,
        tibetan: edition.description_tibetan,
      },
      year: edition.year,
      location: edition.location,
      total_volumes: edition.total_volumes,
      total_texts: edition.total_texts,
      is_active: edition.is_active,
    }));

    res.json({
      editions: formattedEditions,
    });
  } catch (error) {
    next(error);
  }
};

const getEditionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = 'en', include_texts = 'false' } = req.query;

    const edition = await editionService.findById(id);
    if (!edition) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Edition not found', 404);
    }

    const result = {
      id: edition.id,
      name: {
        english: edition.name_english,
        tibetan: edition.name_tibetan,
      },
      description: {
        english: edition.description_english,
        tibetan: edition.description_tibetan,
      },
      year: edition.year,
      location: edition.location,
      total_volumes: edition.total_volumes,
      total_texts: edition.total_texts,
      is_active: edition.is_active,
      texts: [],
    };

    if (include_texts === 'true') {
      const textEditions = await textEditionService.findByTextId(id);
      result.texts = await Promise.all(textEditions.map(async (te) => {
        const text = await textService.findById(te.text_id);
        return {
          text_id: te.text_id,
          title: text ? {
            tibetan: text.id_slug, // Note: schema doesn't have tibetan_title directly
            english: text.id_slug,
          } : null,
          source_id: te.source_id,
          volume_number: te.volume_number,
          start_page: te.start_page,
          end_page: te.end_page,
        };
      }));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getTextEditions = async (req, res, next) => {
  try {
    const { id } = req.params;

    const text = await textService.findById(id);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    const textEditions = await textEditionService.findByTextId(id);
    const editions = await Promise.all(textEditions.map(async (te) => {
      const edition = await editionService.findById(te.edition_id);
      return {
        id: te.id,
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
    }));

    res.json({
      editions,
    });
  } catch (error) {
    next(error);
  }
};

const createEdition = async (req, res, next) => {
  try {
    const {
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      year,
      location,
      total_volumes,
      total_texts,
      is_active = true,
    } = req.body;

    if (!name_english || !name_tibetan) {
      throw new AppError('VALIDATION_ERROR', 'name_english and name_tibetan are required', 400);
    }

    const edition = await editionService.create({
      name_english,
      name_tibetan,
      description_english,
      description_tibetan,
      year,
      location,
      total_volumes,
      total_texts,
      is_active,
    });

    res.status(201).json({
      id: edition.id,
      created_at: edition.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const addTextEdition = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      edition_id,
      source_id,
      volume_number,
      start_page,
      end_page,
      availability,
      link_url,
    } = req.body;

    if (!edition_id) {
      throw new AppError('VALIDATION_ERROR', 'edition_id is required', 400);
    }

    const text = await textService.findById(id);
    if (!text) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    const edition = await editionService.findById(edition_id);
    if (!edition) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Edition not found', 404);
    }

    // Check if already exists
    const existing = await textEditionService.findByTextId(id);
    const alreadyExists = existing.some(te => te.edition_id === edition_id);
    if (alreadyExists) {
      throw new AppError('DUPLICATE_RESOURCE', 'Text edition already exists', 409);
    }

    const textEdition = await textEditionService.create({
      text_id: id,
      edition_id,
      source_id,
      volume_number,
      start_page,
      end_page,
      availability,
      link_url,
    });

    res.status(201).json({
      id: textEdition.id,
      created_at: textEdition.created_at,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEditions,
  getEditionById,
  getTextEditions,
  createEdition,
  addTextEdition,
};
