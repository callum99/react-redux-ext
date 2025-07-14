import React, { useState } from "react";
import { useFormField } from "../../../../hooks/useFormField";
import { Form } from "radix-ui";

export const FormTextarea = () => {
  const { value, handleChange } = useFormField();
  const [touched, setTouched] = useState<boolean>(false);
  
  return (
    <Form.Control asChild>
      <textarea
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={() => setTouched(true)}
        className="bg-primary-50 border-primary-300 rounded-lg border-2 p-[5px] font-sans text-primary-900"
      />
    </Form.Control>
  );
};
