
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TextCardProps {
  id: string;
  title: {
    tibetan: string;
    sanskrit?: string;
    english: string;
  };
  category: string;
  pages?: number;
  volume?: string;
  summary?: string;
  keywords?: string[];
  imageUrl?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

const TextCard = ({
  id,
  title,
  category,
  pages,
  volume,
  summary,
  keywords,
  imageUrl,
  className,
  variant = 'default'
}: TextCardProps) => {
  const isCompact = variant === 'compact';
  const isFeatured = variant === 'featured';
  
  return (
    <Link
      to={`/texts/${id}`}
      className={cn(
        "group block overflow-hidden transition-all duration-300",
        isCompact ? "h-full" : "",
        isFeatured ? 
          "bg-gradient-to-br from-kangyur-cream to-white border border-kangyur-orange/20 rounded-xl shadow-sm hover:shadow-md" : 
          "bg-white border border-kangyur-orange/10 rounded-xl shadow-sm hover:shadow-md",
        className
      )}
    >
      <div className={cn(
        "flex",
        isCompact ? "flex-col h-full" : "flex-col"
      )}>
        {/* Image - only shown for compact variant */}
        {imageUrl && isCompact && (
          <div className="h-36 overflow-hidden">
            <div className="w-full h-full relative overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title.english} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              
              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-2 py-1 bg-kangyur-orange text-white text-xs font-medium rounded-md">
                  {category}
                </span>
              </div>
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className={cn(
          "flex flex-col",
          isCompact ? "p-4 flex-grow" : isFeatured ? "p-6" : "p-5"
        )}>
          {/* Category badge - For featured and default without image */}
          {!isCompact && (
            <div className="mb-3">
              <span className="px-2 py-1 bg-kangyur-orange text-white text-xs font-medium rounded-md">
                {category}
              </span>
            </div>
          )}
          
          {/* Titles */}
          <div className="mb-3">
            <h3 className={cn(
              "tibetan font-medium text-kangyur-orange",
              isCompact ? "text-base" : isFeatured ? "text-xl" : "text-lg"
            )}>
              {title.tibetan}
            </h3>
            
            <h2 className={cn(
              "font-semibold text-kangyur-dark group-hover:text-kangyur-green transition-colors",
              isCompact ? "text-base" : isFeatured ? "text-xl" : "text-lg"
            )}>
              {title.english}
            </h2>
            
            {title.sanskrit && !isCompact && (
              <p className="text-sm text-kangyur-dark/70 italic mt-1">
                <span className="text-xs text-kangyur-dark/50">Sanskrit: </span>
                {title.sanskrit}
              </p>
            )}
          </div>
          
          {/* Metadata */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
            {volume && (
              <div className="flex items-center text-xs text-kangyur-dark/70">
                <Book className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span>Volume: {volume}</span>
              </div>
            )}
            
            {pages && (
              <div className="flex items-center text-xs text-kangyur-dark/70">
                <FileText className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                <span>{pages} pages</span>
              </div>
            )}
          </div>
          
          {/* Summary (for non-compact) */}
          {summary && !isCompact && (
            <p className={cn(
              "text-kangyur-dark/80 line-clamp-3 mb-4",
              isFeatured ? "text-base" : "text-sm"
            )}>
              {summary}
            </p>
          )}
          
          {/* Keywords */}
          {keywords && keywords.length > 0 && !isCompact && (
            <div className="mt-auto pt-3">
              <div className="flex items-start flex-wrap gap-1.5">
                <Tag className="w-3.5 h-3.5 text-kangyur-dark/50 flex-shrink-0 mt-0.5" />
                {keywords.slice(0, isCompact ? 2 : 4).map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-0.5 bg-kangyur-teal/20 text-kangyur-green text-xs rounded"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Read more link for featured */}
          {isFeatured && (
            <div className="mt-4">
              <span className="inline-flex items-center text-kangyur-orange font-medium text-sm group-hover:underline">
                View text details
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default TextCard;
