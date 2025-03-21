
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  tibetanTitle?: string;
  tibetanSubtitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  tibetanViewAllText?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'light' | 'cream' | 'gradient';
}

const FeaturedSection = ({
  title,
  subtitle,
  tibetanTitle,
  tibetanSubtitle,
  viewAllLink,
  viewAllText = 'View All',
  tibetanViewAllText,
  className,
  children,
  background = 'light'
}: FeaturedSectionProps) => {
  const backgroundStyles = {
    light: 'bg-white',
    cream: 'bg-kangyur-cream',
    gradient: 'bg-gradient-to-br from-kangyur-cream/50 to-white'
  };
  
  return (
    <section className={cn("py-16 sm:py-20", backgroundStyles[background], className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end">
          <div>
            {tibetanTitle && (
              <h3 className="language-tibetan text-kangyur-orange text-lg mb-1">{tibetanTitle}</h3>
            )}
            <h2 className="language-en text-3xl sm:text-4xl font-bold text-kangyur-dark">{title}</h2>
            {subtitle && (
              <p className="language-en mt-3 text-lg text-kangyur-dark/70 max-w-2xl">{subtitle}</p>
            )}
            {tibetanSubtitle && (
              <p className="language-tibetan mt-3 text-lg text-kangyur-dark/70 max-w-2xl">{tibetanSubtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <div className="mt-4 sm:mt-0 sm:ml-8">
              <Link 
                to={viewAllLink}
                className="group inline-flex items-center text-kangyur-green hover:text-kangyur-green/80 font-medium transition-colors"
              >
                <span className="language-en">{viewAllText}</span>
                {tibetanViewAllText && <span className="language-tibetan">{tibetanViewAllText}</span>}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          )}
        </div>
        
        {/* Section Content */}
        <div>
          {children}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
