
import React from 'react';
import { Link } from 'react-router-dom';
import { CatalogItem } from '@/types/catalog';
import { cn } from '@/lib/utils';

interface CatalogItemDetailsProps {
  selectedItem: CatalogItem | null;
  showDetails: boolean;
}

const CatalogItemDetails = ({ selectedItem, showDetails }: CatalogItemDetailsProps) => {
  return (
    <div 
      className={cn(
        "bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]",
        showDetails ? "block" : "hidden lg:block"
      )}
    >
      {selectedItem ? (
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {selectedItem.title.english}
          </h2>
          <p className="tibetan text-lg text-kangyur-maroon mb-4">
            {selectedItem.title.tibetan}
          </p>
          
          {selectedItem.description && (
            <p className="text-gray-600 mb-6">
              {selectedItem.description}
            </p>
          )}
          
          <div className="mb-6">
            <span className="inline-block bg-kangyur-cream px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              {selectedItem.count || 0} texts
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {selectedItem.id === 'golden-sutra' ? (
              <Link
                to={`/texts/${selectedItem.id}`}
                className="px-4 py-2 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                View Text
              </Link>
            ) : (
              <Link
                to={`/texts?category=${selectedItem.id}`}
                className="px-4 py-2 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                Browse Texts
              </Link>
            )}
            
            <Link
              to={`/history?category=${selectedItem.id}`}
              className="px-4 py-2 border border-kangyur-maroon/20 text-kangyur-maroon font-medium rounded-md hover:bg-kangyur-maroon/5 transition-colors"
            >
              Historical Context
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-md">
          <div className="text-kangyur-orange mb-4">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path>
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-800 mb-2">Select a Category</h3>
          <p className="text-gray-600">
            Choose a section from the catalog on the left to view detailed information about that part of the Kangyur collection.
          </p>
        </div>
      )}
    </div>
  );
};

export default CatalogItemDetails;
