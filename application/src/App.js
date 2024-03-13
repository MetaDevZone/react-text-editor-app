import { useState } from "react";
import { TextColorUpperIcon } from "./components";
import ReactEditor from "react-editor";

function App() {
  const [value, setValue] = useState("");
  let theme_config = { "background-color": "#fff" };

  const handleClick = (item) => {
    console.log(item, "handleClickhandleClick");
  };

  const handleSubmit = async (e) => {
    console.log(e, "handleSubmithandleSubmit");
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

  const get_editor_ref = (value) => {
    console.log(value, "valuevaluevaluevalue");
  };
  const handleChange = (value) => {
    console.log(value, "handleChange");
  };

  return (
    <div className="App">
      <ReactEditor
        navbar={navbar}
        value={value}
        setValue={setValue}
        getEditorRef={get_editor_ref}
        onChange={handleChange}
        mainProps={{ className: "red" }}
      />
    </div>
  );
}

export default App;
