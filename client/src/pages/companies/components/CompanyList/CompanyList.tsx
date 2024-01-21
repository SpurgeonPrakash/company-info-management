import styles from "./CompanyList.module.css";
import { useCompanyContext } from "../../../../context/Companies/CompanyContext";
import Company from "../Company/Company";
import NoData from "../../../../components/UiElements/NoData/NoData";

const CompanyList = () => {
  const { companies } = useCompanyContext();
  return (
    <div className={styles.companyListContainer}>
      <h1>Companies</h1>
      <div className={styles.companyListContent}>
        {companies.length > 0 &&
          companies.map((company) => {
            return (
              <Company
                address={company.address}
                name={company.name}
                phone={company.phone}
                revenue={company.revenue}
                key={company._id}
                _id={company._id}
              />
            );
          })}
      </div>
      {companies.length === 0 && (
        <NoData msg="No Companies found, Please add one!" />
      )}
    </div>
  );
};

export default CompanyList;
