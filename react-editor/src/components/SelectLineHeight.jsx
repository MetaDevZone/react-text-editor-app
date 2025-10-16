import React from "react";
import Styles from "../css/style.module.css";

function SelectLineHeight({
  handleHideChildOptions,
  onLineHeightChange,
  currentLineHeight,
}) {
  const lineHeightOptions = [
    { value: "1", label: "1.0" },
    { value: "1.1", label: "1.1" },
    { value: "1.2", label: "1.2" },
    { value: "1.3", label: "1.3" },
    { value: "1.4", label: "1.4" },
    { value: "1.5", label: "1.5" },
    { value: "1.6", label: "1.6" },
    { value: "1.8", label: "1.8" },
    { value: "2", label: "2.0" },
    { value: "2.5", label: "2.5" },
    { value: "3", label: "3.0" },
  ];

  const handleOptionClick = (e, value) => {
    e.preventDefault();

    if (onLineHeightChange) {
      onLineHeightChange(value);
    } else {
      // Fallback to original implementation if onLineHeightChange is not provided
      const selection = window.getSelection();

      if (
        selection &&
        selection.rangeCount > 0 &&
        selection.toString().trim() !== ""
      ) {
        const range = selection.getRangeAt(0);
        const lineHeightStyle = `line-height: ${value};`;

        const applyLineHeight = (node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const wrapperSpan = document.createElement("span");
            wrapperSpan.style.cssText = lineHeightStyle;
            wrapperSpan.appendChild(node.cloneNode(true));
            return wrapperSpan;
          } else if (
            node.nodeType === Node.ELEMENT_NODE &&
            node.tagName.toLowerCase() === "p"
          ) {
            const newNode = node.cloneNode(false);
            [...node.childNodes].forEach((childNode) => {
              newNode.appendChild(applyLineHeight(childNode));
            });
            return newNode;
          } else {
            return node.cloneNode(true);
          }
        };

        const modifiedContents = applyLineHeight(range.cloneContents());
        range.deleteContents();
        range.insertNode(modifiedContents);

        selection.removeAllRanges();
        selection.addRange(range);
      }
    }

    handleHideChildOptions();
  };

  return (
    <>
      {lineHeightOptions.map((option, index) => (
        <button
          key={`key${index}`}
          onClick={(e) => handleOptionClick(e, option.value)}
          className={`${Styles.selectOption} ${
            currentLineHeight === option.value ? Styles.selectedOption : ""
          }`}
        >
          {option.label}
        </button>
      ))}
    </>
  );
}

export default SelectLineHeight;
