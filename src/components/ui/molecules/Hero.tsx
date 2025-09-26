import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import useLanguage from '@/hooks/useLanguage';

const Hero = () => {
  const { t,isTibetan } = useLanguage();
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-kangyur-cream to-white z-0"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/logo.svg" alt="main logo" className="w-[600px] h-[600px] max-sm:w-[300px] max-sm:h-[300px]" />
        </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-8 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-kangyur-dark tracking-tight"
            >
              <span className={cn("block mt-2 text-kangyur-brown",isTibetan ? 'tibetan' : 'english')}>{t('title')}</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className={cn("text-xl text-kangyur-dark/80 max-w-lg mx-auto",isTibetan ? 'tibetan' : 'english')}
            >
              {t('description')}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center"
            >
              <Link 
                to="/catalog" 
                className={cn("inline-flex items-center justify-center px-6 py-3 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors group",isTibetan ? 'tibetan' : 'english')}
              >
                {t('exploreButton')}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
