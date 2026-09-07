# ✨ React Editor Kit (`react-text-editor-kit`)

<p align="center">
  <img src="https://raw.githubusercontent.com/talha-dev/assets/main/react-editor-kit-banner.png" alt="React Editor Kit Banner" width="100%" onerror="this.style.display='none'" />
</p>

<p align="center">
  <strong>A modern, enterprise-grade, ultra-fast Rich Text WYSIWYG Editor built natively for React.</strong><br>
  <em>Engineered with an isolated typing table engine, floating find & replace widget, offline in-memory spell checker, image cropping & live 8-point resizing, XSS-safe sandboxed rendering, and full theme customization.</em>
</p>

---

## 📖 Table of Contents

- [✨ Key Highlights & Super-Features](#-key-highlights--super-features)
  - [1. 📊 Advanced Isolated Table Suite](#1--advanced-isolated-table-suite)
  - [2. 🔍 Floating & Draggable Find & Replace](#2--floating--draggable-find--replace)
  - [3. ✍️ Offline In-Memory Spell Checker & Suggestions](#3-️-offline-in-memory-spell-checker--suggestions)
  - [4. 🖼️ Media Management, Image Cropping & 8-Point Resizing](#4-️-media-management-image-cropping--8-point-resizing)
  - [5. 🛡️ Built-in Security & Safe Sandboxed Renderer](#5-️-built-in-security--safe-sandboxed-renderer)
  - [6. 🖱️ Context Menu (Right-Click Suite)](#6-️-context-menu-right-click-suite)
- [📦 Installation](#-installation)
- [🚀 Quick Start Guide](#-quick-start-guide)
- [⚙️ Props & Configuration Reference](#️-props--configuration-reference)
- [🎨 Custom Theming & Dark Mode](#-custom-theming--dark-mode)
- [🎛️ Toolbar & Navbar Customization](#️-toolbar--navbar-customization)
  - [Default Toolbar Items](#default-toolbar-items)
  - [Default Navbar Items](#default-navbar-items)
  - [Excluding Tools](#excluding-tools)
- [☁️ Custom Cloud Image Upload Handler (`image_handler`)](#️-custom-cloud-image-upload-handler-image_handler)
- [🛡️ Safe Content Rendering (`SafeSandboxedRenderer`)](#️-safe-content-rendering-safesandboxedrenderer)
- [⚡ Remote Backend Functions Integration (`useBackendFunctions`)](#-remote-backend-functions-integration-usebackendfunctions)
- [⌨️ Keyboard Shortcuts](#️-keyboard-shortcuts)
- [🧼 Clean HTML Output Guarantee](#-clean-html-output-guarantee)
- [📄 License](#-license)

---

## ✨ Key Highlights & Super-Features

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                   REACT EDITOR KIT                                     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  ⚡ Zero Lag Typing    │  📊 Next-Gen Tables      │  🔍 Draggable Find & Replace       │
│  ✍️ Offline Spellcheck │  🖼️ Live Image Cropper   │  🛡️ XSS Script Sanitizer          │
│  🎨 Dynamic Theming   │  🎛️ Modular Toolbars     │  🖱️ Precision Right-Click Menu     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

### 1. 📊 Advanced Isolated Table Suite

Edit complex tables intuitively without messing up layout or adjacent cells.

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ 📑 Duplicate Row  │  🗑️ Delete Row  │  ➕ Insert Column   │  ⚙️ Table Props           │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

- **Visual 10x10 Table Grid Picker**: Hover and click to instantly insert tables of any dimension.
- **Dynamic Quick-Action Bar**: Floating toolbar above active tables for instant one-click modifications.
- **Precision Table Operations**:
  - Insert row above / below, duplicate row, delete row.
  - Insert column before / after, duplicate column, delete column.
  - Granular cell merging (`colspan`) and cell splitting.
- **Custom Cell & Table Properties**: Customize cell background colors, borders, paddings, alignments, widths, and heights via dedicated modal dialogs.
- **Isolated Typing Engine**: Cell contents maintain isolated line wraps without shifting adjacent cell proportions.
- **Keyboard Gliding**: Seamlessly navigate between table cells using <kbd>Tab</kbd> and <kbd>Shift</kbd> + <kbd>Tab</kbd>. Pressing <kbd>Tab</kbd> in the last cell automatically creates and moves to a fresh new row!

---

### 2. 🔍 Floating & Draggable Find & Replace

A zero-obstruction find and replace utility designed for frictionless editing in long documents.

- **Floating & Draggable Canvas**: Floats smoothly on the canvas and can be dragged anywhere so your content remains 100% visible.
- **Multi-Element Search**: Deep scans paragraphs, headings (H1–H6), blockquotes, lists, and nested table cells.
- **Smart Search Options**:
  - `Aa` **Match Case**: Case-sensitive search.
  - `\b` **Match Whole Word**: Word-boundary regex matching.
- **Real-Time Match Counter**: Live match badge (e.g. `4 of 18 matches`).
- **Interactive Navigation**: Step through matches forward (<kbd>Enter</kbd> / Next) and backward (<kbd>Shift</kbd>+<kbd>Enter</kbd> / Prev).
- **Single & Batch Replace**: Instant active match replacement or 1-click **Replace All**.

---

### 3. ✍️ Offline In-Memory Spell Checker & Suggestions

Operates 100% client-side with zero network requests, zero API latency, and complete privacy.

- **50,000+ Word In-Memory Dictionary**: High-performance Trie / hash-set dictionary for instantaneous lookups.
- **Morphology & Grammar Engine**: Intelligently handles plurals (`-ies ➔ -y`, `-es`), past tense (`-ed`), continuous tense (`-ing`), adverbs (`-ly`), and common prefixes (`un-`, `re-`, `multi-`, `pre-`).
- **Typo Highlighting**: Non-destructive red wavy underlines (`span.mlx-spell-error`).
- **Ranked Suggestion Popover**: Click any misspelled word to inspect suggestions ranked by Levenshtein edit distance.
- **➕ Custom User Dictionary**: Add proprietary terms, product names, or acronyms directly to `localStorage`.
- **🧼 100% Clean Output**: All spell check markers are automatically stripped before triggering `onChange`.

---

### 4. 🖼️ Media Management, Image Cropping & 8-Point Resizing

- **Multi-Source Images**: Support for direct image file uploads or remote image URLs.
- **Interactive Image Cropper**: Built-in crop modal powered by `react-image-crop` for cropping and aspect ratio adjustments before insertion.
- **8-Point Interactive Resizing**: Click any image to reveal 8 responsive resize handles for intuitive proportional scaling.
- **Video & Media Embeds**: Embed YouTube, Vimeo, Dailymotion, MP4 videos, and responsive iframes with custom dimension controls.

---

### 5. 🛡️ Built-in Security & Safe Sandboxed Renderer

- **Script Sanitizer Engine (`ScriptSanitizer`)**: Scans HTML for malicious scripts, cookie theft attempts (`document.cookie`), storage scraping (`localStorage`), unauthorized fetches, `eval()`, dangerous pseudo-protocols (`javascript:`), and disarms malicious inline handlers (`onclick`, `onerror`).
- **`<SafeSandboxedRenderer />` Component**: Render saved editor content in an isolated iframe with an automatic height synchronization message bus and optional security status badge.

---

### 6. 🖱️ Context Menu (Right-Click Suite)

- **Context-Aware Actions**: Right-click anywhere in the editor to open a tailored context menu at exact mouse coordinates.
- **Fast Table Controls**: Quick access to duplicate/delete rows, column tools, cell properties, and table deletion.
- **Link & Image Controls**: Edit hyperlinks, unlink, open links in new tabs, or inspect image properties.

---

## 📦 Installation

Install via npm, yarn, or pnpm:

```bash
# Using npm
npm install react-text-editor-kit

# Using yarn
yarn add react-text-editor-kit

# Using pnpm
pnpm add react-text-editor-kit
```

### Peer Dependencies

Ensure your project has React 18+ installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0
```

---

## 🚀 Quick Start Guide

### Basic Controlled Example

```jsx
import React, { useState } from "react";
import ReactEditorKit from "react-text-editor-kit";

export default function MyEditorPage() {
  const [content, setContent] = useState(
    "<h2>Welcome to React Editor Kit</h2><p>Start writing beautiful articles...</p>",
  );

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px" }}>
      <ReactEditorKit
        value={content}
        onChange={(cleanHtml) => setContent(cleanHtml)}
        placeholder="Type your story here..."
        height="450px"
        enable_spell_check={true}
      />
    </div>
  );
}
```

---

## ⚙️ Props & Configuration Reference

Here is the complete, comprehensive list of all props accepted by `<ReactEditorKit />`:

| Prop Name             |                             Type                              |            Default            | Description                                                                                                                                                                                       |
| :-------------------- | :-----------------------------------------------------------: | :---------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`               |                           `string`                            |             `""`              | Controlled HTML string passed to the editor canvas.                                                                                                                                               |
| `onChange`            |                 `(cleanHtml: string) => void`                 |          `undefined`          | Callback fired whenever content changes. Returns purified, sanitized HTML with all temporary markers (spellcheck spans, find/replace marks, selection bookmarks) removed.                         |
| `placeholder`         |                           `string`                            | `"Please Write Something..."` | Placeholder text displayed when the editor canvas is empty.                                                                                                                                       |
| `height`              |                           `string`                            |           `"auto"`            | CSS height for the editor container (e.g. `"450px"`, `"70vh"`, `"100%"`).                                                                                                                         |
| `enable_spell_check`  |                           `boolean`                           |            `false`            | Enables the in-memory offline spell checker, grammar morphology engine, red wavy underlines, and interactive typo suggestion popup.                                                               |
| `toolbar`             |                   `Array<string \| object>`                   |        `TOOLBAR_ITEMS`        | Custom list of toolbar items, buttons, and separator dividers (`"\|"`).                                                                                                                           |
| `navbar`              |                   `Array<string \| object>`                   |        `NAVBAR_ITEMS`         | Custom list of top menu navbar options (e.g., `["file", "view", "insert", "format"]`).                                                                                                            |
| `remove_from_toolbar` |                          `string[]`                           |             `[]`              | Array of item names to exclude from the toolbar (e.g. `["video", "source_code"]`).                                                                                                                |
| `remove_from_navbar`  |                          `string[]`                           |             `[]`              | Array of item names to exclude from the top navbar menu.                                                                                                                                          |
| `theme_config`        |                   `Record<string, string>`                    |             `{}`              | Custom theme styling map targeting internal CSS variables (e.g., background color, borders, text color, button hover states).                                                                     |
| `image_handler`       | `(inputs: object, item: object) => Promise<string> \| string` |          `undefined`          | Custom async callback to handle image uploads to your own cloud storage (AWS S3, Cloudinary, Firebase, etc.). Must return the uploaded image URL string. Defaults to Base64 FileReader data URLs. |
| `getEditorRef`        |       `(ref: React.RefObject<HTMLDivElement>) => void`        |          `undefined`          | Callback returning the `editorRef` to directly access the `contentEditable` DOM element.                                                                                                          |
| `mainProps`           |            `React.HTMLAttributes<HTMLDivElement>`             |             `{}`              | HTML attributes passed directly to the outer editor wrapper element (e.g. `className`, `id`, `data-*`).                                                                                           |
| `style`               |                     `React.CSSProperties`                     |             `{}`              | Inline styles applied directly to the inner `contentEditable` editing canvas.                                                                                                                     |
| `apiKey`              |                           `string`                            |             `""`              | Optional API key for remote backend function execution or enterprise access control.                                                                                                              |
| `...others`           |                             `any`                             |               —               | All remaining props (e.g. `aria-*`, `onFocus`, `onBlur`, `tabIndex`) are spread onto the inner `contentEditable` element.                                                                         |

---

## 🎨 Custom Theming & Dark Mode

You can completely customize the visual theme using the `theme_config` prop. The keys map directly to CSS custom properties:

```jsx
import React, { useState } from "react";
import ReactEditorKit from "react-text-editor-kit";

export default function DarkModeEditor() {
  const [content, setContent] = useState("<p>Sleek Dark Mode Content</p>");

  const darkTheme = {
    "background-color": "#1e1e2e",
    "border-color": "#313244",
    "text-color": "#cdd6f4",
    "toolbar-button-background": "#1e1e2e",
    "toolbar-text-color": "#cdd6f4",
    "toolbar-button-hover-background": "#313244",
    "toolbar-button-selected-background": "#45475a",
    "svg-color": "#cdd6f4",
    "save-button-background": "#a6e3a1",
  };

  return (
    <ReactEditorKit
      value={content}
      onChange={setContent}
      theme_config={darkTheme}
      height="500px"
    />
  );
}
```

### Available `theme_config` Keys:

| Key                                  |   Default Value   | Target Element / Purpose                              |
| :----------------------------------- | :---------------: | :---------------------------------------------------- |
| `background-color`                   |     `#ffffff`     | Editor canvas & dropdown container background         |
| `border-color`                       |     `#eeeeee`     | Toolbar dividers, modal borders, and canvas outlines  |
| `text-color`                         |     `#414141`     | Content editable canvas typography & modal text       |
| `toolbar-button-background`          |     `#ffffff`     | Toolbar button default background color               |
| `toolbar-text-color`                 |     `#414141`     | Toolbar button typography and label colors            |
| `toolbar-button-hover-background`    |     `#efefef`     | Hover state background on toolbar buttons & dropdowns |
| `toolbar-button-selected-background` |     `#dee0e2`     | Active/selected state background for toolbar buttons  |
| `svg-color`                          |     `#414141`     | Icon fill and stroke color in toolbar and modals      |
| `save-button-background`             | `rgb(9, 134, 62)` | Primary action buttons inside modals (Save / Insert)  |

---

## 🎛️ Toolbar & Navbar Customization

You have full control over what appears in both the top Navbar and the main Toolbar.

### Default Toolbar Items

The default `TOOLBAR_ITEMS` array includes:

```javascript
[
  "undo",
  "redo",
  "|",
  "format",
  "fontfamily",
  "fontsize",
  "lineHeight",
  "|",
  "bold",
  "italic",
  "underline",
  "superscript",
  "subscript",
  "|",
  "alignment",
  "|",
  "indent",
  "outdent",
  "|",
  "orderedList",
  "unorderedList",
  "|",
  "removeFormat",
  "|",
  "textColor",
  "backgroundColor",
  "|",
  "ltr",
  "rtl",
  "|",
  "copy",
  "cut",
  "paste",
  "select_all",
  "find_replace",
  "spellcheck",
  "|",
  "image",
  "link",
  "video",
  "|",
  "source_code",
  "full_screen",
  "special_character",
  "horizontal_line",
];
```

### Default Navbar Items

The default `NAVBAR_ITEMS` array includes:

```javascript
[
  "file",
  "view",
  "insert",
  "format",
  "|",
  "select_all",
  "find_replace",
  "|",
  "image",
  "link",
  "video",
  "|",
  "copy",
  "cut",
  "paste",
  "|",
];
```

- **`file` menu options**: `new_document`, `preview`, `print`
- **`view` menu options**: `source_code`, `full_screen`, `find_replace`, `spellcheck`
- **`insert` menu options**: `table`, `image`, `link`, `video`, `hr_line`, `special_char`
- **`format` menu options**: `bold`, `italic`, `underline`, `superscript`, `subscript`, `font`, `font_size`, `alignment`

### Excluding Tools

To easily remove specific tools without rewriting the whole toolbar array, pass `remove_from_toolbar` or `remove_from_navbar`:

```jsx
<ReactEditorKit
  value={content}
  onChange={setContent}
  remove_from_toolbar={["video", "ltr", "rtl", "source_code"]}
  remove_from_navbar={["video"]}
/>
```

### Custom Minimal Toolbar

```jsx
<ReactEditorKit
  value={content}
  onChange={setContent}
  toolbar={[
    "bold",
    "italic",
    "underline",
    "|",
    "fontsize",
    "textColor",
    "|",
    "alignment",
    "orderedList",
    "unorderedList",
    "|",
    "link",
    "image",
  ]}
  navbar={[]} // Disables top menu navbar
/>
```

---

## ☁️ Custom Cloud Image Upload Handler (`image_handler`)

By default, uploaded images are encoded as Base64 data URLs. If you want to upload images to AWS S3, Cloudinary, Firebase Storage, or your backend server, provide an async `image_handler` function:

```jsx
import React, { useState } from "react";
import ReactEditorKit from "react-text-editor-kit";

export default function CloudUploadEditor() {
  const [content, setContent] = useState("");

  const handleCloudImageUpload = async (inputs, item) => {
    // inputs.image is the raw File object from the user's computer
    // inputs.type indicates 'upload' or 'general' (URL)
    const file = inputs.image;
    if (!file) return null;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_cloudinary_preset");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        },
      );
      const data = await response.json();
      // Return the public secure URL of the uploaded image
      return data.secure_url;
    } catch (error) {
      console.error("Cloud upload failed:", error);
      return null;
    }
  };

  return (
    <ReactEditorKit
      value={content}
      onChange={setContent}
      image_handler={handleCloudImageUpload}
      height="450px"
    />
  );
}
```

---

## 🛡️ Safe Content Rendering (`SafeSandboxedRenderer`)

When displaying user-generated rich HTML on public web pages, you must protect your application from XSS attacks. `react-text-editor-kit` provides a built-in `<SafeSandboxedRenderer />` component:

```jsx
import React from "react";
import { SafeSandboxedRenderer } from "react-text-editor-kit";

export default function ArticlePreview({ articleHtml }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2>Article Preview</h2>
      <SafeSandboxedRenderer
        htmlContent={articleHtml}
        showSecurityBadge={true} // Displays a subtle security indicator
        style={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
      />
    </div>
  );
}
```

### `<SafeSandboxedRenderer />` Props

| Prop Name           |         Type          | Default | Description                                                                    |
| :------------------ | :-------------------: | :-----: | :----------------------------------------------------------------------------- |
| `htmlContent`       |       `string`        |  `""`   | Raw HTML content to be sanitized and rendered.                                 |
| `showSecurityBadge` |       `boolean`       | `true`  | Shows a top status bar indicating active sandboxing and blocked scripts count. |
| `className`         |       `string`        |  `""`   | CSS class name applied to the container wrapper.                               |
| `style`             | `React.CSSProperties` |  `{}`   | Inline CSS styling applied to the outer container.                             |

---

## ⚡ Remote Backend Functions Integration (`useBackendFunctions`)

For advanced SaaS platforms, `react-text-editor-kit` includes hooks to dynamically fetch and execute server-side business logic and custom editor functions:

```jsx
import { useBackendFunctions, useBackendFunction } from "react-text-editor-kit";

function CustomPluginComponent({ apiKey }) {
  const { functions, isLoading, executeFunction, hasFunction } =
    useBackendFunctions(apiKey, "https://api.yourdomain.com/editor/plugins");

  const handleCustomAction = () => {
    if (hasFunction("formatLegalDocument")) {
      const result = executeFunction("formatLegalDocument", {
        jurisdiction: "US",
      });
      console.log("Plugin executed:", result);
    }
  };

  return (
    <button onClick={handleCustomAction} disabled={isLoading}>
      Run Legal Formatter
    </button>
  );
}
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut                                        | Action                                                | Scope     |
| :---------------------------------------------- | :---------------------------------------------------- | :-------- |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>B</kbd> | Toggle **Bold** formatting                            | Selection |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>I</kbd> | Toggle _Italic_ formatting                            | Selection |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>U</kbd> | Toggle <u>Underline</u>                               | Selection |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>F</kbd> | Open floating **Find & Replace**                      | Global    |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd> | **Undo** last action                                  | History   |
| <kbd>Ctrl</kbd> / <kbd>Cmd</kbd> + <kbd>Y</kbd> | **Redo** last action                                  | History   |
| <kbd>Tab</kbd>                                  | Jump to next table cell _(Adds row if on last cell)_  | Tables    |
| <kbd>Shift</kbd> + <kbd>Tab</kbd>               | Jump to previous table cell                           | Tables    |
| <kbd>Backspace</kbd> / <kbd>Delete</kbd>        | Remove active image / Merge empty list items & blocks | Canvas    |
| <kbd>Esc</kbd>                                  | Close active modal / Find & Replace / Popovers        | Dialogs   |

---

## 🧼 Clean HTML Output Guarantee

Unlike many traditional editors that leave trailing DOM artifacts, empty formatting tags, or residual search highlight wrappers, **React Editor Kit** guarantees clean, pristine HTML:

1. **Spellcheck Spans Stripped**: All `span.mlx-spell-error` tags are automatically unwrapped into pure text before `onChange` fires.
2. **Search Highlights Stripped**: All `mark.mlx-find-highlight` and `mark.mlx-find-current` tags are unwrapped.
3. **Empty Tags Pruned**: Empty `<u></u>`, `<b></b>`, `<i></i>`, `<span></span>` elements with no content are cleaned.
4. **Empty State Normalization**: When all text is deleted, the editor outputs an empty string `""` (or standard `<p><br></p>`) rather than dangling fragmented tags.

---

## 📄 License

This project is licensed under the **MIT License**. Free for commercial and personal applications.

---

<p align="center">
  Built with ❤️ for the React Developer Community.
</p>
