import styles from "./FormHeading.module.css";

type Props = {
  heading: string;
};

const FormHeading = ({ heading }: Props) => {
  return <h2 className={styles.heading}>{heading}</h2>;
};

export default FormHeading;
