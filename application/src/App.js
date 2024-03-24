import { useState } from "react";
import { TextColorUpperIcon } from "./components";
import ReactEditor from "react-text-editor-kit";

function App() {
  const [value, setValue] = useState("");
  let theme_config = { "background-color": "#fff" };

  const handleClick = (item) => {};

  const handleSubmit = async (e) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("");
      }, 100000);
    });
  };

  const toolbar = [
    { name: "undo", title: "Undo 1" },
    { name: "redo", handleClick: handleClick },
    "|",
    "format",
    "|",
    { name: "bold", handleClick: handleClick, add_functionality: true },
    { name: "italic", title: "Italic", handleClick: handleClick },
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
    {
      name: "textColor",
      handleClick: handleClick,
      add_functionality: true,
      icon: <TextColorUpperIcon />,
      title: "Text Color A",
    },
    "backgroundColor",
    "|",
    {
      name: "ltr",
      title: "Italic",
      handleClick: handleClick,
      add_functionality: true,
    },
    "rtl",
    "|",
  ];

  const navbar = [
    {
      name: "file",
      options: ["new_document", "preview", "print"],
    },
    { name: "view", title: "View", options: ["source_code", "full_screen"] },
    {
      name: "insert",
      title: "insert",
      options: ["image", "link", "video", "hr_line", "special_char"],
    },
    {
      name: "format",
      title: "format",
      options: [
        "bold",
        "italic",
        "underline",
        "superscript",
        "subscript",
        "font",
        "font_size",
        "alignment",
      ],
    },
    "|",
    "source_code",
    "full_screen",
    "select_all",
    "|",
    { name: "image", handleSubmit: handleSubmit },
    { name: "link", handleSubmit: handleSubmit, add_functionality: true },
    "video",
    "|",
  ];

  const get_editor_ref = (value) => {};
  const onSubmit = (value) => {
    console.log(value, "valuevaluevaluevaluevalue");
  };
  const handleChange = (value) => {};

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <ReactEditor
          value={value}
          setValue={setValue}
          getEditorRef={get_editor_ref}
          onChange={handleChange}
          mainProps={{ className: "red" }}
          placeholder="Write your text here"
          image_handler={handleSubmit}
        />
      </form>
    </div>
  );
}

export default App;
