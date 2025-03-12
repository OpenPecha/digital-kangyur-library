
// Define the catalog data structure
export interface CatalogItem {
  id: string;
  title: {
    tibetan: string;
    english: string;
  };
  description?: string;
  children?: CatalogItem[];
  count?: number;
  _matches?: boolean; // Used for filtering
}
