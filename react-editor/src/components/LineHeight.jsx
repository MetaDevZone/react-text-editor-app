import React, { useEffect, useRef, useState } from "react";
import Styles from "../css/style.module.css";
import ArrowDown from "./SVGImages/ArrowDown";

function LineHeight({ editorRef, isDisable }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("1.5");
  const selectRef = useRef(null);

  const lineHeights = [
    { label: "1.0", value: "1" },
    { label: "1.1", value: "1.1" },
    { label: "1.2", value: "1.2" },
    { label: "1.3", value: "1.3" },
    { label: "1.4", value: "1.4" },
    { label: "1.5", value: "1.5" },
    { label: "1.6", value: "1.6" },
    { label: "1.8", value: "1.8" },
    { label: "2.0", value: "2" },
    { label: "2.5", value: "2.5" },
    { label: "3.0", value: "3" },
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

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const value = option.value;

    // Function to find the parent block element
    const findParentBlockElement = (node) => {
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const tagName = node.tagName.toLowerCase();
          if (
            [
              "p",
              "div",
              "h1",
              "h2",
              "h3",
              "h4",
              "h5",
              "h6",
              "li",
              "blockquote",
            ].includes(tagName)
          ) {
            return node;
          }
        }
        node = node.parentNode;
      }
      return null;
    };

    // Function to get all block elements within the selection
    const getAllBlockElementsInSelection = () => {
      const blockElements = [];

      if (selection.isCollapsed) {
        // If no selection, just get the current block element
        const currentBlock = findParentBlockElement(range.startContainer);
        if (currentBlock) {
          blockElements.push(currentBlock);
        }
        return blockElements;
      }

      // Get all block elements in the editor
      const allBlocks = editorRef.current.querySelectorAll(
        "p, div, h1, h2, h3, h4, h5, h6, li, blockquote"
      );

      // Check which blocks intersect with the selection
      allBlocks.forEach((block) => {
        if (rangeIntersectsNode(range, block)) {
          blockElements.push(block);
        }
      });

      return blockElements;
    };

    // Helper function to check if range intersects with a node
    const rangeIntersectsNode = (range, node) => {
      try {
        const nodeRange = document.createRange();
        nodeRange.selectNodeContents(node);

        // Check if ranges overlap
        return (
          range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0 &&
          nodeRange.compareBoundaryPoints(Range.START_TO_END, range) > 0
        );
      } catch (e) {
        return false;
      }
    };

    // Get all block elements that should be affected
    const targetElements = getAllBlockElementsInSelection();

    if (targetElements.length > 0) {
      // Apply line height to all found block elements
      targetElements.forEach((element) => {
        element.style.lineHeight = value;
      });
    } else {
      // If no block element found, create a paragraph wrapper
      const selection = window.getSelection();
      const range = selection.getRangeAt(0);

      // Get the content at cursor or selection
      let contentToWrap;
      if (selection.isCollapsed) {
        // If no selection, wrap the current text node or create new paragraph
        const currentNode = range.startContainer;
        if (currentNode.nodeType === Node.TEXT_NODE) {
          contentToWrap = currentNode;
        } else {
          // Create new paragraph with line height
          const p = document.createElement("p");
          p.style.lineHeight = value;
          p.innerHTML = "<br>";
          range.insertNode(p);

          // Place cursor inside the new paragraph
          const newRange = document.createRange();
          newRange.setStart(p, 0);
          newRange.collapse(true);
          selection.removeAllRanges();
          selection.addRange(newRange);

          setSelectedOption(option.label);
          setIsOpen(false);
          return;
        }
      } else {
        contentToWrap = range.extractContents();
      }

      // Create paragraph wrapper with line height
      const p = document.createElement("p");
      p.style.lineHeight = value;

      if (contentToWrap) {
        p.appendChild(contentToWrap);
        range.insertNode(p);

        // Restore selection within the new paragraph
        const newRange = document.createRange();
        newRange.selectNodeContents(p);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }

    setSelectedOption(option.label);
    setIsOpen(false);

    // Trigger input event to update editor state
    const inputEvent = new Event("input", { bubbles: true });
    editorRef.current.dispatchEvent(inputEvent);
  };

  const getCurrentLineHeight = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const startNode = range.startContainer;

      // Function to find the parent block element
      const findParentBlockElement = (node) => {
        while (node && node !== editorRef.current) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = node.tagName.toLowerCase();
            if (
              [
                "p",
                "div",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "li",
                "blockquote",
              ].includes(tagName)
            ) {
              return node;
            }
          }
          node = node.parentNode;
        }
        return null;
      };

      // Look for line height in the block element first
      const blockElement = findParentBlockElement(startNode);
      if (blockElement && blockElement.style.lineHeight) {
        const lineHeight = blockElement.style.lineHeight;
        const foundHeight = lineHeights.find(
          (height) => height.value === lineHeight
        );
        if (foundHeight) {
          return foundHeight.label;
        }
      }

      // Fallback: check any parent element with line height
      let node = startNode;
      while (node && node !== editorRef.current) {
        if (node.nodeType === Node.ELEMENT_NODE && node.style.lineHeight) {
          const lineHeight = node.style.lineHeight;
          const foundHeight = lineHeights.find(
            (height) => height.value === lineHeight
          );
          if (foundHeight) {
            return foundHeight.label;
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
        const currentHeight = getCurrentLineHeight();
        if (currentHeight) {
          setSelectedOption(currentHeight);
        } else {
          setSelectedOption("1.5");
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
      title="Line Height"
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
          {lineHeights.map((option, index) => (
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

export default LineHeight;
