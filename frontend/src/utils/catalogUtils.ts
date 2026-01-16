import { CatalogItem } from '@/types/catalog';

export const filterCatalogItems = (items: CatalogItem[], query: string): CatalogItem[] => {
  if (!query) return items;
  
  const filtered: CatalogItem[] = [];
  
  const searchRecursive = (items: CatalogItem[]) => {
    items.forEach(item => {
      const matchesTitle = item.title.english.toLowerCase().includes(query.toLowerCase()) ||
                          item.title.tibetan.toLowerCase().includes(query.toLowerCase());
      
      if (matchesTitle) {
        filtered.push(item);
      }
      
      if (item.children) {
        searchRecursive(item.children);
      }
    });
  };
  
  searchRecursive(items);
  return filtered;
};

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
