import React, { useEffect, useRef, useState } from "react";

function SelectFormat({ remove_from_toolbar, editorRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Paragraph");
  const selectRef = useRef(null);

  let formats = [
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
  if (remove_from_toolbar?.length > 0) {
    let find_remove = remove_from_toolbar.find(
      (toolbar) => toolbar.name === "format"
    );

    if (find_remove?.options?.length > 0) {
      formats = formats.filter(
        (item) => !find_remove?.options.includes(item.value)
      );
    }
  }

  const toggleSelect = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    editorRef.current.focus();
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

  const handleKeyDown = () => {
    const editor = editorRef.current;
    if (!editor) return;
    if (!editor.contains(window.getSelection().anchorNode)) {
      return;
    }
    editor.focus();
    if (editor.innerText.trim() === "") {
      setSelectedOption("Paragraph");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleSelectionChange = () => {
      if (editorRef?.current?.contains(window.getSelection().anchorNode)) {
        const formatBlock = getClosestBlockElement();
        if (formatBlock) {
          let find = formats.find((format) => format.value === formatBlock);
          if (find) {
            setSelectedOption(find.label);
          } else {
            setSelectedOption("Paragraph");
          }
        }
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorRef]);

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
