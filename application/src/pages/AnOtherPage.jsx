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
          apiKey={"f2a84881-3ad9-4707-a26b-039b5bb179d7"}
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
