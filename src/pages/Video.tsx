
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Video as VideoIcon, BookText } from 'lucide-react';

const Video = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-kangyur-maroon mb-8">Video Library</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kangyur Discussion Card */}
            <Link 
              to="/video/discussions" 
              className="block p-6 rounded-xl shadow-md bg-white border border-kangyur-orange/10 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-kangyur-orange/10 text-kangyur-orange">
                <VideoIcon size={28} />
              </div>
              <h2 className="text-2xl font-bold text-kangyur-dark mb-3">Kangyur Discussions</h2>
              <p className="text-kangyur-dark/70">
                Watch scholarly discussions and presentations about the Kangyur collection, its history, and significance.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-kangyur-orange font-medium">View Discussions</span>
              </div>
            </Link>
            
            {/* Sutra Teaching Card */}
            <Link 
              to="/video/teachings" 
              className="block p-6 rounded-xl shadow-md bg-white border border-kangyur-orange/10 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-kangyur-maroon/10 text-kangyur-maroon">
                <BookText size={28} />
              </div>
              <h2 className="text-2xl font-bold text-kangyur-dark mb-3">Sutra Teachings</h2>
              <p className="text-kangyur-dark/70">
                Explore video teachings and explanations of specific sutras from the Kangyur by qualified teachers.
              </p>
              <div className="mt-4 flex justify-end">
                <span className="text-kangyur-orange font-medium">Watch Teachings</span>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Video;
