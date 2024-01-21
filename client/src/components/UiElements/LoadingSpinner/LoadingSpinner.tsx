import styles from "./LoadingSpinner.module.css";

type Props = {
  small?: boolean;
};

export const LoadingSpinner = (props: Props) => {
  return (
    <div
      className={`${styles.spinnerContainer} ${
        props.small ? styles.smallSpinnerContainer : ""
      }`}
    >
      <div
        className={`${styles.loadingSpinner} ${
          props.small ? styles.smallSpinner : ""
        }`}
      ></div>
    </div>
  );
};
