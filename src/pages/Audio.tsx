
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Play, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AudioPlayer from '@/components/audio/AudioPlayer';
import { audioCatalogData } from '@/data/audioCatalogData';
import { filterCatalogItems, findItemInTree, getAllAudioItems } from '@/utils/catalogUtils';

const AudioPage = () => {
  const [selectedAudio, setSelectedAudio] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Get all audio items from the catalog data
  const allAudioItems = getAllAudioItems(audioCatalogData);
  
  // Filter based on search
  const filteredAudioItems = searchQuery 
    ? allAudioItems.filter(item => 
        item.title.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.tibetan.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allAudioItems;

  const handleSelectAudio = (audioId) => {
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Audio Recitations</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Discover sacred Buddhist texts through traditional recitations and teachings
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
        {selectedAudio && (
          <div className="mb-8">
            <AudioPlayer audio={selectedAudio} />
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-kangyur-maroon mb-2">
            {searchQuery ? 'Search Results' : 'All Recordings'}
          </h2>
          <p className="text-gray-600">
            {filteredAudioItems.length} recording{filteredAudioItems.length !== 1 ? 's' : ''} available
          </p>
        </div>
        
        {/* Audio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredAudioItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleSelectAudio(item.id)}
            >
              <div className="flex items-center space-x-4">
                <div className="relative w-16 h-16 bg-gradient-to-br from-kangyur-orange to-kangyur-gold rounded-lg flex items-center justify-center flex-shrink-0">
                  <Headphones className="w-8 h-8 text-white" />
                  <div className="absolute inset-0 bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-kangyur-maroon truncate">
                    {item.title.english}
                  </h3>
                  <p className="text-sm text-gray-600 tibetan truncate">
                    {item.title.tibetan}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    {item.duration && (
                      <span className="text-xs text-gray-500">
                        {item.duration}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectAudio(item.id);
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredAudioItems.length === 0 && (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto mb-6 bg-kangyur-orange/10 rounded-full flex items-center justify-center">
              <Search className="w-10 h-10 text-kangyur-orange" />
            </div>
            <h3 className="text-xl font-semibold text-kangyur-maroon mb-2">No recordings found</h3>
            <p className="text-gray-600">Try adjusting your search terms</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AudioPage;
