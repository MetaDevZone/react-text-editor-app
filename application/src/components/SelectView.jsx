import React, { useState } from "react";
import { CodeIcon, FullscreenExit, FullscreenIcon } from ".";

export default function SelectFileOptions(props) {
  const {
    handleViewSource,
    isFullScreen,
    toggleFullScreen,
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
    if (type === "code") {
      handleViewSource();
    } else if (type === "screen") {
      toggleFullScreen();
    }
  };

  return (
    <div
      className="custom-select"
      onMouseEnter={() => setIsShow(true)}
      onMouseLeave={() => setIsShow(false)}
    >
      {item?.title ? item.title : "View"}
      <div className={`select-items ${isShow ? "show" : ""}`}>
        {item.options?.length > 0 ? (
          item.options.map((option, index) => {
            let is_source_code =
              option === "source_code" || option.name === "source_code";
            let is_full_screen =
              option === "full_screen" || option.name === "full_screen";

            return (
              <div key={`key${index}`}>
                {is_source_code &&
                  !(isPlaceholder && placeholder && !value) && (
                    <div
                      className="select-insert"
                      onClick={() => handleSelect("code", option)}
                    >
                      {option?.icon ? option.icon : <CodeIcon />}
                      <span>
                        {option?.title ? option.title : "Source Code"}
                      </span>
                    </div>
                  )}
                {is_full_screen && (
                  <div
                    className="select-insert"
                    onClick={() => handleSelect("screen", option)}
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
                          {option?.title ? option.title : "Exit Full"}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <>
            {!(isPlaceholder && placeholder && !value) && (
              <div
                className="select-insert"
                onClick={() => handleSelect("code")}
              >
                <CodeIcon /> <span>Source Code</span>
              </div>
            )}
            <div
              className="select-insert"
              onClick={() => handleSelect("screen")}
            >
              {isFullScreen ? (
                <>
                  <FullscreenExit /> <span>Exit Full Screen </span>
                </>
              ) : (
                <>
                  <FullscreenIcon /> <span>Full Screen </span>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
