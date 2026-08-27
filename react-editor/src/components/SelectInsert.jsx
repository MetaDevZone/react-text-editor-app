import React, { useState } from "react";
import {
  HorizontalLineIcon,
  ImageIcon,
  LinkIcon,
  SpecialCharIcon,
  TableIcon,
  VideoIcon,
} from ".";
import { INSER_OPTIONS, generateRandomID } from "./constant";
import Styles from "../css/style.module.css";
import TableGridPicker from "./TableGridPicker";
import { insertTable } from "../utils/tableUtils";

export default function SelectFileOptions(props) {
  const {
    onSelectOption,
    handleInsertHR,
    item,
    remove_from_navbar,
    isDisable,
    editorRef,
    isFullScreen,
  } = props;
  let options = item.options;
  if (!options) {
    options = INSER_OPTIONS;
  }
  const [isShow, setIsShow] = useState(false);
  const [showTableGrid, setShowTableGrid] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [random_id] = useState(() => generateRandomID(16));

  const handleShowTable = (e) => {
    if (isDisable) return;
    if (e) {
      const parent = document.getElementById(random_id);
      const parent_top = parent ? parent.getBoundingClientRect().top : 0;
      const top = e.currentTarget.getBoundingClientRect().top;
      setDropdownTop(isFullScreen ? top : top - parent_top);
    }
    setIsShow(true);
    setShowTableGrid(true);
  };

  const handleHideTable = () => {
    setShowTableGrid(false);
  };

  const handleMouseLeaveCustomSelect = () => {
    setIsShow(false);
    setShowTableGrid(false);
  };

  const handleSelect = (e, type) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();
    setIsShow(false);
    setShowTableGrid(false);
    if (type === "hr_line") {
      handleInsertHR(e);
    } else {
      onSelectOption(e, type);
    }
  };

  if (remove_from_navbar?.length > 0) {
    let find_remove = remove_from_navbar.find(
      (toolbar) => toolbar.name === "insert"
    );

    if (find_remove?.options?.length > 0) {
      options = options.filter((item) => !find_remove?.options.includes(item));
    }
  }

  return (
    <div
      className={Styles.customSelect}
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={handleMouseLeaveCustomSelect}
      id={random_id}
      style={{ position: "relative" }}
    >
      {item?.title ? item.title : "Insert"}
      <div
        className={`${Styles.selectItems} ${isShow ? `${Styles.show}` : ""}`}
      >
        {options?.length > 0 &&
          options.map((option, index) => {
            let is_table = option === "table" || option.name === "table";
            let is_image = option === "image" || option.name === "image";
            let is_link = option === "link" || option.name === "link";
            let is_video = option === "video" || option.name === "video";
            let is_hr_line = option === "hr_line" || option.name === "hr_line";
            let is_special_char =
              option === "special_char" || option.name === "special_char";

            return (
              <div key={`key${index}`}>
                {is_table && (
                  <div
                    onMouseEnter={(e) => handleShowTable(e)}
                    onMouseLeave={handleHideTable}
                  >
                    <div
                      className={`${Styles.selectInsert} ${
                        isDisable ? Styles.disabledButton : ""
                      }`}
                    >
                      {option?.icon ? option.icon : <TableIcon />}
                      <span>{option?.title ? option.title : "Table"}</span>
                      <span style={{ marginLeft: "auto", fontSize: "10px" }}>▶</span>
                    </div>
                  </div>
                )}
                {is_image && (
                  <div
                    className={`${Styles.selectInsert} ${
                      isDisable ? Styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleSelect(e, "image")}
                  >
                    {option?.icon ? option.icon : <ImageIcon />}
                    <span>{option?.title ? option.title : "Image"}</span>
                  </div>
                )}
                {is_link && (
                  <div
                    className={`${Styles.selectInsert} ${
                      isDisable ? Styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleSelect(e, "link")}
                  >
                    {option?.icon ? option.icon : <LinkIcon />}
                    <span>{option?.title ? option.title : "Link"}</span>
                  </div>
                )}
                {is_video && (
                  <div
                    className={`${Styles.selectInsert} ${
                      isDisable ? Styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleSelect(e, "video")}
                  >
                    {option?.icon ? option.icon : <VideoIcon />}
                    <span>{option?.title ? option.title : "Video"}</span>
                  </div>
                )}
                {is_hr_line && (
                  <div
                    className={`${Styles.selectInsert} ${
                      isDisable ? Styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleSelect(e, "hr_line")}
                  >
                    {option?.icon ? option.icon : <HorizontalLineIcon />}
                    <span>
                      {option?.title ? option.title : "Horizontal Line"}
                    </span>
                  </div>
                )}
                {is_special_char && (
                  <div
                    className={`${Styles.selectInsert} ${
                      isDisable ? Styles.disabledButton : ""
                    }`}
                    onClick={(e) => handleSelect(e, "special_char")}
                  >
                    {option?.icon ? option.icon : <SpecialCharIcon />}
                    <span>{option?.title ? option.title : "Special Char"}</span>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      {/* Flyout Table Grid Picker Submenu */}
      <div
        className={`${Styles.selectFormationDropdown} ${Styles.tableGridDropdown} ${
          showTableGrid ? Styles.show : ""
        }`}
        onMouseEnter={() => setShowTableGrid(true)}
        onMouseLeave={handleHideTable}
        style={{
          top: dropdownTop,
          left: "154px",
          maxHeight: "none",
          overflow: "visible",
          padding: "4px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <TableGridPicker
          onSelect={(rows, cols) => {
            insertTable(editorRef?.current, rows, cols);
            setIsShow(false);
            setShowTableGrid(false);
          }}
        />
      </div>
    </div>
  );
}
