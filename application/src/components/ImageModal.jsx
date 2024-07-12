import React, { useEffect, useState } from "react";
import LockIcon from "./SVGImages/LockIcon";
import UnlockIcon from "./SVGImages/UnlockIcon";

export default function ImageModal(props) {
  const { onImageInsert, item, setIsLoading, image_handler, selectedData } =
    props;
  const [errorMessage, setErrorMessage] = useState("");
  const [heightRatio, setHeightRatio] = useState(0);
  const [isLocked, setIsLocked] = useState(true);

  const [inputs, setInputs] = useState({
    link: "",
    height: "",
    width: "",
    image: null,
    type: "general",
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    setInputs((oldInputs) => ({ ...oldInputs, [name]: files[0] }));
  };

  const MAX_RETRIES = 3;

  const get_image_dimentions = (image_path, retries = 0) => {
    let img_width = 0;
    let img_height = 0;
    const img = new Image();
    img.onload = function () {
      img_width = img.width;
      img_height = img.height;
      setInputs((old) => ({
        ...old,
        width: img_width,
        height: img_height,
      }));
      setIsLoading(false);
    };
    img.onerror = function () {
      setIsLoading(false);
      if (retries < MAX_RETRIES) {
        get_image_dimentions(image_path, retries + 1);
      }
    };
    img.src = image_path;
  };

  const handleLinkInsert = async (e) => {
    e.preventDefault();
    if (inputs.type === "general") {
      if (!inputs.link) {
        let error_message = "Image source is required";
        setErrorMessage(error_message);
        return;
      }
      onImageInsert(inputs);
    } else {
      if (!inputs.image) {
        let error_message = "Please upload image";
        setErrorMessage(error_message);
        return;
      }
      if (image_handler) {
        setIsLoading(true);
        let image_path = await image_handler({ ...inputs }, item);
        if (image_path) {
          get_image_dimentions(image_path);
          setInputs((old) => ({ ...old, type: "general", link: image_path }));
        } else {
          setIsLoading(false);
        }
        return;
      } else {
        inputs.link = URL.createObjectURL(inputs.image);
        inputs.width = "";
        inputs.height = "";
      }
      if (!inputs.link) {
        setIsLoading(false);
        return;
      }
      onImageInsert(inputs);
    }
  };

  const handleChangeHW = (event) => {
    const { name, value } = event.target;
    let height = inputs.height;
    let width = inputs.width;
    if (name === "width") {
      height = value / heightRatio;
      width = value;
    } else {
      width = value * heightRatio;
      height = value;
    }
    height = Math.round(height);
    width = Math.round(width);
    setInputs((old) => ({ ...old, height, width }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (isLocked && name !== "link") {
      handleChangeHW(event);
      return;
    }
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleChangeType = (e, value) => {
    e.preventDefault();
    setInputs((old) => ({ ...old, type: value, image: null }));
    setErrorMessage("");
  };

  useEffect(() => {
    if (selectedData?.link) {
      let height = selectedData.width / selectedData.height;
      setHeightRatio(height);
      setInputs({ ...inputs, ...selectedData });
    }
  }, [selectedData]);

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
              <div className="react-editor-mt-10 react-editor-w-40">
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
              <div className="react-editor-mt-10 react-editor-w-40">
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
              <div
                className="lock-unlock-icon"
                onClick={() => setIsLocked(!isLocked)}
              >
                {isLocked ? <LockIcon /> : <UnlockIcon />}
              </div>
            </div>
          </>
        ) : (
          <div className="react-editor-mt-10">
            <label htmlFor="image">Choose File</label>
            <input
              type="file"
              id="image"
              name="image"
              className="form-control-input"
              accept="image/*"
              onChange={handleChangeFile}
            />
            {errorMessage && (
              <div className="editor-error-messsage">*{`${errorMessage}`}</div>
            )}
          </div>
        )}
        <div className="react-editor-text-end">
          <button className="save-button" onClick={handleLinkInsert}>
            Save
          </button>
        </div>
      </>
    </div>
  );
}
