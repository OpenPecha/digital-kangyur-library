import React, { useMemo, useState } from 'react';
import Footer from '@/components/ui/molecules/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/atoms/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/atoms/pagination";
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/atoms/dialog';
import useLanguage from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

interface VideoItem {
  id: string;
  title: string;
  titleTibetan?: string;
  duration: string;
  thumbnailUrl: string;
  link?: string;
  youtubeId?: string;
}

const videoItems: VideoItem[] = [
  { id: 'v1', title: 'Introduction to the Kangyur', titleTibetan: 'བཀའ་འགྱུར་གྱི་ངོ་སྤྲོད།', duration: '12:34', thumbnailUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2574&auto=format&fit=crop', youtubeId: 'q-diZYF-epo' }
];

const VideoCard = ({ video, onPlay, t, isTibetan }: { video: VideoItem; onPlay: (video: VideoItem) => void; t: any; isTibetan: boolean }) => {
  const title = isTibetan && video.titleTibetan ? (
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
           {t("watchTeachings")}
          </button>
        ) : (
          <Link 
            to={video.link || '#'}
            className="group inline-flex items-center text-kangyur-orange text-sm font-medium hover:text-kangyur-orange/80 transition-colors"
          >
            {t("watchTeachings")}
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

const Videos = () => {
  const { isTibetan, t } = useLanguage();
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
      return isTibetan ? tib.includes(q) : en.includes(q);
    });
  }, [query, isTibetan]);

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
    <div className={cn("min-h-screen bg-kangyur-light",isTibetan ? 'tibetan' : 'english')}>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6 text-center pt-8">
          <h1 className="text-4xl font-bold text-kangyur-dark mb-3">
            {t("kangyurVideos")}
          </h1>
          <p className="text-xl text-kangyur-dark/70 max-w-2xl mx-auto">
            {t("videosSubtitle")}
          </p>
        </div>

        <div className="mb-8 max-w-xl mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setCurrentPage(1); }}
            placeholder={t("searchVideos")}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-kangyur-orange/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {pageItems.map((video) => (
            <VideoCard key={video.id} video={video} onPlay={handlePlay} t={t} isTibetan={isTibetan} />
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              >
                {t("previous")}
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
                {t("next")}
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