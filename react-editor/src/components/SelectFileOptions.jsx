import React, { useState } from "react";
import { EmptyFileIcon, FileUploadIcon, PreviewIcon, PrintIcon } from ".";
import { FILE_OPTIONS } from "./constant";
import Styles from "../css/style.module.css";

export default function SelectFileOptions(props) {
  const {
    handleNewDocument,
    handlePreview,
    handlePrint,
    item,
    remove_from_navbar,
  } = props;

  let options = item.options;
  const [isShow, setIsShow] = useState(false);

  const handleSelect = (e, type, option) => {
    e.preventDefault();
    setIsShow(false);
    if (option?.handleClick) {
      option.handleClick(option, item);
      if (!option.add_functionality) return;
    }
    if (type === "new_document") {
      handleNewDocument();
    } else if (type === "preview") {
      handlePreview();
    } else if (type === "print") {
      setTimeout(() => {
        handlePrint();
      }, 1);
    } else {
      // handleViewSource();
    }
  };

  if (!options) {
    options = FILE_OPTIONS;
  }

  if (remove_from_navbar?.length > 0) {
    let find_remove = remove_from_navbar.find(
      (toolbar) => toolbar.name === "file"
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
      {item?.title ? item.title : "File"}
      <div
        className={`${Styles.selectItems} ${isShow ? `${Styles.show}` : ""}`}
      >
        {options.map((option, index) => {
          let is_new_document =
            option === "new_document" || option.name === "new_document";
          let is_preview = option === "preview" || option.name === "preview";
          let is_print = option === "print" || option.name === "print";
          let is_upload_file =
            option === "upload_file" || option.name === "upload_file";

          return (
            <div key={`key${index}`}>
              {is_new_document && (
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleSelect(e, "new_document", option)}
                >
                  {option?.icon ? option.icon : <EmptyFileIcon />}
                  <span>{option?.title ? option.title : "New Document"}</span>
                </div>
              )}
              {is_preview && (
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleSelect(e, "preview", option)}
                >
                  {option?.icon ? option.icon : <PreviewIcon />}
                  <span>{option?.title ? option.title : "Preview"}</span>
                </div>
              )}
              {is_print && (
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleSelect(e, "print", option)}
                >
                  {option?.icon ? option.icon : <PrintIcon />}
                  <span>{option?.title ? option.title : "Print"}</span>
                </div>
              )}
              {/* {is_upload_file && (
                  <div
                    className={Styles.selectInsert}
                    onClick={(e) => handleSelect(e, "screen", option)}
                  >
                    {option?.icon ? option.icon : <FileUploadIcon />}
                    <span>{option?.title ? option.title : "Upload File"}</span>
                  </div>
                )} */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
