import Hero from '@/components/ui/molecules/Hero';
import Footer from '@/components/ui/molecules/Footer';
import { Link } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';


const Index = () => {
  const {isTibetan,t}=useLanguage()
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <section className="py-20 text-white bg-[#e3821b]" >        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('subtitle')}</span>
          </h2>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('exploreRichness')}</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/catalog" 
              className="px-6 py-3 bg-white text-kangyur-maroon font-medium rounded-md hover:bg-white/90 transition-colors"
            >
              <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('browseCatalog')}</span>
            </Link>
            <Link 
              to="/about#project" 
              className="px-6 py-3 border border-white/30 text-white font-medium rounded-md hover:bg-white/10 transition-colors"
            >
              <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('aboutThisProject')}</span>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
