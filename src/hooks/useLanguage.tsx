import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n ,t} = useTranslation();
  
  const isTibetan = i18n.language === 'bod';
  
  const isEnglish = i18n.language === 'en';
  
  const currentLanguage = i18n.language;
  
  const toggleLanguage = () => {
    i18n.changeLanguage(isTibetan ? 'en' : 'bod');
  };
  
  const setLanguage = (language: 'en' | 'bod') => {
    i18n.changeLanguage(language);
  };
  
  return {
    isTibetan,
    isEnglish,
    currentLanguage,
    toggleLanguage,
    setLanguage,
    i18n, 
    t
  };
};

export default useLanguage;
