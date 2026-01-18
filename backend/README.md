# Digital Kangyur Library - Backend API

Backend API for the Digital Kangyur Library, a multilingual Tibetan Buddhist text library.

## Features

- RESTful API with Express.js
- JWT-based authentication and authorization
- Mock in-memory database (ready for real database integration)
- Swagger/OpenAPI documentation
- Comprehensive error handling
- Pagination support
- Multilingual support (Tibetan, English, Sanskrit, Chinese)

## Getting Started

### Prerequisites

- Node.js 14+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration (optional for development)

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` by default.

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs
- **Health Check**: http://localhost:3000/health
- **API Base**: http://localhost:3000/api/v1

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - Login and get access token
- `POST /api/v1/auth/logout` - Logout (requires authentication)
- `POST /api/v1/auth/refresh` - Refresh access token

### Catalog & Categories
- `GET /api/v1/catalog` - Get catalog structure
- `GET /api/v1/catalog/:id_slug` - Get category by slug
- `POST /api/v1/admin/catalog/categories` - Create category (Admin/Editor)
- `PUT /api/v1/admin/catalog/categories/:id` - Update category (Admin/Editor)
- `DELETE /api/v1/admin/catalog/categories/:id` - Delete category (Admin)

### Texts
- `GET /api/v1/texts` - List texts with pagination
- `GET /api/v1/texts/:id` - Get text details
- `POST /api/v1/admin/texts` - Create text (Admin/Editor)
- `PUT /api/v1/admin/texts/:id` - Update text (Admin/Editor)
- `DELETE /api/v1/admin/texts/:id` - Delete text (Admin)
- `GET /api/v1/texts/:id/sections` - Get text sections
- `POST /api/v1/admin/texts/:id/sections` - Create section (Admin/Editor)
- `PUT /api/v1/admin/texts/:id/sections/:section_id` - Update section (Admin/Editor)
- `DELETE /api/v1/admin/texts/:id/sections/:section_id` - Delete section (Admin/Editor)
- `GET /api/v1/texts/:id/editions` - Get text editions

### News
- `GET /api/v1/news` - List published news
- `GET /api/v1/news/:id` - Get news article
- `POST /api/v1/admin/news` - Create news (Admin/Editor)
- `PUT /api/v1/admin/news/:id` - Update news (Admin/Editor)
- `DELETE /api/v1/admin/news/:id` - Delete news (Admin)

### Timeline
- `GET /api/v1/timeline/periods` - Get timeline periods
- `GET /api/v1/timeline/events` - Get timeline events
- `GET /api/v1/timeline/events/:id` - Get event details
- `POST /api/v1/admin/timeline/events` - Create event (Admin/Editor)
- `PUT /api/v1/admin/timeline/events/:id` - Update event (Admin/Editor)
- `DELETE /api/v1/admin/timeline/events/:id` - Delete event (Admin)

### Audio
- `GET /api/v1/audio` - List audio recordings
- `GET /api/v1/audio/:id` - Get audio recording
- `POST /api/v1/admin/audio` - Create recording (Admin/Editor)
- `PUT /api/v1/admin/audio/:id` - Update recording (Admin/Editor)
- `DELETE /api/v1/admin/audio/:id` - Delete recording (Admin)

### Editions
- `GET /api/v1/editions` - List editions
- `GET /api/v1/editions/:id` - Get edition details
- `POST /api/v1/admin/editions` - Create edition (Admin/Editor)
- `POST /api/v1/admin/texts/:id/editions` - Add edition to text (Admin/Editor)

### Search
- `GET /api/v1/search` - Global search across all content types

### Admin
- `GET /api/v1/admin/dashboard` - Get dashboard statistics (Admin)
- `GET /api/v1/admin/users` - List users (Admin)
- `POST /api/v1/admin/users` - Create user (Admin)
- `PUT /api/v1/admin/users/:id` - Update user (Admin)
- `DELETE /api/v1/admin/users/:id` - Delete user (Admin)

## Authentication

Most endpoints require authentication using JWT Bearer tokens.

**Default Admin Credentials** (for mock database):
- Username: `admin`
- Password: `admin123`

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Example Authenticated Request:**
```bash
curl -X GET http://localhost:3000/api/v1/admin/dashboard \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Project Structure

```
backend/
├── config/           # Configuration files
│   ├── index.js      # Main config
│   └── swagger.js    # Swagger configuration
├── controllers/      # Request handlers
│   ├── adminController.js
│   ├── audioController.js
│   ├── authController.js
│   ├── catalogController.js
│   ├── editionController.js
│   ├── newsController.js
│   ├── searchController.js
│   ├── textController.js
│   └── timelineController.js
├── middleware/       # Express middleware
│   └── auth.js       # Authentication & authorization
├── models/           # Data models
│   └── mockDatabase.js  # In-memory mock database
├── routes/           # Route definitions
│   ├── admin.js
│   ├── audio.js
│   ├── auth.js
│   ├── catalog.js
│   ├── editions.js
│   ├── news.js
│   ├── search.js
│   ├── texts.js
│   └── timeline.js
├── utils/            # Utility functions
│   ├── errors.js     # Error handling
│   ├── jwt.js        # JWT utilities
│   └── pagination.js # Pagination helpers
├── index.js          # Application entry point
├── package.json      # Dependencies
└── README.md         # This file
```

## Mock Database

The backend currently uses an in-memory mock database. This is perfect for development and testing. To integrate with a real database:

1. Replace `models/mockDatabase.js` with your database adapter
2. Update controllers to use the new database interface
3. The interface should maintain the same helper functions (`findById`, `create`, `update`, `remove`, etc.)

## Error Handling

All errors follow a consistent format:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {},
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

## Pagination

List endpoints support pagination:

- `page` (default: 1) - Page number
- `limit` (default: 20, max: 100) - Items per page

Response includes pagination metadata:
```json
{
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

## Development

### Adding New Endpoints

1. Create controller function in `controllers/`
2. Create route in `routes/`
3. Add route to `index.js`
4. Update Swagger documentation

### Testing

Use the Swagger UI at `/api-docs` to test endpoints interactively.

## License

ISC
