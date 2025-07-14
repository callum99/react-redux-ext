import React, { ReactNode, useReducer, useState } from "react";
import { FormContext, formReducer } from "../../app/context/formContext";
import { ValidateType } from "../../app/global.types";

interface CustomFormProps
{
  onSubmit: <T,>(values: Record<string, T>, errors: Record<string, T>) => void;
  children: (state: {
    submit: (e: React.FormEvent) => void;
  }) => ReactNode;
}

export function CustomForm({ onSubmit, children }: CustomFormProps)
{
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [state, dispatch] = useReducer(formReducer, {
    values: {},
    errors: {},
    validators: {},
    dirty: {}
  });
  
  const registerField = <T,>(name: string, initialValue: T) => {
    dispatch({ type: "REGISTER_FIELD", name, value: initialValue });
  };
  
  const validateField = async (name: string, validator: ValidateType, groupName?: string) => {
    const formValue = groupName ? state.values[groupName] : state.values;
    const dummyValidator = () => null;
    
    if (!validator) validator = dummyValidator;
    
    let error;
    
    if (!formValue[name]) return;
    
    try {
      setIsValidating(true);
      const result= validator(formValue[name]);
      
      if (result instanceof Promise) {
        error = await result;
        setIsValidating(false);
      } else {
        error = result;
        setIsValidating(false);
      }
    } catch (err) {
      error = "Error during validation";
    }
    
    dispatch({ type: "VALIDATE_FIELD", name, error, validator });
  };
  
  const updateField = <T,>(name: string, value: T) => {
    dispatch({ type: "UPDATE_FIELD", name, value });
  };
  
  const submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isValidating) {
      console.log("still validating");
      return;
    }
    
    onSubmit(state.values, state.errors);
  };
  
  return (
    <FormContext.Provider value={{ state, dispatch, registerField, updateField, validateField, submitForm}}>
      {children({submit: submitForm})}
    </FormContext.Provider>
  )
}
