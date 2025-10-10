import React, { useEffect, useRef, useState } from "react";
import Styles from "../css/style.module.css";
import AlignCenter from "./SVGImages/AlignCenter";
import AlignLeft from "./SVGImages/AlignLeft";
import AlignJustify from "./SVGImages/AlignJustify";
import AlignRight from "./SVGImages/AlignRight";
import ArrowDown from "./SVGImages/ArrowDown";

function AlignmentOptions({ editorRef, isDisable }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Alignment");
  const selectRef = useRef(null);

  const alignments = [
    { label: "Left", value: "left", icon: <AlignLeft /> },
    { label: "Center", value: "center", icon: <AlignCenter /> },
    { label: "Right", value: "right", icon: <AlignRight /> },
    { label: "Justify", value: "justify", icon: <AlignJustify /> },
  ];

  const toggleSelect = (e) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, alignment) => {
    e.preventDefault();
    editorRef.current.focus();
    document.execCommand(
      "justify" +
        alignment.value.charAt(0).toUpperCase() +
        alignment.value.slice(1)
    );
    setSelectedOption(alignment.label);
    setIsOpen(false);
  };

  const getCurrentAlignment = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;

      let node = startNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE && node.style.textAlign) {
          const alignment = node.style.textAlign;
          const foundAlignment = alignments.find((a) => a.value === alignment);
          if (foundAlignment) {
            return foundAlignment.label;
          }
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
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleSelectionChange = () => {
      if (editorRef?.current?.contains(window.getSelection().anchorNode)) {
        const currentAlignment = getCurrentAlignment();
        if (currentAlignment) {
          setSelectedOption(currentAlignment);
        } else {
          setSelectedOption("Alignment");
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
      className={`${Styles.customSelectFormat} ${
        isDisable ? Styles.disabledButton : ""
      }`}
      onClick={toggleSelect}
      ref={selectRef}
      disabled={isDisable}
    >
      <div style={{ display: "flex" }}>
        {selectedOption === "Alignment" ? (
          <span>{alignments[0]?.icon}</span>
        ) : (
          <span>
            {alignments.find((a) => a.label === selectedOption)?.icon}
          </span>
        )}
        <span className={Styles.selectSelected}>
          <ArrowDown />
        </span>
      </div>
      {isOpen && (
        <div className={Styles.selectItemsFormat}>
          {alignments.map((alignment, index) => (
            <div
              key={`key${index}`}
              onClick={(e) => handleOptionClick(e, alignment)}
              className={Styles.selectOption}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                textAlign: alignment.value,
                fontSize: "12px",
              }}
            >
              <span>{alignment.icon}</span>
              <span>{alignment.label}</span>
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default AlignmentOptions;
