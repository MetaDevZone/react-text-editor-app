export const TOOLBAR_ITEMS = [
  "undo",
  "redo",
  "|",
  "format",
  "|",
  "bold",
  "italic",
  "underline",
  "superscript",
  "subscript",
  "|",
  "alignLeft",
  "alignCenter",
  "alignRight",
  "alignJustify",
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
];

export const NAVBAR_ITEMS = [
  "file",
  "view",
  "insert",
  "format",
  "|",
  "select_all",
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

export const FORMAT_OPTIONS = [
  "bold",
  "italic",
  "underline",
  "superscript",
  "subscript",
  "font",
  "font_size",
  "alignment",
];

export const INSER_OPTIONS = [
  "image",
  "link",
  "video",
  "hr_line",
  "special_char",
];

export const FILE_OPTIONS = ["new_document", "preview", "print"];
export const VIEW_OPTIONS = ["source_code", "full_screen"];

export function generateRandomID(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}
