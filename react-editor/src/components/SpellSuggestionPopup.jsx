import React, { useEffect, useRef } from "react";
import {
  spellChecker,
  replaceSpellWord,
} from "../utils/spellCheckerUtils";
import Styles from "../css/style.module.css";

export default function SpellSuggestionPopup({
  targetElement,
  word,
  position,
  onClose,
  onInput,
  onRefreshSpellCheck,
}) {
  const popupRef = useRef(null);
  const suggestions = spellChecker.getSuggestions(word, 5);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        e.target !== targetElement
      ) {
        onClose?.();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, targetElement]);

  const handleSelectSuggestion = (suggestedWord) => {
    if (!targetElement) return;
    replaceSpellWord(targetElement, suggestedWord, onInput);
    onRefreshSpellCheck?.();
    onClose?.();
  };

  const handleAddToDictionary = () => {
    spellChecker.addToDictionary(word);
    onRefreshSpellCheck?.();
    onClose?.();
  };

  const handleIgnore = () => {
    spellChecker.ignoreWord(word);
    onRefreshSpellCheck?.();
    onClose?.();
  };

  return (
    <div
      ref={popupRef}
      className={Styles.spellSuggestionPopup}
      style={{
        top: position.top,
        left: position.left,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header with misspelled word indicator */}
      <div className={Styles.spellPopupHeader}>
        <span className={Styles.spellTypoBadge}>Typo</span>
        <strong className={Styles.spellTypoWord}>"{word}"</strong>
      </div>

      {/* Suggestion list */}
      <div className={Styles.spellSuggestionsList}>
        {suggestions.length > 0 ? (
          suggestions.map((item, idx) => (
            <button
              key={`sugg_${idx}`}
              type="button"
              className={Styles.spellSuggestionItem}
              onClick={() => handleSelectSuggestion(item)}
            >
              <span className={Styles.suggestionBullet}>✓</span>
              <span className={Styles.suggestionText}>{item}</span>
            </button>
          ))
        ) : (
          <div className={Styles.noSuggestionsText}>
            No direct suggestions found
          </div>
        )}
      </div>

      <div className={Styles.spellPopupDivider} />

      {/* Dictionary & Ignore actions */}
      <div className={Styles.spellActionsGroup}>
        <button
          type="button"
          className={Styles.spellActionBtn}
          onClick={handleAddToDictionary}
          title="Add this word to your custom dictionary"
        >
          <span>➕ Add to Dictionary</span>
        </button>
        <button
          type="button"
          className={Styles.spellActionBtn}
          onClick={handleIgnore}
          title="Ignore this word for this session"
        >
          <span>🚫 Ignore</span>
        </button>
      </div>
    </div>
  );
}
