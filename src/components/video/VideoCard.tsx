
import React from 'react';

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    thumbnailUrl: string;
    createdAt: string;
+   duration?: string;
  };
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  return (
    <div className="bg-white rounded-xl border shadow hover:shadow-lg transition group">
      <div className="aspect-w-16 aspect-h-9 w-full bg-gray-100 rounded-t-xl overflow-hidden relative">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
+       {video.duration && (
+         <span
+           className="absolute bottom-2 right-2 px-2 py-0.5 bg-black bg-opacity-80 text-white text-xs font-semibold rounded"
+           style={{letterSpacing: 1}}
+         >
+           {video.duration}
+         </span>
+       )}
      </div>
      <div className="p-3 flex flex-col">
        <div className="flex-1">
          <div className="font-semibold text-base text-gray-800 truncate" title={video.title}>
            {video.title}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2">1 days ago</div>
      </div>
    </div>
  );
};

export default VideoCard;
