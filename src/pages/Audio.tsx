
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PanelLeft, PanelLeftClose, Search, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AudioCatalog from '@/components/audio/AudioCatalog';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { audioCatalogData } from '@/data/audioCatalogData';
import { filterCatalogItems, findItemInTree } from '@/utils/catalogUtils';

const AudioPage = () => {
  const [showCatalog, setShowCatalog] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState(['sutras', 'prajnaparamita']);

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

  // Get breadcrumb path for selected item
  const getBreadcrumbPath = (itemId) => {
    const findPath = (items, id, path = []) => {
      for (const item of items) {
        const currentPath = [...path, item];
        if (item.id === id) {
          return currentPath;
        }
        if (item.children) {
          const found = findPath(item.children, id, currentPath);
          if (found) return found;
        }
      }
      return null;
    };
    return findPath(audioCatalogData, itemId);
  };

  const breadcrumbPath = selectedAudio ? getBreadcrumbPath(selectedAudio.id) : [];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-kangyur-orange to-kangyur-gold text-white py-12 pt-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Music className="w-8 h-8 mr-3" />
              Audio Archive
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Sacred recitations and audio recordings from the Kangyur collection
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-white/60" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/60 font-sans"
                placeholder="Search audio recordings..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        {breadcrumbPath.length > 0 && (
          <div className="mb-6">
            <nav className="flex text-sm text-gray-600">
              <span>Audio Archive</span>
              {breadcrumbPath.map((item, index) => (
                <React.Fragment key={item.id}>
                  <span className="mx-2">/</span>
                  <span className={index === breadcrumbPath.length - 1 ? "text-kangyur-orange font-medium" : ""}>
                    {item.title.english}
                  </span>
                </React.Fragment>
              ))}
            </nav>
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-2xl font-semibold text-kangyur-maroon">Browse Recordings</h2>
            {selectedAudio && (
              <span className="text-sm text-gray-500">
                Now playing: {selectedAudio.title.english}
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCatalog(!showCatalog)}
            className="text-kangyur-maroon hover:text-kangyur-orange transition-colors border-kangyur-maroon/20 hover:border-kangyur-orange"
          >
            {showCatalog ? <PanelLeftClose className="h-4 w-4 mr-2" /> : <PanelLeft className="h-4 w-4 mr-2" />}
            {showCatalog ? 'Hide Catalog' : 'Show Catalog'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left side: Audio catalog tree */}
          {showCatalog && (
            <div className="lg:col-span-1">
              <AudioCatalog
                items={filteredCatalog}
                expandedItems={expandedItems}
                selectedItem={selectedAudio?.id || ''}
                onToggleExpand={toggleExpand}
                onSelectItem={handleSelectAudio}
              />
            </div>
          )}
          
          {/* Right side: Audio player */}
          <div className={cn("transition-all duration-300", showCatalog ? "lg:col-span-3" : "lg:col-span-4")}>
            {selectedAudio ? (
              <AudioPlayer audio={selectedAudio} />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-12 text-center border border-kangyur-orange/10">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 mx-auto mb-6 bg-kangyur-orange/10 rounded-full flex items-center justify-center">
                    <Music className="w-10 h-10 text-kangyur-orange" />
                  </div>
                  <h3 className="text-2xl font-semibold text-kangyur-maroon mb-4">Welcome to Audio Archive</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Discover the sacred sounds of Kangyur texts through traditional recitations organized by category and subcategory.
                  </p>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleSelectAudio('heart-sutra')}
                      className="w-full bg-kangyur-orange hover:bg-kangyur-orange/90 text-white py-3"
                    >
                      🎵 Listen to Heart Sutra
                    </Button>
                    <Button
                      onClick={() => handleSelectAudio('diamond-sutra')}
                      variant="outline"
                      className="w-full border-kangyur-maroon text-kangyur-maroon hover:bg-kangyur-maroon hover:text-white py-3"
                    >
                      🔹 Try Diamond Sutra
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AudioPage;
