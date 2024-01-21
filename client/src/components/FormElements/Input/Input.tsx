import React, { InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  width?: string;
  errorText?: string;
};

const Input = ({
  label = "",
  // width = "100%",
  errorText,
  ...inputProps
}: Props) => {
  return (
    <div className={styles.formItem}>
      <div className={styles.formControl}>
        {label && (
          <label className={styles.inputLabel} htmlFor={inputProps.id}>
            {label}:
          </label>
        )}
        <input {...inputProps} className={styles.input} />
        {errorText && <div className={styles.error}>{errorText}</div>}
      </div>
    </div>
  );
};

export default Input;
