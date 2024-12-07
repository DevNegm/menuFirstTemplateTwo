import React, { createContext, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const initialLang = urlParams.get("lang") || "ar";

  const [language, setLanguage] = useState(initialLang);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    navigate(`?lang=${lang}`);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
