import PageContainer from "../../components/UiElements/PageContainer/PageContainer";
import CreateCompanyOrOffice from "./components/CreateCompanyOrOffice/CreateCompanyOrOffice";

import styles from "./Companies.module.css";
import HorizontalRow from "../../components/UiElements/HorizontalRow/HorizontalRow";
import LineBreak from "../../components/UiElements/LineBreak/LineBreak";

import { useCompanyContext } from "../../context/Companies/CompanyContext";
import { LoadingSpinner } from "../../components/UiElements/LoadingSpinner/LoadingSpinner";
import CompanyList from "./components/CompanyList/CompanyList";

const Companies = () => {
  const { isCompaniesLoading } = useCompanyContext();

  if (isCompaniesLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <div className={styles.container}>
        <LineBreak />
        <CreateCompanyOrOffice />
        <HorizontalRow />
        <CompanyList />
      </div>
    </PageContainer>
  );
};

export default Companies;
