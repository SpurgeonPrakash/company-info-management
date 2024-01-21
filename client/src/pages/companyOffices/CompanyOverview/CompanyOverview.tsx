import { useHistory } from "react-router-dom";
import Button from "../../../components/FormElements/Button/Button";
import CompanyDetail from "../../companies/components/CompanyDetail/CompanyDetail";

import styles from "./CompanyOverview.module.css";
import { LoadingSpinner } from "../../../components/UiElements/LoadingSpinner/LoadingSpinner";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Company } from "../../../context/Companies/CompanyContext";

type Props = {
  companyId: string;
};

const CompanyOverview = ({ companyId }: Props) => {
  const [company, setCompany] = useState<Company>();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const fetchCompanies = useCallback(async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `${import.meta.env.VITE_REACT_APP_API}/company/${companyId}`,
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

      setCompany(respData.company);

      // console.log(companies);
      // console.log(respData);

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }

      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  if (isLoading) {
    return (
      <div className={styles.overViewContainer}>
        <LoadingSpinner small />
      </div>
    );
  }

  return (
    <div className={styles.overViewContainer}>
      {company && (
        <>
          <div className={styles.overvieHeading}>
            <h1>{company.name}</h1>
          </div>
          <hr />
          <div className={styles.overviewContent}>
            <CompanyDetail heading="Address" isBanner>
              <p>{company.address}</p>
            </CompanyDetail>
            <CompanyDetail heading="Revenue" isBanner>
              <p>{company.revenue.toString()}</p>
            </CompanyDetail>
            <CompanyDetail heading="Phone No" isBanner>
              <p>{`(${company.phone.countryCode}) ${company.phone.number}`}</p>
            </CompanyDetail>
            <div className={styles.companyOverviewBtnContainer}>
              <div className={styles.companyOverviewBtn}>
                <Button onClick={() => history.push("/")}>
                  Back to Overview
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CompanyOverview;
