const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
const config = require('./index');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digital Kangyur Library API',
      version: '1.0.0',
      description: 'API documentation for Digital Kangyur Library - A multilingual Tibetan Buddhist text library',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `${config.baseUrl}/api/${config.apiVersion}`,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'object',
              properties: {
                code: { type: 'string' },
                message: { type: 'string' },
                details: { type: 'object' },
                timestamp: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
        Pagination: {
          type: 'object',
          properties: {
            page: { type: 'integer' },
            limit: { type: 'integer' },
            total: { type: 'integer' },
            total_pages: { type: 'integer' },
            has_next: { type: 'boolean' },
            has_prev: { type: 'boolean' },
          },
        },
        MultilingualTitle: {
          type: 'object',
          properties: {
            tibetan: { type: 'string' },
            english: { type: 'string' },
            sanskrit: { type: 'string', nullable: true },
            chinese: { type: 'string', nullable: true },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
