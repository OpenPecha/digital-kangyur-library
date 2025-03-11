
import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-kangyur-cream border-t border-kangyur-orange/20 pt-12 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-xl font-bold text-kangyur-maroon">Kangyur Library</h3>
              <p className="tibetan text-lg text-kangyur-maroon mt-1">བཀའ་འགྱུར་ཆོས་མཛོད།</p>
            </Link>
            <p className="text-sm text-kangyur-dark/80 mb-4">
              A comprehensive digital library for the Tibetan Buddhist Kangyur collection,
              providing access to sacred texts, translations, and educational resources.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kangyur-dark/70 hover:text-kangyur-orange transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kangyur-dark/70 hover:text-kangyur-orange transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a 
                href="mailto:contact@kangyurlibrary.org" 
                className="text-kangyur-dark/70 hover:text-kangyur-orange transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="font-medium text-kangyur-dark mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/catalog" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Kangyur Catalog
                </Link>
              </li>
              <li>
                <Link to="/texts" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Browse Texts
                </Link>
              </li>
              <li>
                <Link to="/audio" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Audio Archive
                </Link>
              </li>
              <li>
                <Link to="/translations" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  English Translations
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Latest News
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="font-medium text-kangyur-dark mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/history" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Historical Background
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/about/project" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Project Description
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-kangyur-dark/80 hover:text-kangyur-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h4 className="font-medium text-kangyur-dark mb-4">Stay Updated</h4>
            <p className="text-sm text-kangyur-dark/80 mb-4">
              Subscribe to our newsletter for updates on new texts, translations, and events.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-3 py-2 text-sm border border-kangyur-orange/20 rounded-md focus:outline-none focus:ring-2 focus:ring-kangyur-orange/30"
                required
              />
              <button
                type="submit"
                className="w-full px-3 py-2 text-sm bg-kangyur-orange text-white rounded-md hover:bg-kangyur-orange/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-kangyur-orange/10">
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
