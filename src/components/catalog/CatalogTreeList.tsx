
import React from "react";
import { catalogData } from "@/data/catalogData";
import { filterCatalogItems } from "@/utils/catalogUtils";

interface CatalogTreeListProps {
  items: any[];
  selectedItem: string | null;
  onItemSelect: (id: string) => void;
}

const CatalogTreeList: React.FC<CatalogTreeListProps> = ({
  items, selectedItem, onItemSelect,
}) => {
  const renderCatalogItem = (item: any) => {
    const isSelected = item.id === selectedItem;
    return (
      <div key={item.id} className="mb-4">
        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-gray-50'
          }`} 
          onClick={() => onItemSelect(item.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-xl tibetan mb-1">{item.title.tibetan}</h3>
              <h4 className="font-medium text-gray-700">{item.title.english}</h4>
              {item.description && (
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              )}
            </div>
            {item.count !== undefined && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {item.count} {item.count === 1 ? 'text' : 'texts'}
              </span>
            )}
          </div>
        </div>
        
        {isSelected && item.children && item.children.length > 0 && (
          <div className="ml-6 mt-2 border-l-2 border-indigo-200 pl-4">
            {item.children.map((child: any) => renderCatalogItem(child))}
          </div>
        )}
      </div>
    );
  };
  return (
    <div className="space-y-2">
      {items.map(item => renderCatalogItem(item))}
    </div>
  );
};

export default CatalogTreeList;
