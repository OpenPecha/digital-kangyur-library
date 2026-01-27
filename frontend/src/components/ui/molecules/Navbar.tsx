import React, { useState } from 'react'
import useLanguage from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const navItems = [
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
  const { t, isTibetan } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="w-full border-b border-kangyur-orange/10 bg-white/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 gap-3">
          {/* Logo + Title */}
          <Link
            to="/"
            className="flex items-center space-x-2 sm:space-x-3 text-kangyur-maroon transition-transform duration-300 hover:scale-[1.02]"
            onClick={closeMobileMenu}
          >
            <img
              src="/logo.svg"
              alt="Kangyur Karchag Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0"
            />
            <span className="font-bold text-lg sm:text-xl md:text-2xl line-clamp-1">
              <span className={cn(isTibetan ? "tibetan" : "english")}>{t("title")}</span>
            </span>
          </Link>

          {/* Nav + Language toggle */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-4 lg:gap-6">
              {navItems.map((item) => (
                <Link
                  to={item.href}
                  key={item.labelKey}
                  className={cn(
                    "text-sm lg:text-base text-kangyur-dark/80 hover:text-kangyur-maroon transition-colors",
                    isTibetan ? "tibetan" : "english"
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>

            {/* Language toggle - hidden on mobile, shown in mobile menu */}
            <div className="hidden md:block">
              <LanguageToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-kangyur-dark/80 hover:text-kangyur-maroon transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[57px] bg-white/95 backdrop-blur-sm border-b border-kangyur-orange/10 z-50 transition-all duration-300 ease-in-out",
          isMobileMenuOpen
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible -translate-y-2"
        )}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-3">
          {navItems.map((item) => (
            <Link
              to={item.href}
              key={item.labelKey}
              onClick={closeMobileMenu}
              className={cn(
                "block py-2 text-base text-kangyur-dark/80 hover:text-kangyur-maroon transition-colors",
                isTibetan ? "tibetan" : "english"
              )}
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="pt-2 border-t border-kangyur-orange/10">
            <LanguageToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar