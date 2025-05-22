import React, { useEffect, useState } from "react";
import LockIcon from "./SVGImages/LockIcon";
import UnlockIcon from "./SVGImages/UnlockIcon";
import Styles from "../css/style.module.css";

export default function ImageModal(props) {
  const { onImageInsert, item, setIsLoading, image_handler, selectedData } =
    props;
  const [errorMessage, setErrorMessage] = useState("");
  const [heightRatio, setHeightRatio] = useState(0);
  const [isLocked, setIsLocked] = useState(true);
  const [allowSHW, setAllowSHW] = useState(false);

  const [inputs, setInputs] = useState({
    link: "",
    height: "",
    width: "",
    image: null,
    type: "general",
  });

  const handleChangeFile = (event) => {
    const { name, files } = event.target;
    setInputs((oldInputs) => ({
      ...oldInputs,
      [name]: files[0],
      height: "",
      width: "",
    }));
  };

  const MAX_RETRIES = 3;

  const get_image_dimentions = (image_path, retries = 0) => {
    let img_width = 0;
    let img_height = 0;
    const img = new Image();
    img.onload = function () {
      img_width = img.width;
      img_height = img.height;
      let ratio = img_width / img_height;
      setHeightRatio(ratio);
      setAllowSHW(true);
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
    if (isLocked && name !== "link" && allowSHW && inputs.link) {
      handleChangeHW(event);
      return;
    }
    if (name === "link" && value === "") {
      setInputs((old) => ({ ...old, height: 0, width: 0 }));
      setAllowSHW(false);
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
      let height = parseFloat(selectedData.height);
      let width = parseFloat(selectedData.width);
      let ratio = width / height;

      setHeightRatio(ratio);
      setAllowSHW(true);
      setInputs({ ...inputs, ...selectedData, height, width });
    }
  }, [selectedData]);

  return (
    <>
      <div className={Styles.selectType}>
        <button
          className={`${
            inputs.type === "general" ? `${Styles.selectedType}` : ""
          }`}
          onClick={(e) => handleChangeType(e, "general")}
        >
          General
        </button>
        <button
          className={`${
            inputs.type === "upload" ? `${Styles.selectedType}` : ""
          }`}
          onClick={(e) => handleChangeType(e, "upload")}
        >
          Upload
        </button>
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
                className={`${Styles.reactEditorMt10} ${Styles.reactEditorW45}`}
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
                className={`${Styles.reactEditorMt10} ${Styles.reactEditorW45}`}
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
              <div
                className={Styles.lockUnlockIcon}
                onClick={() => setIsLocked(!isLocked)}
              >
                {isLocked ? <LockIcon /> : <UnlockIcon />}
              </div>
            </div>
          </>
        ) : (
          <div className={Styles.reactEditorMt10}>
            <label htmlFor="image">Choose File</label>
            <input
              type="file"
              id="image"
              name="image"
              className={Styles.formControlInput}
              accept="image/*"
              onChange={handleChangeFile}
            />
            {errorMessage && (
              <div className={Styles.editorErrorMessage}>
                *{`${errorMessage}`}
              </div>
            )}
          </div>
        )}
        <div className={Styles.reactEditorTextEnd}>
          <button className={Styles.saveButton} onClick={handleLinkInsert}>
            Save
          </button>
        </div>
      </>
    </>
  );
}
