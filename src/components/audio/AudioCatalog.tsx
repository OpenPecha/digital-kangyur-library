
import React from 'react';
import { ChevronRight, ChevronDown, Headphones, BookOpen } from 'lucide-react';
import { CatalogItem } from '@/types/catalog';
import { cn } from '@/lib/utils';

interface AudioCatalogProps {
  items: CatalogItem[];
  expandedItems: string[];
  selectedItem: string;
  onToggleExpand: (id: string) => void;
  onSelectItem: (id: string) => void;
}

const AudioCatalog: React.FC<AudioCatalogProps> = ({ 
  items, 
  expandedItems, 
  selectedItem, 
  onToggleExpand, 
  onSelectItem,
}) => {
  
  // Recursive function to render catalog items with proper nesting
  const renderCatalogItems = (itemsToRender: CatalogItem[], level: number = 0) => {
    return itemsToRender.map((category) => (
      <div key={category.id} className="mb-1">
        <div
          className={cn(
            "flex items-center py-2 px-2 rounded-md hover:bg-kangyur-orange/5 transition-colors",
            level === 0 ? 'border-b border-gray-100 mb-2' : '',
            level > 0 ? `pl-${2 + level * 4}` : '',
            selectedItem === category.id ? "bg-kangyur-orange/10 text-kangyur-orange font-medium" : "text-gray-700"
          )}
        >
          {category.children && category.children.length > 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(category.id);
              }}
              className={cn(
                "mr-2 p-1 rounded hover:bg-kangyur-orange/10 transition-colors",
                selectedItem === category.id ? "text-kangyur-orange" : "text-gray-500"
              )}
            >
              {expandedItems.includes(category.id) ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div className="w-6 mr-2"></div>
          )}
          
          <div 
            className="flex items-start cursor-pointer flex-1"
            onClick={() => onSelectItem(category.id)}
          >
            <span className={cn(
              "mr-3 mt-0.5",
              selectedItem === category.id ? "text-kangyur-orange" : "text-kangyur-orange/70"
            )}>
              {category.audioUrl ? (
                <Headphones className="h-4 w-4" />
              ) : (
                <BookOpen className="h-4 w-4" />
              )}
            </span>
            
            <div className="flex-1">
              <div className={cn(
                "text-sm leading-tight",
                level === 0 ? "font-semibold text-kangyur-maroon" : "",
                selectedItem === category.id ? "font-medium text-kangyur-orange" : ""
              )}>
                {category.title.english}
              </div>
              <div className="tibetan text-xs text-gray-500 mt-0.5">
                {category.title.tibetan}
              </div>
              {category.duration && (
                <div className="text-xs text-kangyur-orange/70 mt-1 font-medium">
                  {category.duration}
                </div>
              )}
              {category.count && (
                <div className="text-xs text-gray-400 mt-1">
                  {category.count} texts
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Children */}
        {category.children && expandedItems.includes(category.id) && (
          <div className="ml-2 border-l-2 border-kangyur-orange/10 pl-2">
            {renderCatalogItems(category.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-kangyur-maroon flex items-center">
          <BookOpen className="w-5 h-5 mr-2 text-kangyur-orange" />
          Audio Archive
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Browse recordings by category
        </p>
      </div>
      <div className="p-4">
        <div className="space-y-1 max-h-[70vh] overflow-y-auto pr-2">
          {renderCatalogItems(items)}
        </div>
      </div>
    </div>
  );
};

export default AudioCatalog;
