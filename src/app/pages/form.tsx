import React, { FormEvent, useState } from "react";
import { FormLabel } from "../../components/form/formLabel";
import { CustomForm } from "../../components/form/customForm";
import { FormRadioGroup } from "../../components/form/formFields/formField/formRadioGroup";
import { FormCheckbox } from "../../components/form/formFields/formField/formCheckbox";
import { FormInput } from "../../components/form/formFields/formField/formInput";
import { ErrorLabel } from "../../components/form/errorLabel";
import { checkUsernameAvailability } from "../../app/api/ValidateUserNameApi";
import { FormField } from "../../components/form/formFields/formField";
import { Button } from "../../components/buttons/default/button";
import { FormFieldGroup } from "../../components/form/formFields/FormFieldGroup";
import { Form as FormTest } from "radix-ui";

const Form = ({}) => {
  const [serverError, setServerError] = useState<string | null>("");
  
  const handleSubmit = async (values: Record<string, any>, errors: Record<string, any>) => {
    console.log("Form Results:", values, errors);
    setServerError("");
    
    const clientSideError = Object.entries(errors).find(([, errorMsg]) => errorMsg !== null);
    
    if (clientSideError) {
      const [, message] = clientSideError;
      setServerError(`Form Error: ${message}`);
      return;
    }
    
    // hide server error test for now
    // const test = await checkUsernameAvailability("Bret");
    //
    // if (typeof test === "string") {
    //   setServerError(`Server Error: ${test}`);
    // }
  };
  
  return (
    <div className={"flex flex-col justify-between bg-white w-[800px] h-[100%]"}>
      <div className={"flex flex-col justify-between bg-white w-[800px] h-[100%]"}>
        <CustomForm onSubmit={handleSubmit}>
          {({submit}) => (
            <FormTest.Root onSubmit={submit} className="flex flex-col p-[10px]">
              
              <div className={"flex flex-row"}>
                <FormTest.Field className="flex flex-col grow p-[10px]" name="firstName">
                  <FormField
                    name="firstName"
                    validate={
                      (value) => checkUsernameAvailability(value)
                      // (value) =>
                      //   (
                      //     typeof value === "undefined"
                      //       ? "Required"
                      //       : value.trim().length === 0
                      //         ? "Required"
                      //         : value.trim().length < 2
                      //           ? "More Characters"
                      //           : null
                      //   )
                    }
                  >
                    {({ error, dirty }) => (
                      <>
                        <FormLabel required>First Name</FormLabel>
                        <FormInput placeHolder="First Name"/>
                        {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                      </>
                    )}
                  </FormField>
                </FormTest.Field>
                
                <FormTest.Field className="flex flex-col grow p-[10px]" name="lastName">
                  <FormField
                    name="lastName"
                    validate={
                      (value) =>
                        (value.trim().length === 0 ? "Required" : null)
                        || (value.trim().length < 2 ? "More Characters" : null)
                    }
                  >
                    {({ error, dirty }) => (
                      <>
                        <FormLabel required>Last Name</FormLabel>
                        <FormInput placeHolder="Last Name"/>
                        {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                      </>
                    )}
                  </FormField>
                </FormTest.Field>
              </div>
              
              <FormTest.Field className="flex flex-col grow p-[10px]" name="email">
                <FormField
                  name="email"
                  validate={
                    (value) =>
                      (value.trim().length === 0 ? "Required" : null)
                      || (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Email not valid" : null)
                  }
                >
                  {({ error, dirty }) => (
                    <>
                      <FormLabel required>Email Address</FormLabel>
                      <FormInput placeHolder="Email Address"/>
                      {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                    </>
                  )}
                </FormField>
              </FormTest.Field>
              
              <div className={"flex flex-row"}>
                <div className={"flex flex-col grow"}>
                  <FormTest.Field className="flex flex-col grow p-[10px]" name="age">
                    <FormField
                      name="age"
                      validate={
                        (value) => (![ "child", "teen", "youngAdult", "adult" ].includes(value) ? 'Please select!' : null)
                      }
                    >
                      {({ error, dirty }) => (
                        <>
                          <FormLabel required>Age</FormLabel>
                          <FormRadioGroup
                            name="age"
                            radioOptions={[
                              { label: "0-16yr", value: "child", id: "rad1" },
                              { label: "16-20yr", value: "teen", id: "rad2" },
                              { label: "20-30yr", value: "youngAdult", id: "rad3" },
                              { label: "30+ yr", value: "adult", id: "rad4" }
                            ]}
                          />
                          {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                        </>
                      )}
                    </FormField>
                  </FormTest.Field>
                  
                  <FormTest.Field className="flex flex-col grow p-[10px]" name="conditions">
                    <FormField
                      name="conditions"
                      validate={
                        (value) => ((value.includes("check1") || value.includes("check2")) !== true ? 'Please select all' : null)
                          || (value.includes("check1") !== true ? 'Please accept terms' : null)
                          || (value.includes("check2") !== true ? 'Please accept privacy' : null)
                      }
                    >
                      {({ error, dirty }) => (
                        <>
                          <FormCheckbox
                            checkboxes={[
                              { id: "check1", label: "Terms & Conditions" },
                              { id: "check2", label: "Privacy Policy" }
                            ]}
                            className={"flex flex-row"}
                          />
                          {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                        </>
                      )}
                    </FormField>
                  </FormTest.Field>
                </div>
                
                <div className={"flex flex-col grow p-[10px]"}>
                  <div className="flex flex-col bg-primary-300 p-4 rounded-lg">
                    <FormFieldGroup name="billing">
                      {(submit) => (
                        <FormTest.Root onSubmit={submit}>
                          <FormTest.Field className="flex flex-col grow p-[10px]" name="nameOnCard">
                            <FormField
                              name="nameOnCard"
                              validate={
                                (value) =>
                                  (value.trim().length === 0 ? "Required" : null)
                                  || (value.trim().length < 2 ? "More Characters" : null)
                              }
                            >
                              {({ error, dirty }) => (
                                <>
                                  <FormLabel required>Name on Card</FormLabel>
                                  <FormInput placeHolder="Name on Credit Card"/>
                                  {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                                </>
                              )}
                            </FormField>
                          </FormTest.Field>
                          
                          <FormTest.Field className="flex flex-col grow p-[10px]" name="cardNumber">
                            <FormField
                              name="cardNumber"
                              validate={
                                (value) =>
                                  (value.trim().length === 0 ? "Required" : null)
                                  || (value.trim().length < 2 ? "More Characters" : null)
                              }
                            >
                              {({ dirty, error }) => (
                                <>
                                  <FormLabel required>Credit Card No</FormLabel>
                                  <FormInput placeHolder="Credit Card Number"/>
                                  {error && dirty && (<ErrorLabel>{error}</ErrorLabel>)}
                                </>
                              )}
                            </FormField>
                          </FormTest.Field>
                          
                          <Button
                            className={"hover:bg-primary-900 bg-primary-600 text-primary-50 w-[150px] h-[30px] m-[10px] rounded-md"}
                            type="submit"
                            btnText="+ Add Card"
                            btnOnClick={(e: FormEvent) => {
                              e.preventDefault();
                              e.stopPropagation();
                              submit();
                            }}
                          />
                        </FormTest.Root>
                      )}
                    </FormFieldGroup>
                  </div>
                </div>
              </div>
              {serverError && (<span className="text-red-600 font-bold">{serverError}</span>)}
              <Button
                className={"hover:bg-primary-900 bg-primary-600 text-primary-50 w-[100px] h-[30px] m-[10px] rounded-md"}
                type="submit"
                btnText="Submit"
              />
            </FormTest.Root>
          )}
        </CustomForm>
      </div>
    </div>
  );
};

export default Form;
