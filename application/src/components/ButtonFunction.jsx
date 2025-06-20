import React, { useEffect, useState } from "react";
import Styles from "../css/style.module.css";

const ButtonFunction = (props) => {
  const { name, icon, title, item, disabled, editorRef, isDisable } = props;
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = (e, ref) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    ref.current.focus();
    if (!ref.current) return;

    if (!ref.current.contains(window.getSelection().anchorNode)) {
      return;
    }

    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    setIsSelected(!isSelected);
    document.execCommand(name);
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef?.current?.contains(window.getSelection().anchorNode)) {
        return;
      }
      const is_selected = document.queryCommandState(name);
      const isRedoEnabled = document.queryCommandEnabled(name);
      setIsDisabled(!isRedoEnabled && isDisable);
      setIsSelected(is_selected);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("input", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("input", handleSelectionChange);
    };
  }, [editorRef, name]);

  const handleClasses = () => {
    let className = "";
    if (isSelected) {
      className = Styles.selectedOption || "";
    }
    if (name === "redo" || name === "undo") {
      if (isDisabled) {
        className += ` ${Styles.disabled || ""}`;
      }
    }
    return className.trim();
  };

  return (
    <button
      onClick={(e) => handleClick(e, editorRef)}
      className={`${handleClasses()} ${isDisable ? Styles.disabledButton : ""}`}
      title={item?.title ? item.title : title}
      disabled={disabled}
    >
      {item?.icon ? item.icon : icon}
    </button>
  );
};

export default ButtonFunction;
