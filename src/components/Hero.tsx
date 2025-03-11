
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
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
      
      setTimeout(() => {
        if (imageContainerRef.current) {
          imageContainerRef.current.classList.add('animate-scale-in');
          imageContainerRef.current.style.opacity = '1';
        }
      }, 300);
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
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
              className="text-xl text-kangyur-dark/80 max-w-lg opacity-0"
            >
              Explore the complete collection of Buddha's teachings translated into Tibetan,
              with advanced search, audio recordings, and English translations.
            </p>
            
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 opacity-0"
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
          
          <div 
            ref={imageContainerRef}
            className="relative h-[400px] md:h-[500px] lg:h-[600px] opacity-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-lg mx-auto">
                {/* Main image */}
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-700">
                  <img 
                    src="https://images.unsplash.com/photo-1598286323810-86c25fad1489?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                    alt="Tibetan Buddhist Texts" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-kangyur-maroon/30 to-transparent"></div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-5 -right-5 w-32 h-32 rounded-lg overflow-hidden shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-700 z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1547721519-6bfd0f25023b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Tibetan Manuscript Detail" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="absolute -bottom-5 -left-5 w-40 h-40 rounded-lg overflow-hidden shadow-xl transform -rotate-2 hover:rotate-0 transition-transform duration-700 z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1606166325017-625fd4cb84a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                    alt="Buddhist Prayer Wheels" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
