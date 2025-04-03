
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import AudioCatalog from '@/components/audio/AudioCatalog';
import AudioPlayer from '@/components/audio/AudioPlayer';

// Mock audio data
const audioTexts = [
  {
    id: 'golden-light-sutra',
    title: {
      tibetan: 'འཕགས་པ་གསེར་འོད་དམ་པ་མདོ་སྡེའི་དབང་པོའི་རྒྱལ་པོ།',
      english: 'The Noble Golden Light Sutra'
    },
    category: 'sutras',
    description: 'One of the most popular Mahayana sutras, addressing themes of Buddha nature and protection.',
    duration: '42:18',
    audioUrl: 'https://example.com/audio/golden-light-sutra.mp3'
  },
  {
    id: 'diamond-sutra',
    title: {
      tibetan: 'ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པ་རྡོ་རྗེ་གཅོད་པ།',
      english: 'The Diamond Cutter Sutra'
    },
    category: 'sutras',
    description: 'A key Prajnaparamita text on emptiness, known for its precise philosophical analysis.',
    duration: '31:45',
    audioUrl: 'https://example.com/audio/diamond-sutra.mp3'
  },
  {
    id: 'heart-sutra',
    title: {
      tibetan: 'བཅོམ་ལྡན་འདས་མ་ཤེས་རབ་ཀྱི་ཕ་རོལ་ཏུ་ཕྱིན་པའི་སྙིང་པོ།',
      english: 'The Heart Sutra'
    },
    category: 'sutras',
    description: 'The most concise and popular of all the Prajnaparamita texts on emptiness.',
    duration: '8:21',
    audioUrl: 'https://example.com/audio/heart-sutra.mp3'
  },
  {
    id: 'vimalakirti-sutra',
    title: {
      tibetan: 'འཕགས་པ་དྲི་མ་མེད་པར་གྲགས་པས་བསྟན་པ།',
      english: 'The Vimalakirti Sutra'
    },
    category: 'sutras',
    description: 'A popular Mahayana sutra featuring a wise layman who debates with bodhisattvas.',
    duration: '58:32',
    audioUrl: 'https://example.com/audio/vimalakirti-sutra.mp3'
  },
  {
    id: 'jataka-tales',
    title: {
      tibetan: 'སྐྱེས་རབས།',
      english: 'Jataka Tales'
    },
    category: 'stories',
    description: 'Stories of the Buddha\'s previous lives that illustrate the cultivation of the perfections.',
    duration: '1:15:45',
    audioUrl: 'https://example.com/audio/jataka-tales.mp3'
  },
];

const AudioPage = () => {
  const [showCatalog, setShowCatalog] = useState(true);
  const [selectedAudio, setSelectedAudio] = useState<typeof audioTexts[0] | null>(null);

  const handleSelectAudio = (audioId: string) => {
    const audio = audioTexts.find(a => a.id === audioId);
    if (audio) {
      setSelectedAudio(audio);
    }
  };

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-br from-kangyur-cream to-white pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-kangyur-maroon">Audio Recitations</h1>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setShowCatalog(!showCatalog)} 
              className="text-kangyur-maroon hover:text-kangyur-orange transition-colors"
            >
              {showCatalog ? <PanelLeftClose className="h-4 w-4 mr-2" /> : <PanelLeft className="h-4 w-4 mr-2" />}
              {showCatalog ? 'Hide Catalog' : 'Show Catalog'}
            </Button>
          </div>
          <p className="text-kangyur-dark/70 max-w-3xl">
            Listen to traditional recitations of texts from the Kangyur collection. These audio recordings 
            preserve the oral tradition of Buddhist scripture.
          </p>
        </div>
      </div>
      
      {/* Audio Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left side: Audio catalog tree */}
          {showCatalog && (
            <div className="lg:col-span-1">
              <AudioCatalog 
                audioTexts={audioTexts} 
                selectedAudioId={selectedAudio?.id || ''} 
                onSelectAudio={handleSelectAudio}
              />
            </div>
          )}
          
          {/* Right side: Details panel */}
          <div className={cn("transition-all duration-300", showCatalog ? "lg:col-span-2" : "lg:col-span-3")}>
            {selectedAudio ? (
              <AudioPlayer audio={selectedAudio} />
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <h2 className="text-2xl font-semibold text-kangyur-maroon mb-4">Welcome to Audio Recitations</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Select a text from the catalog to listen to audio recitations of Kangyur texts.
                </p>
                <div className="flex justify-center">
                  <Button onClick={() => handleSelectAudio('heart-sutra')} className="bg-kangyur-orange hover:bg-kangyur-orange/90 text-white">
                    Try Heart Sutra
                  </Button>
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
