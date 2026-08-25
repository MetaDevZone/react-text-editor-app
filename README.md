<p align="center">
  <strong>React Text Editor Kit</strong>
</p>

<p align="center">
  A production-ready, customizable WYSIWYG rich text editor for React &amp; Next.js
</p>



<p align="center">
  <a href="https://reacteditor.metadevzone.com/"><strong>Website</strong></a> ·
  <a href="https://reacteditor.metadevzone.com/"><strong>Get API Key</strong></a> ·
  <a href="https://codesandbox.io/p/devbox/q9gvwt?file=%2Fsrc%2FApp.jsx%3A8%2C11"><strong>Live Demo</strong></a> ·
  <a href="https://github.com/MetaDevZone/react-text-editor-app/issues"><strong>Report Bug</strong></a>
</p>

---

## Overview

**React Text Editor Kit** is a modern, lightweight rich text editor built for React applications. It ships with a fully customizable toolbar and navbar, clean paste from Word/Excel/Google Docs, built-in media tools, theme support, and a developer-friendly API — so you can ship polished editing experiences in minutes, not days.

| | |
|---|---|
| ⚡ **Fast setup** | Install, add your API key, and render — no heavy boilerplate |
| 🎨 **Fully customizable** | Configure toolbar, navbar, themes, and behavior |
| 📋 **Clean paste** | Automatically strips rogue formatting from external sources |
| 🖼️ **Media ready** | Images, links, videos, and custom upload handlers |

---

## Table of Contents

- [Installation](#installation)
- [API Key Setup](#api-key-setup)
- [Quick Start](#quick-start)
- [Framework Guides](#framework-guides)
  - [Create React App](#create-react-app)
  - [Next.js](#nextjs)
  - [Vite](#vite)
- [Props Reference](#props-reference)
- [Image Upload](#image-upload)
- [Toolbar & Navbar](#toolbar--navbar)
- [Removing Options](#removing-options)
- [Theme Configuration](#theme-configuration)
- [Available Toolbar Items](#available-toolbar-items)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Repository Structure](#repository-structure)
- [Support](#support)

---

## Installation

```bash
npm install react-text-editor-kit
```

```bash
yarn add react-text-editor-kit
```



---

## API Key Setup

> **An API key is required.** The editor will not initialize without a valid key.

Get your API key from the official website:

### 👉 [https://reacteditor.metadevzone.com/](https://reacteditor.metadevzone.com/)

**Steps:**

1. Visit **[reacteditor.metadevzone.com](https://reacteditor.metadevzone.com/)**
2. Create an account or sign in
3. Select a plan and copy your API key
4. Store the key in an environment variable (never hardcode it)
5. Pass it to the `apiKey` prop on `<ReactEditor />`

```jsx
<ReactEditor
  apiKey={process.env.REACT_APP_EDITOR_API_KEY}
  value={value}
  onChange={setValue}
/>
```

> **Security:** Never commit API keys to version control. Use `.env` files locally and CI/CD secrets in production.

---

## Quick Start

```tsx
import { useState } from "react";
import ReactEditor from "react-text-editor-kit";

export default function App() {
  const [content, setContent] = useState("");

  return (
    <ReactEditor
      value={content}
      onChange={setContent}
      placeholder="Start writing..."
      apiKey={process.env.REACT_APP_EDITOR_API_KEY}
    />
  );
}
```

---

## Framework Guides

### Create React App

**1.** Create a `.env` file in your project root:

```env
REACT_APP_EDITOR_API_KEY=your_api_key_here
```

**2.** Use the editor in your component:

```tsx
import { useState } from "react";
import ReactEditor from "react-text-editor-kit";

function App() {
  const [value, setValue] = useState("");

  return (
    <ReactEditor
      value={value}
      onChange={setValue}
      apiKey={process.env.REACT_APP_EDITOR_API_KEY}
      placeholder="Write your content here"
    />
  );
}

export default App;
```

---

### Next.js

**1.** Add your key to `.env.local`:

```env
NEXT_PUBLIC_EDITOR_API_KEY=your_api_key_here
```

> Use the `NEXT_PUBLIC_` prefix so the variable is available in the browser.

**2.** Create a client component (App Router):

```tsx
"use client";

import { useState } from "react";
import ReactEditor from "react-text-editor-kit";

export default function EditorPage() {
  const [value, setValue] = useState("");

  return (
    <ReactEditor
      value={value}
      onChange={setValue}
      apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
      placeholder="Write your content here"
    />
  );
}
```

---

### Vite

**1.** Add to `.env`:

```env
VITE_EDITOR_API_KEY=your_api_key_here
```

**2.** Use in your component:

```tsx
import { useState } from "react";
import ReactEditor from "react-text-editor-kit";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <ReactEditor
      value={value}
      onChange={setValue}
      apiKey={import.meta.env.VITE_EDITOR_API_KEY}
    />
  );
}
```

---

## Props Reference

### Required

| Prop | Type | Description |
|---|---|---|
| `value` | `string` | Current HTML content of the editor |
| `onChange` | `(value: string) => void` | Callback fired when content changes |
| `apiKey` | `string` | API key from [reacteditor.metadevzone.com](https://reacteditor.metadevzone.com/) |

### Optional

| Prop | Type | Default | Description |
|---|---|---|---|
| `placeholder` | `string` | — | Placeholder text shown when editor is empty |
| `toolbar` | `array` | All items | Custom toolbar layout and options |
| `navbar` | `array` | All items | Custom navbar layout and options |
| `remove_from_toolbar` | `array` | — | Toolbar items or dropdown options to hide |
| `remove_from_navbar` | `array` | — | Navbar items or dropdown options to hide |
| `theme_config` | `object` | — | CSS variable overrides for theming |
| `image_handler` | `(event) => Promise<string>` | — | Custom server-side image upload handler |
| `getEditorRef` | `(ref) => void` | — | Receive a ref to the editor DOM element |
| `mainProps` | `object` | — | Props applied to the outermost wrapper `div` |
| `height` | `string` | `"auto"` | Editor height (e.g. `"400px"`, `"50vh"`) |
| `style` | `object` | — | Inline styles for the editor content area |
| `handleFullScreen` | `function` | — | Callback when fullscreen mode toggles |

---

## Image Upload

By default, images are handled within the editor. To upload images to your own server, provide an `image_handler`:

```tsx
import axios from "axios";

const imageHandler = async (event) => {
  const formData = new FormData();
  formData.append("image", event.image);
  formData.append("width", "600");

  try {
    const response = await axios.post("https://your-api.com/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.code === 200) {
      return response.data.image_path; // Return the hosted image URL
    }
    return "";
  } catch {
    return "";
  }
};

<ReactEditor
  value={value}
  onChange={setValue}
  apiKey={process.env.REACT_APP_EDITOR_API_KEY}
  image_handler={imageHandler}
/>;
```

The handler receives an event object with an `image` file and must return a `Promise<string>` resolving to the image URL.

---

## Toolbar & Navbar

Both the toolbar and navbar accept an array of item names, separators (`"|"`), or configuration objects.

### Basic Configuration

```tsx
const navbar = [
  {
    name: "file",
    options: ["new_document", "preview", "print"],
  },
  {
    name: "view",
    title: "View",
    options: ["source_code", "full_screen"],
  },
  {
    name: "insert",
    title: "Insert",
    options: ["image", "link", "video", "hr_line", "special_char"],
  },
  {
    name: "format",
    title: "Format",
    options: [
      "bold", "italic", "underline",
      "superscript", "subscript",
      "font", "font_size", "alignment",
    ],
  },
  "|",
  "image",
  "link",
  "video",
];

const toolbar = [
  "undo", "redo", "|",
  "format", "fontfamily", "fontsize", "lineHeight", "|",
  "bold", "italic", "underline", "superscript", "subscript", "|",
  "alignment", "|",
  "indent", "outdent", "|",
  "orderedList", "unorderedList", "|",
  "removeFormat", "|",
  "textColor", "backgroundColor", "|",
  "ltr", "rtl", "|",
  "copy", "cut", "paste", "select_all", "|",
  "image", "link", "video", "|",
  "source_code", "full_screen", "special_character", "horizontal_line",
];

<ReactEditor
  value={value}
  onChange={setValue}
  apiKey={process.env.REACT_APP_EDITOR_API_KEY}
  navbar={navbar}
  toolbar={toolbar}
/>;
```

### Show All Dropdown Options

Omit the `options` array to include every child option for a group:

```tsx
const navbar = ["file"]; // shows all file menu options

// Or with custom label/icon:
const navbar = [
  { name: "file", title: "File", icon: "<File/>" },
];
```

### Custom Click Handlers

Override default behavior or extend it with `add_functionality`:

```tsx
const toolbar = [
  {
    name: "undo",
    title: "Undo",
    icon: "<Undo/>",
    handleClick: (item) => console.log("Custom undo handler", item),
    add_functionality: true, // keeps default undo behavior alongside your handler
  },
];
```

---

## Removing Options

Hide specific toolbar or navbar items without rebuilding the entire layout:

```tsx
<ReactEditor
  value={value}
  onChange={setValue}
  apiKey={process.env.REACT_APP_EDITOR_API_KEY}
  remove_from_toolbar={[
    "bold",
    { name: "format", options: ["h1"] }, // remove h1 from format dropdown
  ]}
  remove_from_navbar={[
    "select_all",
    { name: "view", options: ["source_code"] },
  ]}
/>
```

---

## Theme Configuration

Override editor appearance using CSS custom properties via `theme_config`:

```tsx
const themeConfig = {
  "background-color": "#ffffff",
  "border-color": "#e2e8f0",
  "text-color": "#1a202c",
  "toolbar-button-background": "#ffffff",
  "toolbar-text-color": "#4a5568",
  "toolbar-button-hover-background": "#f7fafc",
  "toolbar-button-selected-background": "#edf2f7",
  "svg-color": "#4a5568",
  "save-button-background": "rgb(9, 134, 62)",
};

<ReactEditor
  value={value}
  onChange={setValue}
  apiKey={process.env.REACT_APP_EDITOR_API_KEY}
  theme_config={themeConfig}
/>;
```

---

## Available Toolbar Items

| Item | Description |
|---|---|
| `undo` / `redo` | Undo and redo actions |
| `format` | Heading and block format dropdown |
| `fontfamily` | Font family selector |
| `fontsize` | Font size selector |
| `lineHeight` | Line height selector |
| `bold` / `italic` / `underline` | Text styling |
| `superscript` / `subscript` | Script formatting |
| `alignment` | Text alignment dropdown |
| `alignLeft` / `alignCenter` / `alignRight` / `alignJustify` | Individual alignment buttons |
| `indent` / `outdent` | Paragraph indentation |
| `orderedList` / `unorderedList` | List formatting |
| `removeFormat` | Clear all formatting |
| `textColor` / `backgroundColor` | Color pickers |
| `ltr` / `rtl` | Text direction |
| `copy` / `cut` / `paste` | Clipboard actions |
| `select_all` | Select all content |
| `image` / `link` / `video` | Media insertion |
| `source_code` | View/edit HTML source |
| `full_screen` | Toggle fullscreen mode |
| `special_character` | Insert special characters |
| `horizontal_line` | Insert horizontal rule |
| `\|` | Separator (visual divider) |

### Navbar Groups

| Group | Child Options |
|---|---|
| `file` | `new_document`, `preview`, `print` |
| `view` | `source_code`, `full_screen` |
| `insert` | `image`, `link`, `video`, `hr_line`, `special_char` |
| `format` | `bold`, `italic`, `underline`, `superscript`, `subscript`, `font`, `font_size`, `alignment` |

---

## Best Practices

**Environment variables** — Always load your API key from environment variables. Add `.env` to `.gitignore`.

**Controlled component** — Manage `value` and `onChange` in parent state for predictable behavior:

```tsx
const [content, setContent] = useState(initialHtml);

<ReactEditor value={content} onChange={setContent} apiKey={apiKey} />
```

**Editor ref** — Use `getEditorRef` when you need direct DOM access:

```tsx
<ReactEditor
  getEditorRef={(ref) => { editorRef.current = ref; }}
  ...
/>
```

**Image uploads** — Always validate and sanitize uploads on your server. Return only trusted URLs from `image_handler`.

**Height** — Set an explicit `height` for consistent layout in forms and modals:

```tsx
<ReactEditor height="400px" ... />
```

---

## Troubleshooting

<details>
<summary><strong>Editor does not load / shows blank screen</strong></summary>

- Verify your `apiKey` is set and not `undefined`
- Confirm the environment variable name matches your framework (`REACT_APP_`, `NEXT_PUBLIC_`, `VITE_`)
- Restart the dev server after adding `.env` variables
- Get or verify your key at [reacteditor.metadevzone.com](https://reacteditor.metadevzone.com/)

</details>

<details>
<summary><strong>API key works locally but not in production</strong></summary>

- Add the environment variable to your hosting platform (Vercel, Netlify, AWS, etc.)
- Ensure the variable uses the correct public prefix for client-side access
- Never expose server-only secrets in `NEXT_PUBLIC_` or `REACT_APP_` variables

</details>

<details>
<summary><strong>Pasted content has broken formatting</strong></summary>

The editor automatically cleans paste from Word, Excel, and Google Docs. For advanced control, use `removeFormat` or customize toolbar options to limit available formatting.

</details>

<details>
<summary><strong>Styles look off in my app</strong></summary>

Use `theme_config` to match your design system. Apply a wrapper class via `mainProps={{ className: "my-editor" }}` for scoped CSS overrides.

</details>

---

## Repository Structure

This monorepo contains two main directories:

| Directory | Description |
|---|---|
| `react-editor/` | Publishable npm package — run `npm publish` from here |
| `application/` | Local demo app for development and testing |

> The root `package.json` is marked `private` to prevent accidental publishing of the entire repository.

---

## Support

| Resource | Link |
|---|---|
| Website & API Key | [reacteditor.metadevzone.com](https://reacteditor.metadevzone.com/) |
| Live Demo | [CodeSandbox](https://codesandbox.io/p/devbox/q9gvwt?file=%2Fsrc%2FApp.jsx%3A8%2C11) |
| Bug Reports | [GitHub Issues](https://github.com/MetaDevZone/react-text-editor-app/issues) |
| npm Package | [react-text-editor-kit](https://www.npmjs.com/package/react-text-editor-kit) |

---

## Author

**Meta Dev Zone** — [@meta-dev-zone](https://www.npmjs.com/~meta-dev-zone)

Developed by [Meta Dev Zone](https://reacteditor.metadevzone.com/)
