import React, { useState } from "react";
import ReactEditorKit from "../ReactEditorKit";
// import ReactEditorKit from "react-text-editor-kit";

export default function AnOtherPage() {
  const [value, setValue] = useState("");
  console.log(value, "value");
  return (
    <>
      <ReactEditorKit
        value={value}
        onChange={setValue}
        mainProps={{ className: "red" }}
        placeholder="Please Write Something..."
        apiKey={"a3eb9a4f-6758-4c3e-ba0f-75ddf059f3c7"}
        height={"400px"}
      />
      {/* <ReactEditorKit
        value={value1}
        onChange={setValue1}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 1"
      />
      <ReactEditorKit
        value={value2}
        onChange={setValue2}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 1"
      /> */}
    </>
  );
}
