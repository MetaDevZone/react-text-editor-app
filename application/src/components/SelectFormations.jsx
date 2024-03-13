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
import { FORMAT_OPTIONS } from "./constant";

export default function SelectFileOptions({ item }) {
  let options = item.options;
  if (!options) {
    options = FORMAT_OPTIONS;
  }
  const [showFormatOptions, setShowFormatOptions] = useState(false);
  const [showChildOptions, setShowChildOptions] = useState(0);
  const [dropdownTop, setDropdownTop] = useState(0);

  const handleShowFamily = (option, event) => {
    if (event) {
      const top = event.currentTarget.getBoundingClientRect().top;
      setDropdownTop(top);
    }
    setShowFormatOptions(true);
    setShowChildOptions(option);
  };

  const handleHideChildOptions = () => {
    setShowFormatOptions(false);
    setShowChildOptions(0);
  };

  const handleClick = (name, option) => {
    if (option?.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    document.execCommand(name);
    handleHideChildOptions();
  };

  return (
    <div
      className="custom-select"
      onMouseOver={() => setShowFormatOptions(true)}
      onMouseLeave={handleHideChildOptions}
    >
      {item?.title ? item.title : "Format"}
      <div className={`select-items ${showFormatOptions ? "show" : ""}`}>
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
              <div key={`key${index}`}>
                {is_bold && (
                  <button
                    className="select-insert"
                    onClick={() => handleClick("bold", option)}
                  >
                    {option?.icon ? option.icon : <BoldIcon />}
                    <span>{option?.title ? option.title : "Bold"}</span>
                  </button>
                )}
                {is_italic && (
                  <button
                    className="select-insert"
                    onClick={() => handleClick("italic", option)}
                  >
                    {option?.icon ? option.icon : <ItalicIcon />}
                    <span>{option?.title ? option.title : "Italic"}</span>
                  </button>
                )}
                {is_underline && (
                  <button
                    className="select-insert"
                    onClick={() => handleClick("underline", option)}
                  >
                    {option?.icon ? option.icon : <UnderlineIcon />}
                    <span>{option?.title ? option.title : "Underline"}</span>
                  </button>
                )}
                {is_superscript && (
                  <button
                    className="select-insert"
                    onClick={() => handleClick("superscript", option)}
                  >
                    {option?.icon ? option.icon : <SuperscriptIcon />}
                    <span>{option?.title ? option.title : "Superscript"}</span>
                  </button>
                )}
                {is_subscript && (
                  <button
                    className="select-insert"
                    onClick={() => handleClick("subscript", option)}
                  >
                    {option?.icon ? option.icon : <SubscriptIcon />}
                    <span>{option?.title ? option.title : "Subscript"}</span>
                  </button>
                )}
                {is_font && (
                  <div
                    className="select-insert"
                    onMouseOver={(e) => {
                      handleShowFamily(1, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    {option?.icon ? option.icon : <FontFamilyIcon />}
                    <span>{option?.title ? option.title : "Font Family"}</span>
                  </div>
                )}
                {is_font_size && (
                  <div
                    className="select-insert"
                    onMouseOver={(e) => {
                      handleShowFamily(2, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    {option?.icon ? option.icon : <FontSizeIcon />}
                    <span>{option?.title ? option.title : "Font Size"}</span>
                  </div>
                )}
                {is_alignment && (
                  <div
                    className="select-insert"
                    onMouseOver={(e) => {
                      handleShowFamily(3, e);
                    }}
                    onMouseLeave={handleHideChildOptions}
                  >
                    {option?.icon ? option.icon : <AlignLeft />}
                    <span>{option?.title ? option.title : "Align"}</span>
                  </div>
                )}
              </div>
            );
          })}

        {/* <div
          className="select-insert"
          onMouseOver={() => {
            handleShowFamily(4, 175);
          }}
          onMouseLeave={handleHideChildOptions}
        >
          <LineHeightIcon /> <span>Line Height</span>
        </div> */}
      </div>
      <div
        className={`select-formation-dropdown ${
          showChildOptions === 1 ? "show" : ""
        }`}
        onMouseOver={() => {
          handleShowFamily(1);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectFamily handleHideChildOptions={handleHideChildOptions} />
      </div>
      <div
        className={`select-formation-dropdown font-size-dropdown ${
          showChildOptions === 2 ? "show" : ""
        }`}
        onMouseOver={() => {
          handleShowFamily(2);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectFontSize handleHideChildOptions={handleHideChildOptions} />
      </div>
      <div
        className={`select-formation-dropdown font-size-dropdown ${
          showChildOptions === 3 ? "show" : ""
        }`}
        onMouseOver={() => {
          handleShowFamily(3);
        }}
        onMouseLeave={() => setShowChildOptions(false)}
        style={{ top: dropdownTop }}
      >
        <SelectAlignment handleHideChildOptions={handleHideChildOptions} />
      </div>
      <div
        className={`select-formation-dropdown font-size-dropdown ${
          showChildOptions === 4 ? "show" : ""
        }`}
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
