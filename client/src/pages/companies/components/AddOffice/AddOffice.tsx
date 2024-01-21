import { useReducer, useState } from "react";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import FormContainer from "../../../../components/FormElements/FormContainer/FormContainer";
import Input from "../../../../components/FormElements/Input/Input";
import useWindowWidth from "../../../../hooks/useWindowWidth";

import styles from "./AddOffice.module.css";
import Select from "../../../../components/FormElements/Select/Select";
import Button from "../../../../components/FormElements/Button/Button";

import reducer, { INITIAL_STATE, StateTypes } from "./state/reducer";
import {
  handleFormFieldBlur,
  handleFormFieldChange,
  handleClearForm,
} from "./state/actions";
import { LoadingSpinner } from "../../../../components/UiElements/LoadingSpinner/LoadingSpinner";
import { useCompanyContext } from "../../../../context/Companies/CompanyContext";
import { toast } from "react-toastify";

const AddOffice = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isCompaniesLoading, companies } = useCompanyContext();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const windowWidth = useWindowWidth();

  //   console.log(startDate);
  /*
    const dateString = "Wed Jan 17 2024 23:05:02 GMT+0530 (India Standard Time)";
const dateObject = new Date(dateString);

const formattedDate = dateObject.toLocaleDateString("en-US", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

  */

  const isFormValid =
    (state?.name ? true : false) &&
    (state!.latitude > 0 ? true : false) &&
    (state!.longitude > 0 ? true : false) &&
    (state?.officeStartDate ? true : false) &&
    (state?.company ? true : false) &&
    Object.values((state as StateTypes)?.errors).every(
      (field) => field.length === 0
    ) &&
    Object.values((state as StateTypes)?.touchedFields).every((field) => field);

  console.log(companies);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // setIsLoading(true);
    e.preventDefault();

    console.log(state);

    const payload = {
      name: state?.name,
      latitude: state.latitude,
      longitude: state.longitude,
      officeStartDate: new Date(state.officeStartDate).toLocaleDateString(
        "en-US",
        {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }
      ),
      company: state?.company,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/office`,
        {
          method: "POST",
          body: JSON.stringify(payload),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      if (response.status === 422) {
        throw new Error("Validation failed.");
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error(responseData.message);
      }

      dispatch(handleClearForm());
      toast.success(responseData.message);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  };

  if (isCompaniesLoading || isLoading) {
    return (
      <div className={styles.addOfficeContainer}>
        <LoadingSpinner small />;
      </div>
    );
  }

  return (
    <div className={styles.addOfficeContainer}>
      <FormContainer heading="Create Office">
        <Input
          type="text"
          label="Name"
          placeholder="name"
          name="name"
          value={state?.name}
          onChange={({ target: { value } }) =>
            dispatch(handleFormFieldChange({ name: "name", value }))
          }
          onBlur={() => {
            if (!(state as StateTypes)?.touchedFields?.name) {
              dispatch(handleFormFieldBlur({ name: "name", value: "" }));
            }
          }}
          errorText={
            (state as StateTypes)?.touchedFields["name"] &&
            (state as StateTypes)?.errors["name"]
              ? (state as StateTypes)?.errors["name"]
              : ""
          }
        />
        <p className={styles.locationHeading}>Location: </p>
        <div className={styles.locationContainer}>
          <div className={styles.locPoint}>
            <Input
              type="number"
              min={0}
              placeholder="latitude"
              // width="50%"
              name="latitude"
              value={state?.latitude}
              onChange={({ target: { value } }) =>
                dispatch(handleFormFieldChange({ name: "latitude", value }))
              }
              onBlur={() => {
                if (!(state as StateTypes)?.touchedFields?.latitude) {
                  dispatch(
                    handleFormFieldBlur({ name: "latitude", value: "" })
                  );
                }
              }}
              errorText={
                (state as StateTypes)?.touchedFields["latitude"] &&
                (state as StateTypes)?.errors["latitude"]
                  ? (state as StateTypes)?.errors["latitude"]
                  : ""
              }
            />
          </div>
          <div className={styles.locPoint}>
            <Input
              type="number"
              min={0}
              placeholder="longitude"
              name="longitude"
              value={state?.longitude}
              onChange={({ target: { value } }) =>
                dispatch(handleFormFieldChange({ name: "longitude", value }))
              }
              onBlur={() => {
                if (!(state as StateTypes)?.touchedFields?.longitude) {
                  dispatch(
                    handleFormFieldBlur({ name: "longitude", value: "" })
                  );
                }
              }}
              errorText={
                (state as StateTypes)?.touchedFields["longitude"] &&
                (state as StateTypes)?.errors["longitude"]
                  ? (state as StateTypes)?.errors["longitude"]
                  : ""
              }
            />
          </div>
        </div>
        <p className={styles.dateHeading}>Office Start Date: </p>
        <div>
          <DatePicker
            selected={new Date(state!.officeStartDate)}
            onChange={(date: Date | null) => {
              if (date) {
                dispatch(
                  handleFormFieldChange({
                    name: "officeStartDate",
                    value: date.toString(),
                  })
                );
              }
            }}
            dateFormat="MMMM d, yyyy"
            placeholderText="date"
            //   isClearable
            // locale="en-US"
            className={`${styles.datePicker}`}
            customInput={
              <Input
                type="text"
                style={{
                  width:
                    windowWidth > 767
                      ? windowWidth / 2 - 120 + "px"
                      : windowWidth > 480
                      ? windowWidth - 170
                      : windowWidth - 100,
                }}
                // label="officeStartDate"
              />
            }
          />
        </div>
        <Select
          options={companies.map((comp) => ({
            _id: comp._id,
            name: comp.name,
          }))}
          label="Company"
          name="company"
          value={state?.company}
          onChange={({ target: { value } }) =>
            dispatch(handleFormFieldChange({ name: "company", value }))
          }
          onBlur={() => {
            if (!(state as StateTypes)?.touchedFields?.company) {
              dispatch(
                handleFormFieldBlur({
                  name: "company",
                  value: "",
                })
              );
            }
          }}
          errorText={
            (state as StateTypes)?.touchedFields["company"] &&
            (state as StateTypes)?.errors["company"]
              ? (state as StateTypes)?.errors["company"]
              : ""
          }
        />
        <Button disabled={!isFormValid} onClick={(e) => handleSubmit(e)}>
          Create
        </Button>
      </FormContainer>
    </div>
  );
};

export default AddOffice;
