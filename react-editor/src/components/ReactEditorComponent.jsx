import React, { useEffect, useRef, useState } from "react";
import "../css/style.css";
import LinkModal from "./LinkModal";
import ImageModal from "./ImageModal";
import MediaModal from "./MediaModal";
import Modal from "./Model";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BoldIcon,
  ClearFormatting,
  DecreaseIndentIcon,
  ImageIcon,
  IncreaseIndentIcon,
  ItalicIcon,
  LTRIcon,
  LinkIcon,
  OrderdList,
  RTLIcon,
  RedoIcon,
  SelectAll,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  UndoIcon,
  UnorderdList,
  VideoIcon,
} from ".";
import SpecialChars from "./SpecialChars";
import SelectFormat from "./SelectFormat";
import ButtonFunction from "./ButtonFunction";
import SelectInsert from "./SelectInsert";
import SelectView from "./SelectView";
import SelectFileOptions from "./SelectFileOptions";
import ViewSourceModel from "./ViewSourceModel";
import PreviewModel from "./PreviewModel";
import SelectFormations from "./SelectFormations";
import ManageColors from "./ManageColors";
import SimpleButton from "./SimpleButton";
import { NAVBAR_ITEMS, TOOLBAR_ITEMS } from "./constant";
import ViewLoadingModel from "./ViewLoadingModel";
import PasteIcon from "./SVGImages/PasteIcon";
import CutIcon from "./SVGImages/CutIcon";
import CopyIcon from "./SVGImages/CopyIcon";

export default function ReactEditorComponent(props) {
  let {
    theme_config,
    toolbar,
    navbar,
    value,
    onChange,
    getEditorRef,
    mainProps,
    placeholder,
    image_handler,
    handleFullScreen,
    setIsFullScreen,
    isFullScreen,
    ...others
  } = props;
  const editorRef = useRef(null);
  const [viewSource, setViewSource] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [sourceCode, setSourceCode] = useState("");
  const [isOpenModel, setIsOpenModel] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [showHR1, setShowHR1] = useState(false);
  const [showHR2, setShowHR2] = useState(false);
  const [showHR3, setShowHR3] = useState(false);

  const handleInput = () => {
    const content = editorRef.current.innerHTML;
    if (!content.startsWith("<p>") || !content.endsWith("</p>")) {
      document.execCommand("formatBlock", false, "<p>");
    }
    if (onChange) {
      onChange(content);
    }
  };

  const handleOpenModel = (e, type, item) => {
    e.preventDefault();
    setIsPlaceholder(false);
    setIsOpenModel(type);
    setSelectedItem(item);
  };
  const handleCloseModel = (e) => {
    e.preventDefault();
    setIsOpenModel("");
  };

  const handleSaveSource = (e) => {
    e.preventDefault();
    if (editorRef.current) {
      editorRef.current.innerHTML = sourceCode;
      setViewSource(false);
    }
  };

  const handleSelectAll = (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection.toString()) {
      const range = document.createRange();
      range.selectNodeContents(editorRef.current);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      selection.removeAllRanges();
    }
  };

  const handleInsertHRClick = () => {
    focusCursorAtPosition(cursorPosition);
    document.execCommand("insertHorizontalRule");
  };

  const handleLinkInsert = (props) => {
    let { text, link, open_new_tab } = props;
    if (!text) {
      text = link;
    }
    let linkHTML = `<a href="${link}"`;
    if (open_new_tab) {
      linkHTML += ' target="_blank"';
    }
    linkHTML += `>${text}</a>`;
    focusCursorAtPosition(cursorPosition);
    document.execCommand("insertHTML", false, linkHTML);
    setIsOpenModel("");
  };

  const handleImageInsert = (data) => {
    let { link, height, width } = data;
    let imgElement = `<img src="${link}" alt="Image"`;
    if (height) {
      imgElement += ` height="${height}"`;
    }
    if (width) {
      imgElement += ` width="${width}"`;
    }
    imgElement += `/>`;
    focusCursorAtPosition(cursorPosition);
    document.execCommand("insertHTML", false, imgElement);
    setIsLoading(false);
    setIsOpenModel("");
  };

  const handleMediaInsert = (data) => {
    let { link, height, width, type, embed_code } = data;
    const editorNode = editorRef.current;

    if (type === "general") {
      let iframeElement = "";

      // Check if it's a direct video link
      if (link.match(/\.(mp4|mov|avi|wmv)$/)) {
        iframeElement = `<video width="${width || "640"}" height="${
          height || "360"
        }" controls><source src="${link}" type="video/mp4"></video>`;
      } else {
        // Check for specific video platforms
        const youtubeRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(\d+)/;

        if (link.match(youtubeRegex)) {
          const videoId = link.match(youtubeRegex)[1];
          iframeElement = `<iframe width="${width || "640"}" height="${
            height || "360"
          }" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (link.match(vimeoRegex)) {
          const videoId = link.match(vimeoRegex)[1];
          iframeElement = `<iframe src="https://player.vimeo.com/video/${videoId}" width="${
            width || "640"
          }" height="${
            height || "360"
          }" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else {
          // Insert custom embed code if available
          iframeElement = embed_code || "";
        }
      }

      if (editorNode && iframeElement) {
        // Insert the iframe HTML into the editor content
        focusCursorAtPosition(cursorPosition);
        document.execCommand("insertHTML", false, iframeElement);
      }
    } else if (type === "embed" && embed_code && editorNode) {
      // Insert the provided embed code HTML into the editor content
      focusCursorAtPosition(cursorPosition);
      document.execCommand("insertHTML", false, embed_code);
    }

    setIsOpenModel(""); // Assuming this is setting some state related to the modal
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCharSelect = (e, char) => {
    e.preventDefault();
    if (editorRef.current !== null) {
      focusCursorAtPosition(cursorPosition);
      document.execCommand("insertText", false, char); // Insert the character
      setIsOpenModel(""); // Hide the special characters box
    }
  };

  const cleanHTML = (html) => {
    const cleanedHTML = html.replace(/style="[^"]*"/g, "");
    return cleanedHTML;
  };

  const onPaste = (event) => {
    event.preventDefault(); // Prevent default paste behavior

    const items = (event.clipboardData || event.originalEvent.clipboardData)
      .items;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf("image") !== -1) {
        // Handle image paste
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          // Once the image is loaded, create an img element and append it to the editor
          const imgElement = document.createElement("img");
          imgElement.src = event.target.result;
          editorRef.current.appendChild(imgElement);
        };

        reader.readAsDataURL(blob);
      } else if (item.type === "text/html") {
        // Handle HTML paste
        const html = event.clipboardData.getData("text/html");
        const cleanedHTML = cleanHTML(html);
        const withoutComments = cleanedHTML.replace(/<!--[\s\S]*?-->/g, "");
        document.execCommand("insertHTML", false, withoutComments);
      } else {
        console.warn("Unsupported clipboard item type:", item.type);
      }
    }
  };

  const focusCursorAtPosition = (position) => {
    const editorNode = editorRef.current;
    const selection = window.getSelection();
    const range = document.createRange();

    if (!editorNode) return;

    let currentPosition = 0;
    let found = false;

    const traverseNodes = (node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textLength = node.textContent.length;
        currentPosition += textLength;
        if (position <= currentPosition) {
          range.setStart(node, position - (currentPosition - textLength));
          range.collapse(true);
          found = true;
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (
          node.nodeName === "P" &&
          node.childNodes.length === 1 &&
          node.firstChild.nodeName === "BR"
        ) {
          // If the node is an empty <p> tag with only a <br>, focus the cursor after it
          range.setStartAfter(node.firstChild); // Focus after the <br> element inside the empty <p> tag
          found = true;
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            if (!found) {
              traverseNodes(node.childNodes[i]);
            }
          }
        }
      }
    };

    traverseNodes(editorNode);

    if (!found) {
      const lastChild = editorNode.lastChild;
      if (lastChild) {
        range.setStart(lastChild, lastChild.length);
        range.collapse(true);
      }
    }

    selection.removeAllRanges();
    selection.addRange(range);
    editorNode.focus();
  };

  const getCaretCharacterOffsetWithin = (element) => {
    let caretOffset = 0;
    const doc = element.ownerDocument || element.document;
    const win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection !== "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        const range = win.getSelection().getRangeAt(0);
        const preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;

        // Adjust caretOffset for <p> tags containing only <br> tags
        const pTags = element.querySelectorAll("p");
        pTags.forEach((pTag) => {
          if (
            pTag.childNodes.length === 1 &&
            pTag.childNodes[0].nodeName === "BR"
          ) {
            caretOffset += 1; // Adjust for each <p> tag containing only <br> tags
          }
        });
      }
    } else if ((sel = doc.selection) && sel.type !== "Control") {
      const textRange = sel.createRange();
      const preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  };

  const handleBlur = (event) => {
    const textContent =
      editorRef.current?.textContent || editorRef.current?.innerText;
    const htmlContent = editorRef.current?.innerHTML;
    const caretPos = getCaretCharacterOffsetWithin(event.target);
    setCursorPosition(caretPos);
    if (placeholder && !textContent.trim() && !htmlContent.trim()) {
      setIsPlaceholder(true);
    }
  };

  const handleNewDocument = () => {
    editorRef.current.innerHTML = "";
  };

  const handlePreview = () => {
    setPreviewContent(editorRef.current.innerHTML);
    setOpenPreview(true);
  };

  const formatHTMLWithLineBreaks = (html) => {
    // Add line breaks before opening tags
    let formattedHTML = html.replace(/<(?=[^/])/g, (match) => `\n${match}`);
    formattedHTML = formattedHTML.trim(); // Trim leading/trailing whitespace
    return formattedHTML;
  };

  const handleViewSource = () => {
    if (!viewSource) {
      const content = editorRef.current.innerHTML;
      const formattedContent = formatHTMLWithLineBreaks(content);
      setSourceCode(formattedContent);
    } else {
      setSourceCode("");
    }
    setViewSource(!viewSource);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      toggleFullScreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
    };
  }, []);

  const model_component = () => {
    if (isOpenModel === "link") {
      return {
        component: (
          <LinkModal
            onLinkInsert={handleLinkInsert}
            item={selectedItem}
            setIsOpenModel={setIsOpenModel}
          />
        ),
        title: "Insert Link",
      };
    } else if (isOpenModel === "image") {
      return {
        component: (
          <ImageModal
            onImageInsert={handleImageInsert}
            item={selectedItem}
            setIsLoading={setIsLoading}
            setIsOpenModel={setIsOpenModel}
            image_handler={image_handler}
          />
        ),
        title: "Insert Image",
      };
    } else if (isOpenModel === "video") {
      return {
        component: <MediaModal onMediaInsert={handleMediaInsert} />,
        title: "Insert Video",
      };
    } else if (isOpenModel === "special_char") {
      return {
        component: <SpecialChars handleCharSelect={handleCharSelect} />,
        title: "Insert Special Characters",
      };
    }
  };

  const handleKeyPress = (event) => {
    // if (event.key === "Enter") {
    //   event.preventDefault();
    //   // Insert the line break at the current cursor position instead
    //   document.execCommand("insertHTML", false, "<br>");
    // }
  };

  const handleHidePlaceholder = (e) => {
    e.preventDefault();
    setIsPlaceholder(false);
    setTimeout(() => {
      editorRef.current.focus();
    }, 10);
  };

  useEffect(() => {
    if (isFullScreen && editorRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      const editorNode = editorRef.current;
      range.selectNodeContents(editorNode);
      range.collapse(false); // Move cursor to the end
      selection.removeAllRanges();
      selection.addRange(range);
      editorNode.focus();
    }
  }, [isFullScreen]);

  if (theme_config && Object.keys(theme_config).length > 0) {
    Object.keys(theme_config).forEach(function (key, index) {
      document.documentElement.style.setProperty(
        `--editor-${key}`,
        theme_config[key]
      );
    });
  }

  if (!toolbar) {
    toolbar = TOOLBAR_ITEMS;
  }

  if (!navbar) {
    navbar = NAVBAR_ITEMS;
  }

  useEffect(() => {
    if (editorRef.current && value) {
      // Set initial value when editorRef is available
      editorRef.current.innerHTML = value;
    }
  }, []);

  useEffect(() => {
    if (getEditorRef) {
      getEditorRef(editorRef);
    }
  }, [editorRef]);

  const handlePaste = (e) => {
    e.preventDefault();
    editorRef.current.focus();
    navigator.clipboard
      .read()
      .then((clipboardItems) => {
        clipboardItems.forEach((item) => {
          if (
            item.types.includes("image/png") ||
            item.types.includes("image/jpeg")
          ) {
            item
              .getType(item.types[0])
              .then((imageBlob) => {
                // Now you have the image blob, you can create an <img> element and append it to your editor
                const imgElement = document.createElement("img");
                imgElement.src = URL.createObjectURL(imageBlob);
                editorRef.current.appendChild(imgElement);
              })
              .catch((error) => {
                console.error("Error reading image content:", error);
              });
          } else if (item.types.includes("text/html")) {
            item
              .getType("text/html")
              .then((htmlBlob) => {
                htmlBlob
                  .text()
                  .then((htmlContent) => {
                    const cleanedHTML = cleanHTML(htmlContent);
                    const withoutComments = cleanedHTML.replace(
                      /<!--[\s\S]*?-->/g,
                      ""
                    );
                    editorRef.current.innerHTML += withoutComments;
                  })
                  .catch((error) => {
                    console.error("Error reading HTML content:", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Error getting HTML type from ClipboardItem:",
                  error
                );
              });
          }
        });
      })
      .catch((error) => {
        console.error("Error reading clipboard:", error);
      });
  };

  const handle_resize = () => {
    const hr_1 = document.getElementsByClassName("wysiwyg-editor__toolbar")[0];
    console.log(hr_1.offsetHeight, "hr_1.offsetHeight");
    setShowHR1(hr_1.offsetHeight > 34);
    const hr_2 = document.getElementsByClassName("wysiwyg-editor__toolbar")[1];
    console.log(hr_2.offsetHeight, "hr_2.offsetHeight");
    setShowHR2(hr_2.offsetHeight > 34);
    setShowHR3(hr_2.offsetHeight > 65);
  };

  useEffect(() => {
    handle_resize();
    window.addEventListener("resize", handle_resize);
    return () => {
      window.removeEventListener("resize", handle_resize);
    };
  }, []);

  const dynamicStyle =
    isFullScreen && document.getElementById("action-components")
      ? {
          height: `calc(100vh - ${
            document.getElementById("action-components").offsetHeight
          }px - 22px)`,
        }
      : {};

  return (
    <>
      <div {...mainProps} className={`react-editor-main`}>
        <div id="action-components">
          <div className="wysiwyg-editor__toolbar" id="editor-navbar">
            <hr
              className="hr-1"
              style={{ display: showHR1 ? "block" : "none" }}
            />
            {navbar.map((item, index) => {
              let is_line = Boolean(item === "|");
              let is_file = item === "file" || item.name === "file";
              let is_view = item === "view" || item.name === "view";
              let is_format = item === "format" || item.name === "format";
              let is_insert = item === "insert" || item.name === "insert";
              let is_copy = item === "copy" || item.name === "copy";
              let is_cut = item === "cut" || item.name === "cut";
              let is_paste = item === "paste" || item.name === "paste";
              let is_select_all =
                item === "select_all" || item.name === "select_all";
              let is_image = item === "image" || item.name === "image";
              let is_link = item === "link" || item.name === "link";
              let is_video = item === "video" || item.name === "video";
              return (
                <div key={`key${index}`}>
                  {is_line && <div className="vertical-line"></div>}
                  {is_file && (
                    <SelectFileOptions
                      handleNewDocument={handleNewDocument}
                      handlePreview={handlePreview}
                      handlePrint={handlePrint}
                      item={item}
                      isPlaceholder={isPlaceholder}
                      placeholder={placeholder}
                      value={value}
                    />
                  )}
                  {is_view && (
                    <SelectView
                      isFullScreen={isFullScreen}
                      handleViewSource={handleViewSource}
                      toggleFullScreen={toggleFullScreen}
                      item={item}
                      isPlaceholder={isPlaceholder}
                      placeholder={placeholder}
                      value={value}
                    />
                  )}
                  {is_insert && (
                    <SelectInsert
                      onSelectOption={handleOpenModel}
                      handleInsertHR={handleInsertHRClick}
                      item={item}
                    />
                  )}
                  {is_format && (
                    <SelectFormations item={item} isFullScreen={isFullScreen} />
                  )}

                  {is_select_all && (
                    <div className="increase-icon-size">
                      <button
                        onClick={handleSelectAll}
                        title={item?.title ? item.title : "Select All"}
                        disabled={isPlaceholder && placeholder && !value}
                      >
                        {item?.icon ? item.icon : <SelectAll />}
                      </button>
                    </div>
                  )}
                  {is_image && (
                    <div className="increase-icon-size">
                      <button
                        onClick={(e) => handleOpenModel(e, "image", item)}
                        title={item?.title ? item.title : "Upload Image"}
                      >
                        {item?.icon ? item.icon : <ImageIcon />}
                      </button>
                    </div>
                  )}
                  {is_link && (
                    <div className="increase-icon-size">
                      <button
                        onClick={(e) => handleOpenModel(e, "link", item)}
                        title={item?.title ? item.title : "Add Link"}
                      >
                        {item?.icon ? item.icon : <LinkIcon />}
                      </button>
                    </div>
                  )}
                  {is_video && (
                    <div className="increase-icon-size">
                      <button
                        onClick={(e) => handleOpenModel(e, "video", item)}
                        title={item?.title ? item.title : "Upload Video"}
                      >
                        {item?.icon ? item.icon : <VideoIcon />}
                      </button>
                    </div>
                  )}
                  {is_copy && (
                    <div className="increase-icon-size">
                      <ButtonFunction
                        name="copy"
                        icon={<CopyIcon />}
                        title="Copy"
                        item={item}
                        disabled={isPlaceholder && placeholder && !value}
                      />
                    </div>
                  )}
                  {is_cut && (
                    <div className="increase-icon-size">
                      <ButtonFunction
                        name="cut"
                        icon={<CutIcon />}
                        title="Cut"
                        item={item}
                        disabled={isPlaceholder && placeholder && !value}
                      />
                    </div>
                  )}
                  {is_paste && (
                    <div className="increase-icon-size">
                      <button
                        onClick={handlePaste}
                        title={item?.title ? item.title : "Paste"}
                        disabled={isPlaceholder && placeholder && !value}
                      >
                        {item?.icon ? item.icon : <PasteIcon />}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="wysiwyg-editor__toolbar">
            <hr
              className="hr-1"
              style={{ display: showHR2 ? "block" : "none" }}
            />
            <hr
              className="hr-1 hr-2"
              style={{ display: showHR3 ? "block" : "none" }}
            />
            {toolbar.map((item, index) => {
              let is_line = Boolean(item === "|");
              let is_undo = item === "undo" || item.name === "undo";
              let is_redo = item === "redo" || item.name === "redo";
              let is_bold = item === "bold" || item.name === "bold";
              let is_italic = item === "italic" || item.name === "italic";
              let is_underline =
                item === "underline" || item.name === "underline";
              let is_superscript =
                item === "superscript" || item.name === "superscript";
              let is_subscript =
                item === "subscript" || item.name === "subscript";
              let is_alignLeft =
                item === "alignLeft" || item.name === "alignLeft";
              let is_alignCenter =
                item === "alignCenter" || item.name === "alignCenter";
              let is_alignRight =
                item === "alignRight" || item.name === "alignRight";
              let is_alignJustify =
                item === "alignJustify" || item.name === "alignJustify";
              let is_indent = item === "indent" || item.name === "indent";
              let is_outdent = item === "outdent" || item.name === "outdent";
              let is_orderedList =
                item === "orderedList" || item.name === "orderedList";
              let is_unorderedList =
                item === "unorderedList" || item.name === "unorderedList";
              let is_removeFormat =
                item === "removeFormat" || item.name === "removeFormat";
              let is_textColor =
                item === "textColor" || item.name === "textColor";
              let is_backgroundColor =
                item === "backgroundColor" || item.name === "backgroundColor";
              let is_ltr = item === "ltr" || item.name === "ltr";
              let is_rtl = item === "rtl" || item.name === "rtl";
              let is_format = item === "format" || item.name === "format";

              return (
                <div key={`key${index}`}>
                  {is_line && <div className="vertical-line"></div>}
                  {is_undo && (
                    <ButtonFunction
                      name="undo"
                      icon={<UndoIcon />}
                      title={item.title ? item.title : "Undo"}
                      item={item}
                    />
                  )}
                  {is_redo && (
                    <ButtonFunction
                      name="redo"
                      icon={<RedoIcon />}
                      title="Redo"
                      item={item}
                    />
                  )}
                  {is_format && <SelectFormat editorRef={editorRef} />}

                  {is_bold && (
                    <ButtonFunction
                      name="bold"
                      icon={<BoldIcon />}
                      title="Bold"
                      item={item}
                    />
                  )}
                  {is_italic && (
                    <ButtonFunction
                      name="italic"
                      icon={<ItalicIcon />}
                      title="Italic"
                      item={item}
                    />
                  )}
                  {is_underline && (
                    <ButtonFunction
                      name="underline"
                      icon={<UnderlineIcon />}
                      title="Underline"
                      item={item}
                    />
                  )}
                  {is_superscript && (
                    <ButtonFunction
                      name="superscript"
                      icon={<SuperscriptIcon />}
                      title="Superscript"
                      item={item}
                    />
                  )}
                  {is_subscript && (
                    <ButtonFunction
                      name="subscript"
                      icon={<SubscriptIcon />}
                      title="Subscript"
                      item={item}
                    />
                  )}
                  {is_alignLeft && (
                    <ButtonFunction
                      name="justifyLeft"
                      icon={<AlignLeft />}
                      title="Align Left"
                      item={item}
                    />
                  )}
                  {is_alignCenter && (
                    <ButtonFunction
                      name="justifyCenter"
                      icon={<AlignCenter />}
                      title="Align Center"
                      item={item}
                    />
                  )}
                  {is_alignRight && (
                    <ButtonFunction
                      name="justifyRight"
                      icon={<AlignRight />}
                      title="Align Right"
                      item={item}
                    />
                  )}
                  {is_alignJustify && (
                    <ButtonFunction
                      name="justifyFull"
                      icon={<AlignJustify />}
                      title="Align Justify"
                      item={item}
                    />
                  )}
                  {is_indent && (
                    <ButtonFunction
                      name="indent"
                      icon={<IncreaseIndentIcon />}
                      title="Increase IndentIcon"
                      item={item}
                    />
                  )}
                  {is_outdent && (
                    <ButtonFunction
                      name="outdent"
                      icon={<DecreaseIndentIcon />}
                      title="Decrease IndentIcon"
                      item={item}
                    />
                  )}
                  {is_orderedList && (
                    <ButtonFunction
                      name="insertOrderedList"
                      icon={<OrderdList />}
                      title="Insert/Remove Numbered List"
                      item={item}
                    />
                  )}
                  {is_unorderedList && (
                    <ButtonFunction
                      name="insertUnorderedList"
                      icon={<UnorderdList />}
                      title="Insert/Remove Bulleted List"
                      item={item}
                    />
                  )}
                  {is_removeFormat && (
                    <ButtonFunction
                      name="removeFormat"
                      icon={<ClearFormatting />}
                      title="Remove Format"
                      item={item}
                    />
                  )}
                  {is_textColor && (
                    <ManageColors
                      type="foreColor"
                      title="Text Color"
                      item={item}
                    />
                  )}
                  {is_backgroundColor && (
                    <ManageColors
                      type="hiliteColor"
                      title="Background Color"
                      item={item}
                    />
                  )}
                  {is_ltr && (
                    <SimpleButton
                      name="ltr"
                      title="Left To Right"
                      item={item}
                      icon={<LTRIcon />}
                      editorRef={editorRef}
                    />
                  )}
                  {is_rtl && (
                    <SimpleButton
                      name="rtl"
                      title="Right To Left"
                      item={item}
                      icon={<RTLIcon />}
                      editorRef={editorRef}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {isPlaceholder && placeholder && !value ? (
          <div
            {...others}
            className="ml-main-content-box placeholder-text"
            onClick={handleHidePlaceholder}
            style={dynamicStyle}
          >
            {placeholder}
          </div>
        ) : (
          <div
            {...others}
            className={`ml-main-content-box print-only `}
            autoFocus={isFullScreen}
            contentEditable
            ref={editorRef}
            onPaste={onPaste}
            spellCheck="true"
            onInput={handleInput}
            onBlur={handleBlur}
            onKeyDown={handleKeyPress}
            id="editable"
            style={dynamicStyle}
          ></div>
        )}
      </div>
      {isOpenModel && (
        <Modal
          isOpen={isOpenModel}
          onClose={handleCloseModel}
          title={model_component().title}
        >
          {model_component().component}
        </Modal>
      )}
      {isLoading && (
        <ViewLoadingModel
          viewSource={viewSource}
          setViewSource={setViewSource}
          sourceCode={sourceCode}
          setSourceCode={setSourceCode}
          handleSaveSource={handleSaveSource}
        />
      )}
      {viewSource && (
        <ViewSourceModel
          viewSource={viewSource}
          setViewSource={setViewSource}
          sourceCode={sourceCode}
          setSourceCode={setSourceCode}
          handleSaveSource={handleSaveSource}
        />
      )}
      {openPreview && (
        <PreviewModel
          openPreview={openPreview}
          setOpenPreview={setOpenPreview}
          previewContent={previewContent}
        />
      )}
      <div id="modal-root"></div>
    </>
  );
}
