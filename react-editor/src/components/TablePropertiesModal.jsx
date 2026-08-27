import React, { useState, useEffect } from "react";
import Styles from "../css/style.module.css";
import { getTableProperties } from "../utils/tableUtils";

export default function TablePropertiesModal({
  tableElement,
  onSave,
  onClose,
}) {
  const [props, setProps] = useState({
    width: "100%",
    height: "",
    cellPadding: "8",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#cccccc",
    backgroundColor: "",
    alignment: "none",
  });

  useEffect(() => {
    if (tableElement) {
      const initialProps = getTableProperties(tableElement);
      setProps((prev) => ({
        ...prev,
        ...initialProps,
      }));
    }
  }, [tableElement]);

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
          <label htmlFor="tbl-width">Width</label>
          <input
            id="tbl-width"
            type="text"
            name="width"
            className={Styles.formControlInput}
            value={props.width}
            onChange={handleChange}
            placeholder="e.g. 100% or 500px"
          />
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-height">Height</label>
          <input
            id="tbl-height"
            type="text"
            name="height"
            className={Styles.formControlInput}
            value={props.height}
            onChange={handleChange}
            placeholder="e.g. 300px"
          />
        </div>
      </div>

      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-cellPadding">Cell Padding (px)</label>
          <input
            id="tbl-cellPadding"
            type="number"
            name="cellPadding"
            className={Styles.formControlInput}
            value={props.cellPadding}
            onChange={handleChange}
          />
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-alignment">Alignment</label>
          <select
            id="tbl-alignment"
            name="alignment"
            className={Styles.formControlInput}
            value={props.alignment}
            onChange={handleChange}
          >
            <option value="none">None</option>
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
          </select>
        </div>
      </div>

      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-borderWidth">Border Width</label>
          <input
            id="tbl-borderWidth"
            type="text"
            name="borderWidth"
            className={Styles.formControlInput}
            value={props.borderWidth}
            onChange={handleChange}
            placeholder="e.g. 1px"
          />
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-borderStyle">Border Style</label>
          <select
            id="tbl-borderStyle"
            name="borderStyle"
            className={Styles.formControlInput}
            value={props.borderStyle}
            onChange={handleChange}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
            <option value="double">Double</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>

      <div className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-borderColor">Border Color</label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="color"
              name="borderColor"
              value={props.borderColor || "#cccccc"}
              onChange={handleChange}
              style={{ width: "36px", height: "34px", padding: 0, border: "none", cursor: "pointer" }}
            />
            <input
              id="tbl-borderColor"
              type="text"
              name="borderColor"
              className={Styles.formControlInput}
              value={props.borderColor}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}>
          <label htmlFor="tbl-bgColor">Background Color</label>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <input
              type="color"
              name="backgroundColor"
              value={props.backgroundColor || "#ffffff"}
              onChange={handleChange}
              style={{ width: "36px", height: "34px", padding: 0, border: "none", cursor: "pointer" }}
            />
            <input
              id="tbl-bgColor"
              type="text"
              name="backgroundColor"
              className={Styles.formControlInput}
              value={props.backgroundColor}
              onChange={handleChange}
              placeholder="e.g. #f9f9f9"
            />
          </div>
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
