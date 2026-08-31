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
    { label: "Left", value: "left", command: "justifyLeft", icon: <AlignLeft /> },
    { label: "Center", value: "center", command: "justifyCenter", icon: <AlignCenter /> },
    { label: "Right", value: "right", command: "justifyRight", icon: <AlignRight /> },
    { label: "Justify", value: "justify", command: "justifyFull", icon: <AlignJustify /> },
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
    const editor = editorRef?.current;
    if (!editor) return;
    editor.focus();

    // 1. Execute standard command
    try {
      document.execCommand(alignment.command, false, null);
    } catch (err) {}

    // 2. Explicitly apply textAlign to current block element for 100% guaranteed rendering
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      let block = range.startContainer;
      while (
        block &&
        block !== editor &&
        !/^(P|H[1-6]|DIV|BLOCKQUOTE|PRE|LI|TD|TH)$/i.test(block.nodeName)
      ) {
        block = block.parentNode;
      }
      if (block && block !== editor) {
        block.style.textAlign = alignment.value;
      }
    }

    // 3. Dispatch input event to notify state & onChange
    editor.dispatchEvent(new Event("input", { bubbles: true }));

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
        if (node.nodeType === Node.ELEMENT_NODE) {
          const textAlign =
            node.style?.textAlign ||
            (node.align ? node.align.toLowerCase() : "") ||
            window.getComputedStyle(node)?.textAlign;
          if (textAlign) {
            const foundAlignment = alignments.find((a) => a.value === textAlign);
            if (foundAlignment) {
              return foundAlignment.label;
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
      type="button"
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
