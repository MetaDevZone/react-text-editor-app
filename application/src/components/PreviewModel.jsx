import React from "react";
import Modal from "./Model";

export default function PreviewModel(props) {
  const { openPreview, setOpenPreview, previewContent } = props;
  return (
    <div className="ml-main-content-box">
      <Modal
        isOpen={openPreview}
        onClose={() => setOpenPreview(false)}
        title="Preview"
        className="full-screen-model"
      >
        <div
          className="react-editor-mt-50"
          dangerouslySetInnerHTML={{ __html: previewContent }}
        ></div>
      </Modal>
    </div>
  );
}
