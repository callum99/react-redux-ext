import { createContext, FormEvent, useContext } from "react";
import { ValidateType } from "../global.types";

interface FormFieldGroupContextProps {
  groupName: string;
  values: Record<string, any>;
  registerGroupField: (name: string, value: any) => void;
  updateGroupValue: (name: string, value: any) => void;
  validateGroupField: (name: string, validation: ValidateType) => void;
  submitGroup: (e: FormEvent) => void;
}

export const FormFieldGroupContext = createContext<FormFieldGroupContextProps | null>(null);

export const useFormFieldGroupContext = () => {
  const context = useContext(FormFieldGroupContext);
  
  if (!context) throw new Error("useFormFieldGroupContext must be used within FormFieldGroupProvider");
  
  return context;
};
