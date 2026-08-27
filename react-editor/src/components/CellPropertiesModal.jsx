import React, { useState, useEffect } from "react";
import Styles from "../css/style.module.css";
import { getCellProperties } from "../utils/tableUtils";

export default function CellPropertiesModal({
  cellElement,
  onSave,
  onClose,
}) {
  const [props, setProps] = useState({
    width: "",
    height: "",
    cellType: "td",
    backgroundColor: "",
    borderColor: "",
    textAlign: "left",
    verticalAlign: "top",
  });

  useEffect(() => {
    if (cellElement) {
      const initialProps = getCellProperties(cellElement);
      setProps((prev) => ({
        ...prev,
        ...initialProps,
      }));
    }
  }, [cellElement]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProps((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(props);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.tablePropsForm}>
      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-width">Width</label>
          <input
            id="cell-width"
            type="text"
            name="width"
            className={Styles.formControlInput}
            value={props.width}
            onChange={handleChange}
            placeholder="e.g. 100px or 25%"
          />
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-height">Height</label>
          <input
            id="cell-height"
            type="text"
            name="height"
            className={Styles.formControlInput}
            value={props.height}
            onChange={handleChange}
            placeholder="e.g. 40px"
          />
        </div>
      </div>

      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-type">Cell Type</label>
          <select
            id="cell-type"
            name="cellType"
            className={Styles.formControlInput}
            value={props.cellType}
            onChange={handleChange}
          >
            <option value="td">Cell (td)</option>
            <option value="th">Header Cell (th)</option>
          </select>
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-textAlign">Horizontal Align</label>
          <select
            id="cell-textAlign"
            name="textAlign"
            className={Styles.formControlInput}
            value={props.textAlign}
            onChange={handleChange}
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>
      </div>

      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-verticalAlign">Vertical Align</label>
          <select
            id="cell-verticalAlign"
            name="verticalAlign"
            className={Styles.formControlInput}
            value={props.verticalAlign}
            onChange={handleChange}
          >
            <option value="top">Top</option>
            <option value="middle">Middle</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="cell-bgColor">Background Color</label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="color"
              name="backgroundColor"
              value={props.backgroundColor || "#ffffff"}
              onChange={handleChange}
              style={{ width: "36px", height: "34px", padding: 0, border: "none", cursor: "pointer" }}
            />
            <input
              id="cell-bgColor"
              type="text"
              name="backgroundColor"
              className={Styles.formControlInput}
              value={props.backgroundColor}
              onChange={handleChange}
              placeholder="e.g. #f0f0f0"
            />
          </div>
        </div>
      </div>

      <div className={`${Styles.reactEditorMt10}`}>
        <label htmlFor="cell-borderColor">Border Color</label>
        <div style={{ display: "flex", gap: "8px", alignItems: "center", width: "47%" }}>
          <input
            type="color"
            name="borderColor"
            value={props.borderColor || "#cccccc"}
            onChange={handleChange}
            style={{ width: "36px", height: "34px", padding: 0, border: "none", cursor: "pointer" }}
          />
          <input
            id="cell-borderColor"
            type="text"
            name="borderColor"
            className={Styles.formControlInput}
            value={props.borderColor}
            onChange={handleChange}
            placeholder="e.g. #ccc"
          />
        </div>
      </div>

      <div className={Styles.reactEditorTextEnd} style={{ marginTop: "20px" }}>
        <button type="button" className={Styles.cancel__btn} onClick={onClose} style={{ marginRight: "10px" }}>
          Cancel
        </button>
        <button type="submit" className={Styles.saveButton}>
          Save
        </button>
      </div>
    </form>
  );
}
