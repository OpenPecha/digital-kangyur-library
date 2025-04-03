
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

type AudioText = {
  id: string;
  title: {
    tibetan: string;
    english: string;
  };
  category: string;
  description: string;
  duration: string;
  audioUrl: string;
};

interface AudioCatalogProps {
  audioTexts: AudioText[];
  selectedAudioId: string;
  onSelectAudio: (id: string) => void;
}

const AudioCatalog: React.FC<AudioCatalogProps> = ({
  audioTexts,
  selectedAudioId,
  onSelectAudio
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['sutras', 'stories']);
  
  // Group audio texts by category
  const groupedTexts = audioTexts.reduce((acc, audio) => {
    if (!acc[audio.category]) {
      acc[audio.category] = [];
    }
    acc[audio.category].push(audio);
    return acc;
  }, {} as Record<string, AudioText[]>);
  
  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Get category display name
  const getCategoryName = (category: string) => {
    const names: Record<string, { en: string, tib: string }> = {
      'sutras': { en: 'Sutras', tib: 'མདོ་སྡེ།' },
      'stories': { en: 'Stories', tib: 'སྒྲུང་གཏམ།' },
      'commentaries': { en: 'Commentaries', tib: 'འགྲེལ་པ།' }
    };
    
    return names[category] || { en: category, tib: '' };
  };
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-kangyur-maroon">Audio Catalog</h2>
      </div>
      
      <div className="p-2 max-h-[70vh] overflow-y-auto">
        {Object.entries(groupedTexts).map(([category, texts]) => (
          <div key={category} className="mb-2">
            {/* Category Header */}
            <div 
              className="flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-100"
              onClick={() => toggleCategory(category)}
            >
              {expandedCategories.includes(category) ? (
                <ChevronDown className="h-4 w-4 text-kangyur-orange mr-2" />
              ) : (
                <ChevronRight className="h-4 w-4 text-kangyur-orange mr-2" />
              )}
              <div>
                <div className="font-medium text-gray-900">{getCategoryName(category).en}</div>
                <div className="tibetan text-xs text-gray-500">{getCategoryName(category).tib}</div>
              </div>
            </div>
            
            {/* Audio Items */}
            {expandedCategories.includes(category) && (
              <div className="ml-6 space-y-1 mt-1">
                {texts.map(audio => (
                  <div 
                    key={audio.id}
                    className={cn(
                      "flex items-start p-2 rounded-md cursor-pointer",
                      selectedAudioId === audio.id
                        ? "bg-kangyur-orange/10 text-kangyur-orange"
                        : "hover:bg-gray-100 text-gray-700"
                    )}
                    onClick={() => onSelectAudio(audio.id)}
                  >
                    <Headphones className={cn(
                      "h-4 w-4 mt-1 mr-2",
                      selectedAudioId === audio.id ? "text-kangyur-orange" : "text-gray-400"
                    )} />
                    <div>
                      <div className={cn(
                        "font-medium",
                        selectedAudioId === audio.id ? "text-kangyur-orange" : "text-gray-900"
                      )}>
                        {audio.title.english}
                      </div>
                      <div className="tibetan text-xs text-gray-500">{audio.title.tibetan}</div>
                      <div className="text-xs text-gray-500 mt-1">{audio.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AudioCatalog;
