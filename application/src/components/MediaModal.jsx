import React, { useEffect, useState } from "react";
import Styles from "../css/style.module.css";

export default function MediaModal({
  onMediaInsert,
  targetElement = null,
  targetElementType = "",
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputs, setInputs] = useState({
    link: "",
    height: "",
    embed_code: "",
    width: "",
    type: "general",
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    setInputs((old) => ({ ...old, [name]: files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.type === "general" && !inputs.link) {
      let error_message = "Video source is required";
      setErrorMessage(error_message);
      return;
    } else if (inputs.type === "upload" && !inputs.link) {
      let error_message = "Please upload media file";
      setErrorMessage(error_message);
      return;
    } else if (inputs.type === "embed" && !inputs.embed_code) {
      let error_message = "Please add video embed code";
      setErrorMessage(error_message);
      return;
    }
    onMediaInsert(inputs, targetElement);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleChangeType = (e, value) => {
    e.preventDefault();
    setInputs((old) => ({ ...old, type: value }));
    setErrorMessage("");
  };

  useEffect(() => {
    if (targetElement) {
      const newInputs = {
        link: targetElement.getAttribute("src") || "",
        height: targetElement.getAttribute("height") || "",
        width: targetElement.getAttribute("width") || "",
        embed_code:
          targetElementType == "general" ? "" : targetElement.outerHTML || "",
        type: targetElementType || "general",
      };

      setInputs(newInputs);
    }
  }, [targetElement, targetElementType]);

  return (
    <div className={Styles.mediaModal}>
      <div className={Styles.selectType}>
        <button
          className={`${inputs.type === "general" ? `${Styles.selectedType}` : ""}`}
          onClick={(e) => handleChangeType(e, "general")}
        >
          General
        </button>
        <button
          className={`${inputs.type === "embed" ? `${Styles.selectedType}` : ""}`}
          onClick={(e) => handleChangeType(e, "embed")}
        >
          Embed
        </button>
        {/* <button
          className={`${inputs.type === "upload" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e,"upload")}
        >
          Upload
        </button> */}
      </div>
      <>
        {inputs.type === "general" ? (
          <>
            <div className={Styles.reactEditorMt10}>
              <label htmlFor="link">Source</label>
              <input
                id="link"
                type="text"
                name="link"
                autoFocus
                className={Styles.formControlInput}
                value={inputs.link}
                onChange={handleChange}
              />
              {errorMessage && (
                <div className={Styles.editorErrorMessage}>
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
            <div
              className={`${Styles.reactEditorDFlex} ${Styles.justifyContentBetween}`}
            >
              <div
                className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}
              >
                <label htmlFor="height">Height</label>
                <input
                  id="height"
                  type="number"
                  name="height"
                  value={inputs.height}
                  onChange={handleChange}
                  className={Styles.formControlInput}
                />
              </div>
              <div
                className={`${Styles.reactEditorMt10} ${Styles.reactEditorW47}`}
              >
                <label htmlFor="width">Width</label>
                <input
                  id="width"
                  type="number"
                  name="width"
                  value={inputs.width}
                  onChange={handleChange}
                  className={Styles.formControlInput}
                />
              </div>
            </div>
          </>
        ) : inputs.type === "embed" ? (
          <>
            <div className={Styles.reactEditorMt10}>
              <label htmlFor="embed_code">Paste your embed code below:</label>
              <textarea
                id="embed_code"
                name="embed_code"
                rows={5}
                autoFocus
                className={Styles.formControlInput}
                value={inputs.embed_code}
                onChange={handleChange}
              />
              {errorMessage && (
                <div className={Styles.editorErrorMessage}>
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={Styles.reactEditorMt10}>
              <label htmlFor="link">Choose File</label>
              <input
                type="file"
                id="link"
                name="link"
                className={Styles.formControlInput}
                accept="video/*"
                onChange={handleChangeFile}
              />
              {errorMessage && (
                <div className={Styles.editorErrorMessage}>
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
          </>
        )}

        <div className={Styles.reactEditorTextEnd}>
          <button className={Styles.saveButton} onClick={handleSubmit}>
            Save
          </button>
        </div>
      </>
    </div>
  );
}
