import React, { useEffect, useRef, useState } from "react";
import LinkIcon from "./SVGImages/LinkIcon";
import ImageIcon from "./SVGImages/ImageIcon";

const RightClickLinkPopup = ({
  editorRef,
  setIsOpenModel,
  setSelectedData,
  setSelectedEvent,
}) => {
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [targetData, setTargetData] = useState(null);

  const popupRef = useRef(null);

  // how add link in image when click on right click
  const handleLinkInsert = (link) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const image = document.createElement("img");
    image.src = link;
    range.deleteContents();
    range.insertNode(image);
    setPopupVisible(false);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    const target = event.target;
    setTargetData(target);
    let target_ref = editorRef.current.contains(target);
    setPopupPosition({ x: event.clientX, y: event.clientY });
    if (target.tagName === "IMG" && target_ref) {
      setPopupVisible(true);
      setOpenImage(true);
    } else {
      setPopupVisible(true);
      setOpenImage(false);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleOpenLink = () => {
    setIsOpenModel("link");
    setPopupVisible(false);
  };

  const handleImageLink = () => {
    setIsOpenModel("image");
    setPopupVisible(false);
    setSelectedData({
      link: targetData.src,
      height: targetData.offsetHeight,
      width: targetData.offsetWidth,
    });
    setSelectedEvent(targetData);
  };

  useEffect(() => {
    const editor = document.getElementById("editable");

    editor.addEventListener("contextmenu", handleRightClick);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      editor.removeEventListener("contextmenu", handleRightClick);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorRef]);

  return (
    <>
      {popupVisible && (
        <div
          className="right_click_popup_background"
          style={{
            top: popupPosition.y,
            left: popupPosition.x,
          }}
          ref={popupRef}
        >
          <div className="right_click_popup" onClick={handleOpenLink}>
            <LinkIcon /> Link...
          </div>
          {openImage && (
            <>
              <hr />
              <div
                className="right_click_popup"
                ref={popupRef}
                onClick={handleImageLink}
              >
                <ImageIcon /> Image...
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RightClickLinkPopup;
