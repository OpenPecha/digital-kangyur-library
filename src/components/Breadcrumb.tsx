
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: BreadcrumbProps) => {
  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-gray-500 hover:text-kangyur-maroon"
          >
            <Home className="w-4 h-4 mr-1.5" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href ? (
              <Link 
                to={item.href} 
                className="ml-1 md:ml-2 text-sm text-gray-500 hover:text-kangyur-maroon flex items-center"
              >
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </Link>
            ) : (
              <span className="ml-1 md:ml-2 text-sm text-kangyur-maroon font-medium flex items-center">
                {item.icon && <span className="mr-1.5">{item.icon}</span>}
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
