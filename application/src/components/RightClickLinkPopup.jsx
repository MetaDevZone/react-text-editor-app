import React, { useEffect, useRef, useState } from "react";
import LinkIcon from "./SVGImages/LinkIcon";
import ImageIcon from "./SVGImages/ImageIcon";

const RightClickLinkPopup = ({
  editorRef,
  setIsOpenModel,
  setSelectedData,
  setSelectedEvent,
  selectedEvent,
  setImageUrl,
  handleRemoveLink,
  selectedRange,
}) => {
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);

  const getSelectedText = () => {
    if (selectedRange) {
      const selectedText = selectedRange.toString();
      return selectedText;
    }
    return "";
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    const target = event.target;
    let target_ref = editorRef.current.contains(target);
    setPopupPosition({ x: event.clientX, y: event.clientY });
    if (
      target.tagName === "IMG" ||
      target.tagName === "A" ||
      target.tagName === "BUTTON"
    ) {
      setSelectedEvent(target);
    }
    if (target.tagName === "IMG") {
      setPopupVisible(true);
    } else {
      setPopupVisible(true);
    }
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleOpenLinkPopup = () => {
    let open_new_tab = false;
    let link_url = "";
    let link_text = "";
    let link_type = "text";

    if (selectedEvent?.tagName === "A") {
      link_url = selectedEvent?.href;
      link_text = getSelectedText() || selectedEvent?.textContent.trim();
      open_new_tab = selectedEvent?.target === "_blank";
    } else if (selectedEvent?.tagName === "IMG") {
      link_text = "Image";
      link_type = "image";
      setImageUrl(selectedEvent?.src);
    } else if (selectedEvent?.tagName === "BUTTON") {
      link_text = selectedEvent.textContent;
      link_type = "button";
    }
    const parentElement = selectedEvent?.parentElement;
    if (parentElement?.tagName === "A") {
      setSelectedEvent(parentElement);
      link_url = parentElement?.href;
      open_new_tab = parentElement?.target === "_blank";
    }

    let selected_object = {
      link: link_url,
      text: link_text,
      open_new_tab: open_new_tab,
      link_type: link_type,
    };
    setSelectedData(selected_object);
    setPopupVisible(false);
    setIsOpenModel("link");
  };

  const handleOpenLink = () => {
    let link = selectedEvent?.href;
    if (
      selectedEvent?.tagName !== "A" &&
      selectedEvent?.parentElement?.tagName === "A"
    ) {
      link = selectedEvent?.parentElement?.href;
    }
    window.open(link);
    setPopupVisible(false);
  };

  const handleRemove = () => {
    handleRemoveLink();
    setPopupVisible(false);
  };

  const handleImageLink = () => {
    setPopupVisible(false);
    setSelectedData({
      link: selectedEvent?.src,
      height: selectedEvent?.offsetHeight,
      width: selectedEvent?.offsetWidth,
    });
    setIsOpenModel("image");
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("contextmenu", handleRightClick);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (editor) {
        editor.removeEventListener("contextmenu", handleRightClick);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorRef]);

  return (
    <>
      {popupVisible && (
        <div
          className="right_click_popup_background"
          style={{
            top: popupPosition.y + window.scrollY,
            left: popupPosition.x,
          }}
          ref={popupRef}
        >
          <div className="right_click_popup" onClick={handleOpenLinkPopup}>
            <LinkIcon /> Link...
          </div>
          {(selectedEvent?.tagName === "A" ||
            selectedEvent?.parentElement?.tagName === "A") && (
            <>
              <div className="right_click_popup" onClick={handleRemove}>
                <LinkIcon /> Remove Link...
              </div>{" "}
              <div className="right_click_popup" onClick={handleOpenLink}>
                <LinkIcon /> Open Link...
              </div>
            </>
          )}
          {selectedEvent?.tagName === "IMG" && (
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