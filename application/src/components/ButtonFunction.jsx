import React, { useEffect, useState } from "react";

export default function ButtonFunction(props) {
  const { name, icon, title, item, disabled } = props;
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = (e) => {
    e.preventDefault();
    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    document.execCommand(name);
  };

  // Handle selection change
  const handleSelectionChange = () => {
    const is_selected = document.queryCommandState(name);
    const isRedoEnabled = document.queryCommandEnabled(name);
    setIsDisabled(!isRedoEnabled);
    setIsSelected(is_selected);
  };

  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("input", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("input", handleSelectionChange);
    };
  }, []);

  const handle_classes = () => {
    let className = "";
    if (isSelected) {
      className = "selected-option";
    }
    if (name === "redo" || name === "undo") {
      if (isDisabled) {
        className = className + "disabled";
      }
    }
    return className;
  };

  return (
    <button
      onClick={handleClick}
      className={handle_classes()}
      title={item?.title ? item.title : title}
      disabled={disabled}
    >
      {item?.icon ? item.icon : icon}
    </button>
  );
}
