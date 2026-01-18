
import React from 'react';
import { Link } from 'react-router-dom';
import { CatalogItem } from '@/types/catalog';
import { cn } from '@/lib/utils';
import useLanguage from '@/hooks/useLanguage';

interface CatalogItemDetailsProps {
  selectedItem: CatalogItem | null;
  showDetails: boolean;
}

const CatalogItemDetails = ({ selectedItem, showDetails }: CatalogItemDetailsProps) => {
    const { isEnglish,t } = useLanguage();
  
  return (
    <div 
      className={cn(
        "bg-gray-50 rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]",
        showDetails ? "block" : "hidden lg:block",
        isEnglish ? "english" : "tibetan"
      )}
    >
      {selectedItem ? (
        <div className="text-center max-w-md">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {isEnglish ? selectedItem.title.english : selectedItem.title.tibetan}
          </h2>
          
          {selectedItem.description && (
            <p className="text-gray-600 mb-6">
              {selectedItem.description}
            </p>
          )}
          
          <div className="mb-6">
            <span className="inline-block bg-kangyur-cream px-3 py-1 rounded-full text-sm font-medium text-gray-700">
              {selectedItem.count || 0} {t("textsCount")}
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {selectedItem.id === 'golden-sutra' ? (
              <Link
                to={`/texts/${selectedItem.id}`}
                className="px-4 py-2 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                {t("viewText")}
              </Link>
            ) : (
              <Link
                to={`/texts?category=${selectedItem.id}`}
                className="px-4 py-2 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                {t("browseTexts")}
              </Link>
            )}
            
            <Link
              to={`/history?category=${selectedItem.id}`}
              className="px-4 py-2 border border-kangyur-maroon/20 text-kangyur-maroon font-medium rounded-md hover:bg-kangyur-maroon/5 transition-colors"
            >
              {t("historicalContext")}
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
          <h3 className="text-xl font-medium text-gray-800 mb-2">
            {t("selectCategory")}
          </h3>
          <p className="text-gray-600">
            {t("selectCategoryDesc")}
          </p>
        </div>
      )}
    </div>
  );
};

export default CatalogItemDetails;
