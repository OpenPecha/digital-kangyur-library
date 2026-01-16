const bcrypt = require('bcryptjs');
const { db, findById } = require('../models/mockDatabase');
const { generateToken, generateRefreshToken, verifyToken } = require('../utils/jwt');
const { AppError } = require('../utils/errors');

const login = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Support both username and email login
    const loginIdentifier = username || email;
    if (!loginIdentifier || !password) {
      throw new AppError('VALIDATION_ERROR', 'Username/email and password are required', 400);
    }

    // Find user by username or email
    const user = db.users.find(u => 
      (u.username === loginIdentifier || u.email === loginIdentifier) && u.is_active
    );
    if (!user) {
      throw new AppError('AUTHENTICATION_REQUIRED', 'Invalid credentials', 401);
    }

    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('AUTHENTICATION_REQUIRED', 'Invalid credentials', 401);
    }

    const access_token = generateToken(user);
    const refresh_token = generateRefreshToken(user);

    res.json({
      access_token,
      refresh_token,
      token_type: 'Bearer',
      expires_in: 3600,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    // In a real implementation, you would invalidate the token
    // For mock, we just return success
    res.json({
      message: 'Successfully logged out',
    });
  } catch (error) {
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      throw new AppError('VALIDATION_ERROR', 'Refresh token is required', 400);
    }

    const decoded = verifyToken(refresh_token);
    if (decoded.type !== 'refresh') {
      throw new AppError('AUTHENTICATION_REQUIRED', 'Invalid refresh token', 401);
    }

    const user = findById(db.users, decoded.sub);
    if (!user || !user.is_active) {
      throw new AppError('AUTHENTICATION_REQUIRED', 'User not found or inactive', 401);
    }

    const access_token = generateToken(user);

    res.json({
      access_token,
      token_type: 'Bearer',
      expires_in: 3600,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  logout,
  refresh,
};
