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
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        let node = range.startContainer;
        while (
          node &&
          node !== document.body &&
          !/^(P|DIV|H[1-6]|LI|BLOCKQUOTE|TD|TH)$/i.test(node.nodeName)
        ) {
          node = node.parentNode;
        }
        if (node && node !== document.body) {
          node.style.lineHeight = value;
          const editor = node.closest
            ? node.closest('[contenteditable="true"]')
            : null;
          if (editor) {
            editor.dispatchEvent(new Event("input", { bubbles: true }));
          }
        }
      }
    }

    handleHideChildOptions();
  };

  return (
    <>
      {lineHeightOptions.map((option, index) => (
        <button
          key={`key${index}`}
          type="button"
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
