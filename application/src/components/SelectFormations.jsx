import React, { useState } from "react";
import {
  AlignLeft,
  BoldIcon,
  FontFamilyIcon,
  FontSizeIcon,
  ItalicIcon,
  LineHeightIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
} from ".";
import SelectFamily from "./SelectFamily";
import SelectFontSize from "./SelectFontSize";
import SelectAlignment from "./SelectAlignment";
import SelectLineHeight from "./SelectLineHeight";
import { FORMAT_OPTIONS, generateRandomID } from "./constant";
import Styles from "../css/style.module.css";

export default function SelectFileOptions(props) {
  let { item, isFullScreen, remove_from_navbar, editorRef } = props;
  let options = item.options;
  if (!options) {
    options = FORMAT_OPTIONS;
  }

  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [showChildOptions, setShowChildOptions] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);
  const random_id = generateRandomID(16);

  const handleShowFamily = (option, event) => {
    if (event) {
      let parent = document.getElementById(random_id);
      let parent_top = parent.getBoundingClientRect().top;
      const top = event.currentTarget.getBoundingClientRect().top;
      setDropdownTop(isFullScreen ? top : top - parent_top);
    }
    setShowFormatOptions(true);
    setShowChildOptions(option);
  };

  const handleHideChildOptions = () => {
    setShowFormatOptions(false);
    setShowChildOptions(0);
  };

  const handleClick = (e, name, option) => {
    e.preventDefault();
    editorRef.current.focus();
    if (option?.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    document.execCommand(name);
    handleHideChildOptions();
  };
  if (remove_from_navbar?.length > 0) {
    let find_remove = remove_from_navbar.find(
      (toolbar) => toolbar.name === "format"
    );

    if (find_remove?.options?.length > 0) {
      options = options.filter((item) => !find_remove?.options.includes(item));
    }
  }

  return (
    <div
      className={Styles.customSelect}
      onMouseOver={() => setShowFormatOptions(true)}
      onMouseLeave={handleHideChildOptions}
      id={random_id}
    >
      {item?.title ? item.title : "Format"}
      <div
        className={`${Styles.selectItems} ${
          showFormatOptions ? `${Styles.show}` : ""
        }`}
      >
        {options?.length > 0 &&
          options.map((option, index) => {
            let is_bold = option === "bold" || option.name === "bold";
            let is_italic = option === "italic" || option.name === "italic";
            let is_underline =
              option === "underline" || option.name === "underline";
            let is_superscript =
              option === "superscript" || option.name === "superscript";
            let is_subscript =
              option === "subscript" || option.name === "subscript";
            let is_font = option === "font" || option.name === "font";
            let is_font_size =
              option === "font_size" || option.name === "font_size";
            let is_alignment =
              option === "alignment" || option.name === "alignment";

            return (
              <>
                {is_bold && (
                  <button
                    className={Styles.selectInsert}
                    onClick={(e) => handleClick(e, "bold", option)}
                  >
                    {option?.icon ? option.icon : <BoldIcon />}
                    <span>{option?.title ? option.title : "Bold"}</span>
                  </button>
                )}
                {is_italic && (
                  <button
                    className={Styles.selectInsert}
                    onClick={(e) => handleClick(e, "italic", option)}
                  >
                    {option?.icon ? option.icon : <ItalicIcon />}
                    <span>{option?.title ? option.title : "Italic"}</span>
                  </button>
                )}
                {is_underline && (
                  <button
                    className={Styles.selectInsert}
                    onClick={(e) => handleClick(e, "underline", option)}
                  >
                    {option?.icon ? option.icon : <UnderlineIcon />}
                    <span>{option?.title ? option.title : "Underline"}</span>
                  </button>
                )}
                {is_superscript && (
                  <button
                    className={Styles.selectInsert}
                    onClick={(e) => handleClick(e, "superscript", option)}
                  >
                    {option?.icon ? option.icon : <SuperscriptIcon />}
                    <span>{option?.title ? option.title : "Superscript"}</span>
                  </button>
                )}
                {is_subscript && (
                  <button
                    className={Styles.selectInsert}
                    onClick={(e) => handleClick(e, "subscript", option)}
                  >
                    {option?.icon ? option.icon : <SubscriptIcon />}
                    <span>{option?.title ? option.title : "Subscript"}</span>
                  </button>
                )}
                {is_font && (
                  <div
                    onMouseOver={(e) => {
                      handleShowFamily(1, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    <div className={Styles.selectInsert}>
                      {option?.icon ? option.icon : <FontFamilyIcon />}
                      <span>
                        {option?.title ? option.title : "Font Family"}
                      </span>
                    </div>
                  </div>
                )}
                {is_font_size && (
                  <div
                    onMouseOver={(e) => {
                      handleShowFamily(2, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    <div className={Styles.selectInsert}>
                      {option?.icon ? option.icon : <FontSizeIcon />}
                      <span>{option?.title ? option.title : "Font Size"}</span>
                    </div>
                  </div>
                )}
                {is_alignment && (
                  <div
                    onMouseOver={(e) => {
                      handleShowFamily(3, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    <div className={Styles.selectInsert}>
                      {option?.icon ? option.icon : <AlignLeft />}
                      <span>{option?.title ? option.title : "Align"}</span>
                    </div>
                  </div>
                )}
              </>
            );
          })}

        {/* <div
          className={Styles.selectInsert}
          onMouseOver={() => {
            handleShowFamily(4, 175);
          }}
          onMouseLeave={handleHideChildOptions}
        >
          <LineHeightIcon /> <span>Line Height</span>
        </div> */}
      </div>
      <div
        className={`${Styles.selectFormationDropdown} ${
          showChildOptions === 1 ? `${Styles.show}` : ""
        }`}
        onMouseOver={() => {
          handleShowFamily(1);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectFamily
          handleHideChildOptions={handleHideChildOptions}
          editorRef={editorRef}
        />
      </div>
      <div
        className={`${Styles.selectFormationDropdown} ${
          Styles.fontSizeDropdown
        } ${showChildOptions === 2 ? `${Styles.show}` : ""}`}
        onMouseOver={() => {
          handleShowFamily(2);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectFontSize handleHideChildOptions={handleHideChildOptions} />
      </div>
      <div
        className={`${Styles.selectFormationDropdown} ${
          Styles.fontSizeDropdown
        } ${showChildOptions === 3 ? `${Styles.show}` : ""}`}
        onMouseOver={() => {
          handleShowFamily(3);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectAlignment handleHideChildOptions={handleHideChildOptions} />
      </div>
      <div
        className={`${Styles.selectFormationDropdown} ${
          Styles.fontSizeDropdown
        } ${showChildOptions === 4 ? `${Styles.show}` : ""}`}
        onMouseOver={() => {
          handleShowFamily(4);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectLineHeight handleHideChildOptions={handleHideChildOptions} />
      </div>
    </div>
  );
}
