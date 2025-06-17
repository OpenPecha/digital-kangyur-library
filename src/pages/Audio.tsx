
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PanelLeft, PanelLeftClose, Search } from 'lucide-react';
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

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Navbar />
      
      {/* Enhanced Header with Search */}
      <div className="bg-gradient-to-r from-kangyur-orange to-kangyur-gold text-white py-12 pt-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            
            
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
                    <svg className="w-10 h-10 text-kangyur-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-kangyur-maroon mb-4">Welcome to Audio Recitations</h3>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Discover the sacred sounds of Kangyur texts through traditional recitations. 
                    Select a text from the catalog to begin your listening journey.
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
        
        {/* Quick Access Section */}
        {!selectedAudio && (
          <div className="mt-12">
            <h3 className="text-xl font-semibold text-kangyur-maroon mb-6">Popular Recitations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 'heart-sutra',
                  title: 'Heart Sutra',
                  duration: '8:21',
                  category: 'Prajñāpāramitā',
                  thumbnail: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=200&fit=crop'
                },
                {
                  id: 'diamond-sutra',
                  title: 'Diamond Sutra',
                  duration: '31:45',
                  category: 'Prajñāpāramitā',
                  thumbnail: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=200&fit=crop'
                },
                {
                  id: 'golden-light-sutra',
                  title: 'Golden Light Sutra',
                  duration: '42:18',
                  category: 'Sutras',
                  thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop'
                }
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => handleSelectAudio(item.id)}
                  className="bg-white rounded-xl shadow-sm border border-kangyur-orange/10 hover:shadow-lg transition-all cursor-pointer group overflow-hidden"
                >
                  <div className="aspect-video w-full bg-gray-100 overflow-hidden relative">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-1 bg-black bg-opacity-75 text-white text-xs font-semibold rounded">
                      {item.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-kangyur-orange font-medium">{item.category}</span>
                    </div>
                    <h4 className="font-semibold text-kangyur-maroon group-hover:text-kangyur-orange transition-colors">
                      {item.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AudioPage;
