
import React from 'react';
import { useLocalization } from '@/hooks/useLocalization';
import { TranslationKeys } from '@/data/translations';
import { cn } from '@/lib/utils';

interface LocalizedTextProps {
  textKey: TranslationKeys;
  className?: string;
}

const LocalizedText: React.FC<LocalizedTextProps> = ({ textKey, className }) => {
  const { t, language } = useLocalization();
  
  return (
    <span className={cn(
      language === 'tib' ? 'tibetan' : '',
      className
    )}>
      {t(textKey)}
    </span>
  );
};

export default LocalizedText;
