import React, { useState, useEffect, KeyboardEvent } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import useLanguage from '@/hooks/useLanguage';

const KarchagSearch: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  // Initialize search query from URL if on search page
  const urlQuery = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(urlQuery);
  
  // Update search query when URL changes
  useEffect(() => {
    if (location.pathname === '/search') {
      setSearchQuery(urlQuery);
    }
  }, [urlQuery, location.pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="text-white py-9  relative overflow-hidden" style={{ backgroundColor: '#e3821b' }}>      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-white/60" />
            </div>
            <input 
              type="search" 
              className="block w-full pl-10 pr-20 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/60 font-sans" 
              placeholder={t('searchCatalogPlaceholder') || 'Search...'} 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-white/80 hover:text-white transition-colors"
              type="button"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarchagSearch;
