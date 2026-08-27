import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  highlightAllOccurrences,
  removeSearchHighlights,
  setActiveMatch,
  replaceActiveMark,
  replaceAllInEditor,
} from "../utils/findReplaceUtils";
import Styles from "../css/style.module.css";

export default function FindReplaceModal({
  editorRef,
  onClose,
  onInput,
  selectedRange,
  initialFindText = "",
  initialPosition = null,
}) {
  const widgetRef = useRef(null);
  const findInputRef = useRef(null);

  const getInitialText = () => {
    if (initialFindText && initialFindText.trim()) {
      return initialFindText.trim();
    }
    try {
      const sel = window.getSelection();
      if (sel && sel.toString().trim()) {
        return sel.toString().trim();
      }
    } catch (e) {}
    if (selectedRange) {
      try {
        const text = selectedRange.toString().trim();
        if (text) return text;
      } catch (e) {}
    }
    return "";
  };

  const [findText, setFindText] = useState(getInitialText);
  const [replaceText, setReplaceText] = useState("");
  const [matchCase, setMatchCase] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [showReplace, setShowReplace] = useState(true);
  const [matchElements, setMatchElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [statusMessage, setStatusMessage] = useState("");
  const [position, setPosition] = useState({ top: 8, right: 12, left: null });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, posX: 0, posY: 0, parentWidth: 0, parentHeight: 0, widgetWidth: 0, widgetHeight: 0 });

  // Focus find input on mount and select text for easy overwrite/search
  useEffect(() => {
    if (findInputRef.current) {
      findInputRef.current.focus();
      findInputRef.current.select();
    }
    return () => {
      // Clean up highlights when closing
      if (editorRef?.current) {
        removeSearchHighlights(editorRef.current);
      }
    };
  }, [editorRef]);

  // Handle Dragging strictly bounded inside the editor container
  const handleMouseDown = (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;
    const widget = widgetRef.current;
    if (!widget) return;
    const parent = widget.offsetParent || widget.parentElement;
    const parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0, width: 800, height: 600 };
    const rect = widget.getBoundingClientRect();
    setIsDragging(true);
    dragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      posX: rect.left - parentRect.left,
      posY: rect.top - parentRect.top,
      parentWidth: parentRect.width,
      parentHeight: parentRect.height,
      widgetWidth: rect.width,
      widgetHeight: rect.height,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const { mouseX, mouseY, posX, posY, parentWidth, parentHeight, widgetWidth, widgetHeight } = dragStartRef.current;
      const dx = e.clientX - mouseX;
      const dy = e.clientY - mouseY;
      const maxLeft = Math.max(0, parentWidth - widgetWidth - 8);
      const maxTop = Math.max(0, parentHeight - widgetHeight - 8);
      const newLeft = Math.max(8, Math.min(maxLeft, posX + dx));
      const newTop = Math.max(8, Math.min(maxTop, posY + dy));
      setPosition({ top: newTop, left: newLeft, right: null });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Execute search and highlight matches in editor & tables
  const runSearch = useCallback(
    (targetIndex = 0) => {
      if (!editorRef?.current) return [];

      if (!findText || !findText.trim()) {
        removeSearchHighlights(editorRef.current);
        setMatchElements([]);
        setCurrentIndex(-1);
        setStatusMessage("");
        return [];
      }

      const elements = highlightAllOccurrences(editorRef.current, findText, {
        matchCase,
        wholeWord,
      });

      setMatchElements(elements);

      if (elements.length > 0) {
        const validIdx = Math.min(Math.max(0, targetIndex), elements.length - 1);
        setCurrentIndex(validIdx);
        setActiveMatch(elements, validIdx);
        setStatusMessage(`${validIdx + 1} of ${elements.length}`);
      } else {
        setCurrentIndex(-1);
        setStatusMessage("0 of 0");
      }

      return elements;
    },
    [editorRef, findText, matchCase, wholeWord]
  );

  // Trigger search on query / option changes
  useEffect(() => {
    runSearch(0);
  }, [runSearch]);

  // Next match
  const handleNext = (e) => {
    e?.preventDefault();
    if (matchElements.length === 0) {
      runSearch(0);
      return;
    }
    const nextIdx = (currentIndex + 1) % matchElements.length;
    setCurrentIndex(nextIdx);
    setActiveMatch(matchElements, nextIdx);
    setStatusMessage(`${nextIdx + 1} of ${matchElements.length}`);
  };

  // Previous match
  const handlePrev = (e) => {
    e?.preventDefault();
    if (matchElements.length === 0) {
      runSearch(0);
      return;
    }
    const prevIdx =
      (currentIndex - 1 + matchElements.length) % matchElements.length;
    setCurrentIndex(prevIdx);
    setActiveMatch(matchElements, prevIdx);
    setStatusMessage(`${prevIdx + 1} of ${matchElements.length}`);
  };

  // Single replace at current active match
  const handleReplaceSingle = (e) => {
    e?.preventDefault();
    if (matchElements.length === 0 || currentIndex < 0) return;

    const currentMark = matchElements[currentIndex];
    const success = replaceActiveMark(currentMark, replaceText, () => {
      onInput?.();
    });

    if (success) {
      // Re-run search and stay at current index or wrap around
      const updatedElements = runSearch(currentIndex);
      if (updatedElements.length > 0) {
        const nextIdx = Math.min(currentIndex, updatedElements.length - 1);
        setCurrentIndex(nextIdx);
        setActiveMatch(updatedElements, nextIdx);
        setStatusMessage(`${nextIdx + 1} of ${updatedElements.length}`);
      }
    }
  };

  // Replace all occurrences in entire document and tables
  const handleReplaceAll = (e) => {
    e?.preventDefault();
    if (!editorRef?.current || !findText.trim()) return;

    const count = replaceAllInEditor(
      editorRef.current,
      findText,
      replaceText,
      {
        matchCase,
        wholeWord,
      },
      () => {
        onInput?.();
      }
    );

    setMatchElements([]);
    setCurrentIndex(-1);

    if (count > 0) {
      setStatusMessage(`Replaced ${count}`);
    } else {
      setStatusMessage("0 replaced");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) {
        handlePrev();
      } else {
        handleNext();
      }
    } else if (e.key === "Escape") {
      onClose?.();
    }
  };

  return (
    <div
      ref={widgetRef}
      className={Styles.findReplaceFloatingWidget}
      style={{
        top: `${position.top}px`,
        left: position.left != null ? `${position.left}px` : "auto",
        right: position.right != null ? `${position.right}px` : (position.left != null ? "auto" : "12px"),
      }}
    >
      {/* Header Bar with drag support, collapse & close */}
      <div
        className={Styles.findReplaceWidgetHeader}
        onMouseDown={handleMouseDown}
        style={{ cursor: "grab" }}
      >
        <div className={Styles.findReplaceWidgetTitle}>
          <button
            type="button"
            className={Styles.toggleReplaceBtn}
            onClick={() => setShowReplace(!showReplace)}
            title={showReplace ? "Hide Replace" : "Show Replace"}
          >
            {showReplace ? "▼" : "▶"}
          </button>
          <span>Find & Replace</span>
        </div>
        <button
          type="button"
          className={Styles.closeWidgetBtn}
          onClick={() => {
            if (editorRef?.current) {
              removeSearchHighlights(editorRef.current);
            }
            onClose?.();
          }}
          title="Close (Esc)"
        >
          ✕
        </button>
      </div>

      {/* Find Row */}
      <div className={Styles.findWidgetRow}>
        <div className={Styles.findInputWrapper}>
          <input
            ref={findInputRef}
            type="text"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Find in document & tables..."
            className={Styles.widgetInput}
          />
          {statusMessage && (
            <span
              className={`${Styles.widgetCountBadge} ${
                statusMessage.includes("0 of 0") || statusMessage.includes("0 replaced")
                  ? Styles.badgeZero
                  : Styles.badgeFound
              }`}
            >
              {statusMessage}
            </span>
          )}
        </div>

        {/* Options Toggles */}
        <div className={Styles.widgetOptionButtons}>
          <button
            type="button"
            className={`${Styles.optToggleBtn} ${
              matchCase ? Styles.optActive : ""
            }`}
            onClick={() => setMatchCase(!matchCase)}
            title="Match Case (Aa)"
          >
            Aa
          </button>
          <button
            type="button"
            className={`${Styles.optToggleBtn} ${
              wholeWord ? Styles.optActive : ""
            }`}
            onClick={() => setWholeWord(!wholeWord)}
            title="Match Whole Word (\b)"
          >
            \b
          </button>
        </div>

        {/* Navigation buttons */}
        <div className={Styles.navButtonsGroup}>
          <button
            type="button"
            className={Styles.widgetNavBtn}
            onClick={handlePrev}
            disabled={matchElements.length === 0}
            title="Previous match (Shift+Enter)"
          >
            ▲
          </button>
          <button
            type="button"
            className={Styles.widgetNavBtn}
            onClick={handleNext}
            disabled={matchElements.length === 0}
            title="Next match (Enter)"
          >
            ▼
          </button>
        </div>
      </div>

      {/* Replace Row (Collapsible) */}
      {showReplace && (
        <div className={Styles.replaceWidgetRow}>
          <div className={Styles.findInputWrapper}>
            <input
              type="text"
              value={replaceText}
              onChange={(e) => setReplaceText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleReplaceSingle();
                } else if (e.key === "Escape") {
                  onClose?.();
                }
              }}
              placeholder="Replace with..."
              className={Styles.widgetInput}
            />
          </div>

          <div className={Styles.replaceActionGroup}>
            <button
              type="button"
              className={Styles.actionBtnPrimary}
              onClick={handleReplaceSingle}
              disabled={matchElements.length === 0}
              title="Replace current match"
            >
              Replace
            </button>
            <button
              type="button"
              className={Styles.actionBtnAll}
              onClick={handleReplaceAll}
              disabled={!findText.trim()}
              title="Replace all occurrences"
            >
              Replace All
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
