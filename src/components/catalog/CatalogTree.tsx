
import React from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';
import { cn } from '@/lib/utils';

interface CatalogTreeProps {
  items: CatalogItem[];
  expandedItems: string[];
  selectedItem: string | null;
  showDetails: boolean;
  onToggleExpand: (id: string) => void;
  onSelectItem: (id: string) => void;
  onToggleDetails: () => void;
}

const CatalogTree = ({ 
  items, 
  expandedItems, 
  selectedItem, 
  onToggleExpand, 
  onSelectItem,
}: CatalogTreeProps) => {
  
  // Recursive function to render catalog items with proper nesting
  const renderCatalogItems = (itemsToRender: CatalogItem[], level: number = 0) => {
    return itemsToRender.map((category) => (
      <div key={category.id} className="mb-1">
        <div
          className={cn(
            "flex items-center py-2",
            level > 0 ? 'pl-6' : '',
            selectedItem === category.id ? "text-kangyur-orange font-medium" : "text-gray-700"
          )}
        >
          {category.children && category.children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(category.id);
              }}
              className="mr-1 text-kangyur-orange"
            >
              {expandedItems.includes(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div className="w-4 mr-1"></div>
          )}
          
          <div 
            className="flex items-start cursor-pointer flex-1"
            onClick={() => onSelectItem(category.id)}
          >
            <span className="text-kangyur-orange mr-2 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
              </svg>
            </span>
            
            <div>
              <div className={cn("text-sm", selectedItem === category.id ? "font-medium" : "")}>
                {category.title.english}
              </div>
              <div className="tibetan text-xs text-gray-500">
                {category.title.tibetan}
              </div>
            </div>
          </div>
        </div>
        
        {/* Children */}
        {category.children && expandedItems.includes(category.id) && (
          <div>
            {renderCatalogItems(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg p-5">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Catalog Structure</h2>
      <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
        {renderCatalogItems(items)}
      </div>
    </div>
  );
};

export default CatalogTree;
