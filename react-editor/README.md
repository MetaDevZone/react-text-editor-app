# React Text Editor Kit

React Text Editor Kit is a customizable rich text editor component for React applications. It provides a flexible and easy-to-use interface for users to create and edit content with various formatting options. And also easy to integrate in react applications.

## Installation

```sh
npm i react-text-editor-kit
```

## Simple Usage

```tsx
import { useState } from "react";
import ReactEditor from "react-text-editor-kit";

function App() {
  const [value, setValue] = useState("");

  const handleChange = (value) => {
    setValue(value);
  };

  const image_handler = async (e) => {
    // let requestObj = {
    //   method: "POST",
    //   url: "your-api-end-point",
    //   headers: {}, // attach required headers
    // };
    // let formData = new FormData();
    // formData.append("image", e.image);
    // formData.append("width", "600");
    // requestObj["data"] = formData;
    // try {
    //   let results = await axios(requestObj);
    //   if (results.data.code === 200) {
    //     return results.data.image_path;
    //   } else {
    //     return "";
    //   }
    // } catch (error) {
    //   return "";
    // }
  };

  const get_editor_ref = (value) => {};

  return (
    <div className="App">
      <ReactEditor
        value={value}
        getEditorRef={get_editor_ref} //if you want to get ref of editor
        onChange={handleChange}
        mainProps={{ className: "red" }} // these props with b used to most parent div of the editor
        placeholder="Write your text here"
        // image_handler={image_handler} // if you want to upload image on your server
      />
    </div>
  );
}

export default App;
```

## Toolbar and Navbar Customization

if you want to customise toolbar and navbar you can use selected options as you want

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
  "image",
  "link",
  "video",
  "|",
  "copy",
  "cut",
  "paste",
  "|",
];

const toolbar = [
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

<ReactEditor
  value={value}
  onChange={setValue}
  navbar={navbar}
  toolbar={toolbar}
/>;
```

if you want to show all child options in navbar you should not have to pass options array. You can use it like

```tsx
const navbar = [
  {
    name: "file",
    title: "File", // if you want to show title of the file function yourself
    icon: "<File/>", // if you want to show icon of the file function yourself
  },
  //  ...Other options
];

// Or So simple like
const navbar = ["file"]; // if you not need to customise title or icon
```

if you need customization in toolbar you can also do that just like

```tsx
const handleClick = (item) => {
  console.log(item, "item");
};

const navbar = [
  {
    name: "undo",
    title: "Undo it", // if you want to show title of the file function yourself
    icon: "<Undo/>", // if you want to show icon of the file function yourself
    handleClick: handleClick, // if you need click function to do something but in this case handleClick will prevent the functionality that means now you have to perform functionality yourself but you also want functionality then you need to pass an extra paramter add_functionality just like below
    add_functionality: true,
  },
  //  ...Other optiosn
];
```

## Theme Configuration

if you want to change it theme you can use give css variables

```tsx
let theme_config = {
  "background-color": "#fff",
  "border-color": "#c4c4c4",
  "text-color": "#414141",
  "toolbar-button-background": "#fff",
  "toolbar-text-color": "#414141",
  "toolbar-button-hover-background": "#efefef",
  "toolbar-button-selected-background": "#dee0e2",
  "svg-color": "#414141",
  "save-button-background": "rgb(9, 134, 62)",
};
<ReactEditor value={value} onChange={setValue} theme_config={theme_config} />;
```
