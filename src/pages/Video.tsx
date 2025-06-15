import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import VideoCard from '@/components/video/VideoCard';
import { paginateItems } from '@/utils/paginationUtils';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from '@/components/ui/pagination';

const mockVideos = [
  {
    id: '1',
    title: 'Introduction to the Kangyur',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-14',
    duration: '10:45',
  },
  {
    id: '2',
    title: 'Sutra on the Heart of Wisdom Explained',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-13',
    duration: '12:34',
  },
  {
    id: '3',
    title: 'Buddhist Teachings for Beginners',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-12',
    duration: '07:22',
  },
  {
    id: '4',
    title: 'Understanding the Prajnaparamita',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-12',
    duration: '18:01',
  },
  {
    id: '5',
    title: 'Great Compassion Sutra Overview',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-11',
    duration: '15:42',
  },
  {
    id: '6',
    title: 'Classic Sutras for Everyday Life',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-10',
    duration: '22:17',
  },
  {
    id: '7',
    title: 'Wisdom and Meditation Talk',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-09',
    duration: '09:55',
  },
  {
    id: '8',
    title: 'Tibetan Buddhist Manuscripts',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-08',
    duration: '06:28',
  },
  {
    id: '9',
    title: 'Exploring the Kangyur Volumes',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-07',
    duration: '04:20',
  },
  {
    id: '10',
    title: 'The Art of Buddhist Chanting',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-06',
    duration: '11:56',
  },
  {
    id: '11',
    title: 'What is the Kangyur?',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-05',
    duration: '08:15',
  },
  {
    id: '12',
    title: 'Introduction to Buddhist Canon',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-04',
    duration: '03:54',
  },
  {
    id: '13',
    title: 'Modern Perspectives on Kangyur Studies',
    thumbnailUrl: '/lovable-uploads/a066b3b5-c9a9-4921-8fe7-5f1c57e02393.png',
    createdAt: '2024-06-03',
    duration: '05:46',
  },
];

const VIDEOS_PER_PAGE = 12;

const Video = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // filter videos by search
  const filteredVideos = mockVideos.filter(v =>
    v.title.toLowerCase().includes(search.toLowerCase())
  );

  // paginate
  const { items: paginatedVideos, pagination } = paginateItems(
    filteredVideos,
    page,
    VIDEOS_PER_PAGE
  );

  // helper to render page numbers (small amount, so simple logic)
  const renderPageNumbers = () => {
    const arr = [];
    for (let i = 1; i <= pagination.totalPages; i++) {
      arr.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={pagination.currentPage === i}
            onClick={() => setPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return arr;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Gradient Header with Search Bar */}
      <div className="bg-gradient-to-r from-kangyur-orange to-kangyur-gold text-white py-12 pt-28 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-white/60" />
              </div>
              <input
                type="search"
                className="block w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-1 focus:ring-white/30 text-white placeholder-white/60 font-sans"
                placeholder="Search videos..."
                value={search}
                onChange={e => {
                  setSearch(e.target.value);
                  setPage(1); // reset to first page on search
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <main className="flex-grow pt-6 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paginatedVideos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500 py-12 text-lg">
                No videos found.
              </div>
            ) : (
              paginatedVideos.map(video => (
                <VideoCard key={video.id} video={video} />
              ))
            )}
          </div>
          
          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setPage(page - 1)}
                    aria-disabled={!pagination.hasPrevPage}
                    className={!pagination.hasPrevPage ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {renderPageNumbers()}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setPage(page + 1)}
                    aria-disabled={!pagination.hasNextPage}
                    className={!pagination.hasNextPage ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Video;
