
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import TextCard from './TextCard';
import { cn } from '@/lib/utils';

interface FeaturedSectionProps {
  title: string;
  subtitle?: string;
  tibetanTitle?: string;
  viewAllLink?: string;
  viewAllText?: string;
  className?: string;
  children: React.ReactNode;
  background?: 'light' | 'cream' | 'gradient';
}

const FeaturedSection = ({
  title,
  subtitle,
  tibetanTitle,
  viewAllLink,
  viewAllText = 'View All',
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
              <h3 className="tibetan text-kangyur-maroon text-lg mb-1">{tibetanTitle}</h3>
            )}
            <h2 className="text-3xl sm:text-4xl font-bold text-kangyur-dark">{title}</h2>
            {subtitle && (
              <p className="mt-3 text-lg text-kangyur-dark/70 max-w-2xl">{subtitle}</p>
            )}
          </div>
          
          {viewAllLink && (
            <div className="mt-4 sm:mt-0 sm:ml-8">
              <Link 
                to={viewAllLink}
                className="group inline-flex items-center text-kangyur-orange hover:text-kangyur-orange/80 font-medium transition-colors"
              >
                {viewAllText}
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
