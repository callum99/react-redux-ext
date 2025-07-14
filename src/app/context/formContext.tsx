import { createContext, useContext } from "react";
import { FormAction, FormContextProps, FormState } from "../types/reducerTypes";

export const FormContext = createContext<FormContextProps | null>(null);

export const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "REGISTER_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "UPDATE_FIELD":
      return {
        ...state,
        values: { ...state.values, [action.name]: action.value },
      };
    case "VALIDATE_FIELD":
      return {
        ...state,
        errors: { ...state.errors, [action.name]: action.error },
        validators: {...state.validators, [action.name]: action.validator },
      };
    case "DIRTY_FIELD":
      return {
        ...state,
        dirty: { ...state.dirty, [action.name]: action.dirty },
      }
    default:
      return state;
  }
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  
  if (!context) throw new Error("useFormContext must be used within FormProvider");
  
  return context;
};
