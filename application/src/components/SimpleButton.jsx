import React from "react";

export default function SimpleButton(props) {
  const { name, icon, title, item, editorRef } = props;

  const handleClick = () => {
    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    if (editorRef.current) {
      editorRef.current.dir = name; // Set text direction to LTR for the editor area
    }
  };

  return (
    <button onClick={handleClick} title={item?.title ? item.title : title}>
      {item?.icon ? item.icon : icon}
    </button>
  );
}
