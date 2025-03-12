
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Headphones, BookOpen } from 'lucide-react';

const AudioPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-8">Audio Library</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Stories Card */}
            <Link 
              to="/audio/stories" 
              className="block p-6 rounded-xl shadow-md bg-white border border-kangyur-orange/10 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-kangyur-orange/10 text-kangyur-orange">
                <BookOpen size={28} />
              </div>
              <h2 className="text-2xl font-bold text-kangyur-dark mb-3">Stories</h2>
              <p className="text-kangyur-dark/70">
                Listen to narrated stories from the Kangyur, including Jataka tales and instructive Buddhist narratives.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-kangyur-orange font-medium">Explore Stories</span>
              </div>
            </Link>
            
            {/* Oral Commentary Card */}
            <Link 
              to="/audio/commentary" 
              className="block p-6 rounded-xl shadow-md bg-white border border-kangyur-orange/10 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-kangyur-maroon/10 text-kangyur-maroon">
                <Headphones size={28} />
              </div>
              <h2 className="text-2xl font-bold text-kangyur-dark mb-3">Oral Commentary</h2>
              <p className="text-kangyur-dark/70">
                Access recorded commentaries and teachings on Kangyur texts by respected scholars and practitioners.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-kangyur-orange font-medium">Discover Commentaries</span>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AudioPage;
