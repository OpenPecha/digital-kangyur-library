
import { Category, Subcategory, TextItem } from '@/services/api';
import { CatalogItem } from '@/types/catalog';

/**
 * Convert API categories to application CatalogItem format
 */
export const mapCategoriesToCatalogItems = (categories: Category[]): CatalogItem[] => {
  return categories.map(category => ({
    id: `category-${category.id}`,
    title: {
      tibetan: '', // We'll need to add Tibetan titles if available from the API
      english: category.name
    },
    description: '',
    count: category.subcategories.length,
    children: category.subcategories.map(subcategory => ({
      id: `subcategory-${subcategory.id}`,
      title: {
        tibetan: '', // We'll need to add Tibetan titles if available from the API
        english: subcategory.name
      },
      description: '',
      count: 0 // We don't know the count until we fetch the texts
    }))
  }));
};

/**
 * Convert API text items to application CatalogItem format
 */
export const mapTextsToSubcategoryChildren = (texts: TextItem[], subcategoryId: string): CatalogItem[] => {
  return texts.map(text => ({
    id: text.id,
    title: {
      tibetan: '', // We'll need to add Tibetan titles if available from the API
      english: text.title
    },
    description: text.alternative_title || '',
    count: 1
  }));
};
