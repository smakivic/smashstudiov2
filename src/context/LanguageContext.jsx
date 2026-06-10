import { createContext, useContext, useState, useEffect } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("sr");

  // Keep <html lang="..."> in sync for accessibility
  useEffect(() => {
    document.documentElement.lang = lang === "sr" ? "sr-Latn" : "en";
  }, [lang]);

  const setLang = (newLang) => {
    if (newLang === lang) return;
    // Trigger page-fade animation via data attribute
    document.documentElement.setAttribute("data-lang-switching", "");
    setTimeout(
      () => document.documentElement.removeAttribute("data-lang-switching"),
      340,
    );
    setLangState(newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, tr: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
