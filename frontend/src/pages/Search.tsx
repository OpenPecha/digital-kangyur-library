import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/ui/molecules/Footer';
import KarchagSearch from '@/components/catalog/KarchagSearch';
import KarchagFrame from '@/components/catalog/KarchagFrame';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t, isTibetan } = useLanguage();

  // First, fetch all main categories to find Tantra
  const { data: mainCategoriesData = [] } = useQuery({
    queryKey: ['karchag', 'main-categories', { is_active: 'true' }],
    queryFn: async () => {
      const response = await api.getKarchagMainCategories({ is_active: 'true' });
      return response.categories || [];
    },
  });

  // Find Tantra main category
  const tantraMainCategory = mainCategoriesData.find(
    (cat: any) => cat.name_english?.toLowerCase() === 'tantra'
  );

  // Fetch all subcategories and filter for Tantra subcategories that match the search
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['karchag', 'sub-categories', 'search', query, tantraMainCategory?.id],
    queryFn: async () => {
      if (!query || !tantraMainCategory) return [];
      
      // Search all subcategories with the query
      const response = await api.getKarchagSubCategories({ 
        search: query,
        is_active: 'true'
      });
      
      // Filter to only include Tantra subcategories
      return (response.categories || []).filter(
        (subcat: any) => subcat.main_category_id === tantraMainCategory.id
      );
    },
    enabled: !!query && !!tantraMainCategory,
  });

  // Helper function to create slug from main category ID
  const createSlug = (id: string): string => {
    return id.toLowerCase().replace(/\s+/g, '-');
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <KarchagSearch />
      
      <div className="container mx-auto px-4 py-8">
        {(() => {
          if (isLoading) {
            return (
              <div className="text-center py-12">
                <p className="text-gray-600">{t('loading') || 'Loading...'}</p>
              </div>
            );
          }
          
          if (!query) {
            return (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  {t('enterSearchQuery') || 'Please enter a search query'}
                </p>
              </div>
            );
          }
          
          return (
            <>
              <div className="mb-8 text-center">
                <h2 className={`text-3xl font-bold mb-2 ${isTibetan ? 'tibetan' : ''}`}>
                  {t('searchResults') || 'Search Results'}
                </h2>
                <p className="text-gray-600">
                  {t('searchResultsFor') || 'Search results for'}{' '}
                  <span className="font-bold">"{query}"</span>
                </p>
                <p className="text-gray-500 mt-2">
                  {searchResults.length} {searchResults.length === 1 ? (t('result') || 'result') : (t('results') || 'results')} {t('found') || 'found'}
                </p>
              </div>

              {searchResults.length > 0 ? (
                <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24 flex-wrap">
                  {searchResults.map((subcategory: any) => (
                    <KarchagFrame
                      key={subcategory.id}
                      label={{
                        tibetan: subcategory.name_tibetan || '',
                        english: subcategory.name_english || ''
                      }}
                      fontSize="xx-large"
                      link={`/catalog?category=${createSlug(tantraMainCategory.id)}&item=${subcategory.id}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">
                    {t('noResultsFound') || 'No results found for'} "{query}"
                  </p>
                  <p className="text-gray-500 mt-2">
                    {t('tryDifferentSearch') || 'Try a different search term'}
                  </p>
                </div>
              )}
            </>
          );
        })()}
      </div>
      
      <Footer />
    </div>
  );
};

export default Search;
