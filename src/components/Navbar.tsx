import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItem = {
  label: string;
  tibetan: string;
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    label: "Home",
    tibetan: "མདུན་ངོས།",
    href: "/",
  },
  {
    label: "History",
    tibetan: "ལོ་རྒྱུས།",
    href: "/history",
    children: [
      { label: "Kangyur Development", tibetan: "བཀའ་འགྱུར་བྱུང་རིམ།", href: "/history/development" },
      { label: "Translation History", tibetan: "སྒྲ་བསྒྱུར་ལོ་ཙཱ།", href: "/history/translation" },
      { label: "Manuscripts", tibetan: "བཀའ་འགྱུར་བྱིས་མའི་སྐོར།", href: "/history/manuscripts" },
      { label: "Printed Editions", tibetan: "པར་མའི་སྐོར།", href: "/history/printed-editions" },
      { label: "Commentary Traditions", tibetan: "འགྲེལ་བའི་སྐོར།", href: "/history/commentary" },
    ],
  },
  {
    label: "Catalog",
    tibetan: "བཀའ་འགྱུར་དཀར་ཆག།",
    href: "/catalog",
  },
  {
    label: "Audio",
    tibetan: "སྒྲ་མཛོད།",
    href: "/audio",
  },
  {
    label: "Video",
    tibetan: "བརྙན་མཛོད།",
    href: "/video",
  },
  {
    label: "Texts",
    tibetan: "བཀའ་འགྱུར།",
    href: "/texts",
  },
  {
    label: "News",
    tibetan: "གསར་འགྱུར།",
    href: "/news",
  },
  {
    label: "About",
    tibetan: "ང་ཚོའི་སྐོར།",
    href: "/about",
    children: [
      { label: "Team", tibetan: "མི་སྣ་ངོ་སྤྲོད།", href: "/about/team" },
      { label: "Project", tibetan: "ལས་གཞི་ངོ་སྤྲོད།", href: "/about/project" },
      { label: "Contact", tibetan: "འབྲེལ་གཏུག།", href: "/about/contact" },
    ],
  },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState<'en' | 'tib'>('en');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tib' : 'en';
    setLanguage(newLanguage);
    
    // Update the document class to control language visibility
    if (newLanguage === 'tib') {
      document.documentElement.classList.add('tibetan-language');
      document.documentElement.classList.remove('english-language');
    } else {
      document.documentElement.classList.add('english-language');
      document.documentElement.classList.remove('tibetan-language');
    }
  };
  
  // Initialize language class on component mount
  useEffect(() => {
    document.documentElement.classList.add('english-language');
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-kangyur-maroon transition-transform duration-300 transform hover:scale-105"
          >
            <span className="font-bold text-xl md:text-2xl">
              <span className="language-en">KaZhoe</span>
              <span className="language-tibetan tibetan">བཀའ་མཛོད།</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <Link
                  to={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md text-transition flex items-center",
                    location.pathname === item.href ? "text-kangyur-orange" : "text-kangyur-dark hover:text-kangyur-orange"
                  )}
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => item.children && setActiveDropdown(null)}
                  onClick={() => !item.children && setActiveDropdown(null)}
                >
                  <span className="language-en">{item.label}</span>
                  <span className="language-tibetan tibetan">{item.tibetan}</span>
                  {item.children && (
                    <ChevronDown className="ml-1 w-4 h-4" />
                  )}
                </Link>

                {/* Dropdown for desktop */}
                {item.children && (
                  <div
                    className={cn(
                      "absolute left-0 mt-1 w-56 rounded-md shadow-lg glass overflow-hidden transition-all duration-300 origin-top-left",
                      activeDropdown === item.label ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    )}
                    onMouseEnter={() => setActiveDropdown(item.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="py-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-kangyur-dark hover:bg-kangyur-orange/10 hover:text-kangyur-orange transition-colors"
                        >
                          <span className="language-en">{child.label}</span>
                          <span className="language-tibetan tibetan">{child.tibetan}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Language toggle */}
            <button
              onClick={toggleLanguage}
              className="ml-2 p-2 rounded-full text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10 transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-5 h-5" />
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="pt-20 pb-6 px-4 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <div key={item.label} className="py-1">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={cn(
                        "w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md",
                        activeDropdown === item.label ? "text-kangyur-orange bg-kangyur-orange/10" : "text-kangyur-dark"
                      )}
                    >
                      <span className="language-en">{item.label}</span>
                      <span className="language-tibetan tibetan">{item.tibetan}</span>
                      <ChevronDown className={cn("w-5 h-5 transition-transform", activeDropdown === item.label ? "rotate-180" : "")} />
                    </button>

                    <div
                      className={cn(
                        "mt-1 ml-4 space-y-1 transition-all duration-200",
                        activeDropdown === item.label ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                      )}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-3 py-2 text-base font-medium rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
                        >
                          <span className="language-en">{child.label}</span>
                          <span className="language-tibetan tibetan">{child.tibetan}</span>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    to={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md",
                      location.pathname === item.href ? "text-kangyur-orange bg-kangyur-orange/10" : "text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
                    )}
                  >
                    <span className="language-en">{item.label}</span>
                    <span className="language-tibetan tibetan">{item.tibetan}</span>
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile language toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center px-3 py-2 text-base font-medium rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
            >
              <Globe className="w-5 h-5 mr-2" />
              <span>{language === 'en' ? 'Switch to Tibetan' : 'Switch to English'}</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
