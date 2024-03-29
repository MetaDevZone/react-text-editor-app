import React, { useEffect, useRef, useState } from "react";
import { BackgroundColorIcon, TextColorUpperIcon } from ".";

function rgbToHex(rgb) {
  const [r, g, b] = rgb.match(/\d+/g);
  const hexR = parseInt(r).toString(16).padStart(2, "0");
  const hexG = parseInt(g).toString(16).padStart(2, "0");
  const hexB = parseInt(b).toString(16).padStart(2, "0");
  const hexColor = `#${hexR}${hexG}${hexB}`;
  return hexColor;
}

export default function ManageColors(props) {
  const { type, item, title } = props;

  const [value, setValue] = useState("#000");
  const [openColor, setOpenColor] = useState(false);
  const colorPickerRef = useRef(null);

  const handleChangeColor = (e, color, input) => {
    e.preventDefault();
    if (!input) {
      setOpenColor(false);
    }
    if (item?.handleClick) {
      item.handleClick(item);
      if (!item.add_functionality) return;
    }
    setValue(color);
    document.execCommand(type, false, color);
    if (!input) {
      setOpenColor(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpenColor(true);
  };

  const handleOutsideClick = (e) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
      setOpenColor(false);
    }
  };

  useEffect(() => {
    const editor = document.getElementById("react-editor");
    const handleSelectionChange = () => {
      if (!editor?.contains(window.getSelection().anchorNode)) {
        return;
      }
      let appliedColor = "transparent";
      if (type === "foreColor") {
        appliedColor = document.queryCommandValue(type);
      } else {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          const ancestor = range.commonAncestorContainer;
          if (ancestor.nodeType === 3) {
            const parentElement = ancestor.parentElement;
            appliedColor =
              window.getComputedStyle(parentElement).backgroundColor;
          } else {
            appliedColor = window.getComputedStyle(ancestor).backgroundColor;
          }
        }
      }
      if (appliedColor && appliedColor !== "transparent") {
        setValue(rgbToHex(appliedColor));
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.addEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // document.documentElement.style.setProperty(variable, newColor);

  return (
    <div className="main-color-component" ref={colorPickerRef}>
      <button onClick={handleClick} title={item?.title ? item.title : title}>
        <div className="react-editor-d-flex react-editor-flex-column">
          {item?.icon ? (
            item.icon
          ) : type === "foreColor" ? (
            <TextColorUpperIcon />
          ) : (
            <BackgroundColorIcon />
          )}

          <div
            className="bottom-colored-line"
            style={{
              backgroundColor: value,
            }}
          ></div>
        </div>
      </button>
      <div className={`open-color-box ${openColor ? "show" : ""}`}>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#BFEDD2",
            }}
            title="Light Green"
            onClick={(e) => handleChangeColor(e, "#BFEDD2")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#FBEEB8",
            }}
            title="Light Yellow"
            onClick={(e) => handleChangeColor(e, "#FBEEB8")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#F8CAC6",
            }}
            title="Light Red"
            onClick={(e) => handleChangeColor(e, "#BFEDD2")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#ECCAFA",
            }}
            title="Light Purple"
            onClick={(e) => handleChangeColor(e, "#ECCAFA")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#C2E0F4",
            }}
            title="Light Blue"
            onClick={(e) => handleChangeColor(e, "#C2E0F4")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#2DC26B",
            }}
            title="Green"
            onClick={(e) => handleChangeColor(e, "#2DC26B")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#F1C40F",
            }}
            title="Yellow"
            onClick={(e) => handleChangeColor(e, "#F1C40F")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#E03E2D",
            }}
            title="Red"
            onClick={(e) => handleChangeColor(e, "#E03E2D")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#B96AD9",
            }}
            title="Purple"
            onClick={(e) => handleChangeColor(e, "#B96AD9")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#3598DB",
            }}
            title="Blue"
            onClick={(e) => handleChangeColor(e, "#3598DB")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#169179",
            }}
            title="Dark Turquoise"
            onClick={(e) => handleChangeColor(e, "#169179")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#E67E23",
            }}
            title="Orange"
            onClick={(e) => handleChangeColor(e, "#E67E23")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#BA372A",
            }}
            title="Dark Red"
            onClick={(e) => handleChangeColor(e, "#BA372A")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#843FA1",
            }}
            title="Dark Purple"
            onClick={(e) => handleChangeColor(e, "#843FA1")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#236FA1",
            }}
            title="Dark Blue"
            onClick={(e) => handleChangeColor(e, "#236FA1")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#ECF0F1",
            }}
            title="Light Gray"
            onClick={(e) => handleChangeColor(e, "#ECF0F1")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#CED4D9",
            }}
            title="Medium Gray"
            onClick={(e) => handleChangeColor(e, "#CED4D9")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#95A5A6",
            }}
            title="Gray"
            onClick={(e) => handleChangeColor(e, "#95A5A6")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#7E8C8D",
            }}
            title="Dark Gray"
            onClick={(e) => handleChangeColor(e, "#7E8C8D")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#34495E",
            }}
            title="Navy Blue"
            onClick={(e) => handleChangeColor(e, "#34495E")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#fff",
            }}
            title="White"
            onClick={(e) => handleChangeColor(e, "#fff")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#000",
            }}
            title="Black"
            onClick={(e) => handleChangeColor(e, "#000")}
          ></button>

          <button className="color-box"></button>
          <button className="color-box"></button>
          <button
            className="color-box custom-color-picker"
            title="Custom color"
          >
            <input
              id="input-color"
              type="color"
              value={value}
              onChange={(e) => handleChangeColor(e, e.target.value, "input")}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
