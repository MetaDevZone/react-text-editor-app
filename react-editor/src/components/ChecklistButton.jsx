import React, { useEffect, useState } from "react";
import Styles from "../css/style.module.css";
import ChecklistIcon from "./SVGImages/ChecklistIcon";
import { isSelectionInChecklist } from "../utils/checklistUtils";

export default function ChecklistButton({
  editorRef,
  isDisable,
  item,
  onToggle,
}) {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    const updateState = () => {
      setIsSelected(isSelectionInChecklist(editorRef?.current));
    };

    document.addEventListener("selectionchange", updateState);
    document.addEventListener("input", updateState);
    return () => {
      document.removeEventListener("selectionchange", updateState);
      document.removeEventListener("input", updateState);
    };
  }, [editorRef]);

  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onToggle}
      className={`${isSelected ? Styles.selectedOption : ""} ${
        isDisable ? Styles.disabledButton : ""
      }`}
      title={item?.title ? item.title : "Checklist"}
      disabled={isDisable}
    >
      {item?.icon ? item.icon : <ChecklistIcon />}
    </button>
  );
}
