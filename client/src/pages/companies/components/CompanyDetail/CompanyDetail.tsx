import React from "react";

import styles from "./CompanyDetail.module.css";

type Props = {
  heading: string;
  children: React.ReactNode;
  isBanner?: boolean;
};

const CompanyDetail = ({ heading, children, isBanner }: Props) => {
  return (
    <div className={styles.companyDetail}>
      {isBanner ? <h3>{heading}: </h3> : <h4>{heading}: </h4>}
      <div>{children}</div>
    </div>
  );
};

export default CompanyDetail;
