import React, { FormEvent, useState } from "react";
import { DashboardTypes } from './dashboard.types';
import { Heading } from "../heading/heading";
import { IncreaseButton } from '../buttons/increaseButton/increaseButton';
import { DecreaseButton } from '../buttons/decreaseButton/decreaseButton';
import { FormLabel } from "../form/formLabel";
import { CustomForm } from "../form/customForm";
import { FormRadioGroup } from "../form/formFields/formField/formRadioGroup";
import { FormCheckbox } from "../form/formFields/formField/formCheckbox";
import { FormInput } from "../form/formFields/formField/formInput";
import { ErrorLabel } from "../form/errorLabel";
import { checkUsernameAvailability } from "../../app/api/ValidateUserNameApi";
import { FormField } from "../form/formFields/formField";
import { Button } from "../buttons/default/button";
import { FormFieldGroup } from "../form/formFields/FormFieldGroup";
import { Form } from "radix-ui";

export const Dashboard = ({headingText, increaseBtnText, decreaseBtnText}: DashboardTypes) => {
  return (<p>Dashboard</p>)
};
