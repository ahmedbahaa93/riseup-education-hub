import React, { createContext, useContext, useState, useEffect } from 'react';
import { setLocale, getLocale, t } from '@/lib/i18n';

interface I18nContextType {
  locale: string;
  changeLocale: (locale: string) => void;
  t: (key: string, params?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const useI18n = () => {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState(getLocale());

  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    setLocaleState(newLocale);
  };

  useEffect(() => {
    setLocaleState(getLocale());
  }, []);

  const value = {
    locale,
    changeLocale,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};