import { ErrorNameProps } from "./reducer";
import { AddOfficeTypes } from "./types";

export const handleFormFieldChange = (payload: {
  name: ErrorNameProps;
  value: string;
}) => ({
  type: AddOfficeTypes.HANDLE_FORM_ITEM_CHANGE,
  payload,
});

export const handleFormFieldBlur = (payload: {
  name: ErrorNameProps;
  value: string;
}) => ({
  type: AddOfficeTypes.HANDLE_FORM_ITEM_BLUR,
  payload,
});

export const handleClearForm = () => ({
  type: AddOfficeTypes.CLEAR_FORM_ITEMS,
});
