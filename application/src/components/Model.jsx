import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { CrossImage } from ".";

const Modal = (props) => {
  const { onClose, children, title, className } = props;

  useEffect(() => {
    document.body.classList.add("editor-modal-open");
    return () => {
      document.body.classList.remove("editor-modal-open");
    };
  }, []);

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-popup ${className ? className : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="model-title">
          <h2>{title}</h2>
          <div className="cross" onClick={onClose}>
            <CrossImage />
          </div>
        </div>
        <hr />
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
