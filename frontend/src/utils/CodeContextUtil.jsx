import { createContext, useState } from "react";

export const CodeContext = createContext();

const CodeContextUtil = ({ children }) => {
  const [code, setCode] = useState("// Start coding");

  const handleChangeCode = (newCode) => {
    setCode(newCode);
  };

  return (
    <CodeContext.Provider value={{ code, handleChangeCode }}>
      {children}
    </CodeContext.Provider>
  );
};

export default CodeContextUtil;
