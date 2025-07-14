import { createContext, useContext } from "react";

interface FormFieldContextProps {
  value: any;
  updateValue: (value: any) => void;
}

export const FormFieldContext = createContext<FormFieldContextProps | null>(null);

export const useFormFieldContext = <T,>() => {
  const context = useContext(FormFieldContext);
  
  if (!context) throw new Error("useFormFieldContext must be used within FormFieldProvider");
  
  return context;
};
