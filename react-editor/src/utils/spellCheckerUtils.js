/**
 * High-Performance Client-Side Spell Checker & Suggestion Engine for ReactEditorKit
 * Non-destructive highlighting, Levenshtein distance candidate ranking, user dictionary, and table compatibility.
 */

// Common English words dictionary (high frequency + standard vocabulary)
import { COMMON_DICTIONARY_WORDS } from "./dictionaryWords.js";

const USER_DICT_STORAGE_KEY = "mlx_editor_user_dictionary";

class SpellCheckerEngine {
  constructor() {
    this.dictionary = new Set();
    this.userDictionary = new Set();
    this.sessionIgnored = new Set();
    this.initialized = false;
    this.init();
  }

  init() {
    if (this.initialized) return;

    // Load common words
    COMMON_DICTIONARY_WORDS.forEach((word) => {
      this.dictionary.add(word.toLowerCase());
    });

    // Load user dictionary from localStorage
    try {
      const stored = localStorage.getItem(USER_DICT_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          parsed.forEach((w) => this.userDictionary.add(w.toLowerCase()));
        }
      }
    } catch (e) {
      console.warn("Could not load user dictionary:", e);
    }

    this.initialized = true;
  }

  /**
   * Check if a word is correctly spelled
   */
  isCorrect(word) {
    if (!word) return true;
    const cleanWord = word.toLowerCase().trim();

    // Ignore numbers, single characters, punctuation, codes, urls
    if (cleanWord.length <= 1) return true;
    if (/^\d+$/.test(cleanWord)) return true;
    if (/^[\d,.$%#@!&*+=/\\_-]+$/.test(cleanWord)) return true;
    if (cleanWord.startsWith("http") || cleanWord.includes(".com") || cleanWord.includes("@")) return true;

    // Common valid 2-letter English words & acronyms
    const twoLetterWords = new Set([
      "am", "an", "as", "at", "be", "by", "do", "go", "he", "if", "in",
      "is", "it", "me", "my", "no", "of", "on", "or", "so", "to", "up",
      "us", "we", "ok", "tv", "id", "pc", "pm", "ad", "ex", "hi", "vs"
    ]);
    if (cleanWord.length === 2 && twoLetterWords.has(cleanWord)) return true;

    // Check session ignored
    if (this.sessionIgnored.has(cleanWord)) return true;

    // Check user dictionary
    if (this.userDictionary.has(cleanWord)) return true;

    // Check main dictionary
    if (this.dictionary.has(cleanWord)) return true;

    // Check common suffix & inflection rules
    // 1. -s (e.g. tables -> table)
    if (cleanWord.endsWith("s") && this.dictionary.has(cleanWord.slice(0, -1))) return true;
    // 2. -es (e.g. boxes -> box, matches -> match)
    if (cleanWord.endsWith("es") && (this.dictionary.has(cleanWord.slice(0, -2)) || this.dictionary.has(cleanWord.slice(0, -1)))) return true;
    // 3. -ies -> -y (e.g. capabilities -> capability, activities -> activity, companies -> company)
    if (cleanWord.endsWith("ies") && this.dictionary.has(cleanWord.slice(0, -3) + "y")) return true;
    // 4. -ed (e.g. created -> create, loaded -> load)
    if (cleanWord.endsWith("ed") && (this.dictionary.has(cleanWord.slice(0, -2)) || this.dictionary.has(cleanWord.slice(0, -1)))) return true;
    // 5. -ing (e.g. editing -> edit, running -> run, making -> make)
    if (cleanWord.endsWith("ing")) {
      const base = cleanWord.slice(0, -3);
      if (this.dictionary.has(base) || this.dictionary.has(base + "e")) return true;
      if (base.length > 2 && base[base.length - 1] === base[base.length - 2] && this.dictionary.has(base.slice(0, -1))) return true;
    }
    // 6. -ly / -ily (e.g. quickly -> quick, easily -> easy)
    if (cleanWord.endsWith("ly") && (this.dictionary.has(cleanWord.slice(0, -2)) || this.dictionary.has(cleanWord.slice(0, -2) + "e"))) return true;
    if (cleanWord.endsWith("ily") && this.dictionary.has(cleanWord.slice(0, -3) + "y")) return true;
    // 7. -able / -ability / -abilities / -ible / -ibility / -ibilities
    if (cleanWord.endsWith("abilities") && (this.dictionary.has(cleanWord.slice(0, -9) + "able") || this.dictionary.has(cleanWord.slice(0, -9) + "e") || this.dictionary.has(cleanWord.slice(0, -9)))) return true;
    if (cleanWord.endsWith("ability") && (this.dictionary.has(cleanWord.slice(0, -7) + "able") || this.dictionary.has(cleanWord.slice(0, -7) + "e") || this.dictionary.has(cleanWord.slice(0, -7)))) return true;
    if (cleanWord.endsWith("ibilities") && (this.dictionary.has(cleanWord.slice(0, -9) + "ible") || this.dictionary.has(cleanWord.slice(0, -9) + "able") || this.dictionary.has(cleanWord.slice(0, -9)))) return true;
    if (cleanWord.endsWith("ibility") && (this.dictionary.has(cleanWord.slice(0, -7) + "ible") || this.dictionary.has(cleanWord.slice(0, -7) + "able") || this.dictionary.has(cleanWord.slice(0, -7)))) return true;
    if (cleanWord.endsWith("able") && (this.dictionary.has(cleanWord.slice(0, -4)) || this.dictionary.has(cleanWord.slice(0, -4) + "e"))) return true;
    if (cleanWord.endsWith("ible") && (this.dictionary.has(cleanWord.slice(0, -4)) || this.dictionary.has(cleanWord.slice(0, -4) + "e"))) return true;
    // 8. -ize / -ization / -ized / -izing (e.g. optimize, optimization)
    if (cleanWord.endsWith("ization") && (this.dictionary.has(cleanWord.slice(0, -7) + "ize") || this.dictionary.has(cleanWord.slice(0, -7) + "e") || this.dictionary.has(cleanWord.slice(0, -7)))) return true;
    if (cleanWord.endsWith("izations") && (this.dictionary.has(cleanWord.slice(0, -8) + "ize") || this.dictionary.has(cleanWord.slice(0, -8) + "e") || this.dictionary.has(cleanWord.slice(0, -8)))) return true;
    if (cleanWord.endsWith("ize") && (this.dictionary.has(cleanWord.slice(0, -3)) || this.dictionary.has(cleanWord.slice(0, -3) + "e"))) return true;
    if (cleanWord.endsWith("ized") && (this.dictionary.has(cleanWord.slice(0, -4) + "ize") || this.dictionary.has(cleanWord.slice(0, -4)))) return true;
    if (cleanWord.endsWith("izing") && (this.dictionary.has(cleanWord.slice(0, -5) + "ize") || this.dictionary.has(cleanWord.slice(0, -5)))) return true;
    // 9. -ment / -ments
    if (cleanWord.endsWith("ment") && this.dictionary.has(cleanWord.slice(0, -4))) return true;
    if (cleanWord.endsWith("ments") && this.dictionary.has(cleanWord.slice(0, -5))) return true;
    // 10. -ness
    if (cleanWord.endsWith("ness") && (this.dictionary.has(cleanWord.slice(0, -4)) || this.dictionary.has(cleanWord.slice(0, -5) + "y"))) return true;
    // 11. -tion / -tions / -sion / -sions
    if (cleanWord.endsWith("tion") && (this.dictionary.has(cleanWord.slice(0, -4) + "te") || this.dictionary.has(cleanWord.slice(0, -4) + "t") || this.dictionary.has(cleanWord.slice(0, -3)))) return true;
    if (cleanWord.endsWith("tions") && (this.dictionary.has(cleanWord.slice(0, -5) + "te") || this.dictionary.has(cleanWord.slice(0, -5) + "t") || this.dictionary.has(cleanWord.slice(0, -4)))) return true;
    // 12. -er / -ers / -est
    if (cleanWord.endsWith("er") && (this.dictionary.has(cleanWord.slice(0, -2)) || this.dictionary.has(cleanWord.slice(0, -1)))) return true;
    if (cleanWord.endsWith("ers") && (this.dictionary.has(cleanWord.slice(0, -3)) || this.dictionary.has(cleanWord.slice(0, -2)))) return true;
    if (cleanWord.endsWith("est") && (this.dictionary.has(cleanWord.slice(0, -3)) || this.dictionary.has(cleanWord.slice(0, -2)))) return true;

    // 12. Common prefixes: un-, re-, in-, im-, dis-, non-, pre-, post-, sub-, over-, under-, multi-, auto-
    const prefixes = ["un", "re", "in", "im", "dis", "non", "pre", "post", "sub", "over", "under", "multi", "auto", "co", "anti"];
    for (const p of prefixes) {
      if (cleanWord.startsWith(p) && cleanWord.length > p.length + 2) {
        const root = cleanWord.slice(p.length);
        if (this.dictionary.has(root)) return true;
      }
    }

    return false;
  }

  /**
   * Add a word to user custom dictionary
   */
  addToDictionary(word) {
    if (!word) return;
    const cleanWord = word.toLowerCase().trim();
    this.userDictionary.add(cleanWord);
    try {
      localStorage.setItem(
        USER_DICT_STORAGE_KEY,
        JSON.stringify(Array.from(this.userDictionary))
      );
    } catch (e) {
      console.warn("Could not save to user dictionary:", e);
    }
  }

  /**
   * Ignore a word for this session
   */
  ignoreWord(word) {
    if (!word) return;
    this.sessionIgnored.add(word.toLowerCase().trim());
  }

  /**
   * Calculate Levenshtein edit distance between two strings
   */
  levenshteinDistance(a, b) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }
    return matrix[b.length][a.length];
  }

  /**
   * Generate top suggestions for a misspelled word
   */
  getSuggestions(word, maxSuggestions = 5) {
    if (!word) return [];
    const cleanWord = word.toLowerCase().trim();
    const candidates = [];

    // Pre-filter words with similar length and starting letters
    const firstChar = cleanWord.charAt(0);
    const targetLen = cleanWord.length;

    for (const dictWord of this.dictionary) {
      // Length heuristic (allow distance up to 2-3)
      if (Math.abs(dictWord.length - targetLen) > 2) continue;

      const dist = this.levenshteinDistance(cleanWord, dictWord);

      // Maximum acceptable distance based on word length
      const maxDist = targetLen <= 4 ? 1 : targetLen <= 8 ? 2 : 3;

      if (dist <= maxDist) {
        // Boost score if starting letter matches
        let score = dist;
        if (dictWord.charAt(0) !== firstChar) {
          score += 0.5;
        }
        candidates.push({ word: dictWord, score });
      }
    }

    // Sort by best score (lowest distance first)
    candidates.sort((a, b) => a.score - b.score);

    // Format matches to match original casing (Capitalized or lowercase)
    const isCapitalized =
      word.charAt(0) === word.charAt(0).toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase();
    const isAllUpper = word.length > 1 && word === word.toUpperCase();

    return candidates.slice(0, maxSuggestions).map((item) => {
      let res = item.word;
      if (isAllUpper) {
        res = res.toUpperCase();
      } else if (isCapitalized) {
        res = res.charAt(0).toUpperCase() + res.slice(1);
      }
      return res;
    });
  }
}

export const spellChecker = new SpellCheckerEngine();

/**
 * Clean all temporary spellcheck marker spans from editorRoot
 */
export const removeSpellCheckMarkers = (editorRoot) => {
  if (!editorRoot) return;
  const markers = editorRoot.querySelectorAll("span.mlx-spell-error");
  markers.forEach((span) => {
    const parent = span.parentNode;
    if (parent) {
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
      parent.normalize();
    }
  });
};

/**
 * Scan editorRoot text nodes (including all table cells, headings, paragraphs)
 * and highlight misspelled words with non-destructive markers.
 */
export const runSpellCheckOnEditor = (editorRoot) => {
  if (!editorRoot) return [];

  // Remove previous markers first to keep pure text nodes
  removeSpellCheckMarkers(editorRoot);

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
          parentTag === "CODE" ||
          parentTag === "PRE" ||
          node.parentNode?.classList?.contains("no-spellcheck") ||
          node.parentNode?.classList?.contains("mlx-find-highlight")
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

  const wordRegex = /\b[A-Za-z]+(?:'[A-Za-z]+)?\b/g;
  const errorElements = [];

  textNodes.forEach((node) => {
    const text = node.nodeValue;
    const parent = node.parentNode;
    if (!parent) return;

    let hasMisspelling = false;
    let match;
    wordRegex.lastIndex = 0;

    const wordMatches = [];
    while ((match = wordRegex.exec(text)) !== null) {
      const word = match[0];
      if (!spellChecker.isCorrect(word)) {
        hasMisspelling = true;
        wordMatches.push({
          word,
          start: match.index,
          end: match.index + word.length,
        });
      }
    }

    if (!hasMisspelling) return;

    // Fragment rebuilding
    const fragment = document.createDocumentFragment();
    let lastIndex = 0;

    wordMatches.forEach((m) => {
      if (m.start > lastIndex) {
        fragment.appendChild(
          document.createTextNode(text.substring(lastIndex, m.start))
        );
      }

      const span = document.createElement("span");
      span.className = "mlx-spell-error";
      span.setAttribute("data-spell-word", m.word);
      span.textContent = m.word;
      fragment.appendChild(span);
      errorElements.push(span);

      lastIndex = m.end;
    });

    if (lastIndex < text.length) {
      fragment.appendChild(document.createTextNode(text.substring(lastIndex)));
    }

    parent.replaceChild(fragment, node);
  });

  return errorElements;
};

/**
 * Replace a misspelled word span with a chosen correction
 */
export const replaceSpellWord = (spanElement, replacementWord, onInput) => {
  if (!spanElement || !spanElement.parentNode) return false;

  const parent = spanElement.parentNode;
  const textNode = document.createTextNode(replacementWord);
  parent.replaceChild(textNode, spanElement);
  parent.normalize();

  if (onInput) {
    onInput();
  }
  return true;
};
