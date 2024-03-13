import React, { useState } from "react";

export default function LinkModal({ onLinkInsert, item, setIsOpenModel }) {
  const [inputs, setInputs] = useState({
    text: "",
    link: "",
    open_new_tab: false,
  });

  const handleLinkInsert = (e) => {
    e.preventDefault();
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

  return (
    <div className="link-modal">
      <form onSubmit={handleLinkInsert}>
        <div className="react-editor-mt-10">
          <label htmlFor="link">URL</label>
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
        <div className="react-editor-mt-10">
          <label htmlFor="text">Text to display</label>
          <input
            id="text"
            type="text"
            name="text"
            value={inputs.text}
            onChange={handleChange}
            className="form-control-input"
          />
        </div>
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
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}
