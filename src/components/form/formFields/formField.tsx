import { ReactNode, useContext, useEffect } from "react";
import { useFormContext } from "../../../app/context/formContext";
import { FormFieldContext } from "../../../app/context/formFieldContext";
import { ValidateType } from "../../../app/global.types";
import { ValidationError } from "../../../app/types/reducerTypes";
import { FormFieldGroupContext } from "../../../app/context/formFieldGroupContext";

export interface FormFieldProps {
  initialValue?: any;
  name: string;
  children: (state: {
    error?: ValidationError;
    dirty?: boolean;
  }) => ReactNode;
  validate: ValidateType
}

export function FormField({ name, initialValue, children, validate}: FormFieldProps)
{
  const { state, dispatch, registerField, updateField, validateField } = useFormContext();
  const groupContext = useContext(FormFieldGroupContext);
  const setFieldMethods = groupContext
    ? {
      currentValue: state.values[groupContext.groupName]?.[name] || initialValue,
      register: groupContext.registerGroupField,
      validate: groupContext.validateGroupField,
      update: groupContext.updateGroupValue
    }
    : {
      currentValue: state.values[name] || initialValue,
      register: registerField,
      validate: validateField,
      update: updateField
    };

  useEffect(() => {
    setFieldMethods.register(name, setFieldMethods.currentValue)
    setFieldMethods.validate(name, validate);
  }, [name, setFieldMethods.currentValue]);
  
  useEffect(() => {
    if (state.dirty[name]) setFieldMethods.validate(name, validate);
  }, [name]);
  
  const updateValue = (value: any) => {
    dispatch({ type: "DIRTY_FIELD", name, dirty: true });
    setFieldMethods.update(name, value);
  };
  
  return (
    <FormFieldContext.Provider value={{ value: setFieldMethods.currentValue, updateValue }}>
      {children({
        error: state.errors[name],
        dirty: state.dirty[name]
      })}
    </FormFieldContext.Provider>
  );
}
