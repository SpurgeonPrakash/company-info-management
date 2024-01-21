import React, { ButtonHTMLAttributes } from "react";

import styles from "./Button.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  mode?: "flat" | "outlined";
  disabled?: boolean;
  isDanger?: boolean;
};

const Button = ({
  children,
  mode = "flat",
  isDanger,
  ...otherProps
}: Props) => {
  return (
    <button
      className={`${styles.button} ${
        mode === "flat" ? styles.flat : styles.outlined
      }`}
      style={
        mode === "flat"
          ? { backgroundColor: isDanger ? "red" : "" }
          : { borderColor: isDanger ? "red" : "", color: isDanger ? "red" : "" }
      }
      onClick={otherProps.onClick}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
