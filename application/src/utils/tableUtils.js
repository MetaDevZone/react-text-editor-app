/**
 * Comprehensive DOM Table utilities for ReactEditorKit
 * Matches TinyMCE 6 Table plugin behavior
 */

export const findParentTableCell = (node, editorRoot) => {
  let curr = node;
  while (curr && curr !== editorRoot && curr !== document.body) {
    if (
      curr.nodeType === Node.ELEMENT_NODE &&
      (curr.tagName === "TD" || curr.tagName === "TH")
    ) {
      return curr;
    }
    curr = curr.parentNode;
  }
  return null;
};

export const findParentTableRow = (node, editorRoot) => {
  let curr = node;
  while (curr && curr !== editorRoot && curr !== document.body) {
    if (curr.nodeType === Node.ELEMENT_NODE && curr.tagName === "TR") {
      return curr;
    }
    curr = curr.parentNode;
  }
  return null;
};

export const findParentTable = (node, editorRoot) => {
  let curr = node;
  while (curr && curr !== editorRoot && curr !== document.body) {
    if (curr.nodeType === Node.ELEMENT_NODE && curr.tagName === "TABLE") {
      return curr;
    }
    curr = curr.parentNode;
  }
  return null;
};

export const getActiveTableCell = (editorRoot) => {
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  return (
    findParentTableCell(range.startContainer, editorRoot) ||
    findParentTableCell(range.commonAncestorContainer, editorRoot)
  );
};

export const getActiveTable = (editorRoot) => {
  const cell = getActiveTableCell(editorRoot);
  if (cell) return findParentTable(cell, editorRoot);
  const selection = window.getSelection();
  if (!selection || !selection.rangeCount) return null;
  const range = selection.getRangeAt(0);
  return findParentTable(range.startContainer, editorRoot);
};

/**
 * Inserts a new table at the current cursor position or in editor
 */
export const insertTable = (editor, rows = 3, cols = 3, options = {}) => {
  if (!editor) return;

  const table = document.createElement("table");
  table.style.borderCollapse = "collapse";
  table.style.width = options.width || "100%";
  table.style.margin = "1em 0";
  table.style.border = options.border || "1px solid #ccc";

  const tbody = document.createElement("tbody");

  for (let r = 0; r < rows; r++) {
    const tr = document.createElement("tr");
    for (let c = 0; c < cols; c++) {
      const td = document.createElement(
        r === 0 && options.hasHeader ? "th" : "td",
      );
      td.style.border = "1px solid #ccc";
      td.style.padding = "8px 12px";
      td.style.minWidth = "30px";
      td.style.verticalAlign = "top";

      const p = document.createElement("p");
      p.style.margin = "0";
      p.appendChild(document.createElement("br"));
      td.appendChild(p);
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  table.appendChild(tbody);

  // Insert into selection or at end of editor
  const selection = window.getSelection();
  if (selection && selection.rangeCount && editor.contains(selection.anchorNode)) {
    const range = selection.getRangeAt(0);
    range.deleteContents();

    // Check if inside a block element
    let currentBlock = range.startContainer;
    while (currentBlock && currentBlock !== editor && !["P", "DIV", "H1", "H2", "H3", "H4", "H5", "H6", "BLOCKQUOTE"].includes(currentBlock.nodeName)) {
      currentBlock = currentBlock.parentNode;
    }

    if (currentBlock && currentBlock !== editor && currentBlock.parentNode) {
      if (currentBlock.textContent.trim() === "") {
        currentBlock.parentNode.replaceChild(table, currentBlock);
      } else {
        currentBlock.parentNode.insertBefore(table, currentBlock.nextSibling);
      }
    } else {
      range.insertNode(table);
    }
  } else {
    editor.appendChild(table);
  }

  // Focus the first cell
  const firstCell = table.querySelector("td, th");
  if (firstCell) {
    const p = firstCell.querySelector("p") || firstCell;
    const newRange = document.createRange();
    newRange.setStart(p, 0);
    newRange.collapse(true);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(newRange);
  }

  // Trigger input event
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Insert a row above current cell
 */
export const insertRowAbove = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const row = findParentTableRow(cell, editor);
  if (!row) return;

  const colCount = getRowColumnCount(row);
  const newRow = document.createElement("tr");

  for (let i = 0; i < colCount; i++) {
    const td = document.createElement("td");
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px 12px";
    td.style.verticalAlign = "top";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.appendChild(document.createElement("br"));
    td.appendChild(p);
    newRow.appendChild(td);
  }

  row.parentNode.insertBefore(newRow, row);
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Insert a row below current cell
 */
export const insertRowBelow = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const row = findParentTableRow(cell, editor);
  if (!row) return;

  const colCount = getRowColumnCount(row);
  const newRow = document.createElement("tr");

  for (let i = 0; i < colCount; i++) {
    const td = document.createElement("td");
    td.style.border = "1px solid #ccc";
    td.style.padding = "8px 12px";
    td.style.verticalAlign = "top";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.appendChild(document.createElement("br"));
    td.appendChild(p);
    newRow.appendChild(td);
  }

  if (row.nextSibling) {
    row.parentNode.insertBefore(newRow, row.nextSibling);
  } else {
    row.parentNode.appendChild(newRow);
  }
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Duplicate current row
 */
export const duplicateRow = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const row = findParentTableRow(cell, editor);
  if (!row) return;

  const clonedRow = row.cloneNode(true);
  if (row.nextSibling) {
    row.parentNode.insertBefore(clonedRow, row.nextSibling);
  } else {
    row.parentNode.appendChild(clonedRow);
  }
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Delete current row
 */
export const deleteRow = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const row = findParentTableRow(cell, editor);
  const table = findParentTable(cell, editor);
  if (!row || !table) return;

  const allRows = table.querySelectorAll("tr");
  if (allRows.length <= 1) {
    deleteTable(editor, cell);
    return;
  }

  row.parentNode.removeChild(row);
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Duplicate current column
 */
export const duplicateColumn = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const table = findParentTable(cell, editor);
  if (!table) return;

  const colIndex = getCellIndex(cell);
  const rows = table.querySelectorAll("tr");

  rows.forEach((r) => {
    const targetCell = r.children[colIndex];
    if (targetCell) {
      const clonedCell = targetCell.cloneNode(true);
      if (targetCell.nextSibling) {
        r.insertBefore(clonedCell, targetCell.nextSibling);
      } else {
        r.appendChild(clonedCell);
      }
    }
  });

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Insert column before current cell
 */
export const insertColumnBefore = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const table = findParentTable(cell, editor);
  if (!table) return;

  const colIndex = getCellIndex(cell);
  const rows = table.querySelectorAll("tr");

  rows.forEach((r) => {
    const isHeaderRow = r.parentElement && r.parentElement.tagName === "THEAD";
    const newCell = document.createElement(isHeaderRow ? "th" : "td");
    newCell.style.border = "1px solid #ccc";
    newCell.style.padding = "8px 12px";
    newCell.style.verticalAlign = "top";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.appendChild(document.createElement("br"));
    newCell.appendChild(p);

    const target = r.children[colIndex];
    if (target) {
      r.insertBefore(newCell, target);
    } else {
      r.appendChild(newCell);
    }
  });

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Insert column after current cell
 */
export const insertColumnAfter = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const table = findParentTable(cell, editor);
  if (!table) return;

  const colIndex = getCellIndex(cell);
  const rows = table.querySelectorAll("tr");

  rows.forEach((r) => {
    const isHeaderRow = r.parentElement && r.parentElement.tagName === "THEAD";
    const newCell = document.createElement(isHeaderRow ? "th" : "td");
    newCell.style.border = "1px solid #ccc";
    newCell.style.padding = "8px 12px";
    newCell.style.verticalAlign = "top";
    const p = document.createElement("p");
    p.style.margin = "0";
    p.appendChild(document.createElement("br"));
    newCell.appendChild(p);

    const target = r.children[colIndex];
    if (target && target.nextSibling) {
      r.insertBefore(newCell, target.nextSibling);
    } else {
      r.appendChild(newCell);
    }
  });

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Delete current column
 */
export const deleteColumn = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const table = findParentTable(cell, editor);
  if (!table) return;

  const colIndex = getCellIndex(cell);
  const rows = table.querySelectorAll("tr");

  let remainingCols = 0;
  rows.forEach((r) => {
    if (r.children[colIndex]) {
      r.removeChild(r.children[colIndex]);
    }
    remainingCols = Math.max(remainingCols, r.children.length);
  });

  if (remainingCols === 0) {
    deleteTable(editor, cell);
    return;
  }

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Delete entire table
 */
export const deleteTable = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  const table = cell ? findParentTable(cell, editor) : getActiveTable(editor);
  if (!table) return;

  const p = document.createElement("p");
  p.appendChild(document.createElement("br"));
  table.parentNode.replaceChild(p, table);

  // Set cursor in paragraph
  const range = document.createRange();
  range.setStart(p, 0);
  range.collapse(true);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Merge current cell with right adjacent cell
 */
export const mergeCells = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;
  const nextCell = cell.nextElementSibling;
  if (!nextCell || !["TD", "TH"].includes(nextCell.tagName)) return;

  const currentSpan = parseInt(cell.getAttribute("colspan") || "1", 10);
  const nextSpan = parseInt(nextCell.getAttribute("colspan") || "1", 10);

  cell.setAttribute("colspan", (currentSpan + nextSpan).toString());

  // Move content of nextCell into current cell
  while (nextCell.firstChild) {
    cell.appendChild(nextCell.firstChild);
  }

  nextCell.parentNode.removeChild(nextCell);
  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Split a merged cell back
 */
export const splitCell = (editor, cellNode) => {
  const cell = cellNode || getActiveTableCell(editor);
  if (!cell) return;

  const colSpan = parseInt(cell.getAttribute("colspan") || "1", 10);
  if (colSpan > 1) {
    cell.setAttribute("colspan", (colSpan - 1).toString());
    const newCell = document.createElement(cell.tagName);
    newCell.style.cssText = cell.style.cssText;
    const p = document.createElement("p");
    p.style.margin = "0";
    p.appendChild(document.createElement("br"));
    newCell.appendChild(p);

    if (cell.nextSibling) {
      cell.parentNode.insertBefore(newCell, cell.nextSibling);
    } else {
      cell.parentNode.appendChild(newCell);
    }
  }

  const rowSpan = parseInt(cell.getAttribute("rowspan") || "1", 10);
  if (rowSpan > 1) {
    cell.setAttribute("rowspan", (rowSpan - 1).toString());
  }

  editor.dispatchEvent(new Event("input", { bubbles: true }));
};

/**
 * Helper: get column count of row
 */
function getRowColumnCount(row) {
  let count = 0;
  for (let i = 0; i < row.children.length; i++) {
    const cell = row.children[i];
    const span = parseInt(cell.getAttribute("colspan") || "1", 10);
    count += span;
  }
  return Math.max(count, row.children.length);
}

/**
 * Helper: get column index of cell in row
 */
function getCellIndex(cell) {
  let idx = 0;
  let curr = cell.previousElementSibling;
  while (curr) {
    idx++;
    curr = curr.previousElementSibling;
  }
  return idx;
}

/**
 * Get current table properties
 */
export const getTableProperties = (table) => {
  if (!table) return {};
  return {
    width: table.style.width || "100%",
    height: table.style.height || "",
    cellSpacing: table.getAttribute("cellspacing") || "",
    cellPadding: table.getAttribute("cellpadding") || "",
    borderWidth: table.style.borderWidth || "1px",
    borderStyle: table.style.borderStyle || "solid",
    borderColor: table.style.borderColor || "#ccc",
    backgroundColor: table.style.backgroundColor || "",
    alignment: table.style.marginLeft === "auto" && table.style.marginRight === "auto"
      ? "center"
      : table.style.float || "none",
  };
};

/**
 * Apply table properties
 */
export const applyTableProperties = (table, props) => {
  if (!table || !props) return;
  if (props.width) table.style.width = props.width;
  if (props.height) table.style.height = props.height;
  if (props.backgroundColor) table.style.backgroundColor = props.backgroundColor;
  if (props.borderWidth || props.borderStyle || props.borderColor) {
    const w = props.borderWidth || "1px";
    const s = props.borderStyle || "solid";
    const c = props.borderColor || "#ccc";
    table.style.border = `${w} ${s} ${c}`;
    table.querySelectorAll("td, th").forEach((cell) => {
      cell.style.border = `${w} ${s} ${c}`;
    });
  }
  if (props.cellPadding) {
    table.querySelectorAll("td, th").forEach((cell) => {
      cell.style.padding = `${props.cellPadding}px`;
    });
  }
  if (props.alignment === "center") {
    table.style.marginLeft = "auto";
    table.style.marginRight = "auto";
    table.style.float = "none";
  } else if (props.alignment === "left" || props.alignment === "right") {
    table.style.float = props.alignment;
    table.style.marginLeft = "";
    table.style.marginRight = "";
  } else {
    table.style.float = "none";
    table.style.marginLeft = "0";
    table.style.marginRight = "auto";
  }
};

/**
 * Get current cell properties
 */
export const getCellProperties = (cell) => {
  if (!cell) return {};
  return {
    width: cell.style.width || "",
    height: cell.style.height || "",
    cellType: cell.tagName.toLowerCase(),
    backgroundColor: cell.style.backgroundColor || "",
    borderColor: cell.style.borderColor || "",
    textAlign: cell.style.textAlign || "left",
    verticalAlign: cell.style.verticalAlign || "top",
  };
};

/**
 * Apply cell properties
 */
export const applyCellProperties = (cell, props) => {
  if (!cell || !props) return;
  if (props.width) cell.style.width = props.width;
  if (props.height) cell.style.height = props.height;
  if (props.backgroundColor) cell.style.backgroundColor = props.backgroundColor;
  if (props.borderColor) cell.style.borderColor = props.borderColor;
  if (props.textAlign) cell.style.textAlign = props.textAlign;
  if (props.verticalAlign) cell.style.verticalAlign = props.verticalAlign;

  if (props.cellType && props.cellType !== cell.tagName.toLowerCase()) {
    const newCell = document.createElement(props.cellType);
    newCell.style.cssText = cell.style.cssText;
    while (cell.firstChild) {
      newCell.appendChild(cell.firstChild);
    }
    cell.parentNode.replaceChild(newCell, cell);
  }
};
