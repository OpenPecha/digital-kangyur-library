
import React from 'react';
import { ChevronRight, ChevronDown, BookOpen, PanelRight } from 'lucide-react';
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
  showDetails,
  onToggleExpand, 
  onSelectItem,
  onToggleDetails
}: CatalogTreeProps) => {
  
  // Recursive function to render catalog items with proper nesting
  const renderCatalogItems = (itemsToRender: CatalogItem[], level: number = 0) => {
    return itemsToRender.map((category) => (
      <div key={category.id} className={`border-b border-kangyur-orange/10 last:border-0 pb-2 last:pb-0 ${level > 0 ? 'ml-5' : ''}`}>
        <div
          className={cn(
            "flex items-center justify-between p-2 rounded-md cursor-pointer group",
            selectedItem === category.id ? "bg-kangyur-orange/10 text-kangyur-orange" : "hover:bg-kangyur-orange/5"
          )}
          onClick={() => {
            onSelectItem(category.id);
            if (category.children?.length) {
              onToggleExpand(category.id);
            }
          }}
        >
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-kangyur-orange/70" />
            <div>
              <div className="font-medium text-kangyur-dark group-hover:text-kangyur-orange transition-colors">
                {category.title.english}
              </div>
              <div className="tibetan text-sm text-kangyur-dark/70">
                {category.title.tibetan}
              </div>
            </div>
          </div>
          
          {category.children && category.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(category.id);
              }}
              className="p-1.5 rounded-md hover:bg-kangyur-orange/10 transition-colors"
            >
              {expandedItems.includes(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
        </div>
        
        {/* Children */}
        {category.children && expandedItems.includes(category.id) && (
          <div className="mt-2">
            {renderCatalogItems(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="lg:w-1/3 xl:w-1/4">
      <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-kangyur-dark">Catalog Structure</h2>
          
          <button
            onClick={onToggleDetails}
            className="lg:hidden p-2 text-kangyur-dark/70 hover:text-kangyur-orange rounded-md transition-colors"
            aria-label="Toggle details panel"
          >
            <PanelRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-1">
          {renderCatalogItems(items)}
        </div>
      </div>
    </div>
  );
};

export default CatalogTree;
