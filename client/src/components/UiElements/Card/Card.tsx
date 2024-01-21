import React, { useState } from "react";
import DeleteButton from "../../FormElements/DeleteButton/DeleteButton";
import styles from "./Card.module.css";
import { useHistory } from "react-router-dom";
import DeleteConfirmPopup from "../DeleteConfirmPopup/DeleteConfirmPopup";

type Props = {
  title: string;
  onDelete: () => void;
  children: React.ReactNode;
  redirectUrl?: string;
};

const Card = ({ redirectUrl, title, onDelete, children }: Props) => {
  const history = useHistory();

  const [showModal, setShowModal] = useState(false);

  const turnOnModal = () => {
    setShowModal(true);
  };

  const turnOffModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeading}>
        <h3>{title}</h3>
        <div className={styles.deleteContainer}>
          <DeleteButton onClick={() => turnOnModal()} />
        </div>
      </div>
      <hr style={{ color: "#5c6266" }} />
      <div
        className={styles.cardContent}
        onClick={() => redirectUrl && history.push(redirectUrl)}
        // onClick={() => history.push(`/company/${_id}`)}
      >
        {children}
      </div>
      {showModal && (
        <DeleteConfirmPopup
          onCancel={() => turnOffModal()}
          onDelete={() => {
            onDelete();
            turnOffModal();
          }}
        />
      )}
    </div>
  );
};

export default Card;
