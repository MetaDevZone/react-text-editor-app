import React, { useState } from "react";
import ReactEditorKit from "../ReactEditorKit";
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
        apiKey={""}
        height={"400px"}
      />
    </>
  );
}
