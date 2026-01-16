const bcrypt = require('bcryptjs');
const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const getDashboard = (req, res, next) => {
  try {
    const statistics = {
      total_texts: db.texts.length,
      total_categories: db.catalogCategories.length,
      total_news: db.news.length,
      total_timeline_events: db.timelineEvents.length,
      total_audio_recordings: db.audioRecordings.length,
      total_editions: db.editions.length,
      recent_activity: [],
    };

    // Get recent activity (last 10 items)
    const activities = [];
    
    // Recent texts
    db.texts.slice(-5).forEach(text => {
      activities.push({
        type: 'text_created',
        id: text.id,
        title: text.english_title,
        created_at: text.created_at,
      });
    });

    // Recent news
    db.news.slice(-3).forEach(news => {
      activities.push({
        type: 'news_created',
        id: news.id,
        title: news.english_title,
        created_at: news.created_at,
      });
    });

    // Sort by created_at descending
    activities.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    statistics.recent_activity = activities.slice(0, 10);

    res.json({
      statistics,
    });
  } catch (error) {
    next(error);
  }
};

const getUsers = (req, res, next) => {
  try {
    const { page, limit } = parsePaginationParams(req);
    const { role, is_active } = req.query;

    let users = [...db.users];

    if (role) {
      users = users.filter(u => u.role === role);
    }

    if (is_active !== undefined) {
      const active = is_active === 'true';
      users = users.filter(u => u.is_active === active);
    }

    const { items, pagination } = paginate(users, page, limit);

    const formattedUsers = items.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      is_active: user.is_active,
      created_at: user.created_at,
    }));

    res.json({
      users: formattedUsers,
      pagination,
    });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { username, email, password, role = 'viewer' } = req.body;

    if (!username || !email || !password) {
      throw new AppError('VALIDATION_ERROR', 'username, email, and password are required', 400);
    }

    if (!['admin', 'editor', 'viewer'].includes(role)) {
      throw new AppError('VALIDATION_ERROR', 'Invalid role', 400);
    }

    // Check if username or email already exists
    if (db.users.some(u => u.username === username)) {
      throw new AppError('DUPLICATE_RESOURCE', 'Username already exists', 409);
    }

    if (db.users.some(u => u.email === email)) {
      throw new AppError('DUPLICATE_RESOURCE', 'Email already exists', 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    const user = create(db.users, {
      username,
      email,
      password_hash,
      role,
      is_active: true,
    });

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const user = findById(db.users, id);

    if (!user) {
      throw new AppError('RESOURCE_NOT_FOUND', 'User not found', 404);
    }

    const updateData = {};
    const { email, role, is_active } = req.body;

    if (email !== undefined) {
      // Check if email already exists for another user
      if (db.users.some(u => u.email === email && u.id !== id)) {
        throw new AppError('DUPLICATE_RESOURCE', 'Email already exists', 409);
      }
      updateData.email = email;
    }

    if (role !== undefined) {
      if (!['admin', 'editor', 'viewer'].includes(role)) {
        throw new AppError('VALIDATION_ERROR', 'Invalid role', 400);
      }
      updateData.role = role;
    }

    if (is_active !== undefined) {
      updateData.is_active = is_active;
    }

    const updated = update(db.users, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = (req, res, next) => {
  try {
    const { id } = req.params;
    const user = findById(db.users, id);

    if (!user) {
      throw new AppError('RESOURCE_NOT_FOUND', 'User not found', 404);
    }

    // Prevent deleting yourself
    if (user.id === req.user.sub) {
      throw new AppError('VALIDATION_ERROR', 'Cannot delete your own account', 400);
    }

    remove(db.users, id);

    res.json({
      message: 'User deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboard,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
