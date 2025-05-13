import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import KarchagFrame from '@/components/catalog/KarchagFrame';
import KarchagTextCardList from '@/components/catalog/KarchagTextCardList';
import { catalogData } from '@/data/catalogData';
import { filterCatalogItems, findItemInTree } from '@/utils/catalogUtils';
import { paginateItems } from '@/utils/paginationUtils';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  
  // Get URL parameters
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  
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
    // Scroll to top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Filter the catalog data based on search and category
  const getFilteredCatalog = () => {
    let filtered = catalogData;
    
    // First apply category filter if present
    if (category) {
      filtered = filtered.filter(item => item.id === category);
    }
    
    // Then apply search filter if present
    if (searchQuery) {
      filtered = filterCatalogItems(filtered, searchQuery);
    }
    
    return filtered;
  };
  
  const filteredCatalog = getFilteredCatalog();
  
  // Get selected item details
  const selectedItemDetails = selectedItem 
    ? findItemInTree(catalogData, selectedItem)
    : null;
  
  // Generate mock text entries for the selected item
  const getTextEntriesForSelectedItem = () => {
    if (!selectedItemDetails) return [];
    
    // For demonstration, create mock entries based on the count in the selected item
    const count = selectedItemDetails.count || 10;
    const mockTexts = Array.from({ length: count }).map((_, index) => ({
      id: `${selectedItem}-text-${index + 1}`,
      title: {
        tibetan: `${selectedItemDetails.title.tibetan} ${index + 1}`,
        english: `${selectedItemDetails.title.english} Text ${index + 1}`,
        sanskrit: index % 2 === 0 ? `Sanskrit Title ${index + 1}` : undefined,
      },
      category: selectedItemDetails.title.english,
      pages: Math.floor(Math.random() * 100) + 10,
      volume: `${Math.floor(Math.random() * 10) + 1}`,
      description: `This is a sample text from the ${selectedItemDetails.title.english} category. Text number ${index + 1}.`,
      keywords: ["buddhism", selectedItemDetails.id, `keyword-${index}`]
    }));
    
    return mockTexts;
  };
  
  // Get paginated text entries for the selected item
  const getTextCardItems = () => {
    const allTexts = getTextEntriesForSelectedItem();
    return paginateItems(allTexts, currentPage, 10);
  };
  
  // Generate mock text entries for the discipline category
  const getDisciplineTextEntries = () => {
    const disciplineItem = catalogData.find(item => item.id === 'discipline');
    if (!disciplineItem) return [];
    
    // For demonstration, create mock entries based on the count of the discipline category
    const count = disciplineItem.count || 30; // Use the actual count or default to 30
    
    // Create sample text IDs that will work with the TextDetail page
    const textIds = [
      'golden-sutra', // This ID matches the existing textData in TextDetail.tsx
      'vinaya-sutra',
      'discipline-rules'
    ];
    
    const mockTexts = Array.from({ length: count }).map((_, index) => ({
      id: index < textIds.length ? textIds[index] : `discipline-text-${index + 1}`,
      title: {
        tibetan: `འདུལ་བ་གཞུང་ ${index + 1}`,
        english: `Discipline Text ${index + 1}`,
        sanskrit: index % 3 === 0 ? `Vinaya Text ${index + 1}` : undefined,
      },
      category: "འདུལ་བ།",
      pages: Math.floor(Math.random() * 100) + 30,
      volume: `${Math.floor(Math.random() * 5) + 1}`,
      description: `This is a text from the Discipline (Vinaya) category of the Kangyur. Text number ${index + 1}.`,
      keywords: ["discipline", "vinaya", "monk", `section-${Math.floor(index/5) + 1}`]
    }));
    
    return mockTexts;
  };
  
  // Get paginated text entries for the discipline category
  const getDisciplineCardItems = () => {
    const allTexts = getDisciplineTextEntries();
    return paginateItems(allTexts, currentPage, 15); // 15 items per page
  };
  
  // Handler for selecting an item
  const handleItemSelect = (id: string) => {
    setSelectedItem(id === selectedItem ? null : id);
    setCurrentPage(1); // Reset to first page when changing selection
  };
  
  // Handler for clearing the category filter
  const handleClearCategory = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('category');
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
              <h3 className="text-xl tibetan mb-1">{item.title.tibetan}</h3>
              <h4 className="font-medium text-gray-700">{item.title.english}</h4>
              {item.description && (
                <p className="text-gray-600 text-sm mt-2">{item.description}</p>
              )}
            </div>
            {item.count !== undefined && (
              <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                {item.count} {item.count === 1 ? 'text' : 'texts'}
              </span>
            )}
          </div>
        </div>
        
        {/* Show children if this item is selected */}
        {isSelected && item.children && item.children.length > 0 && (
          <div className="ml-6 mt-2 border-l-2 border-indigo-200 pl-4">
            {item.children.map((child: any) => renderCatalogItem(child))}
          </div>
        )}
      </div>
    );
  };

  // Get discourse subsection frames data
  const getDiscourseSubsections = () => {
    const discourseItem = catalogData.find(item => item.id === 'discourses');
    if (!discourseItem || !discourseItem.children) return [];
    
    // Find the specific subsections mentioned (Prajnaparamita, Avatamsaka, Ratnakuta)
    const subsections = [
      {
        id: 'discipline',
        tibetan: 'འདུལ་བ།',
        link: '/catalog?category=discipline',
      },
      {
        id: 'prajnaparamita',
        tibetan: 'ཤེར་ཕྱིན།',
        link: '/catalog?item=prajnaparamita',
      },
      {
        id: 'avatamsaka',
        tibetan: 'ཕལ་ཆེན།',
        link: '/catalog?item=avatamsaka',
      },
      {
        id: 'ratnakuta',
        tibetan: 'དཀོན་བརྩེགས།',
        link: '/catalog?item=ratnakuta',
      },
      {
        id: 'general-sutras',
        tibetan: 'མདོ་སྡེ།',
        link: '/catalog?item=general-sutras',
      }
    ];
    
    return subsections;
  };
  
  // Get paginated data for display
  const { items: paginatedItems, pagination } = selectedItem 
    ? getTextCardItems() 
    : category === 'discipline' && !searchQuery && !selectedItem
    ? getDisciplineCardItems()
    : { items: [], pagination: { currentPage: 1, totalPages: 1, totalItems: 0, itemsPerPage: 10, hasNextPage: false, hasPrevPage: false } };
  
  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      {/* Hero Section with Search */}
      <CatalogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Karchag Frames Section - show only when no search, selected item, or category */}
      {!searchQuery && !selectedItem && !category && (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tibetan mb-4">དཀར་ཆག</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse the Kangyur collection by selecting one of the categories below
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-10 md:gap-24">
            <KarchagFrame 
              tibetanText="མདོ།" 
              fontSize="xxx-large"
              link="/catalog?category=discourses" 
            />
            <KarchagFrame 
              tibetanText="རྒྱུད།" 
              fontSize="xxx-large"
              link="/catalog?category=tantra" 
            />
          </div>
        </div>
      )}

      {/* Discourse Subsections Frames - show when discourse category is selected but no specific item is selected */}
      {category === 'discourses' && !searchQuery && !selectedItem && (
        <div className="container mx-auto px-4 py-12">
          <div className="relative mb-12">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 breadcrumbs text-sm">
              <span className="text-gray-500">
                <Link to="/catalog" className="hover:text-indigo-600 transition">དཀར་ཆག</Link>
                <span className="mx-2">/</span>
                <span className="text-indigo-600 font-medium">མདོ།</span>
              </span>
            </div>
            <h2 className="text-3xl font-bold tibetan text-center">མདོ།</h2>
          </div>
          <div className="flex flex-nowrap justify-center overflow-x-auto pb-6 gap-5 md:gap-2">
            {getDiscourseSubsections().map(subsection => (
              <KarchagFrame 
                key={subsection.id}
                tibetanText={subsection.tibetan} 
                link={subsection.link}
                fontSize="xx-large"
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Category or Search Results */}
      {((category && category !== 'discourses') || searchQuery || selectedItem) && (
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          {category && !searchQuery && !selectedItem && (
            <div className="mb-8">
              <div className="relative mb-4">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 breadcrumbs text-sm">
                  <span className="text-gray-500">
                    <Link to="/catalog" className="hover:text-indigo-600 transition">དཀར་ཆག</Link>
                    
                    {/* For discipline category, show it as a child of discourses */}
                    {category === 'discipline' ? (
                      <>
                        <span className="mx-2">/</span>
                        <Link to="/catalog?category=discourses" className="hover:text-indigo-600 transition">མདོ།</Link>
                        <span className="mx-2">/</span>
                        <span className="text-indigo-600 font-medium">འདུལ་བ།</span>
                      </>
                    ) : (
                      <>
                        <span className="mx-2">/</span>
                        <span className="text-indigo-600 font-medium">
                          {category === 'tantra' ? 'རྒྱུད།' : category === 'discourses' ? 'མདོ།' : ''}
                        </span>
                      </>
                    )}
                  </span>
                </div>
                <h2 className="text-3xl font-bold tibetan text-center">
                  {category === 'tantra' ? 'རྒྱུད།' : category === 'discipline' ? 'འདུལ་བ།' : category === 'discourses' ? 'མདོ།' : ''}
                </h2>
              </div>
            </div>
          )}
          
          {/* Search Results Header */}
          {searchQuery && (
            <div className="mb-8 text-center">
              <p className="text-gray-600">
                Showing search results for: <span className="font-bold">{searchQuery}</span>
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                Clear Search
              </button>
            </div>
          )}
          
          {/* Selected Item Details */}
          {selectedItemDetails && (
            <div className="mb-8 p-6 bg-indigo-50 rounded-lg">
              <div className="breadcrumbs text-sm mb-4">
                <span className="text-gray-500">
                  <Link to="/catalog" className="hover:text-indigo-600 transition">དཀར་ཆག</Link>
                  
                  {/* Find the parent category */}
                  {(() => {
                    // Check if this is a top-level item or a child item
                    const isTopLevel = catalogData.some(item => item.id === selectedItemDetails.id);
                    if (!isTopLevel) {
                      // Find the parent category by iterating through the catalog data
                      for (const category of catalogData) {
                        if (category.children) {
                          // Direct child of a top-level category
                          if (category.children.some(child => child.id === selectedItemDetails.id)) {
                            return (
                              <>
                                <span className="mx-2">/</span>
                                <Link 
                                  to={`/catalog?category=${category.id}`} 
                                  className="hover:text-indigo-600 transition"
                                >
                                  {category.title.tibetan}
                                </Link>
                              </>
                            );
                          }
                          
                          // Check for nested children (two levels deep)
                          for (const child of category.children) {
                            if (child.children && child.children.some(grandchild => grandchild.id === selectedItemDetails.id)) {
                              return (
                                <>
                                  <span className="mx-2">/</span>
                                  <Link 
                                    to={`/catalog?category=${category.id}`} 
                                    className="hover:text-indigo-600 transition"
                                  >
                                    {category.title.tibetan}
                                  </Link>
                                  <span className="mx-2">/</span>
                                  <Link 
                                    to={`/catalog?item=${child.id}`} 
                                    className="hover:text-indigo-600 transition"
                                  >
                                    {child.title.tibetan}
                                  </Link>
                                </>
                              );
                            }
                          }
                        }
                      }
                    }
                    return null;
                  })()}
                  
                  <span className="mx-2">/</span>
                  <span className="text-indigo-600 font-medium">{selectedItemDetails.title.tibetan}</span>
                </span>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl tibetan mb-2">{selectedItemDetails.title.tibetan}</h2>
                  <h3 className="text-xl font-semibold text-gray-800">{selectedItemDetails.title.english}</h3>
                  {selectedItemDetails.description && (
                    <p className="text-gray-600 mt-2">{selectedItemDetails.description}</p>
                  )}
                </div>
                {selectedItemDetails.count !== undefined && (
                  <span className="bg-indigo-200 text-indigo-800 px-4 py-2 rounded-full text-sm">
                    {selectedItemDetails.count} {selectedItemDetails.count === 1 ? 'text' : 'texts'}
                  </span>
                )}
              </div>
              <button 
                onClick={() => setSelectedItem(null)}
                className="mt-4 px-4 py-2 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
              >
                Close Details
              </button>
            </div>
          )}
          
          {/* Display text cards if a specific item is selected or if in discipline category */}
          {((selectedItem && paginatedItems.length > 0) || (category === 'discipline' && !searchQuery && !selectedItem && paginatedItems.length > 0)) ? (
            <KarchagTextCardList
              items={paginatedItems}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            /* Otherwise render catalog items */
            <div className="space-y-2">
              {filteredCatalog.map(item => renderCatalogItem(item))}
              
              {filteredCatalog.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No items found</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Catalog;
