
import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kangyur-cream border-t border-kangyur-orange/20 pt-8 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Logo & About */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-kangyur-maroon">Kangyur Library</h3>
            <p className="tibetan text-lg text-kangyur-maroon mt-1">བཀའ་འགྱུར་ཆོས་མཛོད།</p>
            <p className="text-sm text-kangyur-dark/80 mt-3 max-w-2xl">
              A comprehensive digital library for the Tibetan Buddhist Kangyur collection,
              providing access to sacred texts, translations, and educational resources.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-kangyur-orange/10">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-kangyur-dark/70">
              &copy; {new Date().getFullYear()} Kangyur Digital Library. All rights reserved.
            </p>
            <p className="text-sm text-kangyur-dark/70 mt-2 sm:mt-0 flex items-center">
              Made with <Heart className="mx-1 text-kangyur-maroon w-4 h-4" /> for the preservation of Buddhist wisdom
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
