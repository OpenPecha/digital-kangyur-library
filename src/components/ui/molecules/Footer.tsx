
import useLanguage from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';

const Footer = () => {
  const {isTibetan,t}=useLanguage()
  return (
    <footer className="bg-kangyur-cream border-t border-kangyur-orange/20 pt-8 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo & About */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-kangyur-orange">
              <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('title')}</span>
            </h3>
            <p className="text-sm text-kangyur-dark/80 mt-3 max-w-2xl">
              <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('footerDescription')}</span>
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-kangyur-orange/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-kangyur-dark/70">
              &copy; {new Date().getFullYear()} Kangyur Karchag. All rights reserved.
            </p>
            <p className="text-sm text-kangyur-dark/70 mt-2 sm:mt-0 flex items-center">
              <span className={cn(isTibetan ? 'tibetan' : 'english',"flex items-center")}>
                {t('madeWithLove.pre')} <Heart className="mx-1 text-kangyur-orange w-4 h-4" /> {t('madeWithLove.post')}
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
