const jwt = require('jsonwebtoken');
const config = require('../config');

const generateToken = (user) => {
  const payload = {
    sub: user.id,
    username: user.username,
    role: user.role,
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiration,
  });
};

const generateRefreshToken = (user) => {
  const payload = {
    sub: user.id,
    type: 'refresh',
  };

  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtRefreshExpiration,
  });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
