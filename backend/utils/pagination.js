const paginate = (items, page = 1, limit = 20) => {
  const pageNum = Math.max(1, parseInt(page, 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const offset = (pageNum - 1) * limitNum;
  const total = items.length;
  const totalPages = Math.ceil(total / limitNum);
  const paginatedItems = items.slice(offset, offset + limitNum);

  return {
    items: paginatedItems,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      total_pages: totalPages,
      has_next: pageNum < totalPages,
      has_prev: pageNum > 1,
    },
  };
};

const parsePaginationParams = (req) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = Math.min(100, parseInt(req.query.limit, 10) || 20);
  return { page, limit };
};

module.exports = {
  paginate,
  parsePaginationParams,
};
