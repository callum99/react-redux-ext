import { FormInput } from "./formInput";
import { Button } from "../../../buttons/default/button";
import React, { useState } from "react";

interface FormAddressProps {
  name:string;
}
export const FormAddress = ({name}: FormAddressProps) => {
  const [addresses, setAddresses] = useState<string[]>([name]);
  const generateUniqueName = (base: string) => `${base}-${Date.now()}`;
  
  const handleAddresses = () => {
    setAddresses([...addresses, `${generateUniqueName(name)}`]);
  }
  
  const handleRemoveAddress = (index: number) => {
    if (addresses.length === 1) return;
    setAddresses(addresses.filter((_, i) => i !== index));
  };
  
  return (
    <div className={"flex flex-col grow"}>
      {/*{addresses.map((addr, index) => (*/}
      {/*  <div key={addr} className="flex items-center">*/}
      {/*    <FormInput name={addr} placeHolder="Please add where you have lived. Press '+' to add more than one"/>*/}
      {/*    {addresses.length > 1 && (*/}
      {/*      <Button*/}
      {/*        className="flex items-center justify-center hover:bg-primary-400 bg-primary-300 text-red-50 w-[30px] h-[30px] m-[10px] rounded-md"*/}
      {/*        type="button"*/}
      {/*        btnText={(*/}
      {/*          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
      {/*            <path*/}
      {/*              d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"*/}
      {/*              fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>*/}
      {/*          </svg>*/}
      {/*        )}*/}
      {/*        btnOnClick={() => handleRemoveAddress(index)}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </div>*/}
      {/*))}*/}
      
      {/*<Button*/}
      {/*  className="flex items-center justify-center hover:bg-primary-900 bg-primary-600 text-primary-50 w-[30px] h-[30px] m-[10px] rounded-md"*/}
      {/*  type="button"*/}
      {/*  btnText={(*/}
      {/*    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
      {/*      <path*/}
      {/*        d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"*/}
      {/*        fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>*/}
      {/*    </svg>*/}
      {/*  )}*/}
      {/*  btnOnClick={handleAddresses}*/}
    </div>
  );
};
