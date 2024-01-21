import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoData from "../../../components/UiElements/NoData/NoData";
import { LoadingSpinner } from "../../../components/UiElements/LoadingSpinner/LoadingSpinner";

import styles from "./Offices.module.css";
import Office from "../Office/Office";
import { useParams } from "react-router-dom";

export type Office = {
  _id: string;
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  officeStartDate: string;
  company: string;
};

const Offices = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [offices, setOffices] = useState<Office[]>([]);

  const fetchOffices = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/office/company/${companyId}`,
        {
          method: "GET",
          // headers: {
          //   "Content-Type": "application/json",
          // },
        }
      );

      const respData = await resp.json();
      if (resp.status === 422) {
        throw new Error("Validation failed.");
      }
      if (resp.status !== 200 && resp.status !== 201) {
        throw new Error("Something Went Wrong");
      }

      setOffices(respData.offices);

      console.log(respData);
      //   console.log(respData.companies);

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  }, []);

  const deleteOneOffice = (officeId: string) => {
    setOffices((oldOffices) => oldOffices.filter((it) => it._id !== officeId));
  };

  useEffect(() => {
    fetchOffices();
  }, [fetchOffices]);

  if (isLoading) {
    return (
      <div className={styles.companyContainer}>
        <LoadingSpinner small />;
      </div>
    );
  }

  return (
    <div className={styles.officeListContainer}>
      <h1>Offices</h1>
      <div className={styles.officeListContent}>
        {offices.length > 0 &&
          offices.map((office) => {
            return (
              <Office
                name={office.name}
                location={office.location}
                officeStartDate={office.officeStartDate}
                key={office._id}
                _id={office._id}
                company={office.company}
                deleteOneOffice={deleteOneOffice}
              />
            );
          })}
      </div>
      {offices.length === 0 && (
        <NoData msg="No Offices found, Please add one!" />
      )}
    </div>
  );
};

export default Offices;
