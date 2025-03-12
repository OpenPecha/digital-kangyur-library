
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import CatalogTree from '@/components/catalog/CatalogTree';
import CatalogItemDetails from '@/components/catalog/CatalogItemDetails';
import { catalogData } from '@/data/catalogData';
import { filterCatalogItems, findItemInTree } from '@/utils/catalogUtils';

const Catalog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState<string[]>(['discipline', 'discourses', 'general-sutras']); // Start with these expanded
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(true);
  
  // Handle expanding/collapsing categories
  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
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
  const filteredCatalog = searchQuery
    ? filterCatalogItems(catalogData, searchQuery)
    : catalogData;
  
  // Get selected item details
  const selectedItemDetails = selectedItem 
    ? findItemInTree(catalogData, selectedItem)
    : null;
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section with Search */}
      <CatalogSearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Catalog Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left side: Catalog tree */}
          <CatalogTree 
            items={filteredCatalog}
            expandedItems={expandedItems}
            selectedItem={selectedItem}
            showDetails={showDetails}
            onToggleExpand={toggleExpand}
            onSelectItem={handleSelectItem}
            onToggleDetails={toggleDetails}
          />
          
          {/* Right side: Details panel */}
          <CatalogItemDetails 
            selectedItem={selectedItemDetails}
            showDetails={showDetails}
          />
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
