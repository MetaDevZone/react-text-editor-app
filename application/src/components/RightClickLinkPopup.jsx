import React, { useEffect, useRef, useState } from "react";
import LinkIcon from "./SVGImages/LinkIcon";
import ImageIcon from "./SVGImages/ImageIcon";
import RemoveLinkIcon from "./SVGImages/RemoveLinkIcon";
import OpenLinkIcon from "./SVGImages/OpenLinkIcon";
import { remove_resizer } from "./constant";
import Styles from "../css/style.module.css";

const RightClickLinkPopup = ({
  editorRef,
  setIsOpenModel,
  setSelectedData,
  setSelectedEvent,
  selectedEvent,
  setImageUrl,
  handleRemoveLink,
  selectedRange,
  isDisable,
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
    if (isDisable) {
      return;
    }
    event.preventDefault();
    remove_resizer();
    const target = event.target;
    const parentRect = target.parentElement.getBoundingClientRect();
    setPopupPosition({
      x: event.clientX - parentRect.left,
      y: event.clientY - parentRect.top,
    });

    let tagNames = ["IMG", "A", "BUTTON"];
    if (tagNames.includes(target.tagName)) {
      setSelectedEvent(target);
    }
    setPopupVisible(true);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
    }
  };

  const handleOpenLinkPopup = () => {
    let open_new_tab = false;
    let link_url = "";
    let link_text = getSelectedText() || "";
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
    let height = selectedEvent.style?.height;
    let width = selectedEvent.style?.width;

    if (!height) {
      height = selectedEvent?.offsetHeight;
    }
    if (!width) {
      width = selectedEvent?.offsetWidth;
    }
    setSelectedData({
      link: selectedEvent?.src,
      height: height,
      width: width,
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
          className={Styles.rightClickPopupBackground}
          style={{
            top: popupPosition.y,
            left: popupPosition.x,
          }}
          ref={popupRef}
        >
          <div className={Styles.rightClickPopup} onClick={handleOpenLinkPopup}>
            <LinkIcon /> Link...
          </div>
          {(selectedEvent?.tagName === "A" ||
            selectedEvent?.parentElement?.tagName === "A") && (
            <>
              <div className={Styles.rightClickPopup} onClick={handleRemove}>
                <RemoveLinkIcon /> Remove Link...
              </div>{" "}
              <div
                className={`${Styles.rightClickPopup} ${Styles.openLink}`}
                onClick={handleOpenLink}
              >
                <OpenLinkIcon /> Open Link...
              </div>
            </>
          )}
          {selectedEvent?.tagName === "IMG" && (
            <>
              <hr />
              <div
                className={Styles.rightClickPopup}
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
