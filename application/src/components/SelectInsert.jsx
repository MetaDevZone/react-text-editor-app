import React, { useState } from "react";
import {
  HorizontalLineIcon,
  ImageIcon,
  LinkIcon,
  SpecialCharIcon,
  VideoIcon,
} from ".";
import { INSER_OPTIONS } from "./constant";
import Styles from "../css/style.module.css";

export default function SelectFileOptions(props) {
  const { onSelectOption, handleInsertHR, item, remove_from_navbar } = props;
  let options = item.options;
  if (!options) {
    options = INSER_OPTIONS;
  }
  const [isShow, setIsShow] = useState(false);

  const handleSelect = (e, type) => {
    e.preventDefault();
    setIsShow(false);
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
      onMouseLeave={() => setIsShow(false)}
    >
      {item?.title ? item.title : "Insert"}
      <div
        className={`${Styles.selectItems} ${isShow ? `${Styles.show}` : ""}`}
      >
        {options?.length > 0 &&
          options.map((option, index) => {
            let is_image = option === "image" || option.name === "image";
            let is_link = option === "link" || option.name === "link";
            let is_video = option === "video" || option.name === "video";
            let is_hr_line = option === "hr_line" || option.name === "hr_line";
            let is_special_char =
              option === "special_char" || option.name === "special_char";

            return (
              <div key={`key${index}`}>
                {is_image && (
                  <div
                    className={Styles.selectInsert}
                    onClick={(e) => handleSelect(e, "image")}
                  >
                    {option?.icon ? option.icon : <ImageIcon />}
                    <span>{option?.title ? option.title : "Image"}</span>
                  </div>
                )}
                {is_link && (
                  <div
                    className={Styles.selectInsert}
                    onClick={(e) => handleSelect(e, "link")}
                  >
                    {option?.icon ? option.icon : <LinkIcon />}
                    <span>{option?.title ? option.title : "Link"}</span>
                  </div>
                )}
                {is_video && (
                  <div
                    className={Styles.selectInsert}
                    onClick={(e) => handleSelect(e, "video")}
                  >
                    {option?.icon ? option.icon : <VideoIcon />}
                    <span>{option?.title ? option.title : "Video"}</span>
                  </div>
                )}
                {is_hr_line && (
                  <div
                    className={Styles.selectInsert}
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
                    className={Styles.selectInsert}
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
    </div>
  );
}
