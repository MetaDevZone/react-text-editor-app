import React, { useState } from "react";
import ReactEditorKit from "react-text-editor-kit";
// import ReactEditorKit from "react-text-editor-kit";

export default function AnOtherPage() {
  const [value, setValue] = useState("");

  return (
    <>
      <ReactEditorKit
        value={value}
        onChange={setValue}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 1"
      />
    </>
  );
}
