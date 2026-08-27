import React, { useState } from "react";
import Styles from "../css/style.module.css";

const MAX_ROWS = 10;
const MAX_COLS = 10;

export default function TableGridPicker({ onSelect, onCancel }) {
  const [hoveredRows, setHoveredRows] = useState(1);
  const [hoveredCols, setHoveredCols] = useState(1);

  const handleCellHover = (r, c) => {
    setHoveredRows(r + 1);
    setHoveredCols(c + 1);
  };

  const handleCellClick = (r, c, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSelect) {
      onSelect(r + 1, c + 1);
    }
  };

  return (
    <div className={Styles.tableGridPickerContainer}>
      <div className={Styles.tableGridTitle}>
        {hoveredCols} × {hoveredRows} Table
      </div>
      <div
        className={Styles.tableGrid}
        style={{
          gridTemplateColumns: `repeat(${MAX_COLS}, 16px)`,
          gridTemplateRows: `repeat(${MAX_ROWS}, 16px)`,
        }}
      >
        {Array.from({ length: MAX_ROWS }).map((_, r) =>
          Array.from({ length: MAX_COLS }).map((_, c) => {
            const isHighlighted = r < hoveredRows && c < hoveredCols;
            return (
              <div
                key={`${r}-${c}`}
                className={`${Styles.tableGridCell} ${
                  isHighlighted ? Styles.tableGridCellActive : ""
                }`}
                onMouseEnter={() => handleCellHover(r, c)}
                onClick={(e) => handleCellClick(r, c, e)}
              />
            );
          }),
        )}
      </div>
    </div>
  );
}
