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

  const handleChangeColor = (color, input) => {
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

  const handleClick = () => {
    setOpenColor(true);
  };

  const handleSelectionChange = () => {
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
          appliedColor = window.getComputedStyle(parentElement).backgroundColor;
        } else {
          appliedColor = window.getComputedStyle(ancestor).backgroundColor;
        }
      }
    }
    if (appliedColor && appliedColor !== "transparent") {
      setValue(rgbToHex(appliedColor));
    }
  };

  const handleOutsideClick = (e) => {
    if (colorPickerRef.current && !colorPickerRef.current.contains(e.target)) {
      setOpenColor(false);
    }
  };

  useEffect(() => {
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
            onClick={() => handleChangeColor("#BFEDD2")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#FBEEB8",
            }}
            title="Light Yellow"
            onClick={() => handleChangeColor("#FBEEB8")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#F8CAC6",
            }}
            title="Light Red"
            onClick={() => handleChangeColor("#BFEDD2")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#ECCAFA",
            }}
            title="Light Purple"
            onClick={() => handleChangeColor("#ECCAFA")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#C2E0F4",
            }}
            title="Light Blue"
            onClick={() => handleChangeColor("#C2E0F4")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#2DC26B",
            }}
            title="Green"
            onClick={() => handleChangeColor("#2DC26B")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#F1C40F",
            }}
            title="Yellow"
            onClick={() => handleChangeColor("#F1C40F")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#E03E2D",
            }}
            title="Red"
            onClick={() => handleChangeColor("#E03E2D")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#B96AD9",
            }}
            title="Purple"
            onClick={() => handleChangeColor("#B96AD9")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#3598DB",
            }}
            title="Blue"
            onClick={() => handleChangeColor("#3598DB")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#169179",
            }}
            title="Dark Turquoise"
            onClick={() => handleChangeColor("#169179")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#E67E23",
            }}
            title="Orange"
            onClick={() => handleChangeColor("#E67E23")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#BA372A",
            }}
            title="Dark Red"
            onClick={() => handleChangeColor("#BA372A")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#843FA1",
            }}
            title="Dark Purple"
            onClick={() => handleChangeColor("#843FA1")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#236FA1",
            }}
            title="Dark Blue"
            onClick={() => handleChangeColor("#236FA1")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#ECF0F1",
            }}
            title="Light Gray"
            onClick={() => handleChangeColor("#ECF0F1")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#CED4D9",
            }}
            title="Medium Gray"
            onClick={() => handleChangeColor("#CED4D9")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#95A5A6",
            }}
            title="Gray"
            onClick={() => handleChangeColor("#95A5A6")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#7E8C8D",
            }}
            title="Dark Gray"
            onClick={() => handleChangeColor("#7E8C8D")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#34495E",
            }}
            title="Navy Blue"
            onClick={() => handleChangeColor("#34495E")}
          ></button>
        </div>
        <div className="color-box-grid react-editor-d-flex">
          <button
            className="color-box"
            style={{
              backgroundColor: "#fff",
            }}
            title="White"
            onClick={() => handleChangeColor("#fff")}
          ></button>
          <button
            className="color-box"
            style={{
              backgroundColor: "#000",
            }}
            title="Black"
            onClick={() => handleChangeColor("#000")}
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
              onChange={(e) => handleChangeColor(e.target.value, "input")}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
