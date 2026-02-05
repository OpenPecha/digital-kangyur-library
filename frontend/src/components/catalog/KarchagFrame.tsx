import React from 'react';
import { Link } from 'react-router-dom';
import useLanguage from '@/hooks/useLanguage';

interface KarchagFrameProps {
  labelKey?: string;
  label?: {
    tibetan: string;
    english: string;
  };
  link: string;
  fontSize?: string; 
}

const KarchagFrame: React.FC<KarchagFrameProps> = ({ labelKey, label, link, fontSize = '8xl' }) => {
  const { isTibetan, t } = useLanguage();
  const isTailwindClass = fontSize.startsWith('xs') || 
                         fontSize.startsWith('sm') || 
                         fontSize.startsWith('base') || 
                         fontSize.startsWith('lg') || 
                         fontSize.startsWith('xl') ||
                         fontSize === 'none';
  
  const textClass = isTailwindClass
    ? `${isTibetan ? 'tibetan' : ''} text-${fontSize}`
    : isTibetan ? 'tibetan' : '';
  const textStyle = !isTailwindClass ? { fontSize, maxWidth: isTibetan&& '150px', textAlign: 'center', wordWrap:isTibetan&& 'break-word'} : {};
  const labelText = labelKey ? t(labelKey) : (isTibetan ? (label?.tibetan || '') : (label?.english || ''));
  
  return (
    <Link to={link} className="block">
      <div className="relative w-full h-full flex flex-col items-center justify-center transform transition-transform hover:scale-105">
        <div className="relative w-64 h-[360px] flex items-center justify-center hover:bg-orange-100 transition-colors duration-300 rounded-lg">
          <img src="/frame.png" alt="Decorative frame" className="w-full h-full" />
          {/* Always wrap the label in a matching frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={textClass} style={textStyle as any} >
              {/* Repeat the label to visually wrap it inside the frame */}
              <span className="inline-block relative z-10 text-3xl">
                {labelText}
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default KarchagFrame;
