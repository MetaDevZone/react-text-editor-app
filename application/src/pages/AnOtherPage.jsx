import React, { useState } from "react";
import ReactEditorKit from "../ReactEditorKit";
export default function AnOtherPage() {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {};
  console.log(
    value,
    "test new data data data data data data data data data data data data data data data",
  );
  return (
    <>
      <form onSubmit={handleSubmit}>
        <ReactEditorKit
          value={value}
          onChange={setValue}
          mainProps={{ className: "red" }}
          placeholder="Please Write Something..."
          apiKey={"a3eb9a4f-6758-4c3e-ba0f-75ddf059f3c7"}
          height={"400px"}
        />
      </form>

      {value && (
        <div>
          <div dangerouslySetInnerHTML={{ __html: value }} />
        </div>
      )}
    </>
  );
}
