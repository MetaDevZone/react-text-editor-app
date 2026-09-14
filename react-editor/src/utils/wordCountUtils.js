const BLOCK_TAGS = /^(P|DIV|LI|H[1-6]|TR|BR|BLOCKQUOTE|PRE|HR|FIGCAPTION|DT|DD|TH|TD)$/i;
const SKIP_WHITESPACE_PARENTS = /^(UL|OL|TABLE|THEAD|TBODY|TFOOT|TR)$/i;

function extractCountableText(root) {
  const parts = [];

  const walk = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const value = (node.nodeValue || "").replace(/[\u200B\uFEFF]/g, "");
      const parent = node.parentElement;
      if (
        parent &&
        SKIP_WHITESPACE_PARENTS.test(parent.nodeName) &&
        /^\s*$/.test(value)
      ) {
        return;
      }
      parts.push(value);
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.nodeName;
    if (tag === "SCRIPT" || tag === "STYLE") return;

    if (tag === "BR") {
      parts.push("\n");
      return;
    }

    for (const child of node.childNodes) {
      walk(child);
    }

    if (BLOCK_TAGS.test(tag)) {
      parts.push("\n");
    }
  };

  walk(root);
  return parts.join("").replace(/\u00A0/g, " ");
}

export function getWordAndCharCount(html) {
  if (!html || typeof html !== "string") {
    return { words: 0, chars: 0 };
  }

  const temp = document.createElement("div");
  temp.innerHTML = html;
  const extracted = extractCountableText(temp);

  const wordSource = extracted.replace(/\s+/g, " ").trim();
  const words = wordSource ? wordSource.split(" ").filter(Boolean).length : 0;

  // Count only characters the user typed. List/checklist items are
  // separate blocks, so we do not invent extra spaces between them.
  const chars = extracted.replace(/[\n\r]/g, "").length;

  return { words, chars };
}
