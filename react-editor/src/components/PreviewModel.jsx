import React from "react";
import Modal from "./Model";
import Styles from "../css/style.module.css";

export default function PreviewModel(props) {
  const { openPreview, setOpenPreview, previewContent } = props;
  return (
    <div className={Styles.mlMainContentBox}>
      <Modal
        isOpen={openPreview}
        onClose={() => setOpenPreview(false)}
        title="Preview"
        className={Styles.fullScreenModel}
      >
        <div
          className={Styles.reactEditorMt10}
          dangerouslySetInnerHTML={{ __html: previewContent }}
        ></div>
      </Modal>
    </div>
  );
}
