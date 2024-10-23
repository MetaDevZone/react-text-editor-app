import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CrossImage } from ".";
import Styles from "../css/style.module.css";

const Modal = (props) => {
  const { onClose, children, title, className, isFullScreen } = props;

  return ReactDOM.createPortal(
    <div
      className={`${Styles.modalOverlay} ${
        isFullScreen ? `${Styles.fillScreenView}` : ""
      }`}
    >
      <div
        className={`${Styles.modalPopup} ${className ? className : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {!isFullScreen && (
          <>
            <div className={Styles.modelTitle}>
              <h2>{title}</h2>
              <div className={Styles.cross} onClick={onClose}>
                <CrossImage />
              </div>
            </div>
            <hr />
          </>
        )}
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
