import { useParams } from "react-router-dom";
import PageContainer from "../../components/UiElements/PageContainer/PageContainer";
import CompanyOverview from "./CompanyOverview/CompanyOverview";
import Offices from "./Offices/Offices";

import styles from "./CompanyOffices.module.css";

const CompanyOffices = () => {
  const { companyId } = useParams<{ companyId: string }>();

  return (
    <PageContainer>
      <div className={styles.container}>
        <CompanyOverview companyId={companyId} />
        <Offices />
      </div>
    </PageContainer>
  );
};

export default CompanyOffices;
