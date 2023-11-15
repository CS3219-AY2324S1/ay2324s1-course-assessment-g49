import { createContext, useState } from "react";
import { languageOptions } from "../utils/Languages";

export const LanguageContext = createContext();

const LanguageContextUtil = ({ children }) => {
  const [language, setLanguage] = useState(languageOptions[0]);

  const handleChangeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, handleChangeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextUtil;
