import React, { useEffect, useState } from "react";

export default function ButtonFunction(props) {
  const { name, icon, title, item } = props;
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    document.execCommand(name);
  };

  // Handle selection change
  const handleSelectionChange = () => {
    const is_selected = document.queryCommandState(name);
    setIsSelected(is_selected);
  };

  // Attach selection change listener
  useEffect(() => {
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <button
      onClick={handleClick}
      className={`${isSelected ? "selected-option" : ""}`}
      title={item?.title ? item.title : title}
    >
      {item?.icon ? item.icon : icon}
    </button>
  );
}
