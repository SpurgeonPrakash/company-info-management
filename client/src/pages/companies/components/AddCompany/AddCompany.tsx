import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";

import { toast } from "react-toastify";

import styles from "./AddCompany.module.css";

import FormContainer from "../../../../components/FormElements/FormContainer/FormContainer";
import Input from "../../../../components/FormElements/Input/Input";

import { LoadingSpinner } from "../../../../components/UiElements/LoadingSpinner/LoadingSpinner";
import Button from "../../../../components/FormElements/Button/Button";

import reducer, { INITIAL_STATE, StateTypes } from "./state/reducer/reducer";
import {
  handleClearForm,
  handleFormFieldBlur,
  handleFormFieldChange,
} from "./state/actions/actions";
import { floorAnAmount } from "../../../../util/utils";
import { useCompanyContext } from "../../../../context/Companies/CompanyContext";
import useWindowWidth from "../../../../hooks/useWindowWidth";

const AddCompany = () => {
  const [codes, setCodes] = useState([]);
  const [searchCodes, setSearchCodes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const { addOneCompany } = useCompanyContext();
  const windowWidth = useWindowWidth();

  // const isValidCountryCode = (value: string): boolean => {
  //   const countryCodePattern = /^\+\d+$/;
  //   return countryCodePattern.test(value);
  // };

  const fetchCodes = useCallback(async () => {
    setIsLoading(true);
    try {
      const codesResponse = await fetch(`/data/country-codes.json`);

      const codesResponseData = await codesResponse.json();
      if (codesResponse.status === 422) {
        throw new Error("Validation failed.");
      }
      if (codesResponse.status !== 200 && codesResponse.status !== 201) {
        throw new Error("Something Went Wrong");
      }

      setCodes(codesResponseData.codes);

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  }, []);

  // console.log(pinCodes);

  useEffect(() => {
    fetchCodes();
  }, [fetchCodes]);

  const handlePhoneCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (inputValue.length > 4) {
      return;
    }

    let finalValue;
    if (inputValue.length === 1 && inputValue !== "+") {
      finalValue = "+" + inputValue;
    } else {
      finalValue = inputValue;
    }

    if (finalValue.length <= 1) {
      dispatch(
        handleFormFieldChange({ name: "countryCode", value: finalValue })
      );
    } else {
      const isInteger = /^\d+$/.test(finalValue.split("+")[1]);
      if (isInteger) {
        dispatch(
          handleFormFieldChange({ name: "countryCode", value: finalValue })
        );
      }
    }

    const newFilteredCodes = codes.filter(
      (it: { name: string; code: string }) => it.code.includes(finalValue)
    );

    // console.log(newFilteredCodes);

    setSearchCodes(newFilteredCodes);
  };

  const handleInputBlur = () => {
    if (!(state as StateTypes)?.touchedFields?.countryCode) {
      dispatch(handleFormFieldBlur({ name: "countryCode", value: "" }));
    }
    // setSearchCodes([]);
  };

  const handleSelectCodeClick = (codeData: { name: string; code: string }) => {
    setSearchCodes([]);

    dispatch(
      handleFormFieldChange({ name: "countryCode", value: codeData.code })
    );
  };

  // console.log("countryCodeLength: " + state!.countryCode.toString().length);

  const isFormValid =
    (state?.name ? true : false) &&
    (state?.address ? true : false) &&
    (state!.revenue > 0 ? true : false) &&
    (state?.countryCode ? true : false) &&
    (state?.phoneNumber ? true : false) &&
    Object.values((state as StateTypes)?.errors).every(
      (field) => field.length === 0
    ) &&
    Object.values((state as StateTypes)?.touchedFields).every((field) => field);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setIsLoading(true);
    e.preventDefault();

    const payload = {
      name: state?.name,
      address: state?.address,
      revenue: floorAnAmount(state?.revenue ?? 0),
      countryCode: state?.countryCode,
      phoneNumber: state?.phoneNumber,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/company`,
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

      addOneCompany({
        _id: responseData._id,
        address: state?.address ?? "",
        name: state?.name ?? "",
        revenue: state?.revenue ?? 0,
        phone: {
          countryCode: state?.countryCode ?? "",
          number: state?.phoneNumber ?? "",
        },
      });

      dispatch(handleClearForm());

      toast.success(responseData.message);
      setIsLoading(false);
      // history.push(`/user/profile/${userId}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.addCompanyContainer}>
        <LoadingSpinner small />;
      </div>
    );
  }

  return (
    <div className={styles.addCompanyContainer}>
      <FormContainer heading="Create Company">
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
        <Input
          type="text"
          label="Address"
          placeholder="address"
          value={state?.address}
          name="address"
          onChange={({ target: { value } }) =>
            dispatch(handleFormFieldChange({ name: "address", value }))
          }
          onBlur={() => {
            if (!(state as StateTypes)?.touchedFields?.address) {
              dispatch(handleFormFieldBlur({ name: "address", value: "" }));
            }
          }}
          errorText={
            (state as StateTypes)?.touchedFields["address"] &&
            (state as StateTypes)?.errors["address"]
              ? (state as StateTypes)?.errors["address"]
              : ""
          }
        />
        <Input
          type="number"
          label="Revenue"
          placeholder="revenue"
          min="1"
          pattern="\d+"
          name="revenue"
          value={state?.revenue}
          onChange={({ target: { value } }) =>
            dispatch(handleFormFieldChange({ name: "revenue", value }))
          }
          onBlur={() => {
            if (!(state as StateTypes)?.touchedFields?.revenue) {
              dispatch(handleFormFieldBlur({ name: "revenue", value: "" }));
            }
          }}
          errorText={
            (state as StateTypes)?.touchedFields["revenue"] &&
            (state as StateTypes)?.errors["revenue"]
              ? (state as StateTypes)?.errors["revenue"]
              : ""
          }
        />
        <div className={styles.contactContainer}>
          <p className={styles.contactHeading}>Phone No: </p>
          <div className={styles.contactContent}>
            <div className={styles.countryCode}>
              <Input
                type="text"
                placeholder="code"
                onChange={handlePhoneCodeChange}
                value={state?.countryCode}
                name="countryCode"
                onBlur={handleInputBlur}
                errorText={
                  (state as StateTypes)?.touchedFields["countryCode"] &&
                  (state as StateTypes)?.errors["countryCode"]
                    ? (state as StateTypes)?.errors["countryCode"]
                    : ""
                }
              />
              {state!.countryCode.toString().length > 1 &&
                searchCodes.length > 0 && (
                  <div className={styles.searchedCodes}>
                    {searchCodes.map((c: { code: string; name: string }) => (
                      <button
                        className={styles.codeDetail}
                        key={c.name}
                        onClick={() => {
                          handleSelectCodeClick(c);
                        }}
                      >
                        <p>{c.name}</p>
                        <p>{c.code}</p>
                      </button>
                    ))}
                  </div>
                )}
            </div>
            <div className={styles.contactNum}>
              <Input
                type="number"
                placeholder="number"
                // min="1"
                pattern="\d+"
                name="phoneNumber"
                value={state?.phoneNumber}
                onChange={({ target: { value } }) =>
                  dispatch(
                    handleFormFieldChange({ name: "phoneNumber", value })
                  )
                }
                onBlur={() => {
                  if (!(state as StateTypes)?.touchedFields?.phoneNumber) {
                    dispatch(
                      handleFormFieldBlur({ name: "phoneNumber", value: "" })
                    );
                  }
                }}
                errorText={
                  (state as StateTypes)?.touchedFields["phoneNumber"] &&
                  (state as StateTypes)?.errors["phoneNumber"]
                    ? (state as StateTypes)?.errors["phoneNumber"]
                    : ""
                }
              />
            </div>
          </div>
        </div>
        <Button disabled={!isFormValid} onClick={(e) => handleSubmit(e)}>
          Create
        </Button>
        {windowWidth <= 767 && (
          <div style={{ marginTop: "2rem" }}>
            <hr />
          </div>
        )}
      </FormContainer>
    </div>
  );
};

export default AddCompany;
