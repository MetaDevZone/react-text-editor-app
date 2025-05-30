import React, { useState } from "react";
import ReactEditorKit from "react-text-editor-kit";

export default function AnOtherPage() {
  const [value, setValue] = useState("");

  return (
    <>
      <ReactEditorKit
        value={value}
        onChange={setValue}
        mainProps={{ className: "red" }}
        placeholder="Please Write Something..."
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
