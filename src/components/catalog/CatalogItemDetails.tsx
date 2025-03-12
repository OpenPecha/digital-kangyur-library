
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, BookOpen } from 'lucide-react';
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
        "lg:w-2/3 xl:w-3/4",
        showDetails ? "block" : "hidden lg:block"
      )}
    >
      {selectedItem ? (
        <div className="bg-white border border-kangyur-orange/10 rounded-xl shadow-sm p-6 lg:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-kangyur-dark mb-2">
              {selectedItem.title.english}
            </h2>
            <p className="tibetan text-xl text-kangyur-maroon mb-4">
              {selectedItem.title.tibetan}
            </p>
            
            {selectedItem.description && (
              <p className="text-lg text-kangyur-dark/80">
                {selectedItem.description}
              </p>
            )}
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-kangyur-cream p-5 rounded-lg">
              <div className="text-sm text-kangyur-dark/70 mb-1">Texts</div>
              <div className="text-2xl font-bold text-kangyur-dark">
                {selectedItem.count || 0}
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-4">
            {selectedItem.id === 'golden-sutra' ? (
              <Link
                to={`/texts/${selectedItem.id}`}
                className="px-5 py-2.5 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors inline-flex items-center"
              >
                View Text
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            ) : (
              <Link
                to={`/texts?category=${selectedItem.id}`}
                className="px-5 py-2.5 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors inline-flex items-center"
              >
                Browse Texts
                <ChevronRight className="ml-1 w-4 h-4" />
              </Link>
            )}
            
            <Link
              to={`/history?category=${selectedItem.id}`}
              className="px-5 py-2.5 border border-kangyur-maroon/20 text-kangyur-maroon font-medium rounded-md hover:bg-kangyur-maroon/5 transition-colors"
            >
              Historical Context
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-kangyur-cream/50 border border-kangyur-orange/10 rounded-xl p-8 text-center">
          <div className="max-w-md mx-auto">
            <BookOpen className="w-16 h-16 text-kangyur-orange/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-kangyur-dark mb-2">Select a Category</h3>
            <p className="text-kangyur-dark/70">
              Choose a section from the catalog on the left to view detailed information about that part of the Kangyur collection.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogItemDetails;
