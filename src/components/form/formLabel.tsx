import React from "react";
import { Form } from "radix-ui";

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required: boolean
  children?: React.ReactNode
};

export const FormLabel = ({ required, children }: FormLabelProps) => {
  return (
    <Form.Label className="font-sans text-primary-600 text-lg font-bold">
      {children} {required && (<span className="font-sans text-light-600 text-lg font-bold">*</span>)}
    </Form.Label>
  );
};
