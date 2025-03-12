
/**
 * API Service for KaZhoe backend
 */

const API_BASE_URL = 'https://api.kazhoe.com';

export interface Category {
  id: number;
  name: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
}

export interface TextItem {
  id: string;
  title: string;
  alternative_title?: string;
  category?: string;
  subcategory?: string;
}

export interface TextMetadata {
  id: string;
  title: string;
  alternative_title?: string;
  translator?: string;
  location_in_editions?: {
    edition_id: string;
    volume: string;
    page_start: number;
    page_end: number;
  }[];
  purpose?: string;
  summary?: string;
  commentary?: string;
  keywords?: string[];
}

export interface TextContent {
  id: string;
  title: string;
  content: string;
}

export interface KangyurEdition {
  edition_id: string;
  name: string;
  year: number;
  texts?: TextItem[];
}

/**
 * Fetch all categories and subcategories
 */
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

/**
 * Fetch texts by subcategory ID
 */
export const fetchTextsBySubcategory = async (subcategoryId: number): Promise<TextItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/subcategories/${subcategoryId}/texts`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching texts for subcategory ${subcategoryId}:`, error);
    throw error;
  }
};

/**
 * Fetch text metadata by ID
 */
export const fetchTextMetadata = async (textId: string): Promise<TextMetadata> => {
  try {
    const response = await fetch(`${API_BASE_URL}/texts/${textId}/metadata`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching metadata for text ${textId}:`, error);
    throw error;
  }
};

/**
 * Fetch text content by ID
 */
export const fetchTextContent = async (textId: string): Promise<TextContent> => {
  try {
    const response = await fetch(`${API_BASE_URL}/texts/${textId}/content`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching content for text ${textId}:`, error);
    throw error;
  }
};

/**
 * Fetch translated metadata in specified language
 */
export const fetchTextTranslatedMetadata = async (textId: string, langCode: string): Promise<Partial<TextMetadata>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/texts/${textId}/metadata/translations/${langCode}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching translated metadata for text ${textId} in ${langCode}:`, error);
    throw error;
  }
};

/**
 * Fetch all Kangyur editions
 */
export const fetchKangyurEditions = async (): Promise<KangyurEdition[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/kangyurs`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching Kangyur editions:', error);
    throw error;
  }
};

/**
 * Fetch specific Kangyur edition details
 */
export const fetchKangyurEdition = async (editionId: string): Promise<KangyurEdition> => {
  try {
    const response = await fetch(`${API_BASE_URL}/kangyurs/${editionId}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching Kangyur edition ${editionId}:`, error);
    throw error;
  }
};

/**
 * Search texts by query
 */
export const searchTexts = async (query: string): Promise<TextItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error searching texts with query "${query}":`, error);
    throw error;
  }
};
