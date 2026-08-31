import React, { useEffect, useRef, useState } from "react";
import LinkIcon from "./SVGImages/LinkIcon";
import ImageIcon from "./SVGImages/ImageIcon";
import RemoveLinkIcon from "./SVGImages/RemoveLinkIcon";
import OpenLinkIcon from "./SVGImages/OpenLinkIcon";
import TableIcon from "./SVGImages/TableIcon";
import FindReplaceIcon from "./SVGImages/FindReplaceIcon";
import { remove_resizer } from "./constant";
import Styles from "../css/style.module.css";
import {
  findParentTableCell,
  findParentTable,
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

const RightClickLinkPopup = ({
  editorRef,
  setIsOpenModel,
  setSelectedData,
  setSelectedEvent,
  selectedEvent,
  setImageUrl,
  handleRemoveLink,
  selectedRange,
  isDisable,
  onOpenTableProps,
  onOpenCellProps,
  setSelectedTableCell,
  setSelectedTableElement,
  setFindReplacePos,
}) => {
  const popupRef = useRef(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);
  const [tableCell, setTableCell] = useState(null);
  const [tableElem, setTableElem] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  const getSelectedText = () => {
    if (selectedRange) {
      const selectedText = selectedRange.toString();
      return selectedText;
    }
    return "";
  };

  const handleRightClick = (event) => {
    if (isDisable) {
      return;
    }
    event.preventDefault();
    remove_resizer();
    const target = event.target;
    
    // Calculate exact viewport coordinates for fixed positioning
    const posX = Math.min(window.innerWidth - 240, Math.max(10, event.clientX));
    const posY = Math.min(window.innerHeight - 320, Math.max(10, event.clientY));
    
    setPopupPosition({
      x: posX,
      y: posY,
    });

    let tagNames = ["IMG", "A", "BUTTON"];
    if (tagNames.includes(target.tagName)) {
      setSelectedEvent(target);
    } else {
      setSelectedEvent(null);
    }

    const cell = findParentTableCell(target, editorRef.current);
    const table = findParentTable(target, editorRef.current);
    setTableCell(cell);
    setTableElem(table);
    if (setSelectedTableCell) setSelectedTableCell(cell);
    if (setSelectedTableElement) setSelectedTableElement(table);

    setActiveSubmenu(null);
    setPopupVisible(true);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupVisible(false);
      setActiveSubmenu(null);
    }
  };

  const handleOpenLinkPopup = () => {
    let open_new_tab = false;
    let link_url = "";
    let link_text = getSelectedText() || "";
    let link_type = "text";

    if (selectedEvent?.tagName === "A") {
      link_url = selectedEvent?.href;
      link_text = getSelectedText() || selectedEvent?.textContent.trim();
      open_new_tab = selectedEvent?.target === "_blank";
    } else if (selectedEvent?.tagName === "IMG") {
      link_text = "Image";
      link_type = "image";
      setImageUrl(selectedEvent?.src);
    } else if (selectedEvent?.tagName === "BUTTON") {
      link_text = selectedEvent.textContent;
      link_type = "button";
    }
    const parentElement = selectedEvent?.parentElement;
    if (parentElement?.tagName === "A") {
      setSelectedEvent(parentElement);
      link_url = parentElement?.href;
      open_new_tab = parentElement?.target === "_blank";
    }

    let selected_object = {
      link: link_url,
      text: link_text,
      open_new_tab: open_new_tab,
      link_type: link_type,
    };
    setSelectedData(selected_object);
    setPopupVisible(false);
    setIsOpenModel("link");
  };

  const handleOpenLink = () => {
    let link = selectedEvent?.href;
    if (
      selectedEvent?.tagName !== "A" &&
      selectedEvent?.parentElement?.tagName === "A"
    ) {
      link = selectedEvent?.parentElement?.href;
    }
    if (link) {
      const fullUrl = /^(https?:\/\/|mailto:|tel:|\/|#)/i.test(link)
        ? link
        : `https://${link}`;
      window.open(fullUrl, "_blank", "noopener,noreferrer");
    }
    setPopupVisible(false);
  };

  const handleRemove = () => {
    handleRemoveLink();
    setPopupVisible(false);
  };

  const handleImageLink = () => {
    setPopupVisible(false);
    let height = selectedEvent.style?.height;
    let width = selectedEvent.style?.width;

    if (!height) {
      height = selectedEvent?.offsetHeight;
    }
    if (!width) {
      width = selectedEvent?.offsetWidth;
    }
    setSelectedData({
      link: selectedEvent?.src,
      height: height,
      width: width,
    });
    setIsOpenModel("image");
  };

  const handleTableAction = (e, actionFn) => {
    e.preventDefault();
    if (editorRef.current && tableCell) {
      actionFn(editorRef.current, tableCell);
    }
    setPopupVisible(false);
    setActiveSubmenu(null);
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (editor) {
      editor.addEventListener("contextmenu", handleRightClick);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      if (editor) {
        editor.removeEventListener("contextmenu", handleRightClick);
      }
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editorRef]);

  return (
    <>
      {popupVisible && (
        <div
          className={Styles.rightClickPopupBackground}
          style={{
            top: popupPosition.y,
            left: popupPosition.x,
          }}
          ref={popupRef}
        >
          {/* Find and Replace action */}
          <div
            className={Styles.rightClickPopup}
            onClick={() => {
              setPopupVisible(false);
              if (setFindReplacePos) {
                setFindReplacePos({
                  top: popupPosition.y,
                  left: popupPosition.x,
                });
              }
              setIsOpenModel("find_replace");
            }}
          >
            <FindReplaceIcon /> Find and Replace...
          </div>

          {/* Link action if target or selection */}
          {(selectedEvent || getSelectedText()) && (
            <div
              className={Styles.rightClickPopup}
              onClick={handleOpenLinkPopup}
            >
              <LinkIcon /> Link...
            </div>
          )}

          {(selectedEvent?.tagName === "A" ||
            selectedEvent?.parentElement?.tagName === "A") && (
            <>
              <div className={Styles.rightClickPopup} onClick={handleRemove}>
                <RemoveLinkIcon /> Remove Link...
              </div>{" "}
              <div
                className={`${Styles.rightClickPopup} ${Styles.openLink}`}
                onClick={handleOpenLink}
              >
                <OpenLinkIcon /> Open Link...
              </div>
            </>
          )}

          {selectedEvent?.tagName === "IMG" && (
            <>
              <hr />
              <div className={Styles.rightClickPopup} onClick={handleImageLink}>
                <ImageIcon /> Image...
              </div>
            </>
          )}

          {/* Table actions if clicked inside table */}
          {tableCell && (
            <>
              {selectedEvent && <hr />}
              <div
                className={Styles.rightClickPopup}
                style={{ fontWeight: "bold", opacity: 0.8 }}
              >
                <TableIcon /> Table Options
              </div>

              {/* Direct Quick Actions for Row */}
              <div
                className={Styles.rightClickPopup}
                onClick={(e) => handleTableAction(e, duplicateRow)}
              >
                <span>📑 Duplicate Row</span>
              </div>
              <div
                className={Styles.rightClickPopup}
                onClick={(e) => handleTableAction(e, deleteRow)}
                style={{ color: "#d93025" }}
              >
                <span>🗑️ Delete / Remove Row</span>
              </div>

              <hr />

              {/* Row Submenu */}
              <div
                className={Styles.rightClickPopup}
                onMouseEnter={() => setActiveSubmenu("row")}
                style={{ position: "relative" }}
              >
                <span>Row Options</span>
                <span style={{ marginLeft: "auto", fontSize: "10px" }}>▶</span>

                {activeSubmenu === "row" && (
                  <div
                    className={Styles.tableSubmenu}
                    style={{ left: "100%", top: 0 }}
                  >
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, insertRowAbove)}
                    >
                      <span>Insert Row Above</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, insertRowBelow)}
                    >
                      <span>Insert Row Below</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, duplicateRow)}
                    >
                      <span>Duplicate Row</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, deleteRow)}
                    >
                      <span>Delete Row</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Column Submenu */}
              <div
                className={Styles.rightClickPopup}
                onMouseEnter={() => setActiveSubmenu("column")}
                style={{ position: "relative" }}
              >
                <span>Column Options</span>
                <span style={{ marginLeft: "auto", fontSize: "10px" }}>▶</span>

                {activeSubmenu === "column" && (
                  <div
                    className={Styles.tableSubmenu}
                    style={{ left: "100%", top: 0 }}
                  >
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, insertColumnBefore)}
                    >
                      <span>Insert Column Before</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, insertColumnAfter)}
                    >
                      <span>Insert Column After</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, duplicateColumn)}
                    >
                      <span>Duplicate Column</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, deleteColumn)}
                    >
                      <span>Delete Column</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Cell Submenu */}
              <div
                className={Styles.rightClickPopup}
                onMouseEnter={() => setActiveSubmenu("cell")}
                style={{ position: "relative" }}
              >
                <span>Cell Options</span>
                <span style={{ marginLeft: "auto", fontSize: "10px" }}>▶</span>

                {activeSubmenu === "cell" && (
                  <div
                    className={Styles.tableSubmenu}
                    style={{ left: "100%", top: 0 }}
                  >
                    <div
                      className={Styles.selectInsert}
                      onClick={() => {
                        onOpenCellProps?.(tableCell);
                        setPopupVisible(false);
                      }}
                    >
                      <span>Cell Properties</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, mergeCells)}
                    >
                      <span>Merge Cells</span>
                    </div>
                    <div
                      className={Styles.selectInsert}
                      onClick={(e) => handleTableAction(e, splitCell)}
                    >
                      <span>Split Cell</span>
                    </div>
                  </div>
                )}
              </div>

              <hr />

              {/* Table Properties */}
              <div
                className={Styles.rightClickPopup}
                onClick={() => {
                  onOpenTableProps?.(tableElem);
                  setPopupVisible(false);
                }}
              >
                <span>Table Properties</span>
              </div>

              {/* Delete Table */}
              <div
                className={Styles.rightClickPopup}
                onClick={(e) => handleTableAction(e, deleteTable)}
                style={{ color: "#d93025" }}
              >
                <span>Delete Table</span>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default RightClickLinkPopup;
