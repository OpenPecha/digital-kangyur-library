import Hero from '@/components/ui/molecules/Hero';
import { StickyFooterShell } from '@/components/ui/molecules/Footer';

const Index = () => {
  return (
    <StickyFooterShell className="bg-white">
      <Hero />
    </StickyFooterShell>
  );
};

export default Index;
