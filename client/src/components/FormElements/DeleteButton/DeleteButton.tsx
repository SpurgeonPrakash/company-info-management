import { ButtonHTMLAttributes } from "react";
import styles from "./DeleteButton.module.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

const DeleteButton = ({ ...otherProps }: Props) => {
  return (
    <button
      className={`${styles.btn} ${styles.deletBtn}`}
      onClick={otherProps.onClick}
      {...otherProps}
    >
      x
    </button>
  );
};

export default DeleteButton;
