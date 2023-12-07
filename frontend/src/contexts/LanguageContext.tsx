import { createContext, useEffect, useMemo, useState } from 'react';

interface AuthContextProps {
  children: React.ReactNode;
}

export interface LanguageContextType {
  language: 'ko' | 'en' | 'ja';
  setLanguage: React.Dispatch<React.SetStateAction<'ko' | 'en' | 'ja'>>;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

function LanguageProvider({ children }: AuthContextProps) {
  const [language, setLanguage] = useState<'ko' | 'en' | 'ja'>('ko');

  useEffect(() => {
    const localLanguage = localStorage.getItem('language');
    if (localLanguage) {
      setLanguage(localLanguage as 'ko' | 'en' | 'ja');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const languageProviderValue = useMemo(
    () => ({ language, setLanguage }),
    [language, setLanguage]
  );

  return (
    <LanguageContext.Provider value={languageProviderValue}>
      {children}
    </LanguageContext.Provider>
  );
}

export default LanguageProvider;
