import React, { useState } from "react";
import { FormLabel } from "../../formLabel";
import { useFormField } from "../../../../hooks/useFormField";
import { Checkbox } from "radix-ui";
import { CheckIcon } from "@radix-ui/react-icons";

interface FormCheckboxProps {
  checkboxes: { label: string, id:string }[];
  className: string;
}

export const FormCheckbox = ({checkboxes, className}: FormCheckboxProps) => {
  const { value = [], handleChange } = useFormField();
  const [touched, setTouched] = useState<boolean>(false);
  
  const handleCheckboxChange = (id: string, checked: boolean) => {
    const updatedValue = checked
      ? [...value, id]
      : value.filter((item: string) => item !== id);
    
    handleChange(updatedValue);
  };
  
  return (
    <div className={className}>
      {checkboxes.map((check) => (
        <div className="flex mr-[10px]">
          <Checkbox.Root
            id={check.id}
            onBlur={() => setTouched(true)}
            onCheckedChange={(checked: boolean) => handleCheckboxChange(check.id, checked)}
            className="flex justify-center items-center bg-primary-50 border-primary-300 rounded-md border-2 font-sans w-[20px] h-[20px] hover:bg-primary-300 mr-[5px] mt-[5px] mb-[5px]"
          >
            <Checkbox.Indicator className="text-primary-400">
              <CheckIcon/>
            </Checkbox.Indicator>
          </Checkbox.Root>
          
          <FormLabel required={false} htmlFor={check.id}>
            {check.label}
          </FormLabel>
        </div>
      ))}
    </div>
  );
};
