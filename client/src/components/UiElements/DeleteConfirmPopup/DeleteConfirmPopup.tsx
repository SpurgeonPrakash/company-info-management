import React from "react";

import styles from "./DeleteConfirmPopup.module.css";
import Button from "../../FormElements/Button/Button";

type Props = {
  onCancel: () => void;
  onDelete: () => void;
};

const DeleteConfirmPopup = ({ onCancel, onDelete }: Props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h1>Are you sure you want to delete this?</h1>
        <div className={styles.deleteActions}>
          <div className={styles.confirmButton}>
            <Button isDanger onClick={() => onDelete()}>
              Yes Proceed
            </Button>
          </div>
          <div className={styles.cancelButton}>
            <Button onClick={() => onCancel()} mode="outlined">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmPopup;
