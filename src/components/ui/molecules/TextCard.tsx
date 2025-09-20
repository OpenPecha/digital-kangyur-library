import React from 'react';
import { Link } from 'react-router-dom';
import { Book, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/hooks/useLocalization';
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
  const isRowLayout = !!imageUrl && variant === 'default' && !isCompact && !isFeatured;
  const { isTibetan } = useLocalization();
  return <Link to={`/texts/${id}`} className={cn("group block overflow-hidden transition-all duration-300", isCompact ? "h-full" : "", isFeatured ? "bg-gradient-to-br from-kangyur-cream to-white border border-kangyur-orange/20 rounded-xl shadow-sm hover:shadow-md" : "bg-white border border-kangyur-orange/10 rounded-xl shadow-sm hover:shadow-md", className)}>
      <div className={cn("flex", isCompact ? "flex-col h-full" : isRowLayout ? "flex-row items-stretch gap-4" : "flex-col")}>
        {/* Image - shown for compact and default variants */}
        {imageUrl && (isCompact || variant === 'default') && <div className={cn(isRowLayout ? "basis-1/5 flex-shrink-0 pt-2 px-2" : "") }>
            <div className={cn("overflow-hidden", isRowLayout ? "h-56" : "h-56") }>
              <div className="w-full h-full relative overflow-hidden">
                <img src={imageUrl} alt={title.english} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 "></div>
              </div>
            </div>
            {/* Metadata under image for row layout */}
            {isRowLayout && (volume || pages) && (
              <div className="mt-2 pl-2 pb-3 flex items-center justify-between gap-4">
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
            )}
          </div>}
        
        {/* Content */}
        <div className={cn("flex flex-col", isCompact ? "p-4 flex-grow" : isFeatured ? "p-6" : "p-5", isRowLayout ? "basis-4/5" : "")}>
          {/* Category badge - For featured and default without image */}
          {!isCompact && <div className="mb-3">
              
            </div>}
          
          {/* Title (website language only) */}
          <div className="mb-3">
            <h2 className={cn("font-semibold text-kangyur-dark group-hover:text-kangyur-green transition-colors", isCompact ? "text-base" : isFeatured ? "text-xl" : "text-lg", isTibetan ? "tibetan" : "")}>
              {isTibetan ? title.tibetan : title.english}
            </h2>
          </div>
          
          {/* Metadata (hidden when using row layout, shown otherwise) */}
          {!isRowLayout && (
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-3">
              {volume && <div className="flex items-center text-xs text-kangyur-dark/70">
                  <Book className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span>Volume: {volume}</span>
                </div>}
              {pages && <div className="flex items-center text-xs text-kangyur-dark/70">
                  <FileText className="w-3.5 h-3.5 mr-1.5 flex-shrink-0" />
                  <span>{pages} pages</span>
                </div>}
            </div>
          )}
          
          {/* Summary (for non-compact) */}
          {summary && !isCompact && <p className={cn("text-kangyur-dark/80 line-clamp-3 mb-4", isFeatured ? "text-base" : "text-sm")}>
              {summary}
            </p>}
          
          {/* Keywords (not displayed currently) */}
          
          {/* Read more link for featured */}
          {isFeatured && <div className="mt-4">
              <span className="inline-flex items-center text-kangyur-orange font-medium text-sm group-hover:underline">
                View text details
              </span>
            </div>}
        </div>
      </div>
    </Link>;
};
export default TextCard;