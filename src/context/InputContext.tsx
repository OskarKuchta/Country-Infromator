import { createContext, useContext, ReactNode, useState } from "react";
import { InputContextProps } from "../Types";

const InputContext = createContext<InputContextProps | undefined>(undefined);

export const InputProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <InputContext.Provider value={{ inputValue, setInputValue }}>
      {children}
    </InputContext.Provider>
  );
};

export const useInputContext = () => {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("useInputContext must be used within an InputProvider");
  }
  return context;
};
