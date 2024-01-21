import React from "react";

import styles from "./FormContainer.module.css";
import FormHeading from "../FormHeading/FormHeading";

type Props = {
  heading: string;
  children: React.ReactNode;
};

const FormContainer = ({ heading, children }: Props) => {
  return (
    <div className={styles.formContainer}>
      <FormHeading heading={heading} />
      <div>{children}</div>
    </div>
  );
};

export default FormContainer;
