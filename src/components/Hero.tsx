
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
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-kangyur-green/5 blur-3xl"></div>
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img src="/logo.svg" alt="" className="w-[600px] h-[600px]" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex justify-center">
          <div className="max-w-3xl space-y-8 text-center">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-kangyur-dark tracking-tight opacity-0"
            >
              <span className="block tibetan mt-2 text-kangyur-brown language-tibetan">བཀའ་འགྱུར་དཀར་ཆག</span>
              <span className="block text-kangyur-orange language-en">Kangyur Karchag</span>
            </h1>
            
            <p 
              ref={subtitleRef}
              className="text-xl text-kangyur-dark/80 max-w-lg mx-auto opacity-0"
            >
              <span className="language-tibetan">སངས་རྒྱས་ཀྱི་བསྟན་པར་བརྡ་ཐོ་འཕྲུལ་ཆས་བརྒྱུད་དེ་གནའ་བོའི་ཤེས་རབ་སྒོ་འབྱེད་བྱེད་པ—བརྟག་དཔྱད་བྱེད། ཉན། དུས་ལས་འདས་པའི་བྱང་ཆུབ་ཀྱི་ལམ་རྙེད།</span>
              <span className="language-en">Unlocking ancient wisdom through digital access to Buddha's teachings — explore, listen, and discover the timeless path to enlightenment.</span>
            </p>
            
            <div 
              ref={ctaRef}
              className="flex justify-center opacity-0"
            >
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center px-6 py-3 bg-kangyur-orange text-white font-medium rounded-md hover:bg-kangyur-orange/90 transition-colors group"
              >
                <span className="language-tibetan">དཔེ་མཛོད་ལ་བརྟག་དཔྱད་བྱེད།</span>
                <span className="language-en">Explore Karchag</span>
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
