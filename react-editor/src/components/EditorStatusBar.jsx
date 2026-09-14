import React from "react";
import Styles from "../css/style.module.css";
import { getWordAndCharCount } from "../utils/wordCountUtils";

export default function EditorStatusBar({ html }) {
  const { words, chars } = getWordAndCharCount(html);

  return (
    <div className={Styles.editorStatusBar} aria-live="polite">
      <span>
        {words} {words === 1 ? "word" : "words"}
      </span>
      <span className={Styles.statusDivider}>|</span>
      <span>
        {chars} {chars === 1 ? "character" : "characters"}
      </span>
    </div>
  );
}
