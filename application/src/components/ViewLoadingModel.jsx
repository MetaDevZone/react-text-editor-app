// Modal.js
import React from "react";
import ReactDOM from "react-dom";
import { loader_img } from ".";
import Styles from "../css/style.module.css";

const ViewLoadingModel = () => {
  return ReactDOM.createPortal(
    <div className={`${Styles.modalOverlay} ${Styles.imageModelOverly}`}>
      <div onClick={(e) => e.stopPropagation()}>
        <img src={loader_img} alt="" />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ViewLoadingModel;
