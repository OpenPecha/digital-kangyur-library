import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Footer from '@/components/ui/molecules/Footer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import KarchagTextCardList from '@/components/catalog/KarchagTextCardList';
import CatalogBreadcrumb from '@/components/catalog/CatalogBreadcrumb';
import CatalogTreeList from "@/components/catalog/CatalogTreeList";
import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
import MainKarchagFrames from '@/components/catalog/MainKarchagFrames';
import KarchagFrame from '@/components/catalog/KarchagFrame';
import { paginateItems } from '@/utils/paginationUtils';
import useLanguage from '@/hooks/useLanguage';
import api from '@/utils/api';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const { t, isTibetan } = useLanguage();

  // Get URL parameters
  const category = searchParams.get('category');

  // Fetch karchag main category by ID when category exists in URL
  const { data: selectedMainCategory, isLoading: loadingMainCategory } = useQuery({
    queryKey: ['karchag', 'main-category', category],
    queryFn: async () => {
      if (!category) return null;
      const response = await api.getKarchagMainCategoryById(category);
      return response;
    },
    enabled: !!category && !selectedItem, // Only fetch when a main category is selected but no subcategory
  });

  // Fetch karchag subcategories for the selected main category
  const { data: karchagSubCategoriesData = [], isLoading: loadingSubCategories } = useQuery({
    queryKey: ['karchag', 'sub-categories', category],
    queryFn: async () => {
      if (!category) return [];
      const response = await api.getKarchagSubCategories({ 
        main_category_id: category,
        is_active: 'true'
      });
      return response.categories || [];
    },
    enabled: !!category && !selectedItem, // Only fetch when a main category is selected but no subcategory
  });

  // Fetch selected subcategory details when a subcategory is selected
  const { data: selectedSubCategory, isLoading: loadingSelectedSubCategory } = useQuery({
    queryKey: ['karchag', 'sub-category', selectedItem],
    queryFn: async () => {
      if (!selectedItem) return null;
      const response = await api.getKarchagSubCategoryById(selectedItem);
      return response;
    },
    enabled: !!selectedItem,
  });

  // Fetch texts for the selected subcategory if it doesn't have content
  const { data: subCategoryTextsData = [], isLoading: loadingTexts } = useQuery({
    queryKey: ['karchag', 'texts', selectedItem],
    queryFn: async () => {
      if (!selectedItem) return [];
      const response = await api.getKarchagTexts({ 
        sub_category_id: selectedItem,
        is_active: 'true'
      });
      return response.texts || [];
    },
    enabled: !!selectedItem && !!selectedSubCategory && !selectedSubCategory.content, // Only fetch texts if subcategory doesn't have content
  });

  // Parse URL parameters on component mount
  useEffect(() => {
    const queryParam = searchParams.get('q');
    const itemParam = searchParams.get('item');
    const pageParam = searchParams.get('page');
    if (queryParam) {
      setSearchQuery(queryParam);
    }
    if (itemParam) {
      setSelectedItem(itemParam);
    }
    if (pageParam) {
      setCurrentPage(parseInt(pageParam, 10));
    } else {
      setCurrentPage(1);
    }
  }, [searchParams]);

  // Update URL when search, selection, or page changes
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    if (searchQuery) {
      newParams.set('q', searchQuery);
    } else {
      newParams.delete('q');
    }
    if (selectedItem) {
      newParams.set('item', selectedItem);
    } else {
      newParams.delete('item');
    }
    if (currentPage > 1) {
      newParams.set('page', currentPage.toString());
    } else {
      newParams.delete('page');
    }
    setSearchParams(newParams);
  }, [searchQuery, selectedItem, currentPage]);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Get selected item details from fetched subcategory
  const selectedItemDetails = selectedSubCategory ? {
    id: selectedSubCategory.id,
    title: {
      tibetan: selectedSubCategory.name_tibetan || '',
      english: selectedSubCategory.name_english || ''
    },
    content: selectedSubCategory.content,
    only_content: selectedSubCategory.only_content
  } : null;

  // Transform texts from API to the format expected by TextCard
  const transformTextsForDisplay = (texts: any[]) => {
    return texts.map((text) => {
      let pages: number | undefined;
      if (text.yeshe_de_volume_length) {
        const length = Number.parseInt(text.yeshe_de_volume_length, 10);
        if (!Number.isNaN(length) && length > 0) {
          pages = length;
        }
      }
      
      return {
        id: text.id,
        title: {
          tibetan: text.tibetan_title || '',
          english: text.english_title || '',
          sanskrit: text.sanskrit_title || undefined,
          chinese: text.chinese_title || undefined
        },
        category: selectedItemDetails?.title.english || '',
        pages,
        volume: text.yeshe_de_volume_number || undefined,
        description: '', // Texts don't have description in the schema
        keywords: []
      };
    });
  };

  // Get paginated text entries for the selected item
  const getTextCardItems = () => {
    const transformedTexts = transformTextsForDisplay(subCategoryTextsData);
    return paginateItems(transformedTexts, currentPage, 10);
  };

  // Handler for selecting an item
  const handleItemSelect = (id: string) => {
    setSelectedItem(id === selectedItem ? null : id);
    setCurrentPage(1);
  };

  // Handler to reset selected item and search query when clicking main "Categories" breadcrumb
  const handleBreadcrumbCatalogClick = () => {
    setSearchQuery('');
    setSelectedItem(null);
    setCurrentPage(1);
    const newParams = new URLSearchParams();
    setSearchParams(newParams);
  };

  // Renders a catalog item with its children
  const renderCatalogItem = (item: any) => {
    const isSelected = item.id === selectedItem;
    return (
      <div key={item.id} className="mb-4">
        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            isSelected ? 'bg-indigo-100 border-indigo-300' : 'hover:bg-gray-50'
          }`} 
          onClick={() => handleItemSelect(item.id)}
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className={`text-xl mb-1 ${isTibetan ? 'tibetan' : 'font-medium text-gray-700'}`}>
                {isTibetan ? item.title.tibetan : item.title.english}
              </h3>
              {item.description && (
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              )}
            </div>
            {item.count !== undefined && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {item.count} {item.count === 1 ? (t('text') || 'text') : (t('texts') || 'texts')}
              </span>
            )}
          </div>
        </div>
        
        {isSelected && item.children && item.children.length > 0 && (
          <div className="ml-6 mt-2 border-l-2 border-indigo-200 pl-4">
            {item.children.map((child: any) => renderCatalogItem(child))}
          </div>
        )}
      </div>
    );
  };

  // Get paginated data for display
  const {
    items: paginatedItems,
    pagination
  } = selectedItem && selectedSubCategory && !selectedSubCategory.content
    ? getTextCardItems() 
    : {
        items: [],
        pagination: {
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          itemsPerPage: 10,
          hasNextPage: false,
          hasPrevPage: false
        }
      };

  const loading = loadingMainCategory || loadingSubCategories || loadingSelectedSubCategory || loadingTexts;

  if (loading && category) {
    return (
      <div className="min-h-screen bg-white w-full flex items-center justify-center">
        <p className="text-kangyur-dark/60">{t('loading') || 'Loading categories...'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white w-full">
      <CatalogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Karchag Frames - show only when no search, selected item, or category */}
      {!searchQuery && !selectedItem && !category && (
        <MainKarchagFrames />
      )}

      {/* Subcategories - show when a main category is selected but no specific subcategory is selected */}
      {category && !searchQuery && !selectedItem && selectedMainCategory && (
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className={`text-3xl font-bold text-center mb-2 ${isTibetan ? 'tibetan' : ''}`}>
              {isTibetan ? selectedMainCategory.name_tibetan : selectedMainCategory.name_english}
            </h2>
            {((isTibetan && selectedMainCategory.description_tibetan) || (!isTibetan && selectedMainCategory.description_english)) && (
              <p className="text-gray-600 text-center max-w-3xl mx-auto">
                {isTibetan ? (selectedMainCategory.description_tibetan || selectedMainCategory.description_english) : (selectedMainCategory.description_english || selectedMainCategory.description_tibetan)}
              </p>
            )}
          </div>
          
          {karchagSubCategoriesData && karchagSubCategoriesData.length > 0 ? (
            <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24">
              {karchagSubCategoriesData.map((subcategory: any) => (
                <KarchagFrame
                  key={subcategory.id}
                  label={{
                    tibetan: subcategory.name_tibetan || '',
                    english: subcategory.name_english || ''
                  }}
                  fontSize="xx-large"
                  link={`/catalog?category=${category}&item=${subcategory.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600">
              <p>{t('noSubcategories') || 'No subcategories available for this category.'}</p>
            </div>
          )}
        </div>
      )}
      
      {/* Selected Subcategory or Search Results */}
      {selectedItem || searchQuery ? (
        <div className="container mx-auto px-4 py-8">
          {/* Selected Subcategory Header with Breadcrumb */}
          {selectedItem && selectedItemDetails && !searchQuery && (
            <div className="mb-8">
              <div className="relative mb-4">
                <CatalogBreadcrumb
                  category={category || undefined}
                  selectedItem={selectedItem}
                  catalogData={[]}
                  onCatalogClick={handleBreadcrumbCatalogClick}
                />
                <h2 className={`text-3xl font-bold text-center ${isTibetan ? 'tibetan' : ''}`}>
                  {isTibetan ? selectedItemDetails.title.tibetan : selectedItemDetails.title.english}
                </h2>
              </div>
            </div>
          )}
          
          {/* Search Results Header */}
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                {t('searchResultsFor')}{' '}
                <span className="font-bold">{searchQuery}</span>
              </p>
              <button 
                onClick={() => setSearchQuery('')} 
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                {t('clearSearch')}
              </button>
            </div>
          )}

          {/* Selected subcategory content or text list or search results */}
          {(() => {
            // Render subcategory content or text list
            if (selectedItem && selectedSubCategory) {
              if (selectedSubCategory.content) {
                // Display content if subcategory has content
                return (
                  <div className="max-w-4xl mx-auto">
                    <div className="prose prose-lg max-w-none">
                      <div className={`whitespace-pre-line ${isTibetan ? 'tibetan text-lg leading-relaxed' : 'text-gray-700'}`}>
                        {selectedSubCategory.content}
                      </div>
                    </div>
                  </div>
                );
              } else {
                // Display text list if subcategory doesn't have content
                if (loadingTexts) {
                  return null;
                }
                if (paginatedItems.length > 0) {
                  return (
                    <KarchagTextCardList
                      items={paginatedItems}
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  );
                }
                return (
                  <div className="text-center text-gray-600 py-12">
                    <p>{t('noTexts') || 'No texts available in this subcategory.'}</p>
                  </div>
                );
              }
            }
            
            // Render search results
            if (searchQuery) {
              return (
                <>
                  <CatalogTreeList 
                    items={[]}
                    selectedItem={selectedItem}
                    onItemSelect={handleItemSelect}
                  />
                  <CatalogEmptyState />
                </>
              );
            }
            
            return null;
          })()}
        </div>
      ) : null}
      <Footer />
    </div>
  );
};

export default Catalog;
