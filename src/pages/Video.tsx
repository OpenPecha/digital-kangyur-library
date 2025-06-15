
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import VideoCard from '@/components/video/VideoCard';

const mockVideos = [
  {
    id: '1',
    title: 'Introduction to the Kangyur',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2024-06-14',
  },
  {
    id: '2',
    title: 'Sutra on the Heart of Wisdom Explained',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2024-06-13',
  },
  {
    id: '3',
    title: 'Buddhist Teachings for Beginners',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2024-06-12',
  },
  {
    id: '4',
    title: 'Understanding the Prajnaparamita',
    thumbnailUrl: '/placeholder.svg',
    createdAt: '2024-06-12',
  },
];

const Video = () => {
  const [search, setSearch] = useState('');

  const filteredVideos = mockVideos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">Video Library</h1>
          
          {/* Search bar */}
          <div className="max-w-lg mb-8">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><Search className="w-5 h-5" /></span>
              <Input
                type="search"
                placeholder="Search videos..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-3 bg-white border border-kangyur-orange/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-kangyur-orange/40 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredVideos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12 text-lg">
                No videos found.
              </div>
            ) : (
              filteredVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Video;
