/**
 * Normalizes a DateTime value for Prisma
 * Converts empty strings to null, validates ISO-8601 format, and handles Date objects
 * 
 * @param {string|Date|null|undefined} value - The DateTime value to normalize
 * @returns {Date|null} - A valid Date object or null
 */
function normalizeDateTime(value) {
  // If value is null or undefined, return null
  if (value === null || value === undefined) {
    return null;
  }

  // If value is already a Date object, return it
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  // If value is an empty string, return null
  if (typeof value === 'string' && value.trim() === '') {
    return null;
  }

  // If value is a string, try to parse it as ISO-8601 DateTime
  if (typeof value === 'string') {
    const date = new Date(value);
    // Check if the date is valid
    if (Number.isNaN(date.getTime())) {
      return null;
    }
    return date;
  }

  // For any other type, return null
  return null;
}

/**
 * Normalizes multiple DateTime fields in an object
 * 
 * @param {Object} data - The data object containing DateTime fields
 * @param {string[]} dateTimeFields - Array of field names that should be normalized
 * @returns {Object} - The data object with normalized DateTime fields
 */
function normalizeDateTimeFields(data, dateTimeFields) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const normalized = { ...data };
  
  for (const field of dateTimeFields) {
    if (field in normalized) {
      normalized[field] = normalizeDateTime(normalized[field]);
    }
  }

  return normalized;
}

module.exports = {
  normalizeDateTime,
  normalizeDateTimeFields,
};
