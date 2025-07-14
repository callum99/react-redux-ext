import React, { useState } from "react";
import { FormLabel } from "../../formLabel";
import { useFormField } from "../../../../hooks/useFormField";
import { RadioGroup } from "radix-ui";

interface FormRadioGroupProps {
  name: string;
  radioOptions: { label: string; value: string; id: string; }[] | undefined;
  defaultValue?: string;
  className?: string;
}

export const FormRadioGroup = ({className, defaultValue, radioOptions}: FormRadioGroupProps) => {
  const { value, handleChange } = useFormField();
  const [touched, setTouched] = useState<boolean>(false);
  
  if (!radioOptions || radioOptions.length === 0) return null;
  
  return (
    <RadioGroup.Root
      className={className}
      value={value}
      defaultValue={defaultValue}
      onFocus={() => setTouched(true)}
      onValueChange={(value) => {
        handleChange(value)
        setTouched(true)
      }}
    >
      {radioOptions.map((radioItem) => (
        <div className="flex items-center">
          <RadioGroup.Item
            value={radioItem.value}
            id={radioItem.id}
            className="mr-[5px] bg-primary-50 border-primary-300 border-2 w-[18px] h-[18px] rounded-[100%] hover:border-primary-400"
          >
            <RadioGroup.Indicator
              className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[8px] after:h-[8px] after:bg-primary-400 after:rounded-[50%]"
            />
          </RadioGroup.Item>
          
          <FormLabel required={false} htmlFor={radioItem.id}>
            {radioItem.label}
          </FormLabel>
        </div>
      ))}
    </RadioGroup.Root>
  );
};
