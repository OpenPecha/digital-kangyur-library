
import React from 'react';
import Navbar from '@/components/ui/molecules/Navbar';
import Footer from '@/components/ui/molecules/Footer';

const HistoryCommentary = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">Commentary Traditions</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-kangyur-dark/80">
              The Kangyur texts have inspired rich commentary traditions within Tibetan Buddhism. These commentaries 
              help practitioners understand and apply the Buddha's teachings in their spiritual practice.
            </p>
            <p className="mt-4">
              This is a placeholder page. Detailed content about the commentary traditions will be added soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryCommentary;
