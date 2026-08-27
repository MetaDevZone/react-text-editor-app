/**
 * Comprehensive Find & Replace engine for ReactEditorKit
 * Non-destructive highlighting and replacing across all DOM elements including tables, headers, and formatted text.
 */

export const escapeRegex = (str) => {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

/**
 * Removes all temporary search highlight mark tags from editorRoot
 */
export const removeSearchHighlights = (editorRoot) => {
  if (!editorRoot) return;

  const marks = editorRoot.querySelectorAll("mark.mlx-find-highlight, mark.mlx-find-current");
  marks.forEach((mark) => {
    const parent = mark.parentNode;
    if (parent) {
      while (mark.firstChild) {
        parent.insertBefore(mark.firstChild, mark);
      }
      parent.removeChild(mark);
      parent.normalize();
    }
  });
};

/**
 * Highlights all occurrences of query in editorRoot and returns an array of mark elements
 */
export const highlightAllOccurrences = (editorRoot, searchQuery, options = {}) => {
  if (!editorRoot) return [];

  // Always clear previous highlights first
  removeSearchHighlights(editorRoot);

  if (!searchQuery || !searchQuery.trim()) return [];

  const { matchCase = false, wholeWord = false } = options;

  let flags = "g";
  if (!matchCase) flags += "i";

  const escaped = escapeRegex(searchQuery);
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
  let regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    return [];
  }

  // Collect all text nodes that match (avoid modifying DOM during walker traversal)
  const walker = document.createTreeWalker(
    editorRoot,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (!node.nodeValue || !node.nodeValue.trim()) {
          return NodeFilter.FILTER_REJECT;
        }
        const parentTag = node.parentNode?.tagName;
        if (
          parentTag === "SCRIPT" ||
          parentTag === "STYLE" ||
          node.parentNode?.classList?.contains("no-search")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
    false
  );

  const textNodes = [];
  let curr;
  while ((curr = walker.nextNode())) {
    regex.lastIndex = 0;
    if (regex.test(curr.nodeValue)) {
      textNodes.push(curr);
    }
  }

  const markElements = [];

  // Wrap matching parts in <mark>
  textNodes.forEach((node) => {
    const text = node.nodeValue;
    const parent = node.parentNode;
    if (!parent) return;

    regex.lastIndex = 0;
    let match;
    let lastIndex = 0;
    const fragment = document.createDocumentFragment();

    while ((match = regex.exec(text)) !== null) {
      // Text before match
      if (match.index > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, match.index))
        );
      }

      // The match itself wrapped in mark
      const mark = document.createElement("mark");
      mark.className = "mlx-find-highlight";
      mark.textContent = match[0];
      fragment.appendChild(mark);
      markElements.push(mark);

      lastIndex = regex.lastIndex;

      if (regex.lastIndex === match.index) {
        regex.lastIndex++;
      }
    }

    // Remaining text after last match
    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    parent.replaceChild(fragment, node);
  });

  return markElements;
};

/**
 * Sets the active current match, highlights it with active style, and scrolls it into view
 */
export const setActiveMatch = (markElements, activeIndex) => {
  if (!markElements || markElements.length === 0) return;

  markElements.forEach((mark, idx) => {
    if (idx === activeIndex) {
      mark.className = "mlx-find-highlight mlx-find-current";
      try {
        mark.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      } catch (e) {}
    } else {
      mark.className = "mlx-find-highlight";
    }
  });
};

/**
 * Replaces a single active mark element with replacement text
 */
export const replaceActiveMark = (markElement, replaceText = "", onInput) => {
  if (!markElement || !markElement.parentNode) return false;

  const parent = markElement.parentNode;
  const replacementNode = document.createTextNode(replaceText);
  parent.replaceChild(replacementNode, markElement);
  parent.normalize();

  if (onInput) {
    onInput();
  }

  return true;
};

/**
 * Replaces all occurrences in the entire editor (including tables and formatted text)
 */
export const replaceAllInEditor = (
  editorRoot,
  searchQuery,
  replaceText = "",
  options = {},
  onInput
) => {
  if (!editorRoot || !searchQuery) return 0;

  // Clear any existing highlight marks first so DOM has pure text nodes
  removeSearchHighlights(editorRoot);

  const { matchCase = false, wholeWord = false } = options;

  let flags = "g";
  if (!matchCase) flags += "i";

  const escaped = escapeRegex(searchQuery);
  const pattern = wholeWord ? `\\b${escaped}\\b` : escaped;
  let regex;
  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    return 0;
  }

  const walker = document.createTreeWalker(
    editorRoot,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        const parentTag = node.parentNode?.tagName;
        if (
          parentTag === "SCRIPT" ||
          parentTag === "STYLE" ||
          node.parentNode?.classList?.contains("no-search")
        ) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      },
    },
    false
  );

  const textNodes = [];
  let curr;
  while ((curr = walker.nextNode())) {
    textNodes.push(curr);
  }

  let totalReplacements = 0;

  textNodes.forEach((node) => {
    const originalText = node.nodeValue || "";
    regex.lastIndex = 0;
    const matches = originalText.match(regex);
    if (matches && matches.length > 0) {
      totalReplacements += matches.length;
      node.nodeValue = originalText.replace(regex, replaceText);
    }
  });

  if (totalReplacements > 0 && onInput) {
    onInput();
  }

  return totalReplacements;
};
