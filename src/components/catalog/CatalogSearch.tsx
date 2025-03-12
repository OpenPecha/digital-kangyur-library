
import React from 'react';
import { Search } from 'lucide-react';

interface CatalogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CatalogSearch = ({ searchQuery, setSearchQuery }: CatalogSearchProps) => {
  return (
    <div className="bg-white pt-28 pb-8 px-4">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-gold rounded-lg p-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-white" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-3 bg-transparent border-none rounded-md focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/80"
                placeholder="Search the catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSearch;
