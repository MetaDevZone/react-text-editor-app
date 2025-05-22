import React from "react";
import Styles from "../css/style.module.css";

function SelectFontSize({ handleHideChildOptions }) {
  const fontSizes = [
    "10",
    "12",
    "14",
    "16",
    "18",
    "20",
    "24",
    "28",
    "32",
    "36",
    "48",
    "60",
    "72",
  ];

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      // If there's a text selection, apply font size to selected text
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontSize", false, "1"); // Required for compatibility
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = option + "px";
      range.surroundContents(span);
    } else {
      // If there's no selection, insert a styled span at caret position
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = option + "px";
      span.innerHTML = "\u200B"; // Zero-width space to keep the span visible
      range.insertNode(span);
      // Move caret inside the span
      range.setStart(span, 1);
      range.setEnd(span, 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }
    handleHideChildOptions();
  };

  return (
    <>
      {fontSizes.map((option, index) => (
        <button
          key={`key${index}`}
          onClick={(e) => handleOptionClick(e, option)}
          className={Styles.selectOption}
        >
          {`${option}px`}
        </button>
      ))}
    </>
  );
}

export default SelectFontSize;
