import React from "react";
import { Form } from "radix-ui";

interface FormInputProps {
  children: React.ReactNode;
}

export const ErrorLabel = ({ children }: FormInputProps) => {
  return (
    <Form.Message className="font-sans text-white text-center relative block mt-[2px] rounded-lg bg-primary-600 pl-[10px] pr-[10px]]">
      {children}
    </Form.Message>
  );
};
