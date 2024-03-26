import React, { useEffect, useRef, useState } from "react";

function SelectFormat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Paragraph");
  const selectRef = useRef(null);

  const formats = [
    { label: "Paragraph", value: "p" },
    { label: "Heading 1", value: "h1" },
    { label: "Heading 2", value: "h2" },
    { label: "Heading 3", value: "h3" },
    { label: "Heading 4", value: "h4" },
    { label: "Heading 5", value: "h5" },
    { label: "Heading 6", value: "h6" },
    { label: "Blockquote", value: "blockquote" },
    { label: "Preformatted", value: "pre" },
  ];

  const toggleSelect = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    document.execCommand("formatBlock", false, option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const getClosestBlockElement = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const commonAncestorContainer = range.commonAncestorContainer;

      let node = commonAncestorContainer;
      while (node) {
        if (node.nodeName.match(/^(p|div|h[1-6]|blockquote|pre)$/i)) {
          return node.nodeName.toLowerCase();
        }
        node = node.parentNode;
      }
    }
    return null;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleSelectionChange = () => {
      const editor = document.getElementById("editable");
      if (editor && editor.contains(window.getSelection().anchorNode)) {
        const formatBlock = getClosestBlockElement();
        if (formatBlock) {
          let find = formats.find((format) => format.value === formatBlock);
          if (find) {
            setSelectedOption(find.label);
          }
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("selectionchange", handleSelectionChange);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <button
      className="custom-select-format"
      onClick={toggleSelect}
      ref={selectRef}
      style={{
        minWidth: "120px",
      }}
    >
      <div className="select-selected">{selectedOption}</div>
      {isOpen && (
        <div className="select-items-format">
          {formats.map((option, index) => (
            <div
              key={`key${index}`}
              onClick={(e) => handleOptionClick(e, option)}
              className="select-option"
            >
              <option.value>{option.label}</option.value>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default SelectFormat;
