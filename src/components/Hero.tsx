
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const revealElements = () => {
      if (titleRef.current) {
        titleRef.current.classList.add('animate-fade-up');
        titleRef.current.style.opacity = '1';
      }
      
      setTimeout(() => {
        if (subtitleRef.current) {
          subtitleRef.current.classList.add('animate-fade-up');
          subtitleRef.current.style.opacity = '1';
        }
      }, 200);
      
      setTimeout(() => {
        if (ctaRef.current) {
          ctaRef.current.classList.add('animate-fade-up');
          ctaRef.current.style.opacity = '1';
        }
      }, 400);
    };
    
    // Trigger animations when component mounts
    revealElements();
  }, []);
  
  return (
    <div className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-kangyur-cream to-white z-0"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-kangyur-orange/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-kangyur-maroon/5 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-8 text-center">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-kangyur-dark tracking-tight opacity-0"
            >
              <span className="block">Digital Library of</span>
              <span className="block tibetan mt-2 text-kangyur-maroon">བཀའ་འགྱུར་ཆོས་མཛོད།</span>
              <span className="block text-kangyur-orange">Kangyur Collection</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-kangyur-dark/80 max-w-lg mx-auto opacity-0"
            >
              Explore the complete collection of Buddha's teachings translated into Tibetan,
              with advanced search, audio recordings, and English translations.
            </p>
            
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 justify-center opacity-0"
            >
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center px-6 py-3 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors group"
              >
                Explore Catalog
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link 
                to="/about/project" 
                className="inline-flex items-center justify-center px-6 py-3 border border-kangyur-maroon/20 text-kangyur-maroon font-medium rounded-md hover:bg-kangyur-maroon/5 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
