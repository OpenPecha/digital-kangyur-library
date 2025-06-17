import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play } from 'lucide-react';
import { VideoPlayer } from './VideoPlayer';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    youtubeUrl: string;
    createdAt: string;
    duration: string;
  };
}

const VideoCard = ({ video }: VideoCardProps) => {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <Card 
        className="flex flex-col h-full overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
        onClick={() => setIsPlayerOpen(true)}
      >
        <div className="overflow-hidden h-48 relative">
          <img 
            src={video.thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity">
            <Play className="h-12 w-12 text-white" fill="currentColor" />
          </div>
          <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2 flex-grow">
          <div className="flex items-center text-xs text-kangyur-dark/60">
            {new Date(video.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </CardContent>
      </Card>

      <VideoPlayer
        isOpen={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
        video={video}
      />
    </>
  );
};

export default VideoCard;
