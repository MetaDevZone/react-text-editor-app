// Modal.js
import React from "react";
import ReactDOM from "react-dom";
import { loader_img } from ".";

const ViewLoadingModel = () => {
  return ReactDOM.createPortal(
    <div className="modal-overlay image-model-overly">
      <div onClick={(e) => e.stopPropagation()}>
        <img src={loader_img} alt="" />
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default ViewLoadingModel;
