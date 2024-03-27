import React, { useState } from "react";
import ReactEditorComponent from "./components/ReactEditorComponent";
import Modal from "./components/Model";

export default function ReactEditor(props) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleCloseScreen = () => {
    setIsFullScreen(false);
  };

  return (
    <>
      <ReactEditorComponent
        {...props}
        setIsFullScreen={setIsFullScreen}
        isFullScreen={isFullScreen}
      />
      {isFullScreen && (
        <Modal
          isOpen={isFullScreen}
          onClose={handleCloseScreen}
          isFullScreen={true}
        >
          <ReactEditorComponent
            {...props}
            setIsFullScreen={setIsFullScreen}
            isFullScreen={isFullScreen}
          />
        </Modal>
      )}
      {/* fill-screen-view */}
      <div id="full-screen-overlay"></div>
    </>
  );
}
