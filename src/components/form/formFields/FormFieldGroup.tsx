import React, { ReactNode, useEffect, useState } from "react";
import { FormFieldGroupContext } from "../../../app/context/formFieldGroupContext";
import { useFormContext } from "../../../app/context/formContext";
import { ValidateType } from "../../../app/global.types";

interface FormFieldGroupProps {
  name: string;
  children: (submit: any) => ReactNode;
}

export const FormFieldGroup = ({ name, children }: FormFieldGroupProps) => {
  const { updateField, validateField, registerField } = useFormContext();
  const [ groupValues, setGroupValues ] = useState<Record<string, any>>({});
  const [ groupErrors, setGroupErrors ] = useState<Record<string, any>>({});
  
  useEffect(() => {
    registerField(name, {});
  validateField(name, (value) => (value.length === 0 ? "Required" : null));
  }, [ name ]);
  
  const registerGroupField = (fieldName: string, value: any) => {
    setGroupValues((prev) => ({ ...prev, [fieldName]: value }));
  };
  
  const validateGroupField = (fieldName: string, validation: ValidateType) => {
    if (typeof validation === "undefined") return;
    
    if (groupValues[fieldName]) {
      const validateData = validation(groupValues[fieldName]);
      
      setGroupErrors((prev) => ({ ...prev, [fieldName]: validateData}));
      validateField(fieldName, validation, name);
    }
  }
  
  const updateGroupValue = (fieldName: string, value: any) => {
    setGroupValues((prev) => ({ ...prev, [fieldName]: value }));
    updateField(name, { ...groupValues, [fieldName]: value });
  };
  
  const submitGroup = () => {
    let formError = false;
    
    Object.entries(groupErrors).forEach((field) => {
      const [, value] = field;
      if (value !== null) {
        formError = true;
      }
    });
    
    if (formError) {
      console.log("cannot submit", groupErrors);
      return;
    } else {
      console.log("submitting group", groupValues);
      updateField(name, groupValues);
    }
  };
  
  return (
    <FormFieldGroupContext.Provider
      value={{ groupName: name, values: groupValues, registerGroupField, validateGroupField, updateGroupValue, submitGroup }}
    >
      {children(submitGroup)}
    </FormFieldGroupContext.Provider>
  );
};
