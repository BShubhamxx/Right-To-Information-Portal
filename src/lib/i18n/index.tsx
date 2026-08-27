"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { en } from "./en";
import { hi } from "./hi";
import type { Locale, TranslationKey } from "./types";

export type { Locale, TranslationKey } from "./types";

const dictionaries = { en, hi };

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("rti-locale");
    if (stored === "hi" || stored === "en") setLocaleState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "hi" ? "hi" : "en";
    document.documentElement.dataset.locale = locale;
    window.localStorage.setItem("rti-locale", locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: setLocaleState,
    t: (key) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
  }), [locale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}

export function translateStatic(locale: Locale, key: TranslationKey) {
  return dictionaries[locale][key] ?? dictionaries.en[key] ?? key;
}
