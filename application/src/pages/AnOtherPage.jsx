import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactEditorKit from "react-text-editor-kit";

export default function AnOtherPage() {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const { state } = useLocation();

  // useEffect(() => {
  //   if (state) {
  //     setValue(String(state.detailed_description));
  //   }
  // }, []);

  return (
    <>
      <ReactEditorKit
        value={value}
        onChange={setValue}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 1"
      />
      <ReactEditorKit
        value={value1}
        onChange={setValue1}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 2"
      />
      <ReactEditorKit
        value={value2}
        onChange={setValue2}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 3"
      />
    </>
  );
}
