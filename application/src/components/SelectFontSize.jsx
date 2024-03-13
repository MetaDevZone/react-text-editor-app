import React from "react";

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

  const handleOptionClick = (option) => {
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontSize", false, "1"); // Reset font size to default
      const range = selection.getRangeAt(0);
      const span = document.createElement("span");
      span.style.fontSize = option + "px";
      range.surroundContents(span);
    }
    handleHideChildOptions();
  };

  return (
    <>
      {fontSizes.map((option, index) => (
        <button
          key={`key${index}`}
          onClick={() => handleOptionClick(option)}
          className="select-option"
        >
          {`${option}px`}
        </button>
      ))}
    </>
  );
}

export default SelectFontSize;
