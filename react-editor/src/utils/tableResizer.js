/**
 * Table Column & Row Drag-and-Drop Resizer
 * Provides smooth mouse drag resizing for table rows and columns like TinyMCE
 */

const RESIZE_HANDLE_SIZE = 6; // distance in px from border to trigger resize cursor

export function initTableResizer(editorElement, onUpdate) {
  if (!editorElement) return () => {};

  let activeResize = null; // { type: 'col' | 'row', targetCell, table, startX, startY, startWidth, startHeight, colIndex, rowCells, colCells }

  // Create visual resize indicator bar
  let resizeGuide = document.createElement("div");
  resizeGuide.className = "table-resize-guide";
  resizeGuide.style.cssText = `
    position: fixed;
    pointer-events: none;
    display: none;
    z-index: 99999;
    background-color: #2563eb;
  `;
  document.body.appendChild(resizeGuide);

  const getCellUnderMouse = (e) => {
    let el = document.elementFromPoint(e.clientX, e.clientY);
    while (el && el !== editorElement) {
      if (el.tagName === "TD" || el.tagName === "TH") {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  };

  const getColumnIndex = (cell) => {
    let idx = 0;
    let curr = cell.previousElementSibling;
    while (curr) {
      idx++;
      curr = curr.previousElementSibling;
    }
    return idx;
  };

  const handleMouseMove = (e) => {
    if (activeResize) {
      // Currently dragging
      if (activeResize.type === "col") {
        document.body.style.cursor = "col-resize";
        const deltaX = e.clientX - activeResize.startX;
        const newWidth = Math.max(25, activeResize.startWidth + deltaX);

        // Update guide line position
        resizeGuide.style.display = "block";
        resizeGuide.style.width = "2px";
        resizeGuide.style.height = `${activeResize.tableRect.height}px`;
        resizeGuide.style.top = `${activeResize.tableRect.top}px`;
        resizeGuide.style.left = `${e.clientX}px`;

        activeResize.newWidth = newWidth;
      } else if (activeResize.type === "row") {
        document.body.style.cursor = "row-resize";
        const deltaY = e.clientY - activeResize.startY;
        const newHeight = Math.max(20, activeResize.startHeight + deltaY);

        // Update guide line position
        resizeGuide.style.display = "block";
        resizeGuide.style.height = "2px";
        resizeGuide.style.width = `${activeResize.tableRect.width}px`;
        resizeGuide.style.top = `${e.clientY}px`;
        resizeGuide.style.left = `${activeResize.tableRect.left}px`;

        activeResize.newHeight = newHeight;
      }
      return;
    }

    // Not dragging: check if near border
    const cell = getCellUnderMouse(e);
    if (!cell) {
      if (!activeResize) {
        // Reset cursor if previously changed on editor
        if (editorElement.style.cursor === "col-resize" || editorElement.style.cursor === "row-resize") {
          editorElement.style.cursor = "";
        }
      }
      return;
    }

    const rect = cell.getBoundingClientRect();
    const nearRight = Math.abs(e.clientX - rect.right) <= RESIZE_HANDLE_SIZE;
    const nearBottom = Math.abs(e.clientY - rect.bottom) <= RESIZE_HANDLE_SIZE;

    if (nearRight) {
      cell.style.cursor = "col-resize";
      editorElement.style.cursor = "col-resize";
    } else if (nearBottom) {
      cell.style.cursor = "row-resize";
      editorElement.style.cursor = "row-resize";
    } else {
      cell.style.cursor = "";
      editorElement.style.cursor = "";
    }
  };

  const handleMouseDown = (e) => {
    const cell = getCellUnderMouse(e);
    if (!cell) return;

    const rect = cell.getBoundingClientRect();
    const nearRight = Math.abs(e.clientX - rect.right) <= RESIZE_HANDLE_SIZE;
    const nearBottom = Math.abs(e.clientY - rect.bottom) <= RESIZE_HANDLE_SIZE;

    if (!nearRight && !nearBottom) return;

    e.preventDefault();
    e.stopPropagation();

    const table = cell.closest("table");
    const tableRect = table.getBoundingClientRect();

    if (nearRight) {
      // Column resize
      const colIndex = getColumnIndex(cell);
      const colCells = [];
      table.querySelectorAll("tr").forEach((row) => {
        if (row.children[colIndex]) {
          colCells.push(row.children[colIndex]);
        }
      });

      activeResize = {
        type: "col",
        targetCell: cell,
        table,
        tableRect,
        colIndex,
        colCells,
        startX: e.clientX,
        startWidth: cell.offsetWidth,
        newWidth: cell.offsetWidth,
      };

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    } else if (nearBottom) {
      // Row resize
      const row = cell.closest("tr");
      activeResize = {
        type: "row",
        targetCell: cell,
        row,
        table,
        tableRect,
        startY: e.clientY,
        startHeight: row.offsetHeight,
        newHeight: row.offsetHeight,
      };

      document.body.style.cursor = "row-resize";
      document.body.style.userSelect = "none";
    }
  };

  const handleMouseUp = (e) => {
    if (!activeResize) return;

    resizeGuide.style.display = "none";
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    editorElement.style.cursor = "";

    if (activeResize.type === "col" && activeResize.newWidth) {
      // Apply new width to all cells in column
      activeResize.colCells.forEach((c) => {
        c.style.width = `${activeResize.newWidth}px`;
      });
      if (onUpdate) onUpdate();
    } else if (activeResize.type === "row" && activeResize.newHeight) {
      // Apply new height to row and its cells
      if (activeResize.row) {
        activeResize.row.style.height = `${activeResize.newHeight}px`;
        Array.from(activeResize.row.children).forEach((c) => {
          c.style.height = `${activeResize.newHeight}px`;
        });
      }
      if (onUpdate) onUpdate();
    }

    activeResize = null;
  };

  editorElement.addEventListener("mousemove", handleMouseMove);
  editorElement.addEventListener("mousedown", handleMouseDown);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    editorElement.removeEventListener("mousemove", handleMouseMove);
    editorElement.removeEventListener("mousedown", handleMouseDown);
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
    if (resizeGuide && resizeGuide.parentNode) {
      resizeGuide.parentNode.removeChild(resizeGuide);
    }
  };
}
