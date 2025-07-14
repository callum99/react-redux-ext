import { ValidateType } from "../global.types";
import { Dispatch, FormEvent } from "react";

export type ValidationError = string | null | Promise<string | null>;

export interface FormState {
  values: Record<string, any>;
  errors: Record<string, ValidationError>;
  validators: Record<string, ValidateType>;
  dirty: Record<string, boolean>;
}

export type FormAction =
  | { type: "REGISTER_FIELD"; name: string; value: any}
  | { type: "UPDATE_FIELD"; name: string; value: any}
  | { type: "VALIDATE_FIELD"; name: string; error: ValidationError; validator: ValidateType }
  | { type: "DIRTY_FIELD"; name: string; dirty: boolean;}

export interface FormContextProps {
  state: FormState;
  dispatch: Dispatch<FormAction>;
  registerField: (name: string, initialValue: any) => void;
  updateField: (name: string, value: any) => void;
  validateField: (name: string, validator: ValidateType, groupName?: string) => void;
  submitForm: (e: FormEvent) => void;
};
