import React, { useEffect, useState } from "react";
import ReactEditor from "../ReactEditor";
import { useLocation } from "react-router-dom";

export default function AnOtherPage() {
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setValue(String(state.detailed_description));
    }
  }, []);

  return (
    <>
      <ReactEditor
        value={value}
        onChange={setValue}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 1"
      />
      <ReactEditor
        value={value1}
        onChange={setValue1}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 2"
      />
      <ReactEditor
        value={value2}
        onChange={setValue2}
        mainProps={{ className: "red" }}
        placeholder="Write your text here 3"
      />
    </>
  );
}
