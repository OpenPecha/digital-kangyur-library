
import React from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { searchTexts } from '@/services/api';

interface CatalogSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const CatalogSearch = ({
  searchQuery,
  setSearchQuery
}: CatalogSearchProps) => {
  // Perform search when query has at least 3 characters
  const {
    data: searchResults,
    isLoading: isSearching
  } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => searchTexts(searchQuery),
    enabled: searchQuery.length >= 3,
  });
  
  return (
    <div className="bg-gradient-to-r from-kangyur-maroon to-kangyur-gold text-white py-9 pt-28 relative overflow-hidden">      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {isSearching ? (
                <div className="animate-spin h-5 w-5 border-2 border-white/60 rounded-full border-t-transparent" />
              ) : (
                <Search className="w-5 h-5 text-white/60" />
              )}
            </div>
            <input 
              type="search" 
              className="block w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/60" 
              placeholder="Search the catalog..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
            />
          </div>
          
          {/* Quick search results preview */}
          {searchResults && searchResults.length > 0 && searchQuery.length >= 3 && (
            <div className="mt-2 bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-2 text-sm">
              <p className="text-white/80 px-2 mb-1">Found {searchResults.length} results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogSearch;
