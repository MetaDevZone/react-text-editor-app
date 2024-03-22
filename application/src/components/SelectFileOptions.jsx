import React, { useState } from "react";
import { EmptyFileIcon, FileUploadIcon, PreviewIcon, PrintIcon } from ".";

export default function SelectFileOptions(props) {
  const {
    handleNewDocument,
    handlePreview,
    handlePrint,
    item,
    isPlaceholder,
    placeholder,
    value,
  } = props;
  const [isShow, setIsShow] = useState(false);

  const handleSelect = (type, option) => {
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

  return (
    <div
      className="custom-select"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {item?.title ? item.title : "File"}
      <div className={`select-items ${isShow ? "show" : ""}`}>
        {item.options?.length > 0 ? (
          item.options.map((option, index) => {
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
                    className="select-insert"
                    onClick={() => handleSelect("new_document", option)}
                  >
                    {option?.icon ? option.icon : <EmptyFileIcon />}
                    <span>{option?.title ? option.title : "New Document"}</span>
                  </div>
                )}
                {is_preview && !(isPlaceholder && placeholder && !value) && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("preview", option)}
                  >
                    {option?.icon ? option.icon : <PreviewIcon />}
                    <span>{option?.title ? option.title : "Preview"}</span>
                  </div>
                )}
                {is_print && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("print", option)}
                  >
                    {option?.icon ? option.icon : <PrintIcon />}
                    <span>{option?.title ? option.title : "Print"}</span>
                  </div>
                )}
                {/* {is_upload_file && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("screen", option)}
                  >
                    {option?.icon ? option.icon : <FileUploadIcon />}
                    <span>{option?.title ? option.title : "Upload File"}</span>
                  </div>
                )} */}
              </div>
            );
          })
        ) : (
          <>
            {!(isPlaceholder && placeholder && !value) && (
              <>
                <div
                  className="select-insert"
                  onClick={() => handleSelect("new_document")}
                >
                  <EmptyFileIcon /> <span>New Document</span>
                </div>
                <div
                  className="select-insert"
                  onClick={() => handleSelect("preview")}
                >
                  <PreviewIcon /> <span>Preview</span>
                </div>
                <div
                  className="select-insert"
                  onClick={() => handleSelect("print")}
                >
                  <PrintIcon /> <span>Print</span>
                </div>
              </>
            )}
            {/* <div
              className="select-insert"
              onClick={() => handleSelect("screen")}
            >
              <FileUploadIcon /> <span>Upload File</span>
            </div> */}
          </>
        )}
      </div>
    </div>
  );
}
