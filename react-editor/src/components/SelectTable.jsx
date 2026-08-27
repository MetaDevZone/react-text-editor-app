import React, { useState, useRef, useEffect } from "react";
import TableIcon from "./SVGImages/TableIcon";
import TableGridPicker from "./TableGridPicker";
import ArrowDown from "./SVGImages/ArrowDown";
import Styles from "../css/style.module.css";
import {
  insertTable,
  insertRowAbove,
  insertRowBelow,
  duplicateRow,
  deleteRow,
  insertColumnBefore,
  insertColumnAfter,
  duplicateColumn,
  deleteColumn,
  deleteTable,
  mergeCells,
  splitCell,
} from "../utils/tableUtils";

export default function SelectTable({
  editorRef,
  isDisable,
  isNavbar = false,
  onOpenTableProps,
  onOpenCellProps,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null); // 'grid', 'cell', 'row', 'column'
  const containerRef = useRef(null);

  const handleToggle = (e) => {
    if (isDisable) return;
    e.preventDefault();
    setIsOpen(!isOpen);
    setActiveSubmenu(null);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveSubmenu(null);
  };

  const handleSelectGrid = (rows, cols) => {
    insertTable(editorRef.current, rows, cols);
    handleClose();
  };

  const handleAction = (e, actionFn) => {
    e.preventDefault();
    if (isDisable) return;
    editorRef.current.focus();
    actionFn(editorRef.current);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        handleClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={isNavbar ? Styles.customSelect : Styles.customSelectFormat}
      onMouseEnter={isNavbar ? () => setIsOpen(true) : undefined}
      onMouseLeave={isNavbar ? handleClose : undefined}
      style={{ position: "relative" }}
    >
      {isNavbar ? (
        <span>Table</span>
      ) : (
        <button
          type="button"
          onClick={handleToggle}
          title="Table"
          className={`${Styles.tableToolbarBtn} ${
            isDisable ? Styles.disabledButton : ""
          }`}
          disabled={isDisable}
        >
          <TableIcon />
          <ArrowDown />
        </button>
      )}

      {isOpen && (
        <div
          className={`${Styles.selectItems} ${Styles.tableMenuDropdown} ${Styles.show}`}
          style={!isNavbar ? { top: "100%", left: 0 } : {}}
        >
          {/* Table > Grid */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu("grid")}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span>Table (Grid)</span>
            <span style={{ marginLeft: "auto", fontSize: "10px", paddingLeft: "10px" }}>▶</span>

            {activeSubmenu === "grid" && (
              <div
                className={Styles.tableSubmenu}
                onMouseEnter={() => setActiveSubmenu("grid")}
              >
                <TableGridPicker onSelect={handleSelectGrid} />
              </div>
            )}
          </div>

          {/* Cell Submenu */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu("cell")}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span>Cell</span>
            <span style={{ marginLeft: "auto", fontSize: "10px", paddingLeft: "10px" }}>▶</span>

            {activeSubmenu === "cell" && (
              <div
                className={Styles.tableSubmenu}
                onMouseEnter={() => setActiveSubmenu("cell")}
              >
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => {
                    e.preventDefault();
                    onOpenCellProps?.();
                    handleClose();
                  }}
                >
                  <span>Cell Properties</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, mergeCells)}
                >
                  <span>Merge Cells</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, splitCell)}
                >
                  <span>Split Cell</span>
                </div>
              </div>
            )}
          </div>

          {/* Row Submenu */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu("row")}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span>Row</span>
            <span style={{ marginLeft: "auto", fontSize: "10px", paddingLeft: "10px" }}>▶</span>

            {activeSubmenu === "row" && (
              <div
                className={Styles.tableSubmenu}
                onMouseEnter={() => setActiveSubmenu("row")}
              >
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, insertRowAbove)}
                >
                  <span>Insert Row Above</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, insertRowBelow)}
                >
                  <span>Insert Row Below</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, duplicateRow)}
                >
                  <span>Duplicate Row</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, deleteRow)}
                >
                  <span>Delete Row</span>
                </div>
              </div>
            )}
          </div>

          {/* Column Submenu */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu("column")}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <span>Column</span>
            <span style={{ marginLeft: "auto", fontSize: "10px", paddingLeft: "10px" }}>▶</span>

            {activeSubmenu === "column" && (
              <div
                className={Styles.tableSubmenu}
                onMouseEnter={() => setActiveSubmenu("column")}
              >
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, insertColumnBefore)}
                >
                  <span>Insert Column Before</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, insertColumnAfter)}
                >
                  <span>Insert Column After</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, duplicateColumn)}
                >
                  <span>Duplicate Column</span>
                </div>
                <div
                  className={Styles.selectInsert}
                  onClick={(e) => handleAction(e, deleteColumn)}
                >
                  <span>Delete Column</span>
                </div>
              </div>
            )}
          </div>

          <hr style={{ margin: "4px 0", borderColor: "#eee" }} />

          {/* Table Properties */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={(e) => {
              e.preventDefault();
              onOpenTableProps?.();
              handleClose();
            }}
            style={{ cursor: "pointer" }}
          >
            <span>Table Properties</span>
          </div>

          {/* Delete Table */}
          <div
            className={Styles.selectInsert}
            onMouseEnter={() => setActiveSubmenu(null)}
            onClick={(e) => handleAction(e, deleteTable)}
            style={{ color: "#d93025", cursor: "pointer" }}
          >
            <span>Delete Table</span>
          </div>
        </div>
      )}
    </div>
  );
}
