import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AudioCatalog from '@/components/audio/AudioCatalog';
import AudioPlayer from '@/components/audio/AudioPlayer';
import CatalogSearch from '@/components/catalog/CatalogSearch';
import { audioCatalogData } from '@/data/audioCatalogData';
import { filterCatalogItems, findItemInTree } from '@/utils/catalogUtils';
const AudioPage = () => {
  const [showCatalog, setShowCatalog] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(['sutras']);

  // Filter the catalog data based on search
  const filteredCatalog = searchQuery ? filterCatalogItems(audioCatalogData, searchQuery) : audioCatalogData;

  // Handle expanding/collapsing categories
  const toggleExpand = id => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };
  const handleSelectAudio = audioId => {
    const foundItem = findItemInTree(audioCatalogData, audioId);
    if (foundItem && foundItem.audioUrl) {
      setSelectedAudio(foundItem);
    }
  };
  return <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      {/* Hero Section with Search */}
      <CatalogSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      {/* Audio Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon">Audio Archive</h1>
          <Button variant="outline" size="sm" onClick={() => setShowCatalog(!showCatalog)} className="text-kangyur-maroon hover:text-kangyur-orange transition-colors">
            {showCatalog ? <PanelLeftClose className="h-4 w-4 mr-2" /> : <PanelLeft className="h-4 w-4 mr-2" />}
            {showCatalog ? 'Hide Catalog' : 'Show Catalog'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Audio catalog tree */}
          {showCatalog && <div className="lg:col-span-1">
              <AudioCatalog items={filteredCatalog} expandedItems={expandedItems} selectedItem={selectedAudio?.id || ''} onToggleExpand={toggleExpand} onSelectItem={handleSelectAudio} />
            </div>}
          
          {/* Right side: Details panel */}
          <div className={cn("transition-all duration-300", showCatalog ? "lg:col-span-2" : "lg:col-span-3")}>
            {selectedAudio ? <AudioPlayer audio={selectedAudio} /> : <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold text-kangyur-maroon mb-4">Welcome to Audio Recitations</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Select a text from the catalog to listen to audio recitations of Kangyur texts.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => handleSelectAudio('heart-sutra')} className="bg-kangyur-orange hover:bg-kangyur-orange/90 text-white">
                    Try Heart Sutra
                  </Button>
                </div>
              </div>}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>;
};
export default AudioPage;