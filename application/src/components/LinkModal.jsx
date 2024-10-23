import React, { useEffect, useState } from "react";
import Styles from "../css/style.module.css";

export default function LinkModal(props) {
  const {
    onLinkInsert,
    item,
    setIsOpenModel,
    selectedData,
    imageUrl,
    setImageUrl,
    image_handler,
    setIsLoading,
  } = props;
  const [errorMessage, setErrorMessage] = useState({});
  const [inputs, setInputs] = useState({
    text: "",
    link: "",
    open_new_tab: false,
    link_type: "text",
  });

  const handleLinkInsert = (e) => {
    e.preventDefault();
    if (!inputs.link) {
      let error = {
        type: "link",
        message: "Please add link URL",
      };
      setErrorMessage(error);
      return;
    } else if (inputs.link_type === "image" && !imageUrl) {
      let error = {
        type: "image",
        message: "Please upload image",
      };
      setErrorMessage(error);
      return;
    } else if (inputs.link_type === "button" && !inputs.text) {
      let error = {
        type: "button",
        message: "Please add text to display on button",
      };
      setErrorMessage(error);
      return;
    }
    if (item?.handleSubmit) {
      item.handleSubmit(item);
      if (!item.add_functionality) {
        setIsOpenModel("");
        return;
      }
    }
    onLinkInsert(inputs);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((old) => ({ ...old, [name]: value }));
  };

  const handleCross = () => {
    setImageUrl("");
  };

  const handleChangeFile = async (event) => {
    const { files } = event.target;
    let data = {
      image: files[0],
    };
    if (image_handler) {
      setIsLoading(true);
      let image_path = await image_handler(data);
      if (image_path) {
        setImageUrl(image_path);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } else {
      setImageUrl(URL.createObjectURL(data.image));
    }
  };

  const handleChangeType = (e, value) => {
    e.preventDefault();
    setInputs((old) => ({ ...old, link_type: value }));
    setErrorMessage("");
  };

  useEffect(() => {
    if (selectedData?.text) {
      let selected_data = { ...selectedData };
      let type = selected_data.link_type;
      if (!type) {
        selected_data.link_type = "text";
      }
      setInputs(selected_data);
    }
  }, [selectedData]);

  return (
    <>
      <div className={Styles.selectType}>
        <button
          className={`${
            inputs.link_type === "text" ? Styles.selectedType : ""
          }`}
          onClick={(e) => handleChangeType(e, "text")}
        >
          Text
        </button>
        <button
          className={`${
            inputs.link_type === "image" ? Styles.selectedType : ""
          }`}
          onClick={(e) => handleChangeType(e, "image")}
        >
          Image
        </button>
        <button
          className={`${
            inputs.link_type === "button" ? Styles.selectedType : ""
          }`}
          onClick={(e) => handleChangeType(e, "button")}
        >
          Button
        </button>
      </div>
      <>
        <div className={Styles.reactEditorMt10}>
          <label htmlFor="link">URL*</label>
          <input
            id="link"
            type="text"
            name="link"
            autoFocus
            className={Styles.formControlInput}
            value={inputs.link}
            onChange={handleChange}
          />
          {errorMessage.type === "link" && (
            <div className={Styles.editorErrorMessage}>
              *{`${errorMessage.message}`}
            </div>
          )}
        </div>
        {inputs.link_type === "image" ? (
          <>
            {imageUrl ? (
              <div className={Styles.linkImageBox}>
                <span className={Styles.linkImageCross} onClick={handleCross}>
                  x
                </span>
                <img
                  src={imageUrl}
                  alt="ImageLink"
                  className={Styles.linkImage}
                />
              </div>
            ) : (
              <div className={Styles.reactEditorMt10}>
                <label htmlFor="image">Choose File *</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className={Styles.formControlInput}
                  accept="image/*"
                  onChange={handleChangeFile}
                />
                {errorMessage.type === "image" && (
                  <div className={Styles.editorErrorMessage}>
                    *{`${errorMessage.message}`}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className={Styles.reactEditorMt10}>
            <label htmlFor="text">{`Text to display ${
              inputs.link_type === "button" ? "*" : ""
            }`}</label>
            <input
              id="text"
              type="text"
              name="text"
              value={inputs.text}
              onChange={handleChange}
              className={Styles.formControlInput}
            />
            {errorMessage.type === "button" && (
              <div className={Styles.editorErrorMessage}>
                *{`${errorMessage.message}`}
              </div>
            )}
          </div>
        )}

        <div className={Styles.reactEditorMt10}>
          <label htmlFor="open_new_tab">Open in</label>
          <select
            name="open_new_tab"
            id="open_new_tab"
            className={`${Styles.formControlInput} ${Styles.reactEditorMt2}`}
            value={inputs.open_new_tab}
            onChange={handleChange}
          >
            <option value={false}>Current window</option>
            <option value={true}>New window</option>
          </select>
        </div>
        <div className={Styles.reactEditorTextEnd}>
          <button className={Styles.saveButton} onClick={handleLinkInsert}>
            Save
          </button>
        </div>
      </>
    </>
  );
}
