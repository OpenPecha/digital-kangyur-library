import React from 'react'
import useLanguage from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import LanguageToggle from '@/components/LanguageToggle';
import { cn } from '@/lib/utils';

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
  const {t,isTibetan}=useLanguage()
  return (
    <div className='p-4 flex justify-between items-center'>
            <Link to="/" className="flex items-center space-x-3 text-kangyur-maroon transition-transform duration-300 transform hover:scale-105">
              <img src="/logo.svg" alt="Kangyur Karchag Logo" className="w-8 h-8 md:w-10 md:h-10" />
              <span className="font-bold text-xl md:text-2xl">
                <span>{t('title')}</span>
              </span>
            </Link>        
            <div className='flex items-center space-x-4'>
              {navItems.map((item)=>(
                <Link to={item.href} key={item.labelKey} className={cn(isTibetan ? 'tibetan' : 'english')}  >{t(item.labelKey)}</Link>
              ))}
            <LanguageToggle />
            </div>
     
    </div>
  )
}

export default Navbar