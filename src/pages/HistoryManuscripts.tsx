
import React from 'react';

import Footer from '@/components/ui/molecules/Footer';
import Navbar from '@/components/ui/molecules/Navbar';

const HistoryManuscripts = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">Manuscripts</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-kangyur-dark/80">
              The Kangyur exists in various manuscript forms that were meticulously created and preserved 
              throughout Tibetan history. These manuscripts represent different lineages and traditions.
            </p>
            <p className="mt-4">
              This is a placeholder page. Detailed content about the Kangyur manuscripts will be added soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryManuscripts;
