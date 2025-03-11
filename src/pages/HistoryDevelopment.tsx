
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const HistoryDevelopment = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-6">Kangyur Development</h1>
          <div className="prose max-w-none">
            <p className="text-lg text-kangyur-dark/80">
              The Kangyur, a collection of Buddha's teachings, has a rich historical development dating back many centuries.
              This page will provide detailed information about how the Kangyur was compiled, preserved, and transmitted
              across generations.
            </p>
            <p className="mt-4">
              This is a placeholder page. Detailed content about the historical development of the Kangyur will be added soon.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HistoryDevelopment;
