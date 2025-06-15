import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import MainKarchagFrames from '@/components/catalog/MainKarchagFrames';
import DiscourseSubsections from '@/components/catalog/DiscourseSubsections';
import CategoryHeader from '@/components/catalog/CategoryHeader';
import KarchagTextCardList from '@/components/catalog/KarchagTextCardList';
import CatalogBreadcrumb from '@/components/catalog/CatalogBreadcrumb';
import CatalogTreeList from "@/components/catalog/CatalogTreeList";
import CatalogEmptyState from "@/components/catalog/CatalogEmptyState";
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

  // Filter the catalog data based on search and category
  const getFilteredCatalog = () => {
    let filtered = catalogData;
    if (category) {
      filtered = filtered.filter(item => item.id === category);
    }
    if (searchQuery) {
      filtered = filterCatalogItems(filtered, searchQuery);
    }
    return filtered;
  };
  const filteredCatalog = getFilteredCatalog();

  // Get selected item details
  const selectedItemDetails = selectedItem ? findItemInTree(catalogData, selectedItem) : null;

  // Generate mock text entries for the selected item
  const getTextEntriesForSelectedItem = () => {
    if (!selectedItemDetails) return [];

    // If selected item is 'vinaya', return dummy Vinaya texts
    if (selectedItemDetails.id === "vinaya") {
      const vinayaDummyTexts = [
        {
          id: "vinaya-1",
          title: {
            tibetan: "འདུལ་བ་གཞུང་ 1",
            english: "Vinaya text 1",
            sanskrit: "Vinaya Sūtra 1",
          },
          category: "འདུལ་བ། (Discipline)",
          pages: 56,
          volume: "I",
          description:
            "This is some dummy descriptive text for Vinaya text 1. Here you can describe the background, contents, or importance of the first Vinaya text in your collection. འདུལ་བའི་གཞུང་དང་པོའི་དོན་ངོ་སྤྲོད་གནང་བ་ཡིན།",
          keywords: ["discipline", "vinaya", "monastic"],
        },
        {
          id: "vinaya-2",
          title: {
            tibetan: "འདུལ་བ་གཞུང་ 2",
            english: "Vinaya text 2",
            sanskrit: "Vinaya Sūtra 2",
          },
          category: "འདུལ་བ། (Discipline)",
          pages: 72,
          volume: "II",
          description:
            "This is some dummy descriptive text for Vinaya text 2. Use this area to provide details, historical context, or notes about the second Vinaya text. འདུལ་བའི་གཞུང་གཉིས་པའི་བརྗོད་དོན་དེ་འདི་ལ་བཀོད།",
          keywords: ["discipline", "vinaya", "bhikṣu"],
        },
      ];
      return vinayaDummyTexts;
    }

    // ... existing generic logic for all other selected items ...
    const count = selectedItemDetails.count || 10;
    const mockTexts = Array.from({
      length: count
    }).map((_, index) => ({
      id: `${selectedItem}-text-${index + 1}`,
      title: {
        tibetan: `${selectedItemDetails.title.tibetan} ${index + 1}`,
        english: `${selectedItemDetails.title.english} Text ${index + 1}`,
        sanskrit: index % 2 === 0 ? `Sanskrit Title ${index + 1}` : undefined
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
    const count = disciplineItem.count || 30;
    const textIds = ['golden-sutra', 'vinaya-sutra', 'discipline-rules'];
    const mockTexts = Array.from({
      length: count
    }).map((_, index) => ({
      id: index < textIds.length ? textIds[index] : `discipline-text-${index + 1}`,
      title: {
        tibetan: `འདུལ་བ་གཞུང་ ${index + 1}`,
        english: `Discipline Text ${index + 1}`,
        sanskrit: index % 3 === 0 ? `Vinaya Text ${index + 1}` : undefined
      },
      category: "འདུལ་བ།",
      pages: Math.floor(Math.random() * 100) + 30,
      volume: `${Math.floor(Math.random() * 5) + 1}`,
      description: `This is a text from the Discipline (Vinaya) category of the Kangyur. Text number ${index + 1}.`,
      keywords: ["discipline", "vinaya", "monk", `section-${Math.floor(index / 5) + 1}`]
    }));
    return mockTexts;
  };

  // Get paginated text entries for the discipline category
  const getDisciplineCardItems = () => {
    const allTexts = getDisciplineTextEntries();
    return paginateItems(allTexts, currentPage, 15);
  };

  // Generate dummy Vinaya texts for the discipline category
  const getVinayaTextsForDisciplineCategory = () => [
    {
      id: "vinaya-1",
      title: {
        tibetan: "འདུལ་བ་གཞུང་ 1",
        english: "Vinaya text 1",
        sanskrit: "Vinaya Sūtra 1",
      },
      category: "འདུལ་བ། (Discipline)",
      pages: 56,
      volume: "I",
      description:
        "This is some dummy descriptive text for Vinaya text 1. Here you can describe the background, contents, or importance of the first Vinaya text in your collection. འདུལ་བའི་གཞུང་དང་པོའི་དོན་ངོ་སྤྲོད་གནང་བ་ཡིན།",
      keywords: ["discipline", "vinaya", "monastic"],
    },
    {
      id: "vinaya-2",
      title: {
        tibetan: "འདུལ་བ་གཞུང་ 2",
        english: "Vinaya text 2",
        sanskrit: "Vinaya Sūtra 2",
      },
      category: "འདུལ་བ། (Discipline)",
      pages: 72,
      volume: "II",
      description:
        "This is some dummy descriptive text for Vinaya text 2. Use this area to provide details, historical context, or notes about the second Vinaya text. འདུལ་བའི་གཞུང་གཉིས་པའི་བརྗོད་དོན་དེ་འདི་ལ་བཀོད།",
      keywords: ["discipline", "vinaya", "bhikṣu"],
    },
  ];

  // Handler for selecting an item
  const handleItemSelect = (id: string) => {
    setSelectedItem(id === selectedItem ? null : id);
    setCurrentPage(1);
  };

  // Handler to reset selected item and search query when clicking main "Catalog" breadcrumb
  const handleBreadcrumbCatalogClick = () => {
    setSearchQuery('');
    setSelectedItem(null);
    setCurrentPage(1);
  };

  // Handler to reset selected item and search query when clicking "Discourses" breadcrumb
  const handleBreadcrumbDiscoursesClick = () => {
    setSearchQuery('');
    setSelectedItem(null);
    setCurrentPage(1);
    // We might want to set the category in the URL to 'discourses' here if not already (optional)
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
  } = selectedItem 
    ? getTextCardItems() 
    : category === 'discipline' && !searchQuery && !selectedItem 
      ? getDisciplineCardItems() 
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

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      <CatalogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Main Karchag Frames - show only when no search, selected item, or category */}
      {!searchQuery && !selectedItem && !category && (
        <MainKarchagFrames />
      )}

      {/* Discourse Subsections - show when discourse category is selected but no specific item is selected */}
      {category === 'discourses' && !searchQuery && !selectedItem && (
        <DiscourseSubsections />
      )}
      
      {/* Category or Search Results */}
      {(category && category !== 'discourses' || searchQuery || selectedItem) && (
        <div className="container mx-auto px-4 py-8">
          {/* Category Header */}
          {category && !searchQuery && !selectedItem && (
            <CategoryHeader
              category={category}
              selectedItem={selectedItem}
            />
          )}

          {/* Selected Item Header with Breadcrumb */}
          {selectedItem && selectedItemDetails && !searchQuery && (
            <div className="mb-8">
              <div className="relative mb-4">
                <CatalogBreadcrumb
                  category={category}
                  selectedItem={selectedItem}
                  onCatalogClick={handleBreadcrumbCatalogClick}
                  onDiscoursesClick={handleBreadcrumbDiscoursesClick}
                />
                <h2 className="text-3xl font-bold tibetan text-center">
                  {selectedItemDetails.title.tibetan}
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
          
          {/* Display Vinaya text cards if category is 'discipline' and there's no search or item selected */}
          {category === 'discipline' && !searchQuery && !selectedItem ? (
            <KarchagTextCardList
              items={getVinayaTextsForDisciplineCategory()}
              currentPage={1}
              totalPages={1}
              onPageChange={() => {}}
            />
          ) : ((selectedItem && paginatedItems.length > 0) ||
            (category === 'discipline' && !searchQuery && !selectedItem && paginatedItems.length > 0)) ? (
            <KarchagTextCardList
              items={paginatedItems}
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            /* Otherwise render catalog items */
            <>
              <CatalogTreeList 
                items={filteredCatalog}
                selectedItem={selectedItem}
                onItemSelect={handleItemSelect}
              />
              {filteredCatalog.length === 0 && (
                <CatalogEmptyState />
              )}
            </>
          )}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default Catalog;
