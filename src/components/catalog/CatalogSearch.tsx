
import React from 'react';
import { Search } from 'lucide-react';

interface CatalogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CatalogSearch = ({ searchQuery, setSearchQuery }: CatalogSearchProps) => {
  return (
    <div className="bg-gradient-to-r from-kangyur-maroon/90 via-kangyur-orange/80 to-kangyur-gold/70 text-white pt-32 pb-16 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/texture.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
      </div>
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-white/60" />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/60"
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
