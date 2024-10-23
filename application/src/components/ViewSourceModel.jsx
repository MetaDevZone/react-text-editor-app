import React from "react";
import Modal from "./Model";
import Styles from "../css/style.module.css";

export default function ViewSourceModal(props) {
  const {
    viewSource,
    setViewSource,
    sourceCode,
    setSourceCode,
    handleSaveSource,
  } = props;

  return (
    <div className={Styles.mlMainContentBox}>
      <Modal
        isOpen={viewSource}
        onClose={() => setViewSource(false)}
        title="Source Code"
        className={Styles.fullScreenModel}
      >
        <textarea
          className={Styles.wysiwygEditorSource}
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
        />
        <div className={Styles.reactEditorTextEnd}>
          <button className={Styles.saveButton} onClick={handleSaveSource}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
