
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Translation, TranslationKeys } from '@/data/translations';

type LanguageType = 'en' | 'tib';

interface LocalizationContextType {
  language: LanguageType;
  setLanguage: (lang: LanguageType) => void;
  t: (key: TranslationKeys) => string;
  isEnglish: boolean;
  isTibetan: boolean;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<LanguageType>('en');

  const changeLanguage = (lang: LanguageType) => {
    setLanguage(lang);
    if (lang === 'tib') {
      document.documentElement.classList.add('tibetan-language');
      document.documentElement.classList.remove('english-language');
    } else {
      document.documentElement.classList.add('english-language');
      document.documentElement.classList.remove('tibetan-language');
    }
  };

  // Initialize language preference
  useEffect(() => {
    document.documentElement.classList.add('english-language');
  }, []);

  // Translation function
  const t = (key: TranslationKeys): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LocalizationContext.Provider 
      value={{ 
        language, 
        setLanguage: changeLanguage, 
        t, 
        isEnglish: language === 'en',
        isTibetan: language === 'tib'
      }}
    >
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};
