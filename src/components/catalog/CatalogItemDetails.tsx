
import React from 'react';
import { Link } from 'react-router-dom';
import { CatalogItem } from '@/types/catalog';
import { TextMetadata } from '@/services/api';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface CatalogItemDetailsProps {
  selectedItem: CatalogItem | null;
  showDetails: boolean;
  isLoading?: boolean;
  metadata?: TextMetadata | null;
}

const CatalogItemDetails = ({ 
  selectedItem, 
  showDetails, 
  isLoading = false,
  metadata = null
}: CatalogItemDetailsProps) => {
  return (
    <div 
      className={cn(
        "bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]",
        showDetails ? "block" : "hidden lg:block"
      )}
    >
      {isLoading ? (
        <div className="w-full max-w-md">
          <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-5/6 mb-6" />
          <Skeleton className="h-8 w-36 mx-auto rounded-full" />
        </div>
      ) : selectedItem ? (
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {selectedItem.title.english}
          </h2>
          
          {selectedItem.title.tibetan && (
            <p className="tibetan text-lg text-kangyur-maroon mb-4">
              {selectedItem.title.tibetan}
            </p>
          )}
          
          {/* Show API metadata if available */}
          {metadata && !selectedItem.id.startsWith('category-') && !selectedItem.id.startsWith('subcategory-') ? (
            <>
              {metadata.alternative_title && (
                <p className="text-gray-600 italic mb-3">
                  {metadata.alternative_title}
                </p>
              )}
              
              {metadata.summary && (
                <p className="text-gray-600 mb-4">
                  {metadata.summary}
                </p>
              )}
              
              {metadata.translator && (
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Translator:</span> {metadata.translator}
                </p>
              )}
              
              {metadata.keywords && metadata.keywords.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap justify-center gap-2">
                    {metadata.keywords.map(keyword => (
                      <span key={keyword} className="inline-block bg-kangyur-cream px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            selectedItem.description && (
              <p className="text-gray-600 mb-6">
                {selectedItem.description}
              </p>
            )
          )}
          
          {selectedItem.count !== undefined && selectedItem.count > 0 && (
            <div className="mb-6">
              <span className="inline-block bg-kangyur-cream px-3 py-1 rounded-full text-sm font-medium text-gray-700">
                {selectedItem.count} {selectedItem.count === 1 ? 'text' : 'texts'}
              </span>
            </div>
          )}
          
          <div className="flex flex-wrap justify-center gap-3">
            {/* For text items */}
            {!selectedItem.id.startsWith('category-') && !selectedItem.id.startsWith('subcategory-') ? (
              <Link
                to={`/texts/${selectedItem.id}`}
                className="px-4 py-2 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                View Text
              </Link>
            ) : (
              /* For categories or subcategories */
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
