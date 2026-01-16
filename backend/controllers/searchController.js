const { db } = require('../models/mockDatabase');
const { paginate, parsePaginationParams } = require('../utils/pagination');

const search = (req, res, next) => {
  try {
    const { q, type = 'all', lang = 'en', page, limit } = req.query;

    if (!q) {
      return res.json({
        query: q || '',
        results: {
          texts: { items: [], total: 0 },
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

    const queryLower = q.toLowerCase();
    const results = {
      texts: { items: [], total: 0 },
      news: { items: [], total: 0 },
      timeline: { items: [], total: 0 },
      audio: { items: [], total: 0 },
    };

    // Search texts
    if (type === 'all' || type === 'texts') {
      const textMatches = db.texts.filter(text =>
        text.tibetan_title?.toLowerCase().includes(queryLower) ||
        text.english_title?.toLowerCase().includes(queryLower) ||
        text.sanskrit_title?.toLowerCase().includes(queryLower) ||
        text.summary?.toLowerCase().includes(queryLower)
      );

      results.texts = {
        items: textMatches.slice(0, 10).map(text => ({
          id: text.id,
          title: {
            tibetan: text.tibetan_title,
            english: text.english_title,
          },
        })),
        total: textMatches.length,
      };
    }

    // Search news
    if (type === 'all' || type === 'news') {
      const newsMatches = db.news.filter(n =>
        n.is_published &&
        (n.tibetan_title?.toLowerCase().includes(queryLower) ||
         n.english_title?.toLowerCase().includes(queryLower) ||
         n.tibetan_description?.toLowerCase().includes(queryLower) ||
         n.english_description?.toLowerCase().includes(queryLower))
      );

      results.news = {
        items: newsMatches.slice(0, 10).map(item => ({
          id: item.id,
          title: {
            tibetan: item.tibetan_title,
            english: item.english_title,
          },
        })),
        total: newsMatches.length,
      };
    }

    // Search timeline events
    if (type === 'all' || type === 'timeline') {
      const eventMatches = db.timelineEvents.filter(event =>
        event.title_tibetan?.toLowerCase().includes(queryLower) ||
        event.title_english?.toLowerCase().includes(queryLower) ||
        event.description_english?.toLowerCase().includes(queryLower)
      );

      results.timeline = {
        items: eventMatches.slice(0, 10).map(event => ({
          id: event.id,
          title: {
            tibetan: event.title_tibetan,
            english: event.title_english,
          },
          year: event.year,
        })),
        total: eventMatches.length,
      };
    }

    // Search audio
    if (type === 'all' || type === 'audio') {
      const audioMatches = db.audioRecordings.filter(audio =>
        audio.is_active &&
        (audio.tibetan_title?.toLowerCase().includes(queryLower) ||
         audio.english_title?.toLowerCase().includes(queryLower))
      );

      results.audio = {
        items: audioMatches.slice(0, 10).map(audio => ({
          id: audio.id,
          title: {
            tibetan: audio.tibetan_title,
            english: audio.english_title,
          },
        })),
        total: audioMatches.length,
      };
    }

    const totalResults = Object.values(results).reduce((sum, r) => sum + r.total, 0);
    const { page: pageNum, limit: limitNum } = parsePaginationParams({ query: { page, limit } });

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
