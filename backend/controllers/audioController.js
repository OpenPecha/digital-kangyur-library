const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getAudio = (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const {
      text_id,
      category_id,
      search,
      lang = 'en',
      is_active = 'true',
    } = req.query;

    let recordings = [...db.audioRecordings];

    if (is_active === 'true') {
      recordings = recordings.filter(r => r.is_active);
    }

    if (text_id) {
      recordings = recordings.filter(r => r.text_id === text_id);
    }

    if (category_id) {
      recordings = recordings.filter(r => r.parent_category_id === category_id);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      recordings = recordings.filter(r =>
        r.tibetan_title?.toLowerCase().includes(searchLower) ||
        r.english_title?.toLowerCase().includes(searchLower)
      );
    }

    const { items, pagination } = paginate(recordings, page, limit);

    const formattedRecordings = items.map(recording => ({
      id: recording.id,
      text_id: recording.text_id,
      title: {
        tibetan: recording.tibetan_title,
        english: recording.english_title,
        indian: recording.indian_title,
        chinese: recording.chinese_title,
      },
      audio_url: recording.audio_url,
      duration_seconds: recording.duration_seconds,
      file_size_bytes: recording.file_size_bytes,
      mime_type: recording.mime_type,
      is_active: recording.is_active,
      created_at: recording.created_at,
    }));

    res.json({
      recordings: formattedRecordings,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getAudioById = (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = 'en' } = req.query;

    const recording = findById(db.audioRecordings, id);
    if (!recording) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Audio recording not found', 404);
    }

    res.json({
      id: recording.id,
      text_id: recording.text_id,
      title: {
        tibetan: recording.tibetan_title,
        english: recording.english_title,
        indian: recording.indian_title,
        chinese: recording.chinese_title,
      },
      text_category: recording.text_category,
      parent_category_id: recording.parent_category_id,
      audio_url: recording.audio_url,
      duration_seconds: recording.duration_seconds,
      file_size_bytes: recording.file_size_bytes,
      mime_type: recording.mime_type,
      is_active: recording.is_active,
      created_at: recording.created_at,
      updated_at: recording.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const createAudio = (req, res, next) => {
  try {
    const {
      text_id,
      indian_title,
      chinese_title,
      tibetan_title,
      english_title,
      text_category,
      parent_category_id,
      audio_url,
      duration_seconds,
      file_size_bytes,
      mime_type,
      is_active = true,
    } = req.body;

    if (!tibetan_title || !english_title || !audio_url) {
      throw new AppError('VALIDATION_ERROR', 'tibetan_title, english_title, and audio_url are required', 400);
    }

    if (text_id && !findById(db.texts, text_id)) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Text not found', 404);
    }

    if (parent_category_id && !findById(db.catalogCategories, parent_category_id)) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Category not found', 404);
    }

    const recording = create(db.audioRecordings, {
      text_id: text_id || null,
      indian_title,
      chinese_title,
      tibetan_title,
      english_title,
      text_category,
      parent_category_id: parent_category_id || null,
      audio_url,
      duration_seconds,
      file_size_bytes,
      mime_type,
      is_active,
    });

    res.status(201).json({
      id: recording.id,
      created_at: recording.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateAudio = (req, res, next) => {
  try {
    const { id } = req.params;
    const recording = findById(db.audioRecordings, id);

    if (!recording) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Audio recording not found', 404);
    }

    const updateData = {};
    const fields = [
      'text_id', 'indian_title', 'chinese_title', 'tibetan_title', 'english_title',
      'text_category', 'parent_category_id', 'audio_url', 'duration_seconds',
      'file_size_bytes', 'mime_type', 'is_active',
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updated = update(db.audioRecordings, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAudio = (req, res, next) => {
  try {
    const { id } = req.params;
    const recording = findById(db.audioRecordings, id);

    if (!recording) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Audio recording not found', 404);
    }

    remove(db.audioRecordings, id);

    res.json({
      message: 'Audio recording deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAudio,
  getAudioById,
  createAudio,
  updateAudio,
  deleteAudio,
};
