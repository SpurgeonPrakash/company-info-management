import React, { useState } from "react";

import styles from "./Company.module.css";
import CompanyDetail from "../CompanyDetail/CompanyDetail";
// import DeleteButton from "../../../../components/FormElements/DeleteButton/DeleteButton";
import { toast } from "react-toastify";
import { LoadingSpinner } from "../../../../components/UiElements/LoadingSpinner/LoadingSpinner";
import { useCompanyContext } from "../../../../context/Companies/CompanyContext";
// import { useHistory } from "react-router-dom";
// import DeleteConfirmPopup from "../../../../components/UiElements/DeleteConfirmPopup/DeleteConfirmPopup";
import Card from "../../../../components/UiElements/Card/Card";

type Props = {
  _id: string;
  name: string;
  address: string;
  revenue: number;
  phone: {
    countryCode: string;
    number: string;
  };
};

const Company = ({ _id, name, address, revenue, phone }: Props) => {
  // const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  // const [showModal, setShowModal] = useState(false);

  const { deleteOneCompany } = useCompanyContext();

  const handleDeleteCompany = async (companyId: string) => {
    setIsLoading(true);
    try {
      const deleteResponse = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/company/${companyId}`,
        {
          method: "DELETE",
          headers: {
            // "Content-Type": "application/json",
          },
        }
      );

      const deleteResponseData = await deleteResponse.json();

      if (deleteResponse.status === 422) {
        throw new Error("Validation failed.");
      }
      if (deleteResponse.status !== 200 && deleteResponse.status !== 201) {
        throw new Error(deleteResponseData.message);
      }

      console.log(deleteResponseData);

      deleteOneCompany(deleteResponseData.companyId);
      toast.success(deleteResponseData.message);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className={styles.companyContainer}>
        <LoadingSpinner small />;
      </div>
    );
  }

  return (
    <Card
      redirectUrl={`/company/${_id}`}
      onDelete={() => handleDeleteCompany(_id)}
      title={name}
    >
      <CompanyDetail heading="Address">
        <p>{address}</p>
      </CompanyDetail>
      <CompanyDetail heading="Revenue">
        <p>{revenue.toString()}</p>
      </CompanyDetail>
      <CompanyDetail heading="Phone No">
        <p>{`(${phone.countryCode}) ${phone.number}`}</p>
      </CompanyDetail>
    </Card>
  );
};

export default Company;
