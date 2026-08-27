import React, { useState } from "react";
import ReactEditorKit from "../ReactEditorKit";
import SafeSandboxedRenderer from "../components/SafeSandboxedRenderer";

export default function AnOtherPage() {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "24px 16px",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "24px", color: "#111827" }}>
            React Text Editor Kit
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <ReactEditorKit
          value={value}
          onChange={setValue}
          mainProps={{ className: "red" }}
          placeholder="Please Write Something..."
          apiKey={"f2a84881-3ad9-4707-a26b-039b5bb179d7"}
          height={"420px"}
        />
      </form>

      {value && (
        <div style={{ marginTop: "28px" }}>
          <h3
            style={{ fontSize: "16px", color: "#374151", marginBottom: "10px" }}
          >
            Live Rendered Output (Safe Sandboxed Environment):
          </h3>
          <SafeSandboxedRenderer htmlContent={value} />
        </div>
      )}
    </div>
  );
}
