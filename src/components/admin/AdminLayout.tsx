
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useLocalization } from '@/hooks/useLocalization';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tib' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="w-full bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link to="/" className="flex items-center space-x-3 text-kangyur-maroon transition-transform duration-300 transform hover:scale-105">
                <img src="/logo.svg" alt="Kangyur Karchag Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <span className="font-bold text-xl md:text-2xl">
                  <span className={language === 'en' ? 'block' : 'hidden'}>Kangyur Karchag</span>
                  <span className={language === 'tib' ? 'block tibetan' : 'hidden'}>བཀའ་འགྱུར་དཀར་ཆག</span>
                </span>
              </Link>

              <button 
                onClick={toggleLanguage} 
                className="p-2 rounded-full text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10 transition-colors" 
                aria-label="Toggle language"
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
