
import React from 'react';
import { Search } from 'lucide-react';

interface CatalogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CatalogSearch = ({ searchQuery, setSearchQuery }: CatalogSearchProps) => {
  return (
    <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-gold text-white py-14 relative overflow-hidden">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-white/60" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/60"
              placeholder="Search the catalog..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogSearch;
