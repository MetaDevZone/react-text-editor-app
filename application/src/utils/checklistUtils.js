export const CHECKLIST_CLASS = "mlx-checklist";
export const CHECKLIST_CHECKED_CLASS = "mlx-checklist-checked";

export const CHECKLIST_CONTENT_STYLES = `
ul.mlx-checklist {
  list-style: none !important;
  padding-left: 2px;
  margin: 0.65em 0;
}
ul.mlx-checklist > li {
  position: relative;
  padding: 3px 6px 3px 28px;
  margin: 2px 0;
  min-height: 24px;
  line-height: 1.55;
  list-style: none !important;
  border-radius: 6px;
}
ul.mlx-checklist > li::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 1.5px solid #9ca3af;
  border-radius: 4px;
  background: #fff;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-block;
  text-decoration: none !important;
  box-shadow: 0 0 0 1px rgba(15, 23, 42, 0.02);
  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;
}
ul.mlx-checklist > li:hover::before {
  border-color: #2563eb;
}
ul.mlx-checklist > li.mlx-checklist-checked,
ul.mlx-checklist > li[data-checked="true"] {
  color: #6b7280;
  text-decoration: line-through;
  text-decoration-color: #9ca3af;
}
ul.mlx-checklist > li.mlx-checklist-checked::before,
ul.mlx-checklist > li[data-checked="true"]::before {
  background: #2563eb;
  border-color: #2563eb;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath fill='none' stroke='%23ffffff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round' d='M3.6 8.3 L6.6 11.2 L12.4 4.7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 12px 12px;
  box-shadow: none;
  text-decoration: none !important;
}
`;

export function isChecklistList(el) {
  return (
    el &&
    el.nodeType === 1 &&
    el.tagName === "UL" &&
    el.classList.contains(CHECKLIST_CLASS)
  );
}

export function findParentChecklist(node, editorRoot) {
  let curr = node;
  while (curr && curr !== editorRoot && curr !== document.body) {
    if (isChecklistList(curr)) return curr;
    curr = curr.parentNode;
  }
  return null;
}

export function getSelectedListItems(editor) {
  const sel = window.getSelection();
  if (!sel || !sel.rangeCount || !editor) return [];
  const range = sel.getRangeAt(0);
  return Array.from(editor.querySelectorAll("li")).filter((li) => {
    try {
      return (
        range.intersectsNode(li) ||
        li.contains(range.startContainer) ||
        li.contains(range.endContainer)
      );
    } catch (e) {
      return false;
    }
  });
}

function unwrapListItemsToParagraphs(selectedLIs) {
  const parentLists = Array.from(
    new Set(selectedLIs.map((li) => li.parentNode).filter(Boolean)),
  );
  const createdParagraphs = [];

  parentLists.forEach((parentList) => {
    if (!parentList || !parentList.parentNode) return;

    const fragment = document.createDocumentFragment();
    let currentSubList = null;

    Array.from(parentList.children).forEach((childLi) => {
      if (selectedLIs.includes(childLi)) {
        currentSubList = null;
        const p = document.createElement("p");
        childLi.classList.remove(CHECKLIST_CHECKED_CLASS);
        childLi.removeAttribute("data-checked");
        while (childLi.firstChild) {
          p.appendChild(childLi.firstChild);
        }
        if (!p.firstChild) {
          p.appendChild(document.createElement("br"));
        }
        fragment.appendChild(p);
        createdParagraphs.push(p);
      } else {
        if (!currentSubList) {
          currentSubList = document.createElement(
            parentList.tagName.toLowerCase(),
          );
          if (isChecklistList(parentList)) {
            currentSubList.className = CHECKLIST_CLASS;
          }
          fragment.appendChild(currentSubList);
        }
        currentSubList.appendChild(childLi);
      }
    });

    parentList.parentNode.replaceChild(fragment, parentList);
  });

  return createdParagraphs;
}

export function toggleChecklist(editor) {
  if (!editor) return;

  editor.focus();
  let selectedLIs = getSelectedListItems(editor);

  if (selectedLIs.length === 0) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const li = sel.getRangeAt(0).startContainer;
      let curr = li;
      while (curr && curr !== editor) {
        if (curr.nodeType === 1 && curr.tagName === "LI") {
          selectedLIs = [curr];
          break;
        }
        curr = curr.parentNode;
      }
    }
  }

  if (selectedLIs.length > 0) {
    const checklistLIs = selectedLIs.filter((item) =>
      isChecklistList(item.parentNode),
    );

    if (checklistLIs.length === selectedLIs.length) {
      const createdParagraphs = unwrapListItemsToParagraphs(selectedLIs);
      const sel = window.getSelection();
      if (sel && createdParagraphs.length > 0) {
        const newRange = document.createRange();
        newRange.setStart(createdParagraphs[0], 0);
        const lastP = createdParagraphs[createdParagraphs.length - 1];
        newRange.setEnd(lastP, lastP.childNodes.length);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
      return;
    }

    const parentLists = Array.from(
      new Set(selectedLIs.map((item) => item.parentNode).filter(Boolean)),
    );

    parentLists.forEach((parentList) => {
      convertListToChecklist(parentList);
    });
    return;
  }

  insertChecklistAtCursor(editor);
}

function convertListToChecklist(parentList) {
  if (!parentList || !parentList.parentNode) return;

  if (parentList.tagName === "UL") {
    parentList.classList.add(CHECKLIST_CLASS);
    return;
  }

  const ul = document.createElement("ul");
  ul.className = CHECKLIST_CLASS;
  while (parentList.firstChild) {
    ul.appendChild(parentList.firstChild);
  }
  parentList.parentNode.replaceChild(ul, parentList);
}

function getClosestBlock(node, editor) {
  let curr = node;
  if (curr && curr.nodeType === Node.TEXT_NODE) {
    curr = curr.parentNode;
  }
  while (curr && curr !== editor) {
    if (
      curr.nodeType === 1 &&
      /^(P|DIV|H[1-6]|BLOCKQUOTE|PRE)$/i.test(curr.nodeName)
    ) {
      return curr;
    }
    curr = curr.parentNode;
  }
  return null;
}

function placeCaretIn(element) {
  if (!element) return;
  const sel = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

function createChecklistList(items = []) {
  const ul = document.createElement("ul");
  ul.className = CHECKLIST_CLASS;

  if (items.length === 0) {
    const li = document.createElement("li");
    li.appendChild(document.createElement("br"));
    ul.appendChild(li);
    return ul;
  }

  items.forEach((block) => {
    const li = document.createElement("li");
    while (block.firstChild) {
      li.appendChild(block.firstChild);
    }
    if (!li.firstChild) {
      li.appendChild(document.createElement("br"));
    }
    ul.appendChild(li);
  });

  return ul;
}

function insertChecklistAtCursor(editor) {
  const sel = window.getSelection();
  const blocks = [];

  if (sel && sel.rangeCount) {
    const range = sel.getRangeAt(0);
    const startBlock = getClosestBlock(range.startContainer, editor);

    if (range.collapsed) {
      if (startBlock && editor.contains(startBlock)) {
        blocks.push(startBlock);
      }
    } else {
      Array.from(
        editor.querySelectorAll("p, div, h1, h2, h3, h4, h5, h6, blockquote, pre"),
      ).forEach((el) => {
        try {
          if (range.intersectsNode(el) && !el.closest("li, table")) {
            blocks.push(el);
          }
        } catch (e) {
          // ignore invalid range intersections
        }
      });
    }
  }

  const uniqueBlocks = blocks.filter(
    (block, index) =>
      blocks.indexOf(block) === index &&
      !blocks.some((other) => other !== block && other.contains(block)),
  );

  const ul = createChecklistList(uniqueBlocks);

  if (uniqueBlocks.length > 0) {
    const first = uniqueBlocks[0];
    first.parentNode.insertBefore(ul, first);
    uniqueBlocks.forEach((block) => {
      if (block.parentNode) {
        block.parentNode.removeChild(block);
      }
    });
  } else if (
    editor.childNodes.length === 0 ||
    (editor.childNodes.length === 1 &&
      editor.firstChild.nodeType === 1 &&
      editor.firstChild.tagName === "BR")
  ) {
    editor.innerHTML = "";
    editor.appendChild(ul);
  } else {
    editor.appendChild(ul);
  }

  const firstItem = ul.querySelector("li");
  placeCaretIn(firstItem);
}

export function toggleChecklistItem(li) {
  if (!li || li.tagName !== "LI") return;
  const isChecked = li.classList.toggle(CHECKLIST_CHECKED_CLASS);
  if (isChecked) {
    li.setAttribute("data-checked", "true");
  } else {
    li.removeAttribute("data-checked");
  }
}

export function isClickOnChecklistBox(event, li) {
  if (!li || !event) return false;
  const rect = li.getBoundingClientRect();
  return event.clientX - rect.left <= 28;
}

export function isSelectionInChecklist(editor) {
  if (!editor) return false;
  const sel = window.getSelection();
  if (!sel || !sel.anchorNode || !editor.contains(sel.anchorNode)) {
    return false;
  }
  return Boolean(findParentChecklist(sel.anchorNode, editor));
}
