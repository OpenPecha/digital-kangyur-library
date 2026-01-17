const bcrypt = require('bcryptjs');
const { userService } = require('../prisma/database');
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
    const user = await userService.findByUsernameOrEmail(loginIdentifier);
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

    const user = await userService.findById(decoded.sub);
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

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new AppError('VALIDATION_ERROR', 'Username, email, and password are required', 400);
    }

    // Password validation
    if (password.length < 6) {
      throw new AppError('VALIDATION_ERROR', 'Password must be at least 6 characters long', 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new AppError('VALIDATION_ERROR', 'Invalid email format', 400);
    }

    // Check if username or email already exists
    const existingUser = await userService.findByUsernameOrEmail(username);
    if (existingUser) {
      throw new AppError('DUPLICATE_RESOURCE', 'Username already exists', 409);
    }

    const existingEmail = await userService.findByEmail(email);
    if (existingEmail) {
      throw new AppError('DUPLICATE_RESOURCE', 'Email already exists', 409);
    }

    const password_hash = await bcrypt.hash(password, 10);

    // Default role is 'viewer' (not admin) for public registration
    const user = await userService.create({
      username,
      email,
      password_hash,
      role: 'viewer',
      is_active: true,
    });

    // Automatically log in the newly registered user
    const access_token = generateToken(user);
    const refresh_token = generateRefreshToken(user);

    res.status(201).json({
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

module.exports = {
  login,
  logout,
  refresh,
  register,
};
