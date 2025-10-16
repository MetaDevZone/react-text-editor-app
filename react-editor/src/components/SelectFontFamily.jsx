import React, { useEffect, useRef, useState } from "react";
import Styles from "../css/style.module.css";
import ArrowDown from "./SVGImages/ArrowDown";

function SelectFontFamily({ editorRef, isDisable }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");
  const selectRef = useRef(null);

  const fontFamilies = [
    { label: "Arial", value: "Arial, sans-serif" },
    { label: "Helvetica", value: "Helvetica, sans-serif" },
    { label: "Times New Roman", value: "Times New Roman, serif" },
    { label: "Courier New", value: "Courier New, monospace" },
    { label: "Courier", value: "Courier, monospace" },
    { label: "Verdana", value: "Verdana, sans-serif" },
    { label: "Georgia", value: "Georgia, serif" },
    { label: "Palatino", value: "Palatino, serif" },
    { label: "Garamond", value: "Garamond, serif" },
    { label: "Bookman", value: "Bookman, serif" },
    { label: "Comic Sans MS", value: "Comic Sans MS, sans-serif" },
    { label: "Trebuchet MS", value: "Trebuchet MS, sans-serif" },
    { label: "Arial Black", value: "Arial Black, sans-serif" },
    { label: "Impact", value: "Impact, sans-serif" },
    { label: "Roboto", value: "Roboto, sans-serif" },
    { label: "Open Sans", value: "Open Sans, sans-serif" },
    { label: "Lato", value: "Lato, sans-serif" },
    { label: "Montserrat", value: "Montserrat, sans-serif" },
    { label: "Roboto Condensed", value: "Roboto Condensed, sans-serif" },
    { label: "Oswald", value: "Oswald, sans-serif" },
    { label: "Raleway", value: "Raleway, sans-serif" },
    { label: "Noto Sans", value: "Noto Sans, sans-serif" },
    { label: "Poppins", value: "Poppins, sans-serif" },
    { label: "Ubuntu", value: "Ubuntu, sans-serif" },
    { label: "Source Sans Pro", value: "Source Sans Pro, sans-serif" },
  ];

  const toggleSelect = (e) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    editorRef.current.focus();
    document.execCommand("styleWithCSS", false, true);
    document.execCommand("fontName", false, option.value);
    setSelectedOption(option.label);
    setIsOpen(false);
  };

  const getCurrentFontFamily = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;

      let node = startNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE && node.style.fontFamily) {
          const fontFamily = node.style.fontFamily.replace(/"/g, "");
          // Check for exact matches first
          for (const family of fontFamilies) {
            const primaryFont = family.value.split(",")[0].trim();
            // Match exact value or primary font at start of font stack
            if (
              fontFamily === family.value ||
              fontFamily.startsWith(`${primaryFont},`) ||
              fontFamily === primaryFont
            ) {
              return family.label;
            }
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
        const currentFont = getCurrentFontFamily();
        if (currentFont) {
          setSelectedOption(currentFont);
        } else {
          setSelectedOption("Default");
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
      style={{
        minWidth: "120px",
      }}
      disabled={isDisable}
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
          {fontFamilies.map((option, index) => (
            <div
              key={`key${index}`}
              onClick={(e) => handleOptionClick(e, option)}
              className={Styles.selectOption}
              style={{ fontFamily: option.value }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </button>
  );
}

export default SelectFontFamily;
