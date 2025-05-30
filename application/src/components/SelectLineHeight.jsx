import React from "react";
import Styles from "../css/style.module.css";

function SelectLineHeight({ handleHideChildOptions }) {
  const lineHeightOptions = [1, 1.1, 1.2, 1.3, 1.4, 1.5, 2.0];

  const handleOptionClick = (e, value) => {
    e.preventDeafult();
    const selection = window.getSelection(); // Get current selection

    // Check if there's a valid selection and text
    if (
      selection &&
      selection.rangeCount > 0 &&
      selection.toString().trim() !== ""
    ) {
      const range = selection.getRangeAt(0); // Get range of current selection
      const lineHeightStyle = `line-height: ${value};`;

      // Traverse through each node in the range and apply line height style
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
          // Use the spread operator to convert NodeList to an array and iterate over each child node
          [...node.childNodes].forEach((childNode) => {
            newNode.appendChild(applyLineHeight(childNode));
          });
          return newNode;
        } else {
          return node.cloneNode(true); // For other element nodes, just clone them without modifying
        }
      };

      const modifiedContents = applyLineHeight(range.cloneContents());

      // Replace the original selection with the modified content
      range.deleteContents();
      range.insertNode(modifiedContents);

      // Restore selection
      selection.removeAllRanges(); // Remove existing ranges
      selection.addRange(range); // Restore original selection
    }

    handleHideChildOptions();
  };

  return (
    <>
      {lineHeightOptions.map((option, index) => (
        <button
          key={`key${index}`}
          onClick={(e) => handleOptionClick(e, option)}
          className={Styles.selectOption}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default SelectLineHeight;
