import { AddOfficeTypes } from "./types";

export type errorProps = {
  name: string;
  latitude: string;
  longitude: string;
  officeStartDate: string;
  company: string;
};

export type ErrorNameProps =
  | "name"
  | "latitude"
  | "longitude"
  | "officeStartDate"
  | "company";

type FormBlurTypes = {
  name: boolean;
  latitude: boolean;
  longitude: boolean;
  officeStartDate: boolean;
  company: boolean;
};

export type StateTypes = {
  name: string;
  latitude: number;
  longitude: number;
  officeStartDate: string;
  company: string;
  errors: errorProps;
  touchedFields: FormBlurTypes;
};

export type PayloadType = { name: ErrorNameProps; value: string } | null;

export const INITIAL_STATE = {
  name: "",
  latitude: 0,
  longitude: 0,
  officeStartDate: new Date().toString(),
  company: "",
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
      case "latitude":
        if (parseInt(value) < 0) {
          errors.latitude = `${errorName} should be a positive number`;
        } else {
          errors.latitude = "";
        }
        break;

      case "longitude":
        if (parseInt(value) < 0) {
          errors.longitude = `${errorName} should be a positive number`;
        } else {
          errors.longitude = "";
        }
        break;
      case "company":
        console.log(value);

        if (parseInt(value) === 1) {
          errors.company = `Please Choose a  Valid Company`;
        } else {
          errors.company = "";
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
    case AddOfficeTypes.HANDLE_FORM_ITEM_CHANGE:
      return {
        ...state,
        [payload!.name]: payload!.value,
        errors: {
          ...state.errors,
          ...validateFormFields(payload!.name, payload!.value),
        },
      };

    case AddOfficeTypes.HANDLE_FORM_ITEM_BLUR:
      return {
        ...state,
        touchedFields: {
          ...state.touchedFields,
          [payload!.name]: true,
        },
      };

    case AddOfficeTypes.CLEAR_FORM_ITEMS:
      return INITIAL_STATE;

    default:
      return state;
  }
};

export default reducer;
