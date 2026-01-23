import Footer from '@/components/ui/molecules/Footer';
import Timeline from '@/components/ui/molecules/Timeline';
import { useLanguage } from '@/hooks/useLanguage';
import { cn } from '@/lib/utils';

const History = () => {
  const {t,isTibetan}=useLanguage()

  const historyDescription = t('historyDescription')

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-kangyur-maroon mb-4">
              <span className={cn(isTibetan ? 'tibetan' : 'english')}>{t('historyTitle')}</span>
            </h1>
            <p className="text-lg text-kangyur-dark/80 max-w-4xl" style={{fontFamily: isTibetan ? 'customTibetan' : 'english'}}>
              {historyDescription}
            </p>
          </div>

          <Timeline />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;