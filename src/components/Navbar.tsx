import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLocalization } from '@/hooks/useLocalization';
import LocalizedText from './LocalizedText';
import LanguageToggle from './LanguageToggle';

type NavItem = {
  labelKey: 'home' | 'history' | 'catalog' | 'texts' | 'news' | 'videos' | 'aboutUs' | 'discourses' | 'discipline' | 'prajnaparamita' | 'avatamsaka' | 'ratnakuta' | 'sutras' | 'tantra';
  href: string;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    labelKey: "home",
    href: "/"
  },
  {
    labelKey: "history",
    href: "/history"
  },
  {
    labelKey: "catalog",
    href: "/catalog"
  },
  {
    labelKey: "texts",
    href: "/texts"
  },
  {
    labelKey: "videos",
    href: "/videos"
  },
  {
    labelKey: "news",
    href: "/news"
  },
  {
    labelKey: "aboutUs",
    href: "/about"
  }
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { language, setLanguage } = useLocalization();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  }, [location.pathname]);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    } else {
      setActiveDropdown(label);
      setActiveSubDropdown(null);
    }
  };

  const toggleSubDropdown = (e: React.MouseEvent, label: string) => {
    e.stopPropagation();
    if (activeSubDropdown === label) {
      setActiveSubDropdown(null);
    } else {
      setActiveSubDropdown(label);
    }
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tib' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <header className={cn("fixed top-0 left-0 w-full z-50 transition-all duration-300", 
      scrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent")}>
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

            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map(item => (
                <div key={item.labelKey} className="relative group">
                  <Link 
                    to={item.href} 
                    className={cn(
                      "px-3 py-2 text-lg font-medium rounded-md text-transition flex items-center", 
                      location.pathname === item.href ? "text-kangyur-orange" : "text-kangyur-dark hover:text-kangyur-orange"
                    )}
                    onMouseEnter={() => item.children && item.labelKey !== "catalog" && setActiveDropdown(item.labelKey)} 
                    onMouseLeave={() => item.children && item.labelKey !== "catalog" && setActiveDropdown(null)}
                  >
                    <LocalizedText textKey={item.labelKey} />
                    {item.children && item.labelKey !== "catalog" && <ChevronDown className="ml-1 w-4 h-4" />}
                  </Link>

                  {item.children && item.labelKey !== "catalog" && (
                    <div 
                      className={cn("absolute left-0 mt-1 w-56 rounded-md shadow-lg glass overflow-hidden transition-all duration-300 origin-top-left z-10", 
                        activeDropdown === item.labelKey ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                      )} 
                      onMouseEnter={() => setActiveDropdown(item.labelKey)} 
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-1 bg-white/95 backdrop-blur-sm">
                        {item.children.map(child => (
                          <div key={child.labelKey} className="relative group">
                            {child.children ? (
                              <>
                                <div 
                                  className="flex justify-between items-center px-4 py-2 text-base text-kangyur-dark hover:bg-kangyur-orange/10 hover:text-kangyur-orange transition-colors cursor-pointer"
                                  onMouseEnter={() => setActiveSubDropdown(child.labelKey)}
                                  onMouseLeave={() => setActiveSubDropdown(null)}
                                >
                                  <LocalizedText textKey={child.labelKey} />
                                  <ChevronDown className="ml-1 w-4 h-4 rotate-[-90deg]" />
                                
                                  {/* Sub-dropdown menu */}
                                  {child.children && (
                                    <div 
                                      className={cn("absolute left-full top-0 w-52 rounded-md shadow-lg glass overflow-hidden transition-all duration-300 origin-top-left bg-white/95 backdrop-blur-sm",
                                        activeSubDropdown === child.labelKey ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                                      )}
                                    >
                                      <div className="py-1">
                                        {child.children.map(subChild => (
                                          <Link
                                            key={subChild.labelKey}
                                            to={subChild.href}
                                            className="block px-4 py-2 text-base text-kangyur-dark hover:bg-kangyur-orange/10 hover:text-kangyur-orange transition-colors"
                                          >
                                            <LocalizedText textKey={subChild.labelKey} />
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </>
                            ) : (
                              <Link 
                                to={child.href} 
                                className="block px-4 py-2 text-base text-kangyur-dark hover:bg-kangyur-orange/10 hover:text-kangyur-orange transition-colors"
                              >
                                <LocalizedText textKey={child.labelKey} />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <LanguageToggle className="ml-3" />
            </nav>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10 transition-colors" aria-label="Toggle menu">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={cn("md:hidden fixed inset-0 z-40 bg-white transform transition-transform duration-300 ease-in-out", 
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
        <div className="pt-20 pb-6 px-4 h-full overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {navItems.map(item => (
              <div key={item.labelKey} className="py-1">
                {item.children && item.labelKey !== "catalog" ? (
                  <>
                    <button 
                      onClick={() => toggleDropdown(item.labelKey)} 
                      className={cn("w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md", 
                        activeDropdown === item.labelKey ? "text-kangyur-orange bg-kangyur-orange/10" : "text-kangyur-dark"
                      )}
                    >
                      <LocalizedText textKey={item.labelKey} />
                      <ChevronDown className={cn("w-5 h-5 transition-transform", activeDropdown === item.labelKey ? "rotate-180" : "")} />
                    </button>

                    <div className={cn("mt-1 ml-4 space-y-1 transition-all duration-200", 
                      activeDropdown === item.labelKey ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}>
                      {item.children.map(child => (
                        <div key={child.labelKey}>
                          {child.children ? (
                            <>
                              <button 
                                onClick={(e) => toggleSubDropdown(e, child.labelKey)} 
                                className={cn("w-full flex justify-between items-center px-3 py-2 text-base font-medium rounded-md", 
                                  activeSubDropdown === child.labelKey ? "text-kangyur-orange bg-kangyur-orange/10" : "text-kangyur-dark"
                                )}
                              >
                                <LocalizedText textKey={child.labelKey} />
                                <ChevronDown className={cn("w-5 h-5 transition-transform", activeSubDropdown === child.labelKey ? "rotate-180" : "")} />
                              </button>

                              <div className={cn("mt-1 ml-4 space-y-1 transition-all duration-200", 
                                activeSubDropdown === child.labelKey ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                              )}>
                                {child.children.map(subChild => (
                                  <Link 
                                    key={subChild.labelKey} 
                                    to={subChild.href} 
                                    className="block px-3 py-2 text-base font-medium rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
                                  >
                                    <LocalizedText textKey={subChild.labelKey} />
                                  </Link>
                                ))}
                              </div>
                            </>
                          ) : (
                            <Link 
                              to={child.href} 
                              className="block px-3 py-2 text-base font-medium rounded-md text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
                            >
                              <LocalizedText textKey={child.labelKey} />
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link 
                    to={item.href} 
                    className={cn("block px-3 py-2 text-base font-medium rounded-md", 
                      location.pathname === item.href ? "text-kangyur-orange bg-kangyur-orange/10" : "text-kangyur-dark hover:text-kangyur-orange hover:bg-kangyur-orange/10"
                    )}
                  >
                    <LocalizedText textKey={item.labelKey} />
                  </Link>
                )}
              </div>
            ))}

            <div className="px-3 py-2">
              <LanguageToggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
