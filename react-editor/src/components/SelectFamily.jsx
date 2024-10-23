import React from "react";
import Styles from "../css/style.module.css";

function SelectFamily({ handleHideChildOptions }) {
  const fontFamilies = [
    { name: "Arial", style: "Arial, sans-serif" },
    { name: "Helvetica", style: "Helvetica, sans-serif" },
    { name: "Times New Roman", style: "Times New Roman, serif" },
    { name: "Courier New", style: "Courier New, monospace" },
    { name: "Courier", style: "Courier, monospace" },
    { name: "Verdana", style: "Verdana, sans-serif" },
    { name: "Georgia", style: "Georgia, serif" },
    { name: "Palatino", style: "Palatino, serif" },
    { name: "Garamond", style: "Garamond, serif" },
    { name: "Bookman", style: "Bookman, serif" },
    { name: "Comic Sans MS", style: "Comic Sans MS, sans-serif" },
    { name: "Trebuchet MS", style: "Trebuchet MS, sans-serif" },
    { name: "Arial Black", style: "Arial Black, sans-serif" },
    { name: "Impact", style: "Impact, sans-serif" },
    { name: "Roboto", style: "Roboto, sans-serif" },
    { name: "Open Sans", style: "Open Sans, sans-serif" },
    { name: "Lato", style: "Lato, sans-serif" },
    { name: "Montserrat", style: "Montserrat, sans-serif" },
    { name: "Roboto Condensed", style: "Roboto Condensed, sans-serif" },
    { name: "Oswald", style: "Oswald, sans-serif" },
    { name: "Raleway", style: "Raleway, sans-serif" },
    { name: "Noto Sans", style: "Noto Sans, sans-serif" },
    { name: "Poppins", style: "Poppins, sans-serif" },
    { name: "Ubuntu", style: "Ubuntu, sans-serif" },
    { name: "Source Sans Pro", style: "Source Sans Pro, sans-serif" },
    // Add more font families as needed
  ];

  const handleOptionClick = (e, option) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection.isCollapsed) {
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontName", false, option.style);
    }
    handleHideChildOptions();
  };

  return (
    <>
      {fontFamilies.map((option, index) => (
        <button
          key={`key${index}`}
          style={{
            fontFamily: option.style,
          }}
          className={Styles.fontFamilyOption}
          onClick={(e) => handleOptionClick(e, option)}
        >
          {option.name}
        </button>
      ))}
    </>
  );
}

export default SelectFamily;
