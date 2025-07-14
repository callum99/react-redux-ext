import React, { useState } from "react";
import { useFormField } from "../../../../hooks/useFormField";
import { Form } from "radix-ui";

interface FormInputProps {
  placeHolder?: string;
}

export const FormInput = ({ placeHolder, ...props }: FormInputProps) => {
  const { value, handleChange } = useFormField();
  const [touched, setTouched] = useState<boolean>(false);
  
  return (
    <Form.Control asChild>
      <input
        {...props}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
        placeholder={placeHolder}
        className="flex grow bg-primary-50 border-primary-300 rounded-lg border-2 p-[5px] font-sans text-primary-900"
      />
    </Form.Control>
  );
};
