require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  jwtExpiration: process.env.JWT_EXPIRATION || '1h',
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || '7d',
  apiVersion: 'v1',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  corsOrigin: process.env.CORS_ORIGIN || '*',
};
