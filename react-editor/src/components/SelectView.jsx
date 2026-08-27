import React, { useState } from "react";
import {
  CodeIcon,
  FullscreenExit,
  FullscreenIcon,
  FindReplaceIcon,
  SpellCheckIcon,
} from ".";
import { VIEW_OPTIONS } from "./constant";
import Styles from "../css/style.module.css";

export default function SelectFileOptions(props) {
  const {
    handleViewSource,
    isFullScreen,
    toggleFullScreen,
    handleOpenFindReplace,
    toggleSpellCheck,
    isSpellCheckActive = true,
    item,
    isPlaceholder,
    placeholder,
    value,
    remove_from_navbar,
    isDisable,
  } = props;
  let options = item.options;

  const [isShow, setIsShow] = useState(false);

  const handleSelect = (e, type, option) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    setIsShow(false);
    if (option?.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    if (type === "code") {
      handleViewSource();
    } else if (type === "screen") {
      toggleFullScreen();
    } else if (type === "find_replace") {
      handleOpenFindReplace?.();
    } else if (type === "spellcheck") {
      toggleSpellCheck?.();
    }
  };

  if (!options) {
    options = VIEW_OPTIONS;
  }

  if (remove_from_navbar?.length > 0) {
    let find_remove = remove_from_navbar.find(
      (toolbar) => toolbar.name === "view"
    );

    if (find_remove?.options?.length > 0) {
      options = options.filter((item) => !find_remove?.options.includes(item));
    }
  }

  return (
    <div
      className={Styles.customSelect}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {item?.title ? item.title : "View"}
      <div
        className={`${Styles.selectItems} ${isShow ? `${Styles.show}` : ""}`}
      >
        {options.map((option, index) => {
          let is_source_code =
            option === "source_code" || option.name === "source_code";
          let is_full_screen =
            option === "full_screen" || option.name === "full_screen";
          let is_find_replace =
            option === "find_replace" || option.name === "find_replace";
          let is_spellcheck =
            option === "spellcheck" || option.name === "spellcheck";

          return (
            <div key={`key${index}`}>
              {is_source_code && (
                <div
                  className={`${Styles.selectInsert} ${
                    isDisable ? Styles.disabledButton : ""
                  }`}
                  onClick={(e) => handleSelect(e, "code", option)}
                >
                  {option?.icon ? option.icon : <CodeIcon />}
                  <span>{option?.title ? option.title : "Source Code"}</span>
                </div>
              )}
              {is_full_screen && (
                <div
                  className={`${Styles.selectInsert} ${
                    isDisable ? Styles.disabledButton : ""
                  }`}
                  onClick={(e) => handleSelect(e, "screen", option)}
                >
                  {option?.icon ? (
                    option.icon
                  ) : isFullScreen ? (
                    <>
                      <FullscreenExit />{" "}
                      <span>
                        {option?.title ? option.title : "Exit Full Screen"}
                      </span>
                    </>
                  ) : (
                    <>
                      <FullscreenIcon />{" "}
                      <span>
                        {option?.title ? option.title : "Full Screen"}
                      </span>
                    </>
                  )}
                </div>
              )}
              {is_find_replace && (
                <div
                  className={`${Styles.selectInsert} ${
                    isDisable ? Styles.disabledButton : ""
                  }`}
                  onClick={(e) => handleSelect(e, "find_replace", option)}
                >
                  {option?.icon ? option.icon : <FindReplaceIcon />}
                  <span>
                    {option?.title ? option.title : "Find and Replace"}
                  </span>
                </div>
              )}
              {is_spellcheck && (
                <div
                  className={`${Styles.selectInsert} ${
                    isDisable ? Styles.disabledButton : ""
                  }`}
                  onClick={(e) => handleSelect(e, "spellcheck", option)}
                >
                  {option?.icon ? option.icon : <SpellCheckIcon />}
                  <span>
                    {option?.title
                      ? option.title
                      : isSpellCheckActive
                      ? "Spell Check: ON"
                      : "Spell Check: OFF"}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
