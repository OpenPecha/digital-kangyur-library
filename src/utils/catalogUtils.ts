
import { CatalogItem } from '@/types/catalog';

// Filter the catalog data based on search query
export const filterCatalogItems = (items: CatalogItem[], query: string): CatalogItem[] => {
  return items.map(category => {
    // Check if this category matches
    const titleMatches = 
      category.title.english.toLowerCase().includes(query.toLowerCase()) ||
      category.title.tibetan.includes(query);
    
    // Filter children
    const filteredChildren = category.children 
      ? filterCatalogItems(category.children, query)
      : [];
    
    // Return filtered version
    return {
      ...category,
      children: filteredChildren,
      _matches: titleMatches || filteredChildren.length > 0
    };
  }).filter(item => item._matches);
};

// Find a catalog item by ID in the nested structure
export const findItemInTree = (items: CatalogItem[], id: string): CatalogItem | null => {
  for (const item of items) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = findItemInTree(item.children, id);
      if (found) return found;
    }
  }
  return null;
};
