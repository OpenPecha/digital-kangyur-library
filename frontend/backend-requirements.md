# Digital Kangyur Library - Backend Requirements

This document defines the complete backend requirements for the Digital Kangyur Library, including database schema and API endpoint specifications.

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Database Schema](#database-schema)
4. [Authentication & Authorization](#authentication--authorization)
5. [Error Handling](#error-handling)
6. [Pagination & Filtering](#pagination--filtering)
7. [File Uploads](#file-uploads)

---

## Overview

The Digital Kangyur Library backend supports a multilingual Tibetan Buddhist text library with:
- Hierarchical catalog structure
- Multiple text editions (Derge, Pedurma, Lhasa, etc.)
- Multilingual content (Tibetan, English, Sanskrit, Chinese)
- Timeline events and historical periods
- News and announcements
- Audio recordings
- Rich text metadata and content sections
- Admin management interface

**Base URL:** `https://api.digital-kangyur-library.org/api/v1`

**API Version:** `v1`

**Content Type:** `application/json`

**Character Encoding:** `UTF-8`

---

## API Endpoints

### Authentication Endpoints

#### POST `/auth/login`
Authenticate user and receive access token.

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response (200 OK):**
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": 3600,
  "user": {
    "id": "uuid",
    "username": "string",
    "email": "string",
    "role": "admin|editor|viewer"
  }
}
```

**Error Responses:**
- `401 Unauthorized` - Invalid credentials
- `400 Bad Request` - Missing required fields

**Requirements:**
- Use secure password hashing (bcrypt, argon2)
- Token expiration: 1 hour (configurable)
- Return user role for authorization checks

---

#### POST `/auth/logout`
Invalidate current access token.

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

---

#### POST `/auth/refresh`
Refresh access token using refresh token.

**Request Body:**
```json
{
  "refresh_token": "string"
}
```

**Response (200 OK):**
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": 3600
}
```

---

### Catalog & Categories Endpoints

#### GET `/catalog`
Get hierarchical catalog structure.

**Query Parameters:**
- `lang` (optional): `en|bod` - Language preference (default: `en`)
- `include_counts` (optional): `true|false` - Include text counts (default: `true`)
- `active_only` (optional): `true|false` - Only active categories (default: `true`)

**Response (200 OK):**
```json
{
  "categories": [
    {
      "id": "uuid",
      "id_slug": "discourses",
      "title": {
        "tibetan": "མདོ།",
        "english": "Discourses"
      },
      "description": "string",
      "count": 375,
      "children": [
        {
          "id": "uuid",
          "id_slug": "discipline",
          "title": {
            "tibetan": "འདུལ་བ།",
            "english": "Discipline"
          },
          "description": "string",
          "count": 13,
          "children": []
        }
      ]
    }
  ]
}
```

**Requirements:**
- Return hierarchical structure with nested children
- Respect `lang` parameter for title ordering
- Include counts when `include_counts=true`
- Filter inactive categories when `active_only=true`

---

#### GET `/catalog/:id_slug`
Get specific category by slug.

**Path Parameters:**
- `id_slug`: Category slug (e.g., `discourses`, `prajnaparamita`)

**Query Parameters:**
- `lang` (optional): `en|bod`
- `include_children` (optional): `true|false` (default: `true`)
- `include_texts` (optional): `true|false` (default: `false`)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "id_slug": "discourses",
  "parent_id": null,
  "title": {
    "tibetan": "མདོ།",
    "english": "Discourses"
  },
  "description": "string",
  "count": 375,
  "children": [],
  "texts": []
}
```

**Error Responses:**
- `404 Not Found` - Category not found

---

#### POST `/admin/catalog/categories` (Admin/Editor)
Create new category.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "parent_id": "uuid|null",
  "id_slug": "string",
  "title_tibetan": "string",
  "title_english": "string",
  "description": "string",
  "order_index": 0,
  "is_active": true
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "id_slug": "string",
  "title": {
    "tibetan": "string",
    "english": "string"
  },
  "description": "string",
  "count": 0,
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `409 Conflict` - Slug already exists
- `403 Forbidden` - Insufficient permissions

---

#### PUT `/admin/catalog/categories/:id` (Admin/Editor)
Update category.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Category UUID

**Request Body:** (all fields optional)
```json
{
  "title_tibetan": "string",
  "title_english": "string",
  "description": "string",
  "order_index": 0,
  "is_active": true
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/catalog/categories/:id` (Admin)
Delete category.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Category UUID

**Response (200 OK):**
```json
{
  "message": "Category deleted successfully"
}
```

**Error Responses:**
- `409 Conflict` - Category has texts or children

---

### Text Endpoints

#### GET `/texts`
Get list of texts with pagination and filtering.

**Query Parameters:**
- `page` (optional): Integer - Page number (default: `1`)
- `limit` (optional): Integer - Items per page (default: `20`, max: `100`)
- `category_id` (optional): UUID - Filter by category
- `parent_category_id` (optional): UUID - Filter by parent category
- `search` (optional): String - Search in titles (Tibetan/English)
- `lang` (optional): `en|bod` - Language preference
- `is_active` (optional): `true|false` (default: `true`)
- `sort` (optional): `created_at|updated_at|title|order_index` (default: `order_index`)
- `order` (optional): `asc|desc` (default: `asc`)

**Response (200 OK):**
```json
{
  "texts": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "title": {
        "tibetan": "string",
        "english": "string",
        "sanskrit": "string",
        "chinese": "string"
      },
      "derge_text_id": "string",
      "yeshe_text_id": "string",
      "turning": "string",
      "vehicle": "string",
      "summary": "string",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

**Requirements:**
- Support full-text search on Tibetan and English titles
- Filter by category hierarchy
- Pagination required for large result sets
- Sort by multiple fields

---

#### GET `/texts/:id`
Get detailed text information.

**Path Parameters:**
- `id`: Text UUID or slug

**Query Parameters:**
- `lang` (optional): `en|bod`
- `include_sections` (optional): `true|false` (default: `true`)
- `include_collated` (optional): `true|false` (default: `false`)
- `include_metadata` (optional): `true|false` (default: `true`)
- `include_editions` (optional): `true|false` (default: `true`)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "category_id": "uuid",
  "title": {
    "tibetan": "string",
    "english": "string",
    "sanskrit": "string",
    "chinese": "string"
  },
  "catalog_identifiers": {
    "derge_text_id": "string",
    "yeshe_text_id": "string",
    "derge_vol_number": "string",
    "derge_start_page": "string",
    "derge_end_page": "string"
  },
  "content_classification": {
    "turning": "string",
    "vehicle": "string",
    "translation_type": "string"
  },
  "sections": [
    {
      "id": "uuid",
      "section_type": "translation-homage",
      "title": {
        "tibetan": "string",
        "english": "string"
      },
      "content": {
        "tibetan": "string",
        "english": "string"
      },
      "order_index": 0
    }
  ],
  "collated_content": {
    "collated_text": "string",
    "english_translation": "string"
  },
  "metadata": [
    {
      "key": "tibetan-title",
      "value": "string",
      "group": "titles",
      "label": "Tibetan Title"
    }
  ],
  "editions": [
    {
      "edition_id": "uuid",
      "edition_name": "string",
      "source_id": "string",
      "volume_number": "string",
      "start_page": "string",
      "end_page": "string",
      "availability": "string",
      "link_url": "string"
    }
  ],
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Error Responses:**
- `404 Not Found` - Text not found

---

#### POST `/admin/texts` (Admin/Editor)
Create new text.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "category_id": "uuid",
  "parent_category_id": "uuid",
  "title": {
    "tibetan": "string",
    "english": "string",
    "sanskrit": "string",
    "chinese": "string"
  },
  "catalog_identifiers": {
    "derge_text_id": "string",
    "yeshe_text_id": "string",
    "derge_vol_number": "string",
    "derge_start_page": "string",
    "derge_end_page": "string"
  },
  "content_classification": {
    "turning": "string",
    "vehicle": "string",
    "translation_type": "string"
  },
  "summary": "string",
  "keywords": ["string"],
  "is_active": true,
  "order_index": 0
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

**Error Responses:**
- `400 Bad Request` - Validation error
- `409 Conflict` - Catalog ID already exists

---

#### PUT `/admin/texts/:id` (Admin/Editor)
Update text.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID

**Request Body:** (all fields optional)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/texts/:id` (Admin)
Delete text.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID

**Response (200 OK):**
```json
{
  "message": "Text deleted successfully"
}
```

---

#### GET `/texts/:id/sections`
Get text sections.

**Path Parameters:**
- `id`: Text UUID

**Query Parameters:**
- `section_type` (optional): Filter by section type
- `lang` (optional): `en|bod`

**Response (200 OK):**
```json
{
  "sections": [
    {
      "id": "uuid",
      "section_type": "translation-homage",
      "title": {
        "tibetan": "string",
        "english": "string"
      },
      "content": {
        "tibetan": "string",
        "english": "string"
      },
      "order_index": 0
    }
  ]
}
```

---

#### POST `/admin/texts/:id/sections` (Admin/Editor)
Create text section.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID

**Request Body:**
```json
{
  "section_type": "translation-homage|purpose|summary|word-meaning|connection|questions-answers|colophon",
  "title_tibetan": "string",
  "title_english": "string",
  "content_tibetan": "string",
  "content_english": "string",
  "order_index": 0
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "section_type": "string",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT `/admin/texts/:id/sections/:section_id` (Admin/Editor)
Update text section.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID
- `section_id`: Section UUID

**Request Body:** (all fields optional)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/texts/:id/sections/:section_id` (Admin/Editor)
Delete text section.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID
- `section_id`: Section UUID

**Response (200 OK):**
```json
{
  "message": "Section deleted successfully"
}
```

---

### News Endpoints

#### GET `/news`
Get published news articles.

**Query Parameters:**
- `page` (optional): Integer (default: `1`)
- `limit` (optional): Integer (default: `10`, max: `50`)
- `lang` (optional): `en|bod` (default: `en`)
- `sort` (optional): `published_at|created_at` (default: `published_at`)
- `order` (optional): `asc|desc` (default: `desc`)

**Response (200 OK):**
```json
{
  "news": [
    {
      "id": "uuid",
      "title": {
        "tibetan": "string",
        "english": "string"
      },
      "description": {
        "tibetan": "string",
        "english": "string"
      },
      "thumbnail_url": "string",
      "published_at": "2024-01-01T00:00:00Z",
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 50,
    "total_pages": 5
  }
}
```

**Requirements:**
- Only return published news (`is_published=true`)
- Sort by `published_at` descending by default

---

#### GET `/news/:id`
Get specific news article.

**Path Parameters:**
- `id`: News UUID

**Query Parameters:**
- `lang` (optional): `en|bod`

**Response (200 OK):**
```json
{
  "id": "uuid",
  "title": {
    "tibetan": "string",
    "english": "string"
  },
  "description": {
    "tibetan": "string",
    "english": "string"
  },
  "thumbnail_url": "string",
  "published_at": "2024-01-01T00:00:00Z",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

**Error Responses:**
- `404 Not Found` - News not found or not published

---

#### POST `/admin/news` (Admin/Editor)
Create news article.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "tibetan_title": "string",
  "english_title": "string",
  "tibetan_description": "string",
  "english_description": "string",
  "thumbnail_url": "string",
  "is_published": false,
  "published_at": "2024-01-01T00:00:00Z"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT `/admin/news/:id` (Admin/Editor)
Update news article.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: News UUID

**Request Body:** (all fields optional)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/news/:id` (Admin)
Delete news article.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: News UUID

**Response (200 OK):**
```json
{
  "message": "News deleted successfully"
}
```

---

### Timeline Endpoints

#### GET `/timeline/periods`
Get timeline periods.

**Query Parameters:**
- `lang` (optional): `en|bod`
- `include_events` (optional): `true|false` (default: `false`)

**Response (200 OK):**
```json
{
  "periods": [
    {
      "id": "uuid",
      "id_slug": "string",
      "name": {
        "tibetan": "string",
        "english": "string"
      },
      "description": "string",
      "start_year": -500,
      "end_year": 1000,
      "events": []
    }
  ]
}
```

---

#### GET `/timeline/events`
Get timeline events.

**Query Parameters:**
- `period_id` (optional): UUID - Filter by period
- `category` (optional): `translation|compilation|publication|discovery|transmission|scholarship`
- `significance` (optional): `major|important|minor`
- `year_from` (optional): Integer - Start year filter
- `year_to` (optional): Integer - End year filter
- `lang` (optional): `en|bod`
- `include_figures` (optional): `true|false` (default: `false`)
- `include_sources` (optional): `true|false` (default: `false`)
- `include_relations` (optional): `true|false` (default: `false`)
- `sort` (optional): `year|significance|order_index` (default: `year`)
- `order` (optional): `asc|desc` (default: `asc`)

**Response (200 OK):**
```json
{
  "events": [
    {
      "id": "uuid",
      "period_id": "uuid",
      "title": {
        "tibetan": "string",
        "english": "string",
        "sanskrit": "string"
      },
      "description": {
        "tibetan": "string",
        "english": "string"
      },
      "category": "translation",
      "year": 800,
      "century": "8th",
      "era": "CE",
      "is_approximate": false,
      "location": {
        "tibetan": "string",
        "english": "string"
      },
      "significance": "major",
      "figures": [],
      "sources": [],
      "related_events": []
    }
  ]
}
```

---

#### GET `/timeline/events/:id`
Get specific timeline event.

**Path Parameters:**
- `id`: Event UUID

**Query Parameters:**
- `lang` (optional): `en|bod`
- `include_figures` (optional): `true|false` (default: `true`)
- `include_sources` (optional): `true|false` (default: `true`)
- `include_relations` (optional): `true|false` (default: `true`)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "period_id": "uuid",
  "title": {
    "tibetan": "string",
    "english": "string",
    "sanskrit": "string"
  },
  "description": {
    "tibetan": "string",
    "english": "string"
  },
  "category": "translation",
  "year": 800,
  "century": "8th",
  "era": "CE",
  "is_approximate": false,
  "location": {
    "tibetan": "string",
    "english": "string"
  },
  "significance": "major",
  "figures": [
    {
      "id": "uuid",
      "name": {
        "tibetan": "string",
        "english": "string"
      },
      "role": "string",
      "order_index": 0
    }
  ],
  "sources": [
    {
      "id": "uuid",
      "source_text": "string",
      "source_url": "string",
      "order_index": 0
    }
  ],
  "related_events": [
    {
      "event_id": "uuid",
      "relation_type": "precedes"
    }
  ]
}
```

---

#### POST `/admin/timeline/events` (Admin/Editor)
Create timeline event.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "period_id": "uuid",
  "title_tibetan": "string",
  "title_english": "string",
  "title_sanskrit": "string",
  "description_tibetan": "string",
  "description_english": "string",
  "category": "translation",
  "year": 800,
  "century": "8th",
  "era": "CE",
  "is_approximate": false,
  "location_tibetan": "string",
  "location_english": "string",
  "significance": "major",
  "order_index": 0,
  "figures": [
    {
      "name_tibetan": "string",
      "name_english": "string",
      "role": "string",
      "order_index": 0
    }
  ],
  "sources": [
    {
      "source_text": "string",
      "source_url": "string",
      "order_index": 0
    }
  ]
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT `/admin/timeline/events/:id` (Admin/Editor)
Update timeline event.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Event UUID

**Request Body:** (all fields optional)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/timeline/events/:id` (Admin)
Delete timeline event.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Event UUID

**Response (200 OK):**
```json
{
  "message": "Event deleted successfully"
}
```

---

### Audio Endpoints

#### GET `/audio`
Get audio recordings.

**Query Parameters:**
- `page` (optional): Integer (default: `1`)
- `limit` (optional): Integer (default: `20`, max: `100`)
- `text_id` (optional): UUID - Filter by text
- `category_id` (optional): UUID - Filter by category
- `search` (optional): String - Search in titles
- `lang` (optional): `en|bod`
- `is_active` (optional): `true|false` (default: `true`)

**Response (200 OK):**
```json
{
  "recordings": [
    {
      "id": "uuid",
      "text_id": "uuid",
      "title": {
        "tibetan": "string",
        "english": "string",
        "indian": "string",
        "chinese": "string"
      },
      "audio_url": "string",
      "duration_seconds": 3600,
      "file_size_bytes": 10485760,
      "mime_type": "audio/mpeg",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "total_pages": 5
  }
}
```

---

#### GET `/audio/:id`
Get specific audio recording.

**Path Parameters:**
- `id`: Audio UUID

**Query Parameters:**
- `lang` (optional): `en|bod`

**Response (200 OK):**
```json
{
  "id": "uuid",
  "text_id": "uuid",
  "title": {
    "tibetan": "string",
    "english": "string",
    "indian": "string",
    "chinese": "string"
  },
  "text_category": "string",
  "parent_category_id": "uuid",
  "audio_url": "string",
  "duration_seconds": 3600,
  "file_size_bytes": 10485760,
  "mime_type": "audio/mpeg",
  "is_active": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### POST `/admin/audio` (Admin/Editor)
Create audio recording.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "text_id": "uuid",
  "indian_title": "string",
  "chinese_title": "string",
  "tibetan_title": "string",
  "english_title": "string",
  "text_category": "string",
  "parent_category_id": "uuid",
  "audio_url": "string",
  "duration_seconds": 3600,
  "file_size_bytes": 10485760,
  "mime_type": "audio/mpeg",
  "is_active": true
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT `/admin/audio/:id` (Admin/Editor)
Update audio recording.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Audio UUID

**Request Body:** (all fields optional)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/audio/:id` (Admin)
Delete audio recording.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Audio UUID

**Response (200 OK):**
```json
{
  "message": "Audio recording deleted successfully"
}
```

---

### Edition Endpoints

#### GET `/editions`
Get all editions.

**Query Parameters:**
- `is_active` (optional): `true|false` (default: `true`)
- `lang` (optional): `en|bod`

**Response (200 OK):**
```json
{
  "editions": [
    {
      "id": "uuid",
      "name": {
        "english": "Derge Kangyur",
        "tibetan": "སྡེ་དགེ་བཀའ་འགྱུར།"
      },
      "description": {
        "english": "string",
        "tibetan": "string"
      },
      "year": "1733",
      "location": "Derge, Kham",
      "total_volumes": 103,
      "total_texts": 1108,
      "is_active": true
    }
  ]
}
```

---

#### GET `/editions/:id`
Get specific edition.

**Path Parameters:**
- `id`: Edition UUID

**Query Parameters:**
- `lang` (optional): `en|bod`
- `include_texts` (optional): `true|false` (default: `false`)

**Response (200 OK):**
```json
{
  "id": "uuid",
  "name": {
    "english": "Derge Kangyur",
    "tibetan": "སྡེ་དགེ་བཀའ་འགྱུར།"
  },
  "description": {
    "english": "string",
    "tibetan": "string"
  },
  "year": "1733",
  "location": "Derge, Kham",
  "total_volumes": 103,
  "total_texts": 1108,
  "is_active": true,
  "texts": []
}
```

---

#### GET `/texts/:id/editions`
Get editions for a specific text.

**Path Parameters:**
- `id`: Text UUID

**Response (200 OK):**
```json
{
  "editions": [
    {
      "id": "uuid",
      "edition_id": "uuid",
      "edition_name": {
        "english": "Derge Kangyur",
        "tibetan": "སྡེ་དགེ་བཀའ་འགྱུར།"
      },
      "source_id": "Toh 123",
      "volume_number": "12",
      "start_page": "125b",
      "end_page": "140a",
      "availability": "Public Domain",
      "link_url": "https://example.com/derge"
    }
  ]
}
```

---

#### POST `/admin/editions` (Admin/Editor)
Create edition.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "name_english": "string",
  "name_tibetan": "string",
  "description_english": "string",
  "description_tibetan": "string",
  "year": "string",
  "location": "string",
  "total_volumes": 0,
  "total_texts": 0,
  "is_active": true
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### POST `/admin/texts/:id/editions` (Admin/Editor)
Add edition to text.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: Text UUID

**Request Body:**
```json
{
  "edition_id": "uuid",
  "source_id": "string",
  "volume_number": "string",
  "start_page": "string",
  "end_page": "string",
  "availability": "string",
  "link_url": "string"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

### Search Endpoints

#### GET `/search`
Global search across texts, news, timeline events, and audio.

**Query Parameters:**
- `q` (required): String - Search query
- `type` (optional): `texts|news|timeline|audio|all` (default: `all`)
- `lang` (optional): `en|bod` - Language preference
- `page` (optional): Integer (default: `1`)
- `limit` (optional): Integer (default: `20`, max: `100`)

**Response (200 OK):**
```json
{
  "query": "string",
  "results": {
    "texts": {
      "items": [],
      "total": 0
    },
    "news": {
      "items": [],
      "total": 0
    },
    "timeline": {
      "items": [],
      "total": 0
    },
    "audio": {
      "items": [],
      "total": 0
    }
  },
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 0,
    "total_pages": 0
  }
}
```

**Requirements:**
- Full-text search on Tibetan and English content
- Support fuzzy matching
- Return results grouped by type
- Highlight matching terms in results

---

### Admin Endpoints

#### GET `/admin/dashboard` (Admin)
Get admin dashboard statistics.

**Headers:**
- `Authorization: Bearer <token>`

**Response (200 OK):**
```json
{
  "statistics": {
    "total_texts": 1000,
    "total_categories": 50,
    "total_news": 25,
    "total_timeline_events": 100,
    "total_audio_recordings": 200,
    "total_editions": 5,
    "recent_activity": [
      {
        "type": "text_created",
        "id": "uuid",
        "title": "string",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ]
  }
}
```

---

#### GET `/admin/users` (Admin)
Get list of users.

**Headers:**
- `Authorization: Bearer <token>`

**Query Parameters:**
- `page` (optional): Integer (default: `1`)
- `limit` (optional): Integer (default: `20`)
- `role` (optional): `admin|editor|viewer`
- `is_active` (optional): `true|false`

**Response (200 OK):**
```json
{
  "users": [
    {
      "id": "uuid",
      "username": "string",
      "email": "string",
      "role": "admin",
      "is_active": true,
      "created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 10,
    "total_pages": 1
  }
}
```

---

#### POST `/admin/users` (Admin)
Create user.

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "admin|editor|viewer"
}
```

**Response (201 Created):**
```json
{
  "id": "uuid",
  "username": "string",
  "email": "string",
  "role": "admin",
  "created_at": "2024-01-01T00:00:00Z"
}
```

---

#### PUT `/admin/users/:id` (Admin)
Update user.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: User UUID

**Request Body:** (all fields optional)
```json
{
  "email": "string",
  "role": "admin|editor|viewer",
  "is_active": true
}
```

**Response (200 OK):**
```json
{
  "id": "uuid",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

#### DELETE `/admin/users/:id` (Admin)
Delete user.

**Headers:**
- `Authorization: Bearer <token>`

**Path Parameters:**
- `id`: User UUID

**Response (200 OK):**
```json
{
  "message": "User deleted successfully"
}
```

---

## Authentication & Authorization

### Authentication Methods

1. **Bearer Token Authentication:**
   - Use JWT (JSON Web Tokens) for API authentication
   - Token in `Authorization` header: `Bearer <token>`
   - Token expiration: 1 hour (configurable)
   - Refresh token expiration: 7 days (configurable)

2. **Token Structure:**
   ```json
   {
     "sub": "user_uuid",
     "username": "string",
     "role": "admin|editor|viewer",
     "iat": 1234567890,
     "exp": 1234571490
   }
   ```

### Authorization Roles

1. **Admin:**
   - Full access to all endpoints
   - Can create, update, delete all resources
   - Can manage users

2. **Editor:**
   - Can create, update content (texts, news, timeline, audio)
   - Cannot delete resources
   - Cannot manage users

3. **Viewer:**
   - Read-only access
   - Cannot modify any resources

### Protected Endpoints

All `/admin/*` endpoints require authentication and appropriate role:
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions

---

## Error Handling

### Standard Error Response Format

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

### HTTP Status Codes

- `200 OK` - Successful GET, PUT request
- `201 Created` - Successful POST request
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., duplicate slug)
- `422 Unprocessable Entity` - Validation error
- `500 Internal Server Error` - Server error

### Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_REQUIRED` - Missing or invalid token
- `INSUFFICIENT_PERMISSIONS` - User lacks required role
- `RESOURCE_NOT_FOUND` - Requested resource doesn't exist
- `DUPLICATE_RESOURCE` - Resource already exists
- `INVALID_CATEGORY` - Invalid category reference
- `INVALID_EDITION` - Invalid edition reference
- `DATABASE_ERROR` - Database operation failed

---

## Pagination & Filtering

### Pagination

All list endpoints support pagination:

**Query Parameters:**
- `page`: Page number (default: `1`, min: `1`)
- `limit`: Items per page (default: `20`, max: `100`)

**Response Format:**
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

### Filtering

Common filter parameters:
- `is_active`: Filter active/inactive resources
- `category_id`: Filter by category
- `lang`: Language preference (`en|bod`)
- `search`: Full-text search query
- Date ranges: `created_from`, `created_to`, `updated_from`, `updated_to`

### Sorting

**Query Parameters:**
- `sort`: Field to sort by (varies by endpoint)
- `order`: `asc|desc` (default: `asc`)

**Common Sort Fields:**
- `created_at` - Creation timestamp
- `updated_at` - Update timestamp
- `order_index` - Display order
- `title` - Alphabetical by title
- `year` - For timeline events

---

## File Uploads

### Supported File Types

1. **Images:**
   - Formats: JPEG, PNG, WebP
   - Max size: 5MB
   - Use for: News thumbnails, text images

2. **Audio:**
   - Formats: MP3, WAV, OGG
   - Max size: 100MB
   - Use for: Audio recordings

3. **PDFs:**
   - Format: PDF
   - Max size: 50MB
   - Use for: Text PDFs

### Upload Endpoints

#### POST `/admin/upload/image` (Admin/Editor)
Upload image file.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:**
- `file`: Image file (multipart/form-data)

**Response (200 OK):**
```json
{
  "url": "https://cdn.example.com/uploads/image.jpg",
  "filename": "image.jpg",
  "size": 1048576,
  "mime_type": "image/jpeg"
}
```

---

#### POST `/admin/upload/audio` (Admin/Editor)
Upload audio file.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:**
- `file`: Audio file (multipart/form-data)

**Response (200 OK):**
```json
{
  "url": "https://cdn.example.com/uploads/audio.mp3",
  "filename": "audio.mp3",
  "size": 10485760,
  "mime_type": "audio/mpeg",
  "duration_seconds": 3600
}
```

**Requirements:**
- Extract audio metadata (duration, bitrate) if possible
- Validate file format and size
- Store file in CDN or object storage

---

#### POST `/admin/upload/pdf` (Admin/Editor)
Upload PDF file.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: multipart/form-data`

**Request Body:**
- `file`: PDF file (multipart/form-data)

**Response (200 OK):**
```json
{
  "url": "https://cdn.example.com/uploads/document.pdf",
  "filename": "document.pdf",
  "size": 5242880,
  "mime_type": "application/pdf",
  "page_count": 100
}
```

---

## Database Schema

[Previous database schema content continues here...]

### Users (for admin functionality)

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `username` must be unique
- `email` must be unique and valid format
- `role` must be one of: admin, editor, viewer
- `password_hash` should use secure hashing (bcrypt, argon2, etc.)

---

### Catalog & Categories

#### catalog_categories

Hierarchical category structure for organizing texts (Discourses, Tantra, etc.)

```sql
CREATE TABLE catalog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES catalog_categories(id) ON DELETE CASCADE,
    id_slug VARCHAR(100) UNIQUE NOT NULL, -- e.g., 'discourses', 'tantra', 'prajnaparamita'
    title_tibetan TEXT NOT NULL,
    title_english TEXT NOT NULL,
    description TEXT,
    count INTEGER DEFAULT 0, -- Cached count of texts in this category
    order_index INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `id_slug` must be unique and URL-friendly
- `parent_id` can be NULL for top-level categories
- `count` should be maintained via triggers or application logic
- Self-referential foreign key: `parent_id` → `id`

**Foreign Keys:**
- `parent_id` → `catalog_categories(id)` ON DELETE CASCADE

**Indexes:**
- `idx_catalog_categories_parent_id` ON `parent_id`
- `idx_catalog_categories_id_slug` ON `id_slug` (unique)
- `idx_catalog_categories_order_index` ON `order_index`

---

### Texts & Karchag

#### texts

Main table for all texts in the library

```sql
CREATE TABLE texts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID NOT NULL REFERENCES catalog_categories(id) ON DELETE RESTRICT,
    parent_category_id UUID REFERENCES catalog_categories(id) ON DELETE RESTRICT,
    
    -- Titles in multiple languages
    tibetan_title TEXT NOT NULL,
    english_title TEXT NOT NULL,
    sanskrit_title TEXT,
    chinese_title TEXT,
    indian_title TEXT, -- Alternative name for Sanskrit
    
    -- Catalog identifiers
    derge_text_id VARCHAR(50),
    yeshe_text_id VARCHAR(50),
    derge_vol_number VARCHAR(20),
    derge_start_page VARCHAR(20),
    derge_end_page VARCHAR(20),
    pedurma_vol_number VARCHAR(20),
    pedurma_start_page VARCHAR(20),
    pedurma_end_page VARCHAR(20),
    yeshe_vol_number VARCHAR(20),
    
    -- Content classification
    turning VARCHAR(100), -- e.g., 'First Turning of the Wheel'
    vehicle VARCHAR(50), -- e.g., 'Mahayana', 'Hinayana'
    translation_type VARCHAR(100), -- e.g., 'Early Translation'
    
    -- Metadata
    pages INTEGER,
    volume VARCHAR(50),
    summary TEXT,
    keywords TEXT[], -- Array of keywords
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `category_id` is required (cannot be NULL)
- At least one title field must be provided (tibetan_title and english_title are required)
- Catalog identifiers (derge_text_id, yeshe_text_id) should be unique when provided

**Foreign Keys:**
- `category_id` → `catalog_categories(id)` ON DELETE RESTRICT
- `parent_category_id` → `catalog_categories(id)` ON DELETE RESTRICT

**Indexes:**
- `idx_texts_category_id` ON `category_id`
- `idx_texts_parent_category_id` ON `parent_category_id`
- `idx_texts_derge_text_id` ON `derge_text_id` WHERE `derge_text_id IS NOT NULL`
- `idx_texts_yeshe_text_id` ON `yeshe_text_id` WHERE `yeshe_text_id IS NOT NULL`
- `idx_texts_tibetan_title` ON `tibetan_title` (for full-text search)
- `idx_texts_english_title` ON `english_title` (for full-text search)
- `idx_texts_keywords` ON `keywords` USING GIN (for array search)

---

#### text_sections

Sections of text content (translation homage, purpose, summary, etc.)

```sql
CREATE TABLE text_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
    section_type VARCHAR(50) NOT NULL, -- 'translation-homage', 'purpose', 'summary', 'word-meaning', 'connection', 'questions-answers', 'colophon'
    title_tibetan TEXT,
    title_english TEXT,
    content_tibetan TEXT,
    content_english TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `section_type` must be one of the predefined types
- At least one content field (tibetan or english) should be provided
- `order_index` determines display order

**Foreign Keys:**
- `text_id` → `texts(id)` ON DELETE CASCADE

**Indexes:**
- `idx_text_sections_text_id` ON `text_id`
- `idx_text_sections_section_type` ON `section_type`
- `idx_text_sections_order_index` ON `order_index`

---

#### text_collated_content

Collated Tibetan text content

```sql
CREATE TABLE text_collated_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
    collated_text TEXT NOT NULL, -- Full Tibetan text
    english_translation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(text_id)
);
```

**Requirements:**
- One record per text (enforced by UNIQUE constraint)
- `collated_text` contains the full Tibetan text

**Foreign Keys:**
- `text_id` → `texts(id)` ON DELETE CASCADE

**Indexes:**
- `idx_text_collated_content_text_id` ON `text_id` (unique)

---

### Editions

#### editions

Different editions of the Kangyur (Derge, Pedurma, Lhasa, etc.)

```sql
CREATE TABLE editions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name_english VARCHAR(255) NOT NULL,
    name_tibetan TEXT NOT NULL,
    description_english TEXT,
    description_tibetan TEXT,
    year VARCHAR(20), -- e.g., '1733', '1934'
    location VARCHAR(255), -- e.g., 'Derge, Kham', 'Lhasa, Tibet'
    total_volumes INTEGER,
    total_texts INTEGER,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `name_english` must be unique
- `year` can be a range or single year

**Indexes:**
- `idx_editions_name_english` ON `name_english` (unique)
- `idx_editions_is_active` ON `is_active`

---

#### text_editions

Relationship between texts and editions with edition-specific metadata

```sql
CREATE TABLE text_editions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
    edition_id UUID NOT NULL REFERENCES editions(id) ON DELETE CASCADE,
    source_id VARCHAR(100), -- e.g., 'Toh 123', 'PK 456', 'LK 789'
    volume_number VARCHAR(20),
    start_page VARCHAR(20),
    end_page VARCHAR(20),
    availability VARCHAR(50), -- 'Public Domain', 'Restricted', etc.
    link_url TEXT, -- URL to external resource
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(text_id, edition_id)
);
```

**Requirements:**
- One text can appear in multiple editions
- `source_id` is edition-specific identifier
- `availability` indicates access restrictions

**Foreign Keys:**
- `text_id` → `texts(id)` ON DELETE CASCADE
- `edition_id` → `editions(id)` ON DELETE CASCADE

**Indexes:**
- `idx_text_editions_text_id` ON `text_id`
- `idx_text_editions_edition_id` ON `edition_id`
- `idx_text_editions_text_edition_unique` ON `(text_id, edition_id)` (unique)

---

### News

#### news

News entries and announcements

```sql
CREATE TABLE news (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tibetan_title TEXT NOT NULL,
    english_title TEXT NOT NULL,
    tibetan_description TEXT NOT NULL,
    english_description TEXT NOT NULL,
    thumbnail_url TEXT,
    is_published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- Both Tibetan and English titles/descriptions are required
- `published_at` should be set when `is_published` is true
- `thumbnail_url` can be a relative path or full URL

**Indexes:**
- `idx_news_is_published` ON `is_published`
- `idx_news_published_at` ON `published_at` DESC
- `idx_news_created_at` ON `created_at` DESC

---

### Timeline

#### timeline_periods

Historical periods for organizing timeline events

```sql
CREATE TABLE timeline_periods (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    id_slug VARCHAR(100) UNIQUE NOT NULL,
    name_tibetan TEXT NOT NULL,
    name_english TEXT NOT NULL,
    start_year INTEGER NOT NULL,
    end_year INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK (end_year >= start_year)
);
```

**Requirements:**
- `id_slug` must be unique and URL-friendly
- `end_year` must be >= `start_year`
- Years can be negative (BCE) or positive (CE)

**Indexes:**
- `idx_timeline_periods_id_slug` ON `id_slug` (unique)
- `idx_timeline_periods_years` ON `(start_year, end_year)`

---

#### timeline_events

Historical events in the timeline

```sql
CREATE TABLE timeline_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    period_id UUID REFERENCES timeline_periods(id) ON DELETE SET NULL,
    title_tibetan TEXT NOT NULL,
    title_english TEXT NOT NULL,
    title_sanskrit TEXT,
    description_tibetan TEXT,
    description_english TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('translation', 'compilation', 'publication', 'discovery', 'transmission', 'scholarship')),
    year INTEGER NOT NULL,
    century VARCHAR(20),
    era VARCHAR(20), -- e.g., 'CE', 'BCE'
    is_approximate BOOLEAN DEFAULT false,
    location_tibetan TEXT,
    location_english TEXT,
    significance VARCHAR(20) NOT NULL CHECK (significance IN ('major', 'important', 'minor')),
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `category` must be one of the predefined values
- `significance` must be one of: major, important, minor
- `year` is required
- `description_english` is required

**Foreign Keys:**
- `period_id` → `timeline_periods(id)` ON DELETE SET NULL

**Indexes:**
- `idx_timeline_events_period_id` ON `period_id`
- `idx_timeline_events_category` ON `category`
- `idx_timeline_events_year` ON `year`
- `idx_timeline_events_significance` ON `significance`
- `idx_timeline_events_order_index` ON `order_index`

---

#### timeline_event_figures

Key figures associated with timeline events

```sql
CREATE TABLE timeline_event_figures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES timeline_events(id) ON DELETE CASCADE,
    name_tibetan TEXT NOT NULL,
    name_english TEXT NOT NULL,
    role TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- Multiple figures can be associated with one event
- `role` describes the person's role in the event

**Foreign Keys:**
- `event_id` → `timeline_events(id)` ON DELETE CASCADE

**Indexes:**
- `idx_timeline_event_figures_event_id` ON `event_id`
- `idx_timeline_event_figures_order_index` ON `order_index`

---

#### timeline_event_relations

Relationships between timeline events

```sql
CREATE TABLE timeline_event_relations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES timeline_events(id) ON DELETE CASCADE,
    related_event_id UUID NOT NULL REFERENCES timeline_events(id) ON DELETE CASCADE,
    relation_type VARCHAR(50), -- 'precedes', 'follows', 'related', etc.
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CHECK (event_id != related_event_id),
    UNIQUE(event_id, related_event_id)
);
```

**Requirements:**
- An event cannot be related to itself
- Prevents duplicate relationships

**Foreign Keys:**
- `event_id` → `timeline_events(id)` ON DELETE CASCADE
- `related_event_id` → `timeline_events(id)` ON DELETE CASCADE

**Indexes:**
- `idx_timeline_event_relations_event_id` ON `event_id`
- `idx_timeline_event_relations_related_event_id` ON `related_event_id`
- `idx_timeline_event_relations_unique` ON `(event_id, related_event_id)` (unique)

---

#### timeline_event_sources

Sources/references for timeline events

```sql
CREATE TABLE timeline_event_sources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id UUID NOT NULL REFERENCES timeline_events(id) ON DELETE CASCADE,
    source_text TEXT NOT NULL,
    source_url TEXT,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `source_text` is required
- `source_url` is optional

**Foreign Keys:**
- `event_id` → `timeline_events(id)` ON DELETE CASCADE

**Indexes:**
- `idx_timeline_event_sources_event_id` ON `event_id`
- `idx_timeline_event_sources_order_index` ON `order_index`

---

### Audio

#### audio_recordings

Audio recordings associated with texts

```sql
CREATE TABLE audio_recordings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_id UUID REFERENCES texts(id) ON DELETE CASCADE,
    indian_title TEXT,
    chinese_title TEXT,
    tibetan_title TEXT NOT NULL,
    english_title TEXT NOT NULL,
    text_category VARCHAR(100),
    parent_category_id UUID REFERENCES catalog_categories(id) ON DELETE SET NULL,
    audio_url TEXT NOT NULL,
    duration_seconds INTEGER,
    file_size_bytes BIGINT,
    mime_type VARCHAR(50), -- 'audio/mpeg', 'audio/wav', etc.
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `audio_url` must be provided (can be file path or URL)
- At least `tibetan_title` and `english_title` are required
- `text_id` is optional (audio can exist without a text record)

**Foreign Keys:**
- `text_id` → `texts(id)` ON DELETE CASCADE
- `parent_category_id` → `catalog_categories(id)` ON DELETE SET NULL

**Indexes:**
- `idx_audio_recordings_text_id` ON `text_id`
- `idx_audio_recordings_parent_category_id` ON `parent_category_id`
- `idx_audio_recordings_is_active` ON `is_active`

---

### Text Content

#### text_metadata

Flexible metadata key-value pairs for texts

```sql
CREATE TABLE text_metadata (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    text_id UUID NOT NULL REFERENCES texts(id) ON DELETE CASCADE,
    metadata_key VARCHAR(100) NOT NULL, -- e.g., 'tibetan-title', 'derge-id', 'turning'
    metadata_value TEXT NOT NULL,
    metadata_group VARCHAR(50), -- 'titles', 'catalog', 'content', 'general'
    label VARCHAR(255), -- Display label
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

**Requirements:**
- `metadata_key` should follow a consistent naming convention
- `metadata_group` helps organize metadata for display
- Multiple metadata entries per text

**Foreign Keys:**
- `text_id` → `texts(id)` ON DELETE CASCADE

**Indexes:**
- `idx_text_metadata_text_id` ON `text_id`
- `idx_text_metadata_metadata_key` ON `metadata_key`
- `idx_text_metadata_metadata_group` ON `metadata_group`
- `idx_text_metadata_order_index` ON `order_index`

---

## Relationships & Foreign Keys

### Summary of Foreign Key Relationships

1. **Catalog Hierarchy:**
   - `catalog_categories.parent_id` → `catalog_categories.id` (self-referential)

2. **Texts:**
   - `texts.category_id` → `catalog_categories.id`
   - `texts.parent_category_id` → `catalog_categories.id`
   - `text_sections.text_id` → `texts.id`
   - `text_collated_content.text_id` → `texts.id`
   - `text_metadata.text_id` → `texts.id`
   - `text_editions.text_id` → `texts.id`
   - `audio_recordings.text_id` → `texts.id`
   - `audio_recordings.parent_category_id` → `catalog_categories.id`

3. **Editions:**
   - `text_editions.edition_id` → `editions.id`

4. **Timeline:**
   - `timeline_events.period_id` → `timeline_periods.id`
   - `timeline_event_figures.event_id` → `timeline_events.id`
   - `timeline_event_relations.event_id` → `timeline_events.id`
   - `timeline_event_relations.related_event_id` → `timeline_events.id`
   - `timeline_event_sources.event_id` → `timeline_events.id`

### Cascade Rules

- **ON DELETE CASCADE:** Used for dependent data that should be removed when parent is deleted:
  - Text sections, collated content, metadata when text is deleted
  - Event figures, relations, sources when event is deleted
  - Category children when parent category is deleted

- **ON DELETE RESTRICT:** Used for critical relationships:
  - Texts cannot be deleted if referenced by active categories
  - Categories cannot be deleted if they have texts

- **ON DELETE SET NULL:** Used for optional relationships:
  - Timeline events can exist without a period
  - Audio recordings can exist without a text

---

## Indexes

### Performance Indexes

All foreign keys should have indexes. Additional indexes for common queries:

1. **Full-text search indexes:**
   - `texts.tibetan_title` (GIN index for Tibetan text search)
   - `texts.english_title` (GIN index for English text search)
   - `text_sections.content_tibetan` (GIN index)
   - `text_sections.content_english` (GIN index)

2. **Array indexes:**
   - `texts.keywords` (GIN index for array search)

3. **Composite indexes for common queries:**
   - `(texts.category_id, texts.is_active, texts.order_index)`
   - `(timeline_events.period_id, timeline_events.year, timeline_events.order_index)`
   - `(news.is_published, news.published_at DESC)`

---

## Constraints & Requirements

### Data Integrity Constraints

1. **Unique Constraints:**
   - `catalog_categories.id_slug` - Must be unique
   - `text_collated_content.text_id` - One collated content per text
   - `text_editions(text_id, edition_id)` - One edition record per text-edition pair
   - `timeline_event_relations(event_id, related_event_id)` - No duplicate relations
   - `users.username` - Must be unique
   - `users.email` - Must be unique

2. **Check Constraints:**
   - `timeline_periods.end_year >= start_year`
   - `timeline_event_relations.event_id != related_event_id`
   - `users.role IN ('admin', 'editor', 'viewer')`
   - `timeline_events.category IN ('translation', 'compilation', 'publication', 'discovery', 'transmission', 'scholarship')`
   - `timeline_events.significance IN ('major', 'important', 'minor')`

3. **NOT NULL Constraints:**
   - Critical fields marked as NOT NULL in schema above
   - Titles in multiple languages where required
   - Foreign keys where relationships are mandatory

### Business Rules

1. **Category Hierarchy:**
   - Top-level categories have `parent_id = NULL`
   - Category deletion cascades to children (if no texts reference them)
   - Category `count` should be maintained via triggers or application logic

2. **Text Management:**
   - Texts must belong to a category
   - At least one title (Tibetan and English) must be provided
   - Catalog identifiers (Derge, Yeshe De) should be unique when provided

3. **Timeline:**
   - Events can exist without periods
   - Events can reference other events via relations
   - Year can be negative (BCE) or positive (CE)

4. **Multilingual Support:**
   - Tibetan text should use UTF-8 encoding
   - All text fields should support Unicode
   - Consider using `TEXT` type for variable-length multilingual content

### Recommended Triggers

1. **Update timestamps:**
   ```sql
   CREATE OR REPLACE FUNCTION update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
       NEW.updated_at = CURRENT_TIMESTAMP;
       RETURN NEW;
   END;
   $$ language 'plpgsql';
   
   -- Apply to all tables with updated_at column
   ```

2. **Category count maintenance:**
   ```sql
   CREATE OR REPLACE FUNCTION update_category_count()
   RETURNS TRIGGER AS $$
   BEGIN
       -- Update count when texts are added/removed
       -- Implementation depends on requirements
       RETURN NEW;
   END;
   $$ language 'plpgsql';
   ```

---

## Database Recommendations

### PostgreSQL Version
- Recommended: PostgreSQL 13+ for better JSON and array support
- Required: PostgreSQL 11+ for UUID support

### Extensions
```sql
-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable full-text search (if using built-in FTS)
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For similarity search

-- Enable array operations
-- Arrays are natively supported in PostgreSQL
```

### Character Encoding
- Database encoding: `UTF8`
- Collation: Use appropriate collation for Tibetan text if available
- Consider: `C.UTF-8` or locale-specific collation

### Storage Considerations
- Use `TEXT` type for variable-length multilingual content
- Consider partitioning large tables (e.g., `text_sections`) by date or category
- Archive old/deleted records instead of hard deletion if needed for audit

---

## Migration Strategy

1. **Phase 1: Core Tables**
   - Users
   - Catalog categories
   - Editions

2. **Phase 2: Content Tables**
   - Texts
   - Text sections
   - Text collated content
   - Text metadata

3. **Phase 3: Relationships**
   - Text editions
   - Audio recordings

4. **Phase 4: Timeline**
   - Timeline periods
   - Timeline events
   - Event figures, relations, sources

5. **Phase 5: News**
   - News table

---

## Notes

- All UUIDs use `gen_random_uuid()` for PostgreSQL compatibility
- Timestamps use `TIMESTAMP WITH TIME ZONE` for proper timezone handling
- Consider adding soft delete support (`deleted_at` column) if needed
- Consider adding audit logging for admin operations
- Consider adding versioning for text content if historical versions are needed
- For production, consider adding database-level row-level security (RLS) policies
- API rate limiting recommended: 100 requests/minute per IP, 1000 requests/minute per authenticated user
- CORS should be configured to allow frontend domain
- All endpoints should support CORS preflight requests
