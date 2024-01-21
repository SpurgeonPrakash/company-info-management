import AddCompany from "../AddCompany/AddCompany";
import AddOffice from "../AddOffice/AddOffice";

import styles from "./CreateCompanyOrOffice.module.css";

const CreateCompanyOrOffice = () => {
  return (
    <div className={styles.container}>
      <AddCompany />
      <AddOffice />
    </div>
  );
};

export default CreateCompanyOrOffice;
