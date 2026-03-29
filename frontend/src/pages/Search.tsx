import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/ui/molecules/Footer';
import KarchagSearch from '@/components/catalog/KarchagSearch';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';
import { cn } from '@/lib/utils';
import { pickBilingualDisplay, pickBilingualText } from '@/utils/localizedContent';

const Search: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { t, isTibetan } = useLanguage();

  // Fetch search results using the new search endpoint
  const { data: searchResults, isLoading } = useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) {
        return {
          results: {
            texts: { items: [], total: 0 },
            subCategories: { items: [], total: 0 },
          },
          query: '',
        };
      }
      const response = await api.search({ q: query, type: 'all' });
      return response;
    },
    enabled: !!query,
  });

  const subCategories = searchResults?.results?.subCategories?.items || [];
  const texts = searchResults?.results?.texts?.items || [];
  const totalResults = (subCategories.length || 0) + (texts.length || 0);

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
              
           
            

              {totalResults > 0 ? (
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* Subcategories Section */}
                  {subCategories.length > 0 && (
                    <div>
                      <h3 className={`text-2xl font-semibold mb-4 ${isTibetan ? 'tibetan' : ''}`}>
                        {t('subCategory') || 'Subcategories'} ({subCategories.length})
                      </h3>
                      <div className="space-y-2">
                        {subCategories.map((subcategory: any) => {
                          const mainCategoryId = subcategory.main_category?.id || '';
                          const subName = pickBilingualDisplay(isTibetan, subcategory.name_tibetan, subcategory.name_english);
                          const subDesc = pickBilingualText(isTibetan, subcategory.description_tibetan, subcategory.description_english);
                          const mainName = subcategory.main_category
                            ? pickBilingualText(isTibetan, subcategory.main_category.name_tibetan, subcategory.main_category.name_english)
                            : '';
                          return (
                            <Link
                              key={subcategory.id}
                              to={`/catalog?category=${createSlug(mainCategoryId)}&item=${subcategory.id}`}
                              className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4
                                    className={cn(
                                      'text-lg font-medium mb-1',
                                      subName.scriptIsTibetan ? 'tibetan' : 'text-gray-800'
                                    )}
                                  >
                                    {subName.text}
                                  </h4>
                                  {subDesc && (
                                    <p
                                      className={cn(
                                        'text-sm text-gray-600 mt-2',
                                        pickBilingualDisplay(isTibetan, subcategory.description_tibetan, subcategory.description_english).scriptIsTibetan && 'tibetan'
                                      )}
                                    >
                                      {subDesc}
                                    </p>
                                  )}
                                  {subcategory.main_category && (
                                    <p className="text-xs text-gray-500 mt-2">
                                      {t('category') || 'Category'}: {mainName}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Texts Section */}
                  {texts.length > 0 && (
                    <div>
                      <h3 className={`text-2xl font-semibold mb-4 ${isTibetan ? 'tibetan' : ''}`}>
                        {t('text') || 'Texts'} ({texts.length})
                      </h3>
                      <div className="space-y-2">
                        {texts.map((text: any) => {
                          const textTitle = pickBilingualDisplay(isTibetan, text.title?.tibetan, text.title?.english);
                          const subCatName = text.sub_category
                            ? pickBilingualText(isTibetan, text.sub_category.name_tibetan, text.sub_category.name_english)
                            : '';
                          return (
                          <Link
                            key={text.id}
                            to={`/texts/${text.id}`}
                            className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4
                                  className={cn(
                                    'text-lg font-medium mb-1',
                                    textTitle.scriptIsTibetan ? 'tibetan' : 'text-gray-800'
                                  )}
                                >
                                  {textTitle.text}
                                </h4>
                                {text.title?.sanskrit && (
                                  <p className="text-sm text-gray-600 italic mb-1">
                                    {text.title.sanskrit}
                                  </p>
                                )}
                                {text.sub_category && (
                                  <p className="text-xs text-gray-500 mt-2">
                                    {t('subCategory') || 'Subcategory'}: {subCatName}
                                  </p>
                                )}
                                {text.derge_id && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    {t('dergeId') || 'Derge ID'}: {text.derge_id}
                                  </p>
                                )}
                              </div>
                            </div>
                          </Link>
                        );
                        })}
                      </div>
                    </div>
                  )}
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
      
    </div>
  );
};

export default Search;
