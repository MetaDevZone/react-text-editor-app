import React, { useEffect, useState } from "react";
import ReactEditor from "react-text-editor-kit";
import { useLocation } from "react-router-dom";

export default function AnOtherPage() {
  const [value, setValue] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setValue(String(state.detailed_description));
    }
  }, []);

  return (
    <ReactEditor
      value={value}
      onChange={setValue}
      mainProps={{ className: "red" }}
      placeholder="Write your text here"
    />
  );
}
