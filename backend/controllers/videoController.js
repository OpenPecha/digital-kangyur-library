const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getVideos = (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const {
      search,
      lang = 'en',
      is_active = 'true',
    } = req.query;

    let videos = [...db.videos];

    if (is_active === 'true') {
      videos = videos.filter(v => v.is_active);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      videos = videos.filter(v =>
        v.tibetan_title?.toLowerCase().includes(searchLower) ||
        v.english_title?.toLowerCase().includes(searchLower) ||
        v.tibetan_description?.toLowerCase().includes(searchLower) ||
        v.english_description?.toLowerCase().includes(searchLower)
      );
    }

    const { items, pagination } = paginate(videos, page, limit);

    const formattedVideos = items.map(video => ({
      id: video.id,
      title: {
        tibetan: video.tibetan_title,
        english: video.english_title,
      },
      description: {
        tibetan: video.tibetan_description,
        english: video.english_description,
      },
      video_link: video.video_link,
      thumbnail_url: video.thumbnail_url,
      is_active: video.is_active,
      created_at: video.created_at,
    }));

    res.json({
      videos: formattedVideos,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getVideoById = (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = 'en' } = req.query;

    const video = findById(db.videos, id);
    if (!video) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Video not found', 404);
    }

    res.json({
      id: video.id,
      title: {
        tibetan: video.tibetan_title,
        english: video.english_title,
      },
      description: {
        tibetan: video.tibetan_description,
        english: video.english_description,
      },
      video_link: video.video_link,
      thumbnail_url: video.thumbnail_url,
      is_active: video.is_active,
      created_at: video.created_at,
      updated_at: video.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const createVideo = (req, res, next) => {
  try {
    const {
      tibetan_title,
      english_title,
      tibetan_description,
      english_description,
      video_link,
      thumbnail_url,
      is_active = true,
    } = req.body;

    if (!tibetan_title || !english_title || !video_link) {
      throw new AppError('VALIDATION_ERROR', 'tibetan_title, english_title, and video_link are required', 400);
    }

    const video = create(db.videos, {
      tibetan_title,
      english_title,
      tibetan_description: tibetan_description || '',
      english_description: english_description || '',
      video_link,
      thumbnail_url: thumbnail_url || null,
      is_active,
    });

    res.status(201).json({
      id: video.id,
      created_at: video.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateVideo = (req, res, next) => {
  try {
    const { id } = req.params;
    const video = findById(db.videos, id);

    if (!video) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Video not found', 404);
    }

    const updateData = {};
    const fields = [
      'tibetan_title', 'english_title', 'tibetan_description', 'english_description',
      'video_link', 'thumbnail_url', 'is_active',
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updated = update(db.videos, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVideo = (req, res, next) => {
  try {
    const { id } = req.params;
    const video = findById(db.videos, id);

    if (!video) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Video not found', 404);
    }

    remove(db.videos, id);

    res.json({
      message: 'Video deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getVideos,
  getVideoById,
  createVideo,
  updateVideo,
  deleteVideo,
};
