import { useFormFieldContext } from "../app/context/formFieldContext";

export const useFormField = () => {
  const { value, updateValue } = useFormFieldContext();
  
  const handleChange = (value: any) => {
    updateValue(value);
  };
  
  return { value, handleChange };
};
