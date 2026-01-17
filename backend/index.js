const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const config = require('./config');
// Database initialization is handled by Prisma
const { errorHandler, notFoundHandler } = require('./utils/errors');

// Import routes
const authRoutes = require('./routes/auth');
const catalogRoutes = require('./routes/catalog');
const textRoutes = require('./routes/texts');
const newsRoutes = require('./routes/news');
const timelineRoutes = require('./routes/timeline');
const audioRoutes = require('./routes/audio');
const videoRoutes = require('./routes/videos');
const editionRoutes = require('./routes/editions');
const searchRoutes = require('./routes/search');
const adminRoutes = require('./routes/admin');
const karchagRoutes = require('./routes/karchag');

const app = express();

// Middleware
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Digital Kangyur Library API Documentation',
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
const apiBase = `/api/${config.apiVersion}`;
app.use(`${apiBase}/auth`, authRoutes);
app.use(`${apiBase}/catalog`, catalogRoutes);
app.use(`${apiBase}/texts`, textRoutes);
app.use(`${apiBase}/news`, newsRoutes);
app.use(`${apiBase}/timeline`, timelineRoutes);
app.use(`${apiBase}/audio`, audioRoutes);
app.use(`${apiBase}/videos`, videoRoutes);
app.use(`${apiBase}/editions`, editionRoutes);
app.use(`${apiBase}/search`, searchRoutes);
app.use(`${apiBase}/admin`, adminRoutes);
app.use(`${apiBase}/karchag`, karchagRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Digital Kangyur Library API',
    version: config.apiVersion,
    documentation: '/api-docs',
    health: '/health',
  });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
      console.log(`API Documentation: http://localhost:${config.port}/api-docs`);
      console.log(`Health Check: http://localhost:${config.port}/health`);
      console.log(`API Base URL: http://localhost:${config.port}${apiBase}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
