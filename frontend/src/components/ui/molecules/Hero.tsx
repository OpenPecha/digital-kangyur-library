import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import useLanguage from '@/hooks/useLanguage';

const Hero = () => {
  const { t, isTibetan } = useLanguage();
  return (
    <div className="relative min-h-[50vh] md:min-h-[70vh] sm:min-h-screen flex  overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-kangyur-cream to-white z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="mt-10 md:mt-0 flex w-full flex-1 h-min md:min-h-[80vh]">
          <div className="flex flex-col justify-between md:justify-normal gap-6 w-full  text-center">
            <div className="pointer-events-none  flex items-center justify-center opacity-20 ">
              <img
                src="/logo.svg"
                alt="main logo"
                className="w-64 h-64 sm:w-[400px] sm:h-[400px] lg:w-[600px] lg:h-[600px]"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex justify-center w-[90vw] md:w-[50vw] mx-auto"
            >
              <Link
                to="/catalog"
                className={cn(
                  "w-[90vw] md:w-[35vw] mx-auto  inline-flex items-center justify-center px-5 py-2.5 sm:px-6 sm:py-3 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors group text-2xl",
                  isTibetan ? "tibetan" : "english"
                )}
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
