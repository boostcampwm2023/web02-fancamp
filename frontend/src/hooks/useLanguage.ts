import {
  LanguageContext,
  LanguageContextType,
} from '@contexts/LanguageContext';
import { useContext } from 'react';

const useLanguage = () => {
  const context = useContext(LanguageContext);
  return context as LanguageContextType;
};

export default useLanguage;
