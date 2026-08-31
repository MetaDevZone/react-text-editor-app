import React from "react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from ".";
import Styles from "../css/style.module.css";

function SelectAlignment({ handleHideChildOptions, editorRef }) {
  const alignments = [
    {
      title: "Left",
      icon: <AlignLeft />,
      value: "left",
      type: "justifyLeft",
    },
    {
      title: "Center",
      icon: <AlignCenter />,
      value: "center",
      type: "justifyCenter",
    },
    {
      title: "Right",
      icon: <AlignRight />,
      value: "right",
      type: "justifyRight",
    },
    {
      title: "Justify",
      icon: <AlignJustify />,
      value: "justify",
      type: "justifyFull",
    },
  ];

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    const editor = editorRef?.current || document.querySelector('[contenteditable="true"]');
    if (editor) {
      editor.focus();
    }
    try {
      document.execCommand(option.type, false, null);
    } catch (err) {}

    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && editor) {
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
        block.style.textAlign = option.value;
      }
    }

    if (editor) {
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    handleHideChildOptions();
  };

  return (
    <>
      {alignments.map((option, index) => (
        <button
          key={`key${index}`}
          type="button"
          onClick={(e) => handleOptionClick(e, option)}
          className={`${Styles.selectOption} ${Styles.reactEditorTextLeft}`}
        >
          <span className={Styles.reactEditorMe5}>{option.icon}</span>
          {option.title}
        </button>
      ))}
    </>
  );
}

export default SelectAlignment;
