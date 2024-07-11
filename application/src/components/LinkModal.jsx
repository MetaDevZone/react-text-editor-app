import React, { useEffect, useState } from "react";

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
    <div className="link-modal">
      <div className="select-type">
        <button
          className={`${inputs.link_type === "text" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e, "text")}
        >
          Text
        </button>
        <button
          className={`${inputs.link_type === "image" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e, "image")}
        >
          Image
        </button>
        <button
          className={`${inputs.link_type === "button" ? "selected-type" : ""}`}
          onClick={(e) => handleChangeType(e, "button")}
        >
          Button
        </button>
      </div>
      <>
        <div className="react-editor-mt-10">
          <label htmlFor="link">URL*</label>
          <input
            id="link"
            type="text"
            name="link"
            autoFocus
            className="form-control-input"
            value={inputs.link}
            onChange={handleChange}
          />
          {errorMessage.type === "link" && (
            <div className="editor-error-messsage">
              *{`${errorMessage.message}`}
            </div>
          )}
        </div>
        {inputs.link_type === "image" ? (
          <>
            {imageUrl ? (
              <div className="link-image-box">
                <span className="link-image-cross" onClick={handleCross}>
                  x
                </span>
                <img src={imageUrl} alt="ImageLink" className="link-image" />
              </div>
            ) : (
              <div className="react-editor-mt-10">
                <label htmlFor="image">Choose File *</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="form-control-input"
                  accept="image/*"
                  onChange={handleChangeFile}
                />
                {errorMessage.type === "image" && (
                  <div className="editor-error-messsage">
                    *{`${errorMessage.message}`}
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="react-editor-mt-10">
            <label htmlFor="text">{`Text to display ${
              inputs.link_type === "button" ? "*" : ""
            }`}</label>
            <input
              id="text"
              type="text"
              name="text"
              value={inputs.text}
              onChange={handleChange}
              className="form-control-input"
            />
            {errorMessage.type === "button" && (
              <div className="editor-error-messsage">
                *{`${errorMessage.message}`}
              </div>
            )}
          </div>
        )}

        <div className="react-editor-mt-10">
          <label htmlFor="open_new_tab">Open in</label>
          <select
            name="open_new_tab"
            id="open_new_tab"
            className="form-control-input react-editor-mt-2"
            value={inputs.open_new_tab}
            onChange={handleChange}
          >
            <option value={false}>Current window</option>
            <option value={true}>New window</option>
          </select>
        </div>
        <div className="react-editor-text-end">
          <button className="save-button" onClick={handleLinkInsert}>
            Save
          </button>
        </div>
      </>
    </div>
  );
}
