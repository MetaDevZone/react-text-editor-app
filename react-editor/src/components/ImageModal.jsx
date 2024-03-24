import React, { useState } from "react";

export default function ImageModal(props) {
  const { onImageInsert, item, setIsLoading, setIsOpenModel } = props;
  const [inputs, setInputs] = useState({
    link: "",
    height: "",
    width: "",
    type: "general",
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    setInputs((old) => ({ ...old, [name]: files[0] }));
  };

  const handleLinkInsert = async (e) => {
    e.preventDefault();
    if (item?.handleSubmit) {
      if (item.add_functionality) {
        item.handleSubmit(item);
        if (inputs.type === "upload") {
          inputs.link = URL.createObjectURL(inputs.link);
        }
      } else {
        if (inputs.type === "upload") {
          setIsOpenModel("");
          setIsLoading(true);
          inputs.link = await item.handleSubmit(
            { ...inputs, file: inputs.link },
            item,
            inputs
          );
        }
      }
    } else if (inputs.type === "upload") {
      inputs.link = URL.createObjectURL(inputs.link);
    }
    onImageInsert(inputs);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleChangeType = (e, value) => {
    e.preventDefault();
    setInputs((old) => ({ ...old, type: value }));
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
          className={`${inputs.type === "upload" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e, "upload")}
        >
          Upload
        </button>
      </div>
      <form onSubmit={handleLinkInsert}>
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
        ) : (
          <>
            <div className="react-editor-mt-10">
              <label htmlFor="image">Choose File</label>
              <input
                type="file"
                id="image"
                name="link"
                className="form-control-input"
                accept="image/*"
                onChange={handleChangeFile}
              />
            </div>
          </>
        )}

        <div className="react-editor-text-end">
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}
