import React, { useEffect, useRef, useState } from "react";
import Styles from "../css/style.module.css";
import ArrowDown from "./SVGImages/ArrowDown";

function FontSize({ editorRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("16px");
  const selectRef = useRef(null);

  const fontSizes = [
    { label: "10px", value: "10" },
    { label: "12px", value: "12" },
    { label: "14px", value: "14" },
    { label: "16px", value: "16" },
    { label: "18px", value: "18" },
    { label: "20px", value: "20" },
    { label: "24px", value: "24" },
    { label: "28px", value: "28" },
    { label: "32px", value: "32" },
    { label: "36px", value: "36" },
    { label: "48px", value: "48" },
    { label: "60px", value: "60" },
    { label: "72px", value: "72" },
  ];

  const toggleSelect = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    editorRef.current.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedNode = range.commonAncestorContainer;

    const selectedText = range.toString();

    const value = option.value + "px";

    const findParentSpan = (node) => {
      while (node && node !== editorRef.current) {
        if (node.nodeType === 1 && node.tagName === "SPAN") {
          if (
            node.textContent == selectedText ||
            node.innerText == selectedText
          ) {
            return node;
          } else {
            return null;
          }
        }
        node = node.parentNode;
      }
      return null;
    };

    const existingSpan = findParentSpan(selectedNode);

    if (!selection.isCollapsed) {
      if (existingSpan) {
        existingSpan.style.fontSize = value;
      } else {
        const span = document.createElement("span");
        span.style.fontSize = value;

        // To safely wrap the selection without breaking HTML structure
        const content = range.extractContents();
        span.appendChild(content);
        range.insertNode(span);
      }
    } else {
      // No selection — insert empty span at caret
      const span = document.createElement("span");
      span.style.fontSize = value;
      span.innerHTML = "\u200B";
      range.insertNode(span);

      // Place caret inside span
      range.setStart(span.firstChild, 1);
      range.setEnd(span.firstChild, 1);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const getCurrentFontSize = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;

      let node = startNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE && node.style.fontSize) {
          const fontSize = node.style.fontSize;
          // Remove 'px' and find matching option
          const sizeValue = fontSize.replace("px", "");
          const foundSize = fontSizes.find((size) => size.value === sizeValue);
          if (foundSize) {
            return foundSize.label;
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
        const currentSize = getCurrentFontSize();
        if (currentSize) {
          setSelectedOption(currentSize);
        } else {
          setSelectedOption("16px");
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
      className={Styles.customSelectFormat}
      onClick={toggleSelect}
      ref={selectRef}
    >
      <div className={Styles.selectSelected}>
        {selectedOption}
        <ArrowDown />
      </div>
      {isOpen && (
        <div
          className={Styles.selectItemsFormat}
          style={{ maxHeight: "200px", overflowY: "auto" }}
        >
          {fontSizes.map((option, index) => (
            <div
              key={`key${index}`}
              onClick={(e) => handleOptionClick(e, option)}
              className={Styles.selectOption}
              style={{ fontSize: "14px" }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default FontSize;
