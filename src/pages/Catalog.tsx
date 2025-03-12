
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
  const [expandedItems, setExpandedItems] = useState<string[]>(['discipline']); // Start with discipline expanded
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
          </div>
          
          {/* Right side: Details panel */}
          <div className="lg:col-span-2">
            <CatalogItemDetails 
              selectedItem={selectedItemDetails}
              showDetails={showDetails}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Catalog;
