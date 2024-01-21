import styles from "./NoData.module.css";

const NoData = ({ msg }: { msg: string }) => {
  return (
    <div className={styles.noDataLabel}>
      <h3>{msg}</h3>
    </div>
  );
};

export default NoData;
