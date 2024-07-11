import React from "react";
import Modal from "./Model";

export default function ViewSourceModal(props) {
  const {
    viewSource,
    setViewSource,
    sourceCode,
    setSourceCode,
    handleSaveSource,
  } = props;

  return (
    <div className="ml-main-content-box">
      <Modal
        isOpen={viewSource}
        onClose={() => setViewSource(false)}
        title="Source Code"
        className="full-screen-model"
      >
        <textarea
          className="wysiwyg-editor__source"
          value={sourceCode}
          onChange={(e) => setSourceCode(e.target.value)}
        />
        <div className="react-editor-text-end">
          <button className="save-button" onClick={handleSaveSource}>
            Save
          </button>
        </div>
      </Modal>
    </div>
  );
}
