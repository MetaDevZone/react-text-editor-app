# ✨ React Editor Kit (`react-text-editor-app`)

<p align="center">
  <strong>A modern, ultra-fast, SaaS-grade rich text editor built natively in React.</strong><br>
  <em>Engineered for seamless state management, advanced isolated table operations, non-blocking find/replace, and in-memory offline spell checking.</em>
</p>

---

## 🌟 Top 3 Standout Super-Features

### 1. 📊 Next-Gen Advanced Table Suite

> **Complete Layout Freedom**: Hover above any table to trigger instant row/column actions without losing text selection!

```
┌─────────────────────────────────────────────────────────────┐
│ 📑 Duplicate Row  │  🗑️ Delete Row  │  ➕ Insert Column   │  ⚙️ Table Props
└─────────────────────────────────────────────────────────────┘
```

- **Visual 10x10 Table Creator**: Hover & click grid picker.
- **Dynamic Quick-Action Bar**: Floating toolbar above active tables for instant edits.
- **Granular Cell Controls**: Cell merging, splitting, custom background colors, and border widths.
- **Isolated Typing Engine**: Text editing in one cell never affects adjacent rows or column widths.
- **Keyboard Navigation**: Press <kbd>Tab</kbd> to effortlessly glide between table cells.

---

### 2. 🔍 Floating & Draggable Find & Replace

> **Zero Obstruction**: Floats gracefully in the top-right corner or can be dragged anywhere on your canvas.

- **Multi-Element Search**: Deep scans headings, paragraphs, lists, and nested table cells simultaneously.
- **Smart Toggle Switches**:
  - `Aa` **Match Case** (Case-sensitive regex)
  - `\b` **Match Whole Word** (Exact word boundary)
- **Live Match Counter**: Real-time counter badge (e.g. `3 of 12 matches`).
- **Interactive Navigation**: Step through matches forward (<kbd>Enter</kbd>) and backward (<kbd>Shift+Enter</kbd>).
- **Single & Batch Replace**: Instant active match replacement or 1-click `Replace All`.

---

### 3. ✍️ Offline In-Memory Spell Checker & Suggestions

> **Zero API Latency & 100% Privacy**: Operates entirely client-side with a comprehensive 50,000+ word standard English dataset and grammatical morphology rules.

- **Grammar & Morphology Engine**: Automatically recognizes plural inflections (`-ies ➔ -y` like _capabilities_, _activities_), tenses (`-ed`, `-ing`), adverbs (`-ly`), and prefixes (`un-`, `re-`, `multi-`).
- **Sleek Error Highlighting**: Subtly highlights typos with non-destructive red wavy underlines (`span.mlx-spell-error`).
- **Smart Suggestion Popover**: Click any misspelled word to open ranked alternatives powered by Levenshtein distance.
- **➕ Custom Dictionary**: Save proprietary brand names and terms directly to persistent `localStorage`.
- **🧼 100% Clean HTML Output**: All temporary highlight markers are automatically stripped before triggering `onChange`.

---

## 🛠️ Complete Feature Matrix

```
╭──────────────────────────────────────────────────────────────────────────────╮
│  🎨 Typography     Font Family, Font Size (px/pt), Line Height, Text Color  │
│  🖋️ Formats        Bold, Italic, Underline, Strike, Super/Subscript, Clear   │
│  📑 Blocks         H1–H6, Blockquote, Preformatted Code Block, Divider (HR) │
│  🔢 Lists          Ordered (1, a, i), Unordered (Disc, Circle), Indentations │
│  🖼️ Media          Image Upload, URL Embed, Crop Tool, 8-Point Live Resize  │
│  🔗 Links          Hyperlink Modal with Target Blank & Secure Rel Noopener  │
│  💻 Developer      Live HTML Source Code Mode with Bidirectional Sync       │
│  🖥️ Canvas         Fullscreen Focus Canvas & Paper Print Formatted Layout   │
│  🖱️ Context Menu   Pixel-Perfect Right-Click Menu at Exact Mouse Position   │
╰──────────────────────────────────────────────────────────────────────────────╯
```

---

## 🚀 Quick Start in 60 Seconds

### 1. Installation

```bash
npm install
npm start
```

### 2. Implementation Example

```jsx
import React, { useState } from "react";
import ReactEditorKit from "./ReactEditorKit";

export default function App() {
  const [content, setContent] = useState(
    "<h2>Hello React Editor Kit!</h2><p>Start writing...</p>",
  );

  return (
    <div style={{ maxWidth: "960px", margin: "40px auto", padding: "0 20px" }}>
      <ReactEditorKit
        value={content}
        onChange={(cleanHtml) => setContent(cleanHtml)}
        placeholder="Type your story here..."
        height="500px"
      />
    </div>
  );
}
```

---

## ⚙️ Component Props & Configuration

| Prop Name     |    Type    |            Default            | Description                                      |
| :------------ | :--------: | :---------------------------: | :----------------------------------------------- |
| `value`       |  `string`  |             `""`              | Controlled HTML content string.                  |
| `onChange`    | `function` |          `undefined`          | Callback returning purified, clean HTML.         |
| `placeholder` |  `string`  | `"Please Write Something..."` | Placeholder text when editor canvas is empty.    |
| `height`      |  `string`  |           `"400px"`           | Canvas height (supports `px`, `vh`, `rem`, `%`). |
| `isDisable`   | `boolean`  |            `false`            | Read-only mode disabling toolbar interactions.   |
| `apiKey`      |  `string`  |             `""`              | Optional license/API configuration key.          |
| `mainProps`   |  `object`  |             `{}`              | Custom styling and HTML attributes for wrapper.  |

---

## ⌨️ Keyboard Shortcuts Cheat Sheet

| Shortcut                                         | Action                       |
| :----------------------------------------------- | :--------------------------- |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd>  | Toggle Bold text             |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>I</kbd>  | Toggle Italic text           |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>U</kbd>  | Toggle Underline             |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>F</kbd>  | Open Find & Replace Widget   |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd>  | Undo last action             |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Y</kbd>  | Redo last action             |
| <kbd>Tab</kbd> / <kbd>Shift</kbd>+<kbd>Tab</kbd> | Navigate between Table cells |

---

## 📄 License

Released under the **MIT License**. Free for commercial and open-source applications.
