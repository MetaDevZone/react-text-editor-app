import React, { useState } from "react";
import {
  HorizontalLineIcon,
  ImageIcon,
  LinkIcon,
  SpecialCharIcon,
  VideoIcon,
} from ".";
import { INSER_OPTIONS } from "./constant";

export default function SelectFileOptions(props) {
  const { onSelectOption, handleInsertHR, item } = props;
  let options = item.options;
  if (!options) {
    options = INSER_OPTIONS;
  }
  const [isShow, setIsShow] = useState(false);

  const handleSelect = (type) => {
    setIsShow(false);
    if (type === "hr_line") {
      handleInsertHR();
    } else {
      onSelectOption(type);
    }
  };

  return (
    <div
      className="custom-select"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {item?.title ? item.title : "Insert"}
      <div className={`select-items ${isShow ? "show" : ""}`}>
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
                    className="select-insert"
                    onClick={() => handleSelect("image")}
                  >
                    {option?.icon ? option.icon : <ImageIcon />}
                    <span>{option?.title ? option.title : "Image"}</span>
                  </div>
                )}
                {is_link && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("link")}
                  >
                    {option?.icon ? option.icon : <LinkIcon />}
                    <span>{option?.title ? option.title : "Link"}</span>
                  </div>
                )}
                {is_video && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("video")}
                  >
                    {option?.icon ? option.icon : <VideoIcon />}
                    <span>{option?.title ? option.title : "Video"}</span>
                  </div>
                )}
                {is_hr_line && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("hr_line")}
                  >
                    {option?.icon ? option.icon : <HorizontalLineIcon />}
                    <span>
                      {option?.title ? option.title : "Horizontal Line"}
                    </span>
                  </div>
                )}
                {is_special_char && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("special_char")}
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
