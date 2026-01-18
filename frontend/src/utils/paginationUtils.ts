
/**
 * Paginates an array of items
 * @param items The array of items to paginate
 * @param currentPage The current page number (1-based)
 * @param itemsPerPage The number of items per page
 * @returns Object containing paginated items and pagination metadata
 */
export function paginateItems<T>(
  items: T[],
  currentPage: number = 1,
  itemsPerPage: number = 10
) {
  // Ensure current page is at least 1
  const page = Math.max(1, currentPage);
  
  // Calculate start and end indices
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  // Get items for current page
  const paginatedItems = items.slice(startIndex, endIndex);
  
  // Calculate total pages
  const totalPages = Math.ceil(items.length / itemsPerPage);
  
  return {
    items: paginatedItems,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems: items.length,
      itemsPerPage,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    }
  };
}
