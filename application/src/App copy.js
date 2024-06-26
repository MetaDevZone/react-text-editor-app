import { useState } from "react";
import { TextColorUpperIcon } from "./components";
import axios from "axios";
import ReactEditor from "./ReactEditor";

function App() {
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const [value1, setValue1] = useState(
    `Add Template ##<p><img src="http://localhost:1200/uploads/general/1713802363960_bc16c689-bc8d-4c9e-b5f3-954a6911b8b8.jpeg" alt="Image" height="500" width="500"><br></p>`
  );
  const [value2, setValue2] = useState("");
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
  const handleChange = (value) => {
    setValue(value);
  };
  const handleChange1 = (value) => {
    setValue1(value);
  };
  const handleChange2 = (value) => {
    setValue2(value);
  };

  const image_handler = async (e) => {
    console.log(e, "eeeeeeeeeeee");
    let requestObj = {
      method: "POST",
      url: "https://apidev.dynamitelifestyle.com/app/update_image_on_s3/",
      headers: {
        "x-sh-auth":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWJiNDZkMzA4MzNkMDk0NzFjY2IzNTIiLCJsb2dpbl9ieSI6ImFkbWluX3VzZXIiLCJsb2dpbl90b2tlbiI6IjJlOGY1MTAwLWRhZWUtMTFlZS05OTY0LWI5NzkwNWU0MzE1ZiIsImlhdCI6MTcwOTY0MjcwMX0.17pW_cXfCBoE6qNzPAQTS5Urg9VZ7J6LBSn-w1ahLXs",
        "Content-Type": "multipart/form-data",
      },
    };

    let formData = new FormData();
    formData.append("image", e.image); // Assuming e is an event object from an input file element
    formData.append("width", "600");
    requestObj["data"] = formData;
    console.log(...formData, "formDataformData");
    console.log(requestObj, "requestObjrequestObj");
    try {
      let results = await axios(requestObj);
      console.log(results, "resultsresultsresults");
      if (results.data.code === 200) {
        return (
          "https://dynamite-lifestyle-dev-app-bucket.s3.amazonaws.com/" +
          results.data.image_path
        );
      } else {
        return "";
      }
    } catch (error) {
      console.error("Error occurred:", error);
      return "";
    }
  };

  return (
    <div className="App">
      <button onClick={() => setOpen(true)}>Click</button>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s Lorem Ipsum is
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s Lorem Ipsum is
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s Lorem Ipsum is
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s
      <form onSubmit={onSubmit}>
        <ReactEditor
          value={value}
          getEditorRef={get_editor_ref}
          // navbar={navbar}
          onChange={handleChange}
          // remove_from_toolbar={["bold", { name: "format", options: ["h1"] }]}
          // remove_from_navbar={[
          //   "image",
          //   "select_all",
          //   { name: "view", options: ["source_code"] },
          //   { name: "insert", options: ["image"] },
          //   { name: "format", options: ["bold"] },
          // ]}
          mainProps={{ className: "red" }}
          placeholder="Write your text here"
          // image_handler={image_handler}
        />
      </form>
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s 1500s Lorem Ipsum
      is simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever
      since the 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s 1500s Lorem Ipsum is simply dummy text of
      the printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s Lorem Ipsum is
      <form onSubmit={onSubmit}>
        <ReactEditor
          value={value1}
          getEditorRef={get_editor_ref}
          // navbar={navbar}
          onChange={handleChange1}
          // remove_from_toolbar={["bold", { name: "format", options: ["h1"] }]}
          // remove_from_navbar={[
          //   "image",
          //   "select_all",
          //   { name: "view", options: ["source_code"] },
          //   { name: "insert", options: ["image"] },
          //   { name: "format", options: ["bold"] },
          // ]}
          mainProps={{ className: "red" }}
          placeholder="Write your text here"
          // image_handler={image_handler}
        />
      </form>
      {open && (
        <form onSubmit={onSubmit}>
          <ReactEditor
            value={value2}
            getEditorRef={get_editor_ref}
            // navbar={navbar}
            onChange={handleChange2}
            // remove_from_toolbar={["bold", { name: "format", options: ["h1"] }]}
            // remove_from_navbar={[
            //   "image",
            //   "select_all",
            //   { name: "view", options: ["source_code"] },
            //   { name: "insert", options: ["image"] },
            //   { name: "format", options: ["bold"] },
            // ]}
            mainProps={{ className: "red" }}
            placeholder="Write your text here"
            // image_handler={image_handler}
          />
        </form>
      )}
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s Lorem
      Ipsum is simply dummy text of the printing and typesetting industry. Lorem
      Ipsum has been the industry's standard dummy text ever since the 1500s
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s 1500s Lorem Ipsum is simply dummy text of the printing and
      typesetting industry. Lorem Ipsum has been the industry's standard dummy
      text ever since the 1500s Lorem Ipsum is simply dummy text of the printing
      and typesetting industry. Lorem Ipsum has been the industry's standard
      dummy text ever since the 1500s Lorem Ipsum is simply dummy text of the
      printing and typesetting industry. Lorem Ipsum has been the industry's
      standard dummy text ever since the 1500s Lorem Ipsum is simply dummy text
      of the printing and typesetting industry. Lorem Ipsum has been the
      industry's standard dummy text ever since the 1500s Lorem Ipsum is simply
      dummy text of the printing and typesetting industry. Lorem Ipsum has been
      the industry's standard dummy text ever since the 1500s Lorem Ipsum is
      simply dummy text of the printing and typesetting industry. Lorem Ipsum
      has been the industry's standard dummy text ever since the 1500s
    </div>
  );
}

export default App;
