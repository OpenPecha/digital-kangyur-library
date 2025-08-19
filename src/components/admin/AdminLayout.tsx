import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { useLocalization } from '@/hooks/useLocalization';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import LanguageToggle from '@/components/LanguageToggle';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { language, setLanguage } = useLocalization();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tib' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kangyur-cream to-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-kangyur-orange/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-kangyur-green/5 blur-3xl"></div>
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/logo.svg" alt="" className="w-[600px] h-[600px]" />
        </div>
      </div>

      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-sm">
        <div className="w-full bg-slate-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 md:h-20">
              <Link to="/admin" className="flex items-center space-x-3 text-kangyur-maroon transition-transform duration-300 transform hover:scale-105">
                <img src="/logo.svg" alt="Kangyur Karchag Logo" className="w-8 h-8 md:w-10 md:h-10" />
                <span className="font-bold text-xl md:text-2xl">
                  <span className={language === 'en' ? 'block' : 'hidden'}>Kangyur Karchag</span>
                  <span className={language === 'tib' ? 'block tibetan' : 'hidden'}>བཀའ་འགྱུར་དཀར་ཆག</span>
                </span>
              </Link>

              <div className="flex items-center space-x-2">
                <LanguageToggle />

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2 rounded-full hover:bg-kangyur-orange/10">
                      <div className="h-8 w-8 rounded-full bg-kangyur-orange/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-kangyur-orange" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">Admin User</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          admin@kangyur.org
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 p-8 relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
