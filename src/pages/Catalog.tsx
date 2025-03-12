
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import CatalogTree from '@/components/catalog/CatalogTree';
import CatalogItemDetails from '@/components/catalog/CatalogItemDetails';
import { fetchCategories, fetchTextsBySubcategory, fetchTextMetadata } from '@/services/api';
import { mapCategoriesToCatalogItems, mapTextsToSubcategoryChildren } from '@/utils/apiMappers';
import { filterCatalogItems, findItemInTree } from '@/utils/catalogUtils';
import { CatalogItem } from '@/types/catalog';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>(['category-1']); // Start with first category expanded
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [catalogData, setCatalogData] = useState<CatalogItem[]>([]);
  
  // Fetch categories
  const { 
    data: categories,
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  // Map categories to catalog items when data is available
  useEffect(() => {
    if (categories) {
      const mappedData = mapCategoriesToCatalogItems(categories);
      setCatalogData(mappedData);
    }
  }, [categories]);

  // Fetch texts when a subcategory is selected
  const { 
    data: subcategoryTexts,
    isLoading: isTextsLoading,
  } = useQuery({
    queryKey: ['subcategoryTexts', selectedSubcategoryId],
    queryFn: () => selectedSubcategoryId ? fetchTextsBySubcategory(selectedSubcategoryId) : Promise.resolve([]),
    enabled: !!selectedSubcategoryId,
  });

  // Update catalog data with texts when available
  useEffect(() => {
    if (subcategoryTexts && selectedSubcategoryId) {
      const subcategoryIdString = `subcategory-${selectedSubcategoryId}`;
      const updatedCatalogData = [...catalogData];
      
      // Find the parent category and the subcategory
      for (const category of updatedCatalogData) {
        if (category.children) {
          const subcategoryIndex = category.children.findIndex(sub => sub.id === subcategoryIdString);
          if (subcategoryIndex !== -1) {
            // Add texts as children to this subcategory
            category.children[subcategoryIndex].children = mapTextsToSubcategoryChildren(subcategoryTexts, subcategoryIdString);
            category.children[subcategoryIndex].count = subcategoryTexts.length;
            break;
          }
        }
      }
      
      setCatalogData(updatedCatalogData);
    }
  }, [subcategoryTexts, selectedSubcategoryId, catalogData]);

  // Fetch specific text metadata when a text is selected
  const { 
    data: textMetadata,
    isLoading: isMetadataLoading,
  } = useQuery({
    queryKey: ['textMetadata', selectedItem],
    queryFn: () => selectedItem && !selectedItem.startsWith('category-') && !selectedItem.startsWith('subcategory-') 
      ? fetchTextMetadata(selectedItem) 
      : Promise.resolve(null),
    enabled: !!selectedItem && !selectedItem.startsWith('category-') && !selectedItem.startsWith('subcategory-'),
  });
  
  // Handle expanding/collapsing categories
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
    
    // If this is a subcategory and it doesn't have children yet, fetch them
    if (id.startsWith('subcategory-')) {
      const subcategoryId = parseInt(id.replace('subcategory-', ''));
      setSelectedSubcategoryId(subcategoryId);
    }
  };
  
  // Handle selecting an item
  const handleSelectItem = (id: string) => {
    setSelectedItem(id);
  };
  
  // Toggle details panel visibility (mobile)
  const toggleDetails = () => {
    setShowDetails(prev => !prev);
  };
  
  // Filter the catalog data based on search
  const filteredCatalog = searchQuery && catalogData.length > 0
    ? filterCatalogItems(catalogData, searchQuery)
    : catalogData;
  
  // Get selected item details
  const selectedItemDetails = selectedItem && catalogData.length > 0
    ? findItemInTree(catalogData, selectedItem)
    : null;

  // Loading state
  if (isCategoriesLoading) {
    return (
      <div className="min-h-screen bg-white w-full">
        <Navbar />
        
        {/* Hero Section with Search */}
        <CatalogSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Loading state */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-5">
                <Skeleton className="h-8 w-1/2 mb-4" />
                <div className="space-y-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-6 w-full" />
                      <Skeleton className="h-6 w-5/6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[400px] w-full rounded-lg" />
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    );
  }

  // Error state
  if (categoriesError) {
    return (
      <div className="min-h-screen bg-white w-full">
        <Navbar />
        
        {/* Hero Section with Search */}
        <CatalogSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Error state */}
        <div className="container mx-auto px-4 py-8">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              There was an error loading the catalog data. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      {/* Hero Section with Search */}
      <CatalogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Catalog Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Catalog tree */}
          <div className="lg:col-span-1">
            <CatalogTree 
              items={filteredCatalog}
              expandedItems={expandedItems}
              selectedItem={selectedItem}
              showDetails={showDetails}
              onToggleExpand={toggleExpand}
              onSelectItem={handleSelectItem}
              onToggleDetails={toggleDetails}
            />
            
            {/* Show loading state when fetching subcategory texts */}
            {isTextsLoading && selectedSubcategoryId && (
              <div className="mt-4 p-3 bg-kangyur-cream/30 rounded-md">
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-kangyur-orange mr-2"></div>
                  <span className="text-sm text-kangyur-dark/70">Loading texts...</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side: Details panel */}
          <div className="lg:col-span-2">
            <CatalogItemDetails 
              selectedItem={selectedItemDetails}
              showDetails={showDetails}
              isLoading={isMetadataLoading}
              metadata={textMetadata}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
