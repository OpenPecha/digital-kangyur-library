import React, { useMemo, useState } from 'react';
import Footer from '@/components/ui/molecules/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/atoms/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/atoms/pagination";
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import LocalizedText from '@/components/LocalizedText';
import { useLocalization } from '@/hooks/useLocalization';
import { Dialog, DialogContent } from '@/components/ui/atoms/dialog';

interface VideoItem {
  id: string;
  title: string;
  titleTibetan?: string;
  duration: string; // e.g. "12:34"
  thumbnailUrl: string;
  link?: string;
  youtubeId?: string;
}

const videoItems: VideoItem[] = [
  { id: 'v1', title: 'Introduction to the Kangyur', titleTibetan: 'བཀའ་འགྱུར་གྱི་ངོ་སྤྲོད།', duration: '12:34', thumbnailUrl: 'https://images.unsplash.com/photo-1523752863405-df2a5d8f8b0b?q=80&w=2574&auto=format&fit=crop', youtubeId: 'q-diZYF-epo' },
  { id: 'v2', title: 'Preserving Ancient Texts', titleTibetan: 'གཞུང་རྙིང་ཉར་ཚགས་བྱེད་ཚུལ།', duration: '08:12', thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v3', title: 'Derge Edition Overview', titleTibetan: 'སྡེ་དགེ་པར་མའི་མཐོང་བའི་ཚུལ།', duration: '15:01', thumbnailUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v4', title: 'Cataloging Methods', titleTibetan: 'དཀར་ཆག་བཟོ་ཚུལ།', duration: '09:45', thumbnailUrl: 'https://images.unsplash.com/photo-1484417894907-623942c8ee29?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v5', title: 'Buddhist Teachings Explained', titleTibetan: 'བཀའ་འགྱུར་གྱི་བསྟན་པ་གསལ་བཤད།', duration: '22:08', thumbnailUrl: 'https://images.unsplash.com/photo-1474366521946-c3d4b507abf2?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v6', title: 'Digitization Workflow', titleTibetan: 'དྲ་ཐོག་བསྐྲུན་གཞི་ལས་ཀ།', duration: '11:27', thumbnailUrl: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v7', title: 'Karchag: How It Works', titleTibetan: 'དཀར་ཆག་གི་ལས་འགུལ།', duration: '13:59', thumbnailUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2574&auto=format&fit=crop', link: '#' },
  { id: 'v8', title: 'Scholarly Collaboration', titleTibetan: 'མཁས་པའི་མཉམ་ལས།', duration: '06:52', thumbnailUrl: 'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2574&auto=format&fit=crop', link: '#' },
];

const VideoCard = ({ video, onPlay }: { video: VideoItem; onPlay: (video: VideoItem) => void }) => {
  const { language } = useLocalization();
  const title = language === 'tib' && video.titleTibetan ? (
    <p className="text-sm font-medium text-kangyur-maroon tibetan mb-1">{video.titleTibetan}</p>
  ) : (
    <CardTitle className="text-lg">{video.title}</CardTitle>
  );

  return (
    <Card className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden h-48">
        <img 
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        {video.youtubeId && (
          <button
            onClick={() => onPlay(video)}
            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors"
            aria-label="Play video"
          >
            <span className="h-12 w-12 rounded-full bg-white/90 text-kangyur-maroon flex items-center justify-center shadow">
              <Play className="h-6 w-6" />
            </span>
          </button>
        )}
      </div>
      <CardHeader className="pb-2">{title}</CardHeader>
      <CardContent className="pb-2 flex-grow">
        <div className="flex items-center text-xs text-kangyur-dark/60">
          <Clock className="h-3.5 w-3.5 mr-1.5" />
          <span>{video.duration}</span>
        </div>
      </CardContent>
      <CardFooter>
        {video.youtubeId ? (
          <button 
            onClick={() => onPlay(video)}
            className="inline-flex items-center text-kangyur-orange text-sm font-medium hover:text-kangyur-orange/80 transition-colors"
          >
            <LocalizedText textKey="watchTeachings" />
          </button>
        ) : (
          <Link 
            to={video.link || '#'}
            className="group inline-flex items-center text-kangyur-orange text-sm font-medium hover:text-kangyur-orange/80 transition-colors"
          >
            <LocalizedText textKey="watchTeachings" />
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

const Videos = () => {
  const { language } = useLocalization();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const itemsPerPage = 6;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videoItems;
    return videoItems.filter(v => {
      const en = v.title.toLowerCase();
      const tib = (v.titleTibetan || '').toLowerCase();
      return language === 'tib' ? tib.includes(q) : en.includes(q);
    });
  }, [query, language]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  const start = (currentPage - 1) * itemsPerPage;
  const pageItems = filtered.slice(start, start + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handlePlay = (video: VideoItem) => {
    setActiveVideo(video);
  };

  return (
    <div className="min-h-screen bg-kangyur-light">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6 text-center pt-8">
          <h1 className="text-4xl font-bold text-kangyur-dark mb-3">
            <LocalizedText textKey="kangyurVideos" />
          </h1>
          <p className="text-xl text-kangyur-dark/70 max-w-2xl mx-auto">
            <LocalizedText textKey="videosSubtitle" />
          </p>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
            placeholder={language === 'tib' ? 'བརྙེན་འཚོལ།' : 'Search videos'}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kangyur-orange/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {pageItems.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={handlePlay} />
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <LocalizedText textKey="previous" />
              </PaginationPrevious>
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, idx) => (
              <PaginationItem key={idx}>
                <PaginationLink
                  isActive={currentPage === idx + 1}
                  onClick={() => handlePageChange(idx + 1)}
                  className="cursor-pointer"
                >
                  {idx + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext 
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                <LocalizedText textKey="next" />
              </PaginationNext>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Footer />

      <Dialog open={!!activeVideo} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {activeVideo?.youtubeId && (
            <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Videos; 