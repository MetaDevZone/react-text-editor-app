import React, { useState, useEffect, useRef } from "react";
import Styles from "../css/style.module.css";
import { findParentTableCell } from "../utils/tableUtils";

export default function TableHoverToolbar({
  editorRef,
  isDisable,
}) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const hideTimeoutRef = useRef(null);

  const clearHideTimeout = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const scheduleHide = (delay = 200) => {
    clearHideTimeout();
    hideTimeoutRef.current = setTimeout(() => {
      setVisible(false);
    }, delay);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handleMouseMove = (e) => {
      if (isDisable) return;
      const cell = findParentTableCell(e.target, editor);
      if (cell) {
        clearHideTimeout();
        const editorRect = editor.parentElement.getBoundingClientRect();

        // Position tooltip directly beside the mouse cursor
        let left = e.clientX - editorRect.left + 14;
        let top = e.clientY - editorRect.top + 16;

        // Prevent tooltip from overflowing the right edge of editor
        if (left + 220 > editorRect.width) {
          left = Math.max(10, e.clientX - editorRect.left - 225);
        }

        setPosition({ top, left });
        setVisible(true);
      } else {
        scheduleHide(100);
      }
    };

    const handleMouseLeave = () => {
      scheduleHide(100);
    };

    editor.addEventListener("mousemove", handleMouseMove);
    editor.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      editor.removeEventListener("mousemove", handleMouseMove);
      editor.removeEventListener("mouseleave", handleMouseLeave);
      clearHideTimeout();
    };
  }, [editorRef, isDisable]);

  if (!visible) return null;

  return (
    <div
      className={Styles.tableHoverTooltip}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        pointerEvents: "none", // Ensures mouse clicks & typing go straight to the editor/cells
      }}
    >
      <span className={Styles.tableTooltipIcon}>💡</span>
      <span className={Styles.tableTooltipText}>
        Right-click for options
      </span>
    </div>
  );
}
