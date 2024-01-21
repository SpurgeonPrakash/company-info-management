import React, { SelectHTMLAttributes } from "react";

import styles from "./Select.module.css";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: { _id: string; name: string }[];
  noNone?: boolean;
  errorText?: string;
};

const Select = ({
  label,
  options = [],
  noNone = false,
  errorText,
  ...props
}: Props) => {
  return (
    <div>
      <label htmlFor="select" className={styles.selectTitle}>
        <b>{label}:</b>
      </label>

      <select className={styles.select} value={props.value} {...props}>
        {!noNone && (
          <option key="none" value="1">
            None
          </option>
        )}
        {options &&
          options.map((option) => {
            return (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            );
          })}
      </select>
      <div className={styles.error}>{errorText}</div>
    </div>
  );
};

export default Select;
