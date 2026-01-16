const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getNews = (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const {
      lang = 'en',
      sort = 'published_at',
      order = 'desc',
    } = req.query;

    let news = db.news.filter(n => n.is_published);

    // Sort
    news.sort((a, b) => {
      const aVal = a[sort] || new Date(0);
      const bVal = b[sort] || new Date(0);
      return order === 'desc'
        ? new Date(bVal) - new Date(aVal)
        : new Date(aVal) - new Date(bVal);
    });

    const { items, pagination } = paginate(news, page, Math.min(limit, 50));

    const formattedNews = items.map(item => ({
      id: item.id,
      title: {
        tibetan: item.tibetan_title,
        english: item.english_title,
      },
      description: {
        tibetan: item.tibetan_description,
        english: item.english_description,
      },
      thumbnail_url: item.thumbnail_url,
      published_at: item.published_at,
      created_at: item.created_at,
    }));

    res.json({
      news: formattedNews,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const getNewsById = (req, res, next) => {
  try {
    const { id } = req.params;
    const { lang = 'en' } = req.query;

    const newsItem = findById(db.news, id);
    if (!newsItem || !newsItem.is_published) {
      throw new AppError('RESOURCE_NOT_FOUND', 'News not found or not published', 404);
    }

    res.json({
      id: newsItem.id,
      title: {
        tibetan: newsItem.tibetan_title,
        english: newsItem.english_title,
      },
      description: {
        tibetan: newsItem.tibetan_description,
        english: newsItem.english_description,
      },
      thumbnail_url: newsItem.thumbnail_url,
      published_at: newsItem.published_at,
      created_at: newsItem.created_at,
      updated_at: newsItem.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const createNews = (req, res, next) => {
  try {
    const {
      tibetan_title,
      english_title,
      tibetan_description,
      english_description,
      thumbnail_url,
      is_published = false,
      published_at,
    } = req.body;

    if (!tibetan_title || !english_title || !tibetan_description || !english_description) {
      throw new AppError('VALIDATION_ERROR', 'All title and description fields are required', 400);
    }

    const newsItem = create(db.news, {
      tibetan_title,
      english_title,
      tibetan_description,
      english_description,
      thumbnail_url,
      is_published,
      published_at: is_published ? (published_at || new Date().toISOString()) : null,
    });

    res.status(201).json({
      id: newsItem.id,
      created_at: newsItem.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateNews = (req, res, next) => {
  try {
    const { id } = req.params;
    const newsItem = findById(db.news, id);

    if (!newsItem) {
      throw new AppError('RESOURCE_NOT_FOUND', 'News not found', 404);
    }

    const updateData = {};
    const {
      tibetan_title,
      english_title,
      tibetan_description,
      english_description,
      thumbnail_url,
      is_published,
      published_at,
    } = req.body;

    if (tibetan_title !== undefined) updateData.tibetan_title = tibetan_title;
    if (english_title !== undefined) updateData.english_title = english_title;
    if (tibetan_description !== undefined) updateData.tibetan_description = tibetan_description;
    if (english_description !== undefined) updateData.english_description = english_description;
    if (thumbnail_url !== undefined) updateData.thumbnail_url = thumbnail_url;
    if (is_published !== undefined) {
      updateData.is_published = is_published;
      if (is_published && !newsItem.published_at) {
        updateData.published_at = published_at || new Date().toISOString();
      }
    }
    if (published_at !== undefined) updateData.published_at = published_at;

    const updated = update(db.news, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNews = (req, res, next) => {
  try {
    const { id } = req.params;
    const newsItem = findById(db.news, id);

    if (!newsItem) {
      throw new AppError('RESOURCE_NOT_FOUND', 'News not found', 404);
    }

    remove(db.news, id);

    res.json({
      message: 'News deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
