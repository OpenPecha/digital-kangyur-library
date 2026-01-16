const { db, findById, create, update, remove } = require('../models/mockDatabase');
const { AppError } = require('../utils/errors');

const getTimelinePeriods = (req, res, next) => {
  try {
    const { lang = 'en', include_events = 'false' } = req.query;

    const periods = db.timelinePeriods.map(period => {
      const result = {
        id: period.id,
        id_slug: period.id_slug,
        name: {
          tibetan: period.name_tibetan,
          english: period.name_english,
        },
        description: period.description,
        start_year: period.start_year,
        end_year: period.end_year,
      };

      if (include_events === 'true') {
        result.events = db.timelineEvents
          .filter(event => event.period_id === period.id)
          .map(event => ({
            id: event.id,
            title: {
              tibetan: event.title_tibetan,
              english: event.title_english,
              sanskrit: event.title_sanskrit,
            },
            year: event.year,
            category: event.category,
          }));
      }

      return result;
    });

    res.json({
      periods,
    });
  } catch (error) {
    next(error);
  }
};

const getTimelineEvents = (req, res, next) => {
  try {
    const {
      period_id,
      category,
      significance,
      year_from,
      year_to,
      lang = 'en',
      include_figures = 'false',
      include_sources = 'false',
      include_relations = 'false',
      sort = 'year',
      order = 'asc',
    } = req.query;

    let events = [...db.timelineEvents];

    if (period_id) {
      events = events.filter(e => e.period_id === period_id);
    }

    if (category) {
      events = events.filter(e => e.category === category);
    }

    if (significance) {
      events = events.filter(e => e.significance === significance);
    }

    if (year_from) {
      events = events.filter(e => e.year >= parseInt(year_from, 10));
    }

    if (year_to) {
      events = events.filter(e => e.year <= parseInt(year_to, 10));
    }

    // Sort
    events.sort((a, b) => {
      let aVal = a[sort] || 0;
      let bVal = b[sort] || 0;

      if (typeof aVal === 'string') {
        return order === 'desc'
          ? bVal.localeCompare(aVal)
          : aVal.localeCompare(bVal);
      }

      return order === 'desc' ? bVal - aVal : aVal - bVal;
    });

    const formattedEvents = events.map(event => {
      const result = {
        id: event.id,
        period_id: event.period_id,
        title: {
          tibetan: event.title_tibetan,
          english: event.title_english,
          sanskrit: event.title_sanskrit,
        },
        description: {
          tibetan: event.description_tibetan,
          english: event.description_english,
        },
        category: event.category,
        year: event.year,
        century: event.century,
        era: event.era,
        is_approximate: event.is_approximate,
        location: {
          tibetan: event.location_tibetan,
          english: event.location_english,
        },
        significance: event.significance,
        figures: [],
        sources: [],
        related_events: [],
      };

      if (include_figures === 'true') {
        result.figures = db.timelineEventFigures
          .filter(f => f.event_id === event.id)
          .sort((a, b) => a.order_index - b.order_index)
          .map(f => ({
            id: f.id,
            name: {
              tibetan: f.name_tibetan,
              english: f.name_english,
            },
            role: f.role,
            order_index: f.order_index,
          }));
      }

      if (include_sources === 'true') {
        result.sources = db.timelineEventSources
          .filter(s => s.event_id === event.id)
          .sort((a, b) => a.order_index - b.order_index)
          .map(s => ({
            id: s.id,
            source_text: s.source_text,
            source_url: s.source_url,
            order_index: s.order_index,
          }));
      }

      if (include_relations === 'true') {
        result.related_events = db.timelineEventRelations
          .filter(r => r.event_id === event.id)
          .map(r => ({
            event_id: r.related_event_id,
            relation_type: r.relation_type,
          }));
      }

      return result;
    });

    res.json({
      events: formattedEvents,
    });
  } catch (error) {
    next(error);
  }
};

const getTimelineEventById = (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      lang = 'en',
      include_figures = 'true',
      include_sources = 'true',
      include_relations = 'true',
    } = req.query;

    const event = findById(db.timelineEvents, id);
    if (!event) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Event not found', 404);
    }

    const result = {
      id: event.id,
      period_id: event.period_id,
      title: {
        tibetan: event.title_tibetan,
        english: event.title_english,
        sanskrit: event.title_sanskrit,
      },
      description: {
        tibetan: event.description_tibetan,
        english: event.description_english,
      },
      category: event.category,
      year: event.year,
      century: event.century,
      era: event.era,
      is_approximate: event.is_approximate,
      location: {
        tibetan: event.location_tibetan,
        english: event.location_english,
      },
      significance: event.significance,
      figures: [],
      sources: [],
      related_events: [],
    };

    if (include_figures === 'true') {
      result.figures = db.timelineEventFigures
        .filter(f => f.event_id === id)
        .sort((a, b) => a.order_index - b.order_index)
        .map(f => ({
          id: f.id,
          name: {
            tibetan: f.name_tibetan,
            english: f.name_english,
          },
          role: f.role,
          order_index: f.order_index,
        }));
    }

    if (include_sources === 'true') {
      result.sources = db.timelineEventSources
        .filter(s => s.event_id === id)
        .sort((a, b) => a.order_index - b.order_index)
        .map(s => ({
          id: s.id,
          source_text: s.source_text,
          source_url: s.source_url,
          order_index: s.order_index,
        }));
    }

    if (include_relations === 'true') {
      result.related_events = db.timelineEventRelations
        .filter(r => r.event_id === id)
        .map(r => ({
          event_id: r.related_event_id,
          relation_type: r.relation_type,
        }));
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const createTimelineEvent = (req, res, next) => {
  try {
    const {
      period_id,
      title_tibetan,
      title_english,
      title_sanskrit,
      description_tibetan,
      description_english,
      category,
      year,
      century,
      era,
      is_approximate = false,
      location_tibetan,
      location_english,
      significance,
      order_index = 0,
      figures = [],
      sources = [],
    } = req.body;

    if (!title_tibetan || !title_english || !description_english || !category || !year || !significance) {
      throw new AppError('VALIDATION_ERROR', 'Required fields missing', 400);
    }

    if (period_id && !findById(db.timelinePeriods, period_id)) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Period not found', 404);
    }

    const event = create(db.timelineEvents, {
      period_id: period_id || null,
      title_tibetan,
      title_english,
      title_sanskrit,
      description_tibetan,
      description_english,
      category,
      year,
      century,
      era,
      is_approximate,
      location_tibetan,
      location_english,
      significance,
      order_index,
    });

    // Create figures
    figures.forEach((figure, idx) => {
      create(db.timelineEventFigures, {
        event_id: event.id,
        name_tibetan: figure.name_tibetan,
        name_english: figure.name_english,
        role: figure.role,
        order_index: figure.order_index !== undefined ? figure.order_index : idx,
      });
    });

    // Create sources
    sources.forEach((source, idx) => {
      create(db.timelineEventSources, {
        event_id: event.id,
        source_text: source.source_text,
        source_url: source.source_url,
        order_index: source.order_index !== undefined ? source.order_index : idx,
      });
    });

    res.status(201).json({
      id: event.id,
      created_at: event.created_at,
    });
  } catch (error) {
    next(error);
  }
};

const updateTimelineEvent = (req, res, next) => {
  try {
    const { id } = req.params;
    const event = findById(db.timelineEvents, id);

    if (!event) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Event not found', 404);
    }

    const updateData = {};
    const fields = [
      'period_id', 'title_tibetan', 'title_english', 'title_sanskrit',
      'description_tibetan', 'description_english', 'category', 'year',
      'century', 'era', 'is_approximate', 'location_tibetan', 'location_english',
      'significance', 'order_index',
    ];

    fields.forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const updated = update(db.timelineEvents, id, updateData);

    res.json({
      id: updated.id,
      updated_at: updated.updated_at,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTimelineEvent = (req, res, next) => {
  try {
    const { id } = req.params;
    const event = findById(db.timelineEvents, id);

    if (!event) {
      throw new AppError('RESOURCE_NOT_FOUND', 'Event not found', 404);
    }

    // Delete related data
    db.timelineEventFigures = db.timelineEventFigures.filter(f => f.event_id !== id);
    db.timelineEventSources = db.timelineEventSources.filter(s => s.event_id !== id);
    db.timelineEventRelations = db.timelineEventRelations.filter(
      r => r.event_id !== id || r.related_event_id !== id
    );

    remove(db.timelineEvents, id);

    res.json({
      message: 'Event deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTimelinePeriods,
  getTimelineEvents,
  getTimelineEventById,
  createTimelineEvent,
  updateTimelineEvent,
  deleteTimelineEvent,
};
