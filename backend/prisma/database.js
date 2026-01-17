// Prisma database service layer
const { PrismaClient } = require('./generated/client');
const dotenv = require('dotenv');
dotenv.config({override: true});
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });



// User operations
const userService = {
  findById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },
  
  findByUsername: async (username) => {
    return await prisma.user.findUnique({ where: { username } });
  },
  
  findByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },
  
  findByUsernameOrEmail: async (identifier) => {
    return await prisma.user.findFirst({
      where: {
        OR: [
          { username: identifier },
          { email: identifier }
        ],
        is_active: true
      }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.user.findMany({ where });
  },
  
  create: async (data) => {
    return await prisma.user.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.user.delete({ where: { id } });
  }
};

// Catalog Category operations
const catalogCategoryService = {
  findById: async (id) => {
    return await prisma.catalogCategory.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        texts: true
      }
    });
  },
  
  findBySlug: async (slug) => {
    return await prisma.catalogCategory.findUnique({
      where: { id_slug: slug },
      include: {
        parent: true,
        children: true,
        texts: true
      }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active, parent_id } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    if (parent_id !== undefined) {
      where.parent_id = parent_id;
    }
    return await prisma.catalogCategory.findMany({
      where,
      include: {
        parent: true,
        children: true
      },
      orderBy: { order_index: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.catalogCategory.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.catalogCategory.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.catalogCategory.delete({ where: { id } });
  },
  
  hasChildren: async (id) => {
    const count = await prisma.catalogCategory.count({
      where: { parent_id: id }
    });
    return count > 0;
  },
  
  hasTexts: async (id) => {
    const count = await prisma.text.count({
      where: { category_id: id }
    });
    return count > 0;
  }
};

// Text operations
const textService = {
  findById: async (id, options = {}) => {
    const { include_sections, include_collated, include_metadata, include_editions, include_category } = options;
    const include = {};
    
    if (include_sections) {
      include.sections = { orderBy: { order_index: 'asc' } };
    }
    if (include_collated) {
      include.collatedContent = true;
    }
    if (include_metadata) {
      include.metadata = { orderBy: { order_index: 'asc' } };
    }
    if (include_editions) {
      include.textEditions = {
        include: { edition: true }
      };
    }
    if (include_category) {
      include.category = true;
    }
    
    return await prisma.text.findUnique({
      where: { id },
      include: Object.keys(include).length > 0 ? include : undefined
    });
  },
  
  findBySlug: async (slug, options = {}) => {
    const { include_sections, include_collated, include_metadata, include_editions, include_category } = options;
    const include = {};
    
    if (include_sections) {
      include.sections = { orderBy: { order_index: 'asc' } };
    }
    if (include_collated) {
      include.collatedContent = true;
    }
    if (include_metadata) {
      include.metadata = { orderBy: { order_index: 'asc' } };
    }
    if (include_editions) {
      include.textEditions = {
        include: { edition: true }
      };
    }
    if (include_category) {
      include.category = true;
    }
    
    return await prisma.text.findUnique({
      where: { id_slug: slug },
      include: Object.keys(include).length > 0 ? include : undefined
    });
  },
  
  findAll: async (options = {}) => {
    const { 
      category_id, 
      is_active, 
      search, 
      sort = 'order_index', 
      order = 'asc',
      skip,
      take
    } = options;
    
    const where = {};
    
    if (category_id) {
      where.category_id = category_id;
    }
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    if (search) {
      where.OR = [
        { keywords: { has: search } },
        { id_slug: { contains: search, mode: 'insensitive' } }
      ];
    }
    
    const orderBy = {};
    if (sort === 'created_at') {
      orderBy.created_at = order;
    } else if (sort === 'order_index') {
      orderBy.order_index = order;
    } else {
      orderBy[sort] = order;
    }
    
    const [items, total] = await Promise.all([
      prisma.text.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          category: true
        }
      }),
      prisma.text.count({ where })
    ]);
    
    return { items, total };
  },
  
  create: async (data) => {
    return await prisma.text.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.text.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.text.delete({ where: { id } });
  }
};

// Text Section operations
const textSectionService = {
  findByTextId: async (textId, options = {}) => {
    const { section_type } = options;
    const where = { text_id: textId };
    if (section_type) {
      where.section_type = section_type;
    }
    return await prisma.textSection.findMany({
      where,
      orderBy: { order_index: 'asc' }
    });
  },
  
  findById: async (id) => {
    return await prisma.textSection.findUnique({ where: { id } });
  },
  
  create: async (data) => {
    return await prisma.textSection.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.textSection.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.textSection.delete({ where: { id } });
  }
};

// Text Metadata operations
const textMetadataService = {
  findByTextId: async (textId) => {
    return await prisma.textMetadata.findMany({
      where: { text_id: textId },
      orderBy: { order_index: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.textMetadata.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.textMetadata.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.textMetadata.delete({ where: { id } });
  }
};

// Text Collated Content operations
const textCollatedContentService = {
  findByTextId: async (textId) => {
    return await prisma.textCollatedContent.findUnique({
      where: { text_id: textId }
    });
  },
  
  create: async (data) => {
    return await prisma.textCollatedContent.create({ data });
  },
  
  update: async (textId, data) => {
    return await prisma.textCollatedContent.upsert({
      where: { text_id: textId },
      update: data,
      create: { text_id: textId, ...data }
    });
  },
  
  delete: async (textId) => {
    return await prisma.textCollatedContent.delete({
      where: { text_id: textId }
    });
  }
};

// Text Summary operations
const textSummaryService = {
  findByTextId: async (textId) => {
    return await prisma.textSummary.findUnique({
      where: { text_id: textId }
    });
  },
  
  create: async (data) => {
    return await prisma.textSummary.create({ data });
  },
  
  update: async (textId, data) => {
    return await prisma.textSummary.upsert({
      where: { text_id: textId },
      update: data,
      create: { text_id: textId, ...data }
    });
  }
};

// Edition operations
const editionService = {
  findById: async (id) => {
    return await prisma.edition.findUnique({
      where: { id },
      include: { textEditions: true }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.edition.findMany({ where });
  },
  
  create: async (data) => {
    return await prisma.edition.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.edition.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.edition.delete({ where: { id } });
  }
};

// Text Edition operations
const textEditionService = {
  findByTextId: async (textId) => {
    return await prisma.textEdition.findMany({
      where: { text_id: textId },
      include: { edition: true }
    });
  },
  
  create: async (data) => {
    return await prisma.textEdition.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.textEdition.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.textEdition.delete({ where: { id } });
  }
};

// News operations
const newsService = {
  findById: async (id) => {
    return await prisma.news.findUnique({ where: { id } });
  },
  
  findAll: async (options = {}) => {
    const { is_published, skip, take, orderBy } = options;
    const where = {};
    if (is_published !== undefined) {
      where.is_published = is_published;
    }
    return await prisma.news.findMany({
      where,
      skip,
      take,
      orderBy: orderBy || { created_at: 'desc' }
    });
  },
  
  count: async (options = {}) => {
    const { is_published } = options;
    const where = {};
    if (is_published !== undefined) {
      where.is_published = is_published;
    }
    return await prisma.news.count({ where });
  },
  
  create: async (data) => {
    return await prisma.news.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.news.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.news.delete({ where: { id } });
  }
};

// Timeline Period operations
const timelinePeriodService = {
  findById: async (id) => {
    return await prisma.timelinePeriod.findUnique({
      where: { id },
      include: { events: true }
    });
  },
  
  findBySlug: async (slug) => {
    return await prisma.timelinePeriod.findUnique({
      where: { id_slug: slug },
      include: { events: true }
    });
  },
  
  findAll: async () => {
    return await prisma.timelinePeriod.findMany({
      include: { events: true },
      orderBy: { start_year: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.timelinePeriod.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.timelinePeriod.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.timelinePeriod.delete({ where: { id } });
  }
};

// Timeline Event operations
const timelineEventService = {
  findById: async (id) => {
    return await prisma.timelineEvent.findUnique({
      where: { id },
      include: {
        period: true,
        figures: true,
        relations: true,
        sources: true
      }
    });
  },
  
  findByPeriodId: async (periodId) => {
    return await prisma.timelineEvent.findMany({
      where: { period_id: periodId },
      orderBy: { year: 'asc' }
    });
  },
  
  findAll: async (options = {}) => {
    const { period_id, skip, take } = options;
    const where = {};
    if (period_id) {
      where.period_id = period_id;
    }
    return await prisma.timelineEvent.findMany({
      where,
      include: { period: true },
      orderBy: { year: 'asc' },
      skip,
      take
    });
  },
  
  create: async (data) => {
    return await prisma.timelineEvent.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.timelineEvent.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.timelineEvent.delete({ where: { id } });
  }
};

// Audio Recording operations
const audioRecordingService = {
  findById: async (id) => {
    return await prisma.audioRecording.findUnique({ where: { id } });
  },
  
  findAll: async (options = {}) => {
    const { is_active, skip, take } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.audioRecording.findMany({
      where,
      skip,
      take,
      orderBy: { created_at: 'desc' }
    });
  },
  
  count: async (options = {}) => {
    const { is_active } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.audioRecording.count({ where });
  },
  
  create: async (data) => {
    return await prisma.audioRecording.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.audioRecording.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.audioRecording.delete({ where: { id } });
  }
};

// Video operations
const videoService = {
  findById: async (id) => {
    return await prisma.video.findUnique({ where: { id } });
  },
  
  findAll: async (options = {}) => {
    const { is_active, skip, take } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.video.findMany({
      where,
      skip,
      take,
      orderBy: { created_at: 'desc' }
    });
  },
  
  count: async (options = {}) => {
    const { is_active } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.video.count({ where });
  },
  
  create: async (data) => {
    return await prisma.video.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.video.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.video.delete({ where: { id } });
  }
};

// Karchag Main Category operations
const karchagMainCategoryService = {
  findById: async (id) => {
    return await prisma.karchagMainCategory.findUnique({
      where: { id },
      include: { subCategories: true }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    return await prisma.karchagMainCategory.findMany({
      where,
      include: { subCategories: true },
      orderBy: { order_index: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.karchagMainCategory.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.karchagMainCategory.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.karchagMainCategory.delete({ where: { id } });
  }
};

// Karchag Sub Category operations
const karchagSubCategoryService = {
  findById: async (id) => {
    return await prisma.karchagSubCategory.findUnique({
      where: { id },
      include: {
        mainCategory: true,
        texts: true
      }
    });
  },
  
  findByMainCategoryId: async (mainCategoryId) => {
    return await prisma.karchagSubCategory.findMany({
      where: { main_category_id: mainCategoryId },
      include: { texts: true },
      orderBy: { order_index: 'asc' }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active, main_category_id } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    if (main_category_id) {
      where.main_category_id = main_category_id;
    }
    return await prisma.karchagSubCategory.findMany({
      where,
      include: { mainCategory: true },
      orderBy: { order_index: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.karchagSubCategory.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.karchagSubCategory.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.karchagSubCategory.delete({ where: { id } });
  }
};

// Karchag Text operations
const karchagTextService = {
  findById: async (id) => {
    return await prisma.karchagText.findUnique({
      where: { id },
      include: { subCategory: true }
    });
  },
  
  findBySubCategoryId: async (subCategoryId) => {
    return await prisma.karchagText.findMany({
      where: { sub_category_id: subCategoryId },
      orderBy: { order_index: 'asc' }
    });
  },
  
  findAll: async (options = {}) => {
    const { is_active, sub_category_id } = options;
    const where = {};
    if (is_active !== undefined) {
      where.is_active = is_active;
    }
    if (sub_category_id) {
      where.sub_category_id = sub_category_id;
    }
    return await prisma.karchagText.findMany({
      where,
      include: { subCategory: true },
      orderBy: { order_index: 'asc' }
    });
  },
  
  create: async (data) => {
    return await prisma.karchagText.create({ data });
  },
  
  update: async (id, data) => {
    return await prisma.karchagText.update({
      where: { id },
      data
    });
  },
  
  delete: async (id) => {
    return await prisma.karchagText.delete({ where: { id } });
  }
};

// Search operations
const searchService = {
  globalSearch: async (query, options = {}) => {
    const { skip, take } = options;
    const searchTerm = query.toLowerCase();
    
    const [texts, categories, news, timelineEvents] = await Promise.all([
      prisma.text.findMany({
        where: {
          OR: [
            { id_slug: { contains: searchTerm, mode: 'insensitive' } },
            { keywords: { has: searchTerm } }
          ],
          is_active: true
        },
        include: { category: true },
        skip,
        take
      }),
      prisma.catalogCategory.findMany({
        where: {
          OR: [
            { id_slug: { contains: searchTerm, mode: 'insensitive' } },
            { title_english: { contains: searchTerm, mode: 'insensitive' } },
            { title_tibetan: { contains: searchTerm, mode: 'insensitive' } }
          ],
          is_active: true
        },
        skip,
        take
      }),
      prisma.news.findMany({
        where: {
          OR: [
            { english_title: { contains: searchTerm, mode: 'insensitive' } },
            { tibetan_title: { contains: searchTerm, mode: 'insensitive' } }
          ],
          is_published: true
        },
        skip,
        take
      }),
      prisma.timelineEvent.findMany({
        where: {
          OR: [
            { title_english: { contains: searchTerm, mode: 'insensitive' } },
            { title_tibetan: { contains: searchTerm, mode: 'insensitive' } }
          ]
        },
        include: { period: true },
        skip,
        take
      })
    ]);
    
    return {
      texts,
      categories,
      news,
      timelineEvents
    };
  }
};

module.exports = {
  prisma,
  userService,
  catalogCategoryService,
  textService,
  textSectionService,
  textMetadataService,
  textCollatedContentService,
  textSummaryService,
  editionService,
  textEditionService,
  newsService,
  timelinePeriodService,
  timelineEventService,
  audioRecordingService,
  videoService,
  karchagMainCategoryService,
  karchagSubCategoryService,
  karchagTextService,
  searchService
};
