import React from 'react';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/hooks/useLocalization';

interface LanguageToggleProps {
  className?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { language, setLanguage } = useLocalization();
  const isTibetan = language === 'tib';

  const handleToggle = () => {
    setLanguage(isTibetan ? 'en' : 'tib');
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isTibetan}
      aria-label="Toggle language"
      onClick={handleToggle}
      className={cn(
        'relative inline-flex items-center h-7 w-16 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-kangyur-orange',
        isTibetan ? 'bg-kangyur-orange' : 'bg-gray-300',
        className
      )}
    >
      <span
        className={cn(
          'absolute left-2 text-xs font-semibold select-none pointer-events-none',
          isTibetan ? 'text-white opacity-100' : 'opacity-0'
        )}
      >
        EN
      </span>
      <span
        className={cn(
          'absolute right-3 text-[12px] font-semibold select-none pointer-events-none tibetan',
          !isTibetan ? 'text-kangyur-orange opacity-100' : 'opacity-0'
        )}
      >
        བོད།
      </span>
      
      <span
        className={cn(
          'inline-block h-5 w-5 bg-white rounded-full shadow transform transition-transform',
          isTibetan ? 'translate-x-9' : 'translate-x-1'
        )}
      />
    </button>
  );
};

export default LanguageToggle; 