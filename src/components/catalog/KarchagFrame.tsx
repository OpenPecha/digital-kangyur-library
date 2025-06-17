import React from 'react';
import { Link } from 'react-router-dom';

interface KarchagFrameProps {
  tibetanText: string;
  link: string;
  fontSize?: string; // Font size can be Tailwind class or direct CSS value
}

const KarchagFrame: React.FC<KarchagFrameProps> = ({ tibetanText, link, fontSize = '8xl' }) => {
  // Determine if fontSize is a Tailwind class or direct CSS value
  const isTailwindClass = fontSize.startsWith('xs') || 
                         fontSize.startsWith('sm') || 
                         fontSize.startsWith('base') || 
                         fontSize.startsWith('lg') || 
                         fontSize.startsWith('xl') ||
                         fontSize === 'none';
  
  const textClass = isTailwindClass ? `tibetan text-${fontSize}` : 'tibetan';
  const textStyle = !isTailwindClass ? { fontSize } : {};
  
  return (
    <Link to={link} className="block">
      <div className="relative w-full h-full flex flex-col items-center justify-center transform transition-transform hover:scale-105">
        <div className="relative w-64 h-[360px] flex items-center justify-center">
          <img src="/frame.png" alt="Decorative frame" className="w-full h-full" />
          
          {/* Tibetan text inside the frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={textClass} style={textStyle}>{tibetanText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default KarchagFrame;
