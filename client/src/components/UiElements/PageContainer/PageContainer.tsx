import React from "react";

import styles from "./PageContainer.module.css";

type Props = {
  children: React.ReactNode;
};

const PageContainer = ({ children }: Props) => {
  return <div className={styles.pageContainer}>{children}</div>;
};

export default PageContainer;
