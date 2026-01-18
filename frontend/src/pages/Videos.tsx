import React, { useMemo, useState, useEffect } from 'react';
import Footer from '@/components/ui/molecules/Footer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/atoms/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/atoms/pagination";
import { Clock, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Dialog, DialogContent } from '@/components/ui/atoms/dialog';
import useLanguage from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import api from '@/utils/api';

interface VideoItem {
  id: string;
  title: string;
  titleTibetan?: string;
  duration: string;
  thumbnailUrl: string;
  link?: string;
  youtubeId?: string;
}

// Helper function to extract YouTube ID from URL
const extractYouTubeId = (url: string): string | null => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/.*[?&]v=([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = pattern.exec(url);
    if (match?.[1]) {
      return match[1];
    }
  }
  
  return null;
};

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
    </Card>
  );
};

const Videos = () => {
  const { isTibetan, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [videoItems, setVideoItems] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const response = await api.getVideos({
          page: currentPage,
          limit: itemsPerPage,
          is_active: 'true',
        });

        const transformedVideos: VideoItem[] = response.videos.map((item: any) => {
          const videoLink = item.video_link || '';
          const youtubeId = extractYouTubeId(videoLink);
          
          return {
            id: item.id,
            title: item.title?.english || '',
            titleTibetan: item.title?.tibetan,
            duration: '0:00', // Duration not available in current API response
            thumbnailUrl: item.thumbnail_url || 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2574&auto=format&fit=crop',
            link: videoLink,
            youtubeId: youtubeId || undefined,
          };
        });

        setVideoItems(transformedVideos);
        setTotalPages(response.pagination?.total_pages || 1);
      } catch (error) {
        console.error('Failed to fetch videos:', error);
        setVideoItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [currentPage]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return videoItems;
    return videoItems.filter(v => {
      const en = v.title.toLowerCase();
      const tib = (v.titleTibetan || '').toLowerCase();
      return isTibetan ? tib.includes(q) : en.includes(q);
    });
  }, [query, isTibetan, videoItems]);

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

        {loading && (
          <div className="flex items-center justify-center py-16">
            <p className="text-kangyur-dark/60">Loading videos...</p>
          </div>
        )}
        
        {!loading && filtered.length === 0 && (
          <div className="flex items-center justify-center py-16">
            <p className="text-kangyur-dark/60">
              {query ? 'No videos found matching your search.' : 'No videos available.'}
            </p>
          </div>
        )}
        
        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filtered.map((video) => (
              <VideoCard key={video.id} video={video} onPlay={handlePlay} t={t} isTibetan={isTibetan} />
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                  className={cn(
                    currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer",
                    isTibetan ? 'tibetan' : 'english'
                  )}
                >
                  {t("previous")}
                </PaginationPrevious>
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                <PaginationItem key={`page-${pageNum}`}>
                  <PaginationLink
                    isActive={currentPage === pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext 
                  onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                  className={cn(
                    currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer",
                    isTibetan ? 'tibetan' : 'english'
                  )}
                >
                  {t("next")}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
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