import React from "react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from ".";

function SelectAlignment({ handleHideChildOptions }) {
  const alignments = [
    {
      title: "Left",
      icon: <AlignLeft />,
      type: "justifyLeft",
    },
    {
      title: "Center",
      icon: <AlignCenter />,
      type: "justifyCenter",
    },
    {
      title: "Right",
      icon: <AlignRight />,
      type: "justifyRight",
    },
    {
      title: "Justify",
      icon: <AlignJustify />,
      type: "justifyFull",
    },
  ];

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    document.execCommand(option.type);
    handleHideChildOptions();
  };

  return (
    <>
      {alignments.map((option, index) => (
        <button
          key={`key${index}`}
          onClick={(e) => handleOptionClick(e, option)}
          className="select-option react-editor-text-left"
        >
          <span className="react-editor-me-5">{option.icon}</span>
          {option.title}
        </button>
      ))}
    </>
  );
}

export default SelectAlignment;
