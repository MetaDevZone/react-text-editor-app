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
    if (!selection || !selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const value = option + "px";

    if (!selection.isCollapsed) {
      const span = document.createElement("span");
      span.style.fontSize = value;

      const content = range.extractContents();

      // Remove nested fontSize from child elements so parent font-size takes full effect
      const childElements = content.querySelectorAll("[style]");
      childElements.forEach((el) => {
        if (el.style.fontSize) {
          el.style.removeProperty("font-size");
          if (!el.getAttribute("style") || el.getAttribute("style").trim() === "") {
            if (el.tagName === "SPAN") {
              while (el.firstChild) {
                el.parentNode.insertBefore(el.firstChild, el);
              }
              el.parentNode.removeChild(el);
            }
          }
        }
      });

      span.appendChild(content);
      range.insertNode(span);
    } else {
      // If there's no selection, insert a styled span at caret position
      const span = document.createElement("span");
      span.style.fontSize = value;
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
