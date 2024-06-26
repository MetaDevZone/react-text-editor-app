import React, { useState } from "react";

export default function MediaModal({ onMediaInsert }) {
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
    onMediaInsert(inputs);
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

  return (
    <div className="link-modal">
      <div className="select-type">
        <button
          className={`${inputs.type === "general" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e, "general")}
        >
          General
        </button>
        <button
          className={`${inputs.type === "embed" ? "selected-type" : ""}`}
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
            <div className="react-editor-mt-10">
              <label htmlFor="link">Source</label>
              <input
                id="link"
                type="text"
                name="link"
                autoFocus
                className="form-control-input"
                value={inputs.link}
                onChange={handleChange}
              />
              {errorMessage && (
                <div className="editor-error-messsage">
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
            <div className="react-editor-d-flex justify-content-between">
              <div className="react-editor-mt-10 react-editor-w-47">
                <label htmlFor="height">Height</label>
                <input
                  id="height"
                  type="text"
                  name="height"
                  value={inputs.height}
                  onChange={handleChange}
                  className="form-control-input"
                />
              </div>
              <div className="react-editor-mt-10 react-editor-w-47">
                <label htmlFor="width">Width</label>
                <input
                  id="width"
                  type="text"
                  name="width"
                  value={inputs.width}
                  onChange={handleChange}
                  className="form-control-input"
                />
              </div>
            </div>
          </>
        ) : inputs.type === "embed" ? (
          <>
            <div className="react-editor-mt-10">
              <label htmlFor="embed_code">Paste your embed code below:</label>
              <textarea
                id="embed_code"
                name="embed_code"
                rows={5}
                autoFocus
                className="form-control-input"
                value={inputs.embed_code}
                onChange={handleChange}
              />
              {errorMessage && (
                <div className="editor-error-messsage">
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="react-editor-mt-10">
              <label htmlFor="link">Choose File</label>
              <input
                type="file"
                id="link"
                name="link"
                className="form-control-input"
                accept="video/*"
                onChange={handleChangeFile}
              />
              {errorMessage && (
                <div className="editor-error-messsage">
                  *{`${errorMessage}`}
                </div>
              )}
            </div>
          </>
        )}

        <div className="react-editor-text-end">
          <button className="save-button" onClick={handleSubmit}>
            Save
          </button>
        </div>
      </>
    </div>
  );
}
