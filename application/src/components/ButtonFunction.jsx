import React, { useEffect, useState } from "react";
import Styles from "../css/style.module.css";

const ButtonFunction = (props) => {
  const { name, icon, title, item, disabled, editorRef, isDisable } = props;
  const [isSelected, setIsSelected] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClick = (e, ref) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    const editor = ref?.current;
    if (!editor) return;
    editor.focus();

    if (!editor.contains(window.getSelection().anchorNode)) {
      return;
    }

    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }

    if (name === "insertOrderedList" || name === "insertUnorderedList") {
      const targetTag = name === "insertOrderedList" ? "OL" : "UL";
      const otherTag = targetTag === "OL" ? "UL" : "OL";

      const sel = window.getSelection();
      let selectedLIs = [];

      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        const allLIs = Array.from(editor.querySelectorAll("li"));
        selectedLIs = allLIs.filter((li) => {
          try {
            return (
              range.intersectsNode(li) ||
              li.contains(range.startContainer) ||
              li.contains(range.endContainer)
            );
          } catch (e) {
            return false;
          }
        });
      }

      if (selectedLIs.length > 0) {
        // Check if all or any selected LIs belong to the target list type (e.g. OL)
        const sameTypeLIs = selectedLIs.filter(
          (li) => li.parentNode && li.parentNode.tagName === targetTag,
        );

        if (sameTypeLIs.length > 0) {
          // Toggle OFF for all selected LIs (convert to normal paragraphs)
          const parentLists = Array.from(
            new Set(sameTypeLIs.map((li) => li.parentNode)),
          );

          const createdParagraphs = [];

          parentLists.forEach((parentList) => {
            if (!parentList || !parentList.parentNode) return;

            const fragment = document.createDocumentFragment();
            let currentSubList = null;

            Array.from(parentList.children).forEach((childLi) => {
              if (sameTypeLIs.includes(childLi)) {
                currentSubList = null;
                const p = document.createElement("p");
                while (childLi.firstChild) {
                  p.appendChild(childLi.firstChild);
                }
                if (!p.firstChild) {
                  p.appendChild(document.createElement("br"));
                }
                fragment.appendChild(p);
                createdParagraphs.push(p);
              } else {
                if (!currentSubList) {
                  currentSubList = document.createElement(
                    parentList.tagName.toLowerCase(),
                  );
                  fragment.appendChild(currentSubList);
                }
                currentSubList.appendChild(childLi);
              }
            });

            parentList.parentNode.replaceChild(fragment, parentList);
          });

          // Restore selection across the created paragraphs
          if (createdParagraphs.length > 0) {
            const newRange = document.createRange();
            newRange.setStart(createdParagraphs[0], 0);
            const lastP = createdParagraphs[createdParagraphs.length - 1];
            newRange.setEnd(
              lastP,
              lastP.nodeType === Node.TEXT_NODE
                ? lastP.nodeValue.length
                : lastP.childNodes.length,
            );
            sel.removeAllRanges();
            sel.addRange(newRange);
          }
        } else {
          // Switch between UL and OL for all parent lists
          const otherParentLists = Array.from(
            new Set(
              selectedLIs
                .map((li) => li.parentNode)
                .filter((p) => p && p.tagName === otherTag),
            ),
          );

          otherParentLists.forEach((parentList) => {
            const newList = document.createElement(targetTag.toLowerCase());
            while (parentList.firstChild) {
              newList.appendChild(parentList.firstChild);
            }
            parentList.parentNode.replaceChild(newList, parentList);
          });
        }
      } else {
        // No LIs selected -> convert selected paragraphs into list
        document.execCommand(name);
      }

      editor.dispatchEvent(new Event("input", { bubbles: true }));
      return;
    }

    setIsSelected(!isSelected);
    document.execCommand(name);
    editor.dispatchEvent(new Event("input", { bubbles: true }));
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      if (!editorRef?.current?.contains(window.getSelection().anchorNode)) {
        return;
      }
      const is_selected = document.queryCommandState(name);
      const isRedoEnabled = document.queryCommandEnabled(name);
      setIsDisabled(!isRedoEnabled && isDisable);
      setIsSelected(is_selected);
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("input", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("input", handleSelectionChange);
    };
  }, [editorRef, name]);

  const handleClasses = () => {
    let className = "";
    if (isSelected) {
      className = Styles.selectedOption || "";
    }
    if (name === "redo" || name === "undo") {
      if (isDisabled) {
        className += ` ${Styles.disabled || ""}`;
      }
    }
    return className.trim();
  };

  return (
    <button
      type="button"
      onClick={(e) => handleClick(e, editorRef)}
      className={`${handleClasses()} ${isDisable ? Styles.disabledButton : ""}`}
      title={item?.title ? item.title : title}
      disabled={disabled}
    >
      {item?.icon ? item.icon : icon}
    </button>
  );
};

export default ButtonFunction;
