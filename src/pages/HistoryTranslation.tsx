
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HistoryTranslation = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">Translation History</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-kangyur-dark/80">
              The translation of Buddha's teachings from Sanskrit and other languages into Tibetan was a monumental 
              undertaking that spanned centuries and involved hundreds of scholars and translators.
            </p>
            <p className="mt-4">
              This is a placeholder page. Detailed content about the translation history will be added soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryTranslation;
