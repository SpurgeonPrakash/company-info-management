import { ErrorNameProps } from "../reducer/reducer";
import { AddCompanyTypes } from "../types/types";

export const handleFormFieldChange = (payload: {
  name: ErrorNameProps;
  value: string;
}) => ({
  type: AddCompanyTypes.HANDLE_FORM_ITEM_CHANGE,
  payload,
});

export const handleFormFieldBlur = (payload: {
  name: ErrorNameProps;
  value: string;
}) => ({
  type: AddCompanyTypes.HANDLE_FORM_ITEM_BLUR,
  payload,
});

export const handleClearForm = () => ({
  type: AddCompanyTypes.CLEAR_FORM_ITEMS,
});
