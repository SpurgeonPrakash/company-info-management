import { AddCompanyTypes } from "../types/types";

export type errorProps = {
  name: string;
  address: string;
  revenue: string;
  countryCode: string;
  phoneNumber: string;
};

export type ErrorNameProps =
  | "name"
  | "address"
  | "revenue"
  | "countryCode"
  | "phoneNumber";

type FormBlurTypes = {
  name: boolean;
  address: boolean;
  revenue: number;
  countryCode: string;
  phoneNumber: string;
};

export type StateTypes = {
  name: string;
  address: string;
  revenue: number;
  countryCode: string;
  phoneNumber: string;
  errors: errorProps;
  touchedFields: FormBlurTypes;
};

export type PayloadType = { name: ErrorNameProps; value: string } | null;

export const INITIAL_STATE = {
  name: "",
  address: "",
  revenue: 1,
  countryCode: "",
  phoneNumber: "",
  errors: {},
  touchedFields: {},
};

const validateFormFields = (name: ErrorNameProps, value: string = "") => {
  const errors: errorProps = {} as errorProps;
  const errorName =
    name.charAt(0).toUpperCase() + name.slice(1).split("-").join(" ");

  if (!value) {
    errors[name] = `${errorName} is required`;
  } else {
    switch (name) {
      case "revenue":
        if (parseInt(value) <= 0) {
          errors.revenue = `${errorName} should be a positive number`;
        } else {
          errors.revenue = "";
        }
        break;
      case "countryCode":
        if (value.length > 4) {
          errors.countryCode = `${errorName} should be at most 4 characters`;
        } else {
          errors.countryCode = "";
        }
        break;
      case "phoneNumber":
        if (value.length !== 10) {
          errors.phoneNumber = `${errorName} should be of 10 characters`;
        } else if (parseInt(value) < 1) {
          errors.phoneNumber = `${errorName} should be of positive number`;
        } else {
          errors.phoneNumber = "";
        }
        break;
      default:
        errors[name] = "";
        break;
    }
  }

  return errors;
};

const reducer = (
  state = INITIAL_STATE,
  {
    type,
    payload,
  }: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  {
    type: string;
    payload?: PayloadType;
  }
) => {
  switch (type) {
    case AddCompanyTypes.HANDLE_FORM_ITEM_CHANGE:
      return {
        ...state,
        [payload!.name]: payload!.value,
        errors: {
          ...state.errors,
          ...validateFormFields(payload!.name, payload!.value),
        },
      };

    case AddCompanyTypes.HANDLE_FORM_ITEM_BLUR:
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          [payload!.name]: true,
        },
      };

    case AddCompanyTypes.CLEAR_FORM_ITEMS:
      return INITIAL_STATE;
  }
};

export default reducer;
