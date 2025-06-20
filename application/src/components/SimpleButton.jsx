import React from "react";
import Styles from "../css/style.module.css";

export default function SimpleButton(props) {
  const { name, icon, title, item, editorRef, isDisable } = props;

  const handleClick = (e) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    if (editorRef.current) {
      editorRef.current.dir = name; // Set text direction to LTR for the editor area
    }
  };

  return (
    <button
      onClick={handleClick}
      title={item?.title ? item.title : title}
      disabled={isDisable}
      className={` ${isDisable ? Styles.disabledButton : ""}`}
    >
      {item?.icon ? item.icon : icon}
    </button>
  );
}
