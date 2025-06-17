
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

export const getAllAudioItems = (items: CatalogItem[]): CatalogItem[] => {
  const audioItems: CatalogItem[] = [];
  
  const collectAudioItems = (items: CatalogItem[]) => {
    items.forEach(item => {
      if (item.audioUrl) {
        audioItems.push({
          ...item,
          playCount: item.playCount || Math.floor(Math.random() * 1000000) + 10000 // Add random play count for demo
        });
      }
      if (item.children) {
        collectAudioItems(item.children);
      }
    });
  };
  
  collectAudioItems(items);
  return audioItems;
};
