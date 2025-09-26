import React from 'react';
import { Link } from 'react-router-dom';
import { useLocalization } from '@/hooks/useLocalization';
import { TranslationKeys } from '@/data/translations';

interface KarchagFrameProps {
  labelKey?: TranslationKeys;
  label?: {
    tibetan: string;
    english: string;
  };
  link: string;
  fontSize?: string; // Font size can be Tailwind class or direct CSS value
}

const KarchagFrame: React.FC<KarchagFrameProps> = ({ labelKey, label, link, fontSize = '8xl' }) => {
  const { isTibetan, t } = useLocalization();
  // Determine if fontSize is a Tailwind class or direct CSS value
  const isTailwindClass = fontSize.startsWith('xs') || 
                         fontSize.startsWith('sm') || 
                         fontSize.startsWith('base') || 
                         fontSize.startsWith('lg') || 
                         fontSize.startsWith('xl') ||
                         fontSize === 'none';
  
  const textClass = isTailwindClass
    ? `${isTibetan ? 'tibetan' : ''} text-${fontSize}`
    : isTibetan ? 'tibetan' : '';
  const textStyle = !isTailwindClass ? { fontSize, maxWidth: isTibetan&& '140px', textAlign: 'center', wordWrap:isTibetan&& 'break-word'} : {};
  console.log(labelKey, t(labelKey));
  const labelText = labelKey ? t(labelKey) : (isTibetan ? (label?.tibetan || '') : (label?.english || ''));
  
  return (
    <Link to={link} className="block">
      <div className="relative w-full h-full flex flex-col items-center justify-center transform transition-transform hover:scale-105">
        <div className="relative w-64 h-[360px] flex items-center justify-center hover:bg-orange-200 transition-colors duration-300 rounded-lg">
          <img src="/frame.png" alt="Decorative frame" className="w-full h-full" />
          
          {/* Localized text inside the frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={textClass} style={textStyle as any}>{labelText}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default KarchagFrame;
