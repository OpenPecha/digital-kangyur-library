import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { isTibetan, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className={cn(
        'relative inline-flex items-center justify-between w-14 h-7 bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-kangyur-orange focus:ring-offset-2',
        isTibetan ? 'bg-kangyur-orange' : 'bg-gray-300',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-medium transition-opacity duration-200 z-10',
          isTibetan ? 'opacity-0' : 'opacity-100 text-gray-600'
        )}
      >
        EN
      </span>
      <span
        className={cn(
          'absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-tibetan font-medium transition-opacity duration-200 z-10',
          isTibetan ? 'opacity-100 text-white' : 'opacity-0'
        )}
      >
        བོད
      </span>
      <span
        className={cn(
          'absolute left-1 top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-200',
          isTibetan ?  'translate-x-0':'translate-x-6'
        )}
      />
    </button>
  );
};

export default LanguageToggle; 