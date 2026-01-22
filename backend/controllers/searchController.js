const { searchService } = require('../prisma/database');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const search = async (req, res, next) => {
  try {
    const { q, type = 'all', lang = 'en', page, limit } = req.query;

    if (!q) {
      return res.json({
        query: q || '',
        results: {
          texts: { items: [], total: 0 },
          subCategories: { items: [], total: 0 },
          news: { items: [], total: 0 },
          timeline: { items: [], total: 0 },
          audio: { items: [], total: 0 },
        },
        pagination: {
          page: 1,
          limit: 20,
          total: 0,
          total_pages: 0,
        },
      });
    }

    const { page: pageNum, limit: limitNum } = parsePaginationParams({ query: { page, limit } });
    const skip = (pageNum - 1) * limitNum;
    const take = limitNum;

    const results = {
      texts: { items: [], total: 0 },
      subCategories: { items: [], total: 0 },
      news: { items: [], total: 0 },
      timeline: { items: [], total: 0 },
      audio: { items: [], total: 0 },
    };

    // Use global search service
    const searchResults = await searchService.globalSearch(q, { skip, take });

    // Format results
    if (type === 'all' || type === 'texts') {
      results.texts = {
        items: searchResults.texts.slice(0, 10).map(text => ({
          id: text.id,
          title: {
            tibetan: text.tibetan_title,
            english: text.english_title,
            sanskrit: text.sanskrit_title,
            chinese: text.chinese_title,
          },
          derge_id: text.derge_id,
          yeshe_de_id: text.yeshe_de_id,
          sub_category: text.sub_category ? {
            id: text.sub_category.id,
            name_english: text.sub_category.name_english,
            name_tibetan: text.sub_category.name_tibetan,
          } : null,
        })),
        total: searchResults.texts.length,
      };
    }

    if (type === 'all' || type === 'subcategories') {
      results.subCategories = {
        items: searchResults.subCategories.slice(0, 10).map(subcat => ({
          id: subcat.id,
          name_english: subcat.name_english,
          name_tibetan: subcat.name_tibetan,
          description_english: subcat.description_english,
          description_tibetan: subcat.description_tibetan,
          main_category: subcat.main_category ? {
            id: subcat.main_category.id,
            name_english: subcat.main_category.name_english,
            name_tibetan: subcat.main_category.name_tibetan,
          } : null,
        })),
        total: searchResults.subCategories.length,
      };
    }

    if (type === 'all' || type === 'news') {
      results.news = {
        items: searchResults.news.slice(0, 10).map(item => ({
          id: item.id,
          title: {
            tibetan: item.tibetan_title,
            english: item.english_title,
          },
        })),
        total: searchResults.news.length,
      };
    }

    if (type === 'all' || type === 'timeline') {
      results.timeline = {
        items: searchResults.timelineEvents.slice(0, 10).map(event => ({
          id: event.id,
          title: {
            tibetan: event.title_tibetan,
            english: event.title_english,
          },
          year: event.year,
        })),
        total: searchResults.timelineEvents.length,
      };
    }

    // Audio search would need to be added to searchService
    results.audio = { items: [], total: 0 };

    const totalResults = Object.values(results).reduce((sum, r) => sum + r.total, 0);

    res.json({
      query: q,
      results,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: totalResults,
        total_pages: Math.ceil(totalResults / limitNum),
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  search,
};
