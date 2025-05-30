import React, { useEffect, useRef, useState } from "react";
import "./css/style.css";
import Styles from "./css/style.module.css";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  BoldIcon,
  ClearFormatting,
  CodeIcon,
  DecreaseIndentIcon,
  FullscreenExit,
  FullscreenIcon,
  HorizontalLineIcon,
  ImageIcon,
  IncreaseIndentIcon,
  ItalicIcon,
  LTRIcon,
  LinkIcon,
  OrderdList,
  RTLIcon,
  RedoIcon,
  SelectAll,
  SpecialCharIcon,
  SubscriptIcon,
  SuperscriptIcon,
  UnderlineIcon,
  UndoIcon,
  UnorderdList,
  VideoIcon,
} from "./components";
import SpecialChars from "./components/SpecialChars";
import SelectFormat from "./components/SelectFormat";
import ButtonFunction from "./components/ButtonFunction";
import SelectInsert from "./components/SelectInsert";
import SelectView from "./components/SelectView";
import SelectFileOptions from "./components/SelectFileOptions";
import ViewSourceModel from "./components/ViewSourceModel";
import PreviewModel from "./components/PreviewModel";
import SelectFormations from "./components/SelectFormations";
import ManageColors from "./components/ManageColors";
import SimpleButton from "./components/SimpleButton";
import {
  NAVBAR_ITEMS,
  remove_resizer,
  TOOLBAR_ITEMS,
  transformHTML,
} from "./components/constant";
import ViewLoadingModel from "./components/ViewLoadingModel";
import PasteIcon from "./components/SVGImages/PasteIcon";
import CutIcon from "./components/SVGImages/CutIcon";
import CopyIcon from "./components/SVGImages/CopyIcon";
import LinkModal from "./components/LinkModal";
import ImageModal from "./components/ImageModal";
import MediaModal from "./components/MediaModal";
import Modal from "./components/Model";
import RightClickLinkPopup from "./components/RightClickLinkPopup";
import SelectFontFamily from "./components/SelectFontFamily";
import AlignmentOptions from "./components/AlignmentOptions";
import FontSize from "./components/FontSize";
import "react-image-crop/dist/ReactCrop.css";

const show_final_options = (options, remove, all_options) => {
  if (!options) {
    options = all_options;
  }
  if (remove) {
    options = options.filter((item) => {
      if (typeof item === "string") {
        return !remove.includes(item);
      } else {
        return !remove.includes(item.name);
      }
    });
    // remove | dublication
    options = options.filter((item, index) => {
      return item !== "|" || index === 0 || options[index - 1] !== "|";
    });
  }
  return options;
};

const isValidURL = (str) => {
  // Regular expression to check if the string is a valid URL
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return pattern.test(str);
};

export default function ReactEditorKit(props) {
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
    remove_from_toolbar,
    remove_from_navbar,
    style,
    ...others
  } = props;
  const editorRef = useRef(null);
  const [viewSource, setViewSource] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [init, setInit] = useState(false);
  const [sourceCode, setSourceCode] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isOpenModel, setIsOpenModel] = useState("");
  const [targetElement, setTargetElement] = useState(null);
  const [targetElementType, setTargetElementType] = useState(null);
  const [previewContent, setPreviewContent] = useState("");
  const [selectedData, setSelectedData] = useState({
    link: "",
    height: "",
    width: "",
    type: "general",
    text: "",
    open_new_tab: false,
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isPlaceholder, setIsPlaceholder] = useState(true);
  const [selectedItem, setSelectedItem] = useState({});
  const [selectedRange, setSelectedRange] = useState(null);
  const [showHR1, setShowHR1] = useState(false);
  const [showHR2, setShowHR2] = useState(false);
  const [showHR3, setShowHR3] = useState(false);

  const checkIfImageExists = () => {
    const editor = editorRef?.current;
    if (editor) {
      const imgTag = editor.querySelector("img");
      if (imgTag) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  };

  const handleInput = () => {
    setInit(true);

    const editor = editorRef?.current;
    if (!editor) return;

    let isImageExists = checkIfImageExists();
    if (!isImageExists) {
      let element = document.querySelector(".resizeImageWrapper");
      if (element) {
        element.parentNode.removeChild(element);
      }
      setSelectedEvent(null);
    }

    // --- CAREFUL WRAPPING OF FIRST LINE ---
    const hasOnlyTextOrBR = [...editor.childNodes].every(
      (node) =>
        node.nodeType === Node.TEXT_NODE ||
        (node.nodeType === Node.ELEMENT_NODE && node.nodeName === "BR")
    );

    if (hasOnlyTextOrBR && editor.textContent.trim() !== "") {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);

      // Save caret position relative to start
      const preCaretRange = range?.cloneRange();
      preCaretRange?.selectNodeContents(editor);
      preCaretRange?.setEnd(range.startContainer, range.startOffset);
      const caretOffset = preCaretRange?.toString().length || 0;

      // Wrap text in a <p>
      const wrapper = document.createElement("p");
      while (editor.firstChild) {
        wrapper.appendChild(editor.firstChild);
      }
      editor.appendChild(wrapper);

      // Restore caret
      let newNode = wrapper.firstChild;
      let offset = caretOffset;

      // Traverse to the correct offset
      const setCaret = (node, offset) => {
        const range = document.createRange();
        const selection = window.getSelection();
        range.setStart(node, offset);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
      };

      const traverse = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          if (offset <= node.length) {
            setCaret(node, offset);
            throw "done"; // stop traversal
          } else {
            offset -= node.length;
          }
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            traverse(node.childNodes[i]);
          }
        }
      };

      try {
        traverse(wrapper);
      } catch (e) {}
    }

    function clearEditorFormatting(editor, tempDiv) {
      if (
        editor.getAttribute("data-mlx-editor-empty") ||
        editor.classList.contains("empty")
      ) {
        editor.setAttribute("data-mlx-editor-empty", "true");

        let childdiv;
        if (tempDiv.tagName.toLowerCase() === "div") {
          // Create a new <p> element
          const p = document.createElement("p");
          // Copy the contents of tempDiv to the <p> element
          p.innerHTML = tempDiv.innerHTML;
          // Preserve attributes if needed
          for (let attr of tempDiv.attributes) {
            p.setAttribute(attr.name, attr.value);
          }
          childdiv = p.outerHTML;
        } else {
          childdiv = tempDiv.outerHTML;
        }
        editor.innerHTML = childdiv;
        return;
      }

      editor.setAttribute("data-mlx-editor-empty", "true");
      // Save current selection
      const selection = window.getSelection();
      const range = document.createRange();
      // Completely clear the editor

      range.selectNodeContents(editor);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      editor.innerHTML = "<p><br></p>";
      document.execCommand("removeFormat", false, null);
      // Reset any formatting
      // Optional: Reset any CSS styles
      editor.style.cssText = "";
    }

    // Usage:
    let content = editor.innerHTML;
    content = transformHTML(content);
    const tempDiv = document.createElement("div");

    tempDiv.innerHTML = content;

    let checkEditorIsEmptyAndGetTagName = isEditorEmpty(editor.innerHTML);
    // First check if the content is "effectively empty" (if spaces exist then condition will be false)
    const isEffectivelyEmpty =
      (!tempDiv.textContent ||
        tempDiv.textContent.replace(/\s/g, "").length === 0) &&
      checkEditorIsEmptyAndGetTagName.isEmpty;

    if (isEffectivelyEmpty) {
      clearEditorFormatting(editor, checkEditorIsEmptyAndGetTagName.tempDiv);
    } else {
      editor.removeAttribute("data-mlx-editor-empty");
      onChange?.(tempDiv.innerHTML);
    }
  };

  function isEditorEmpty(html) {
    // Create a temporary DOM element to parse and inspect the structure
    const temp = document.createElement("div");
    temp.innerHTML = html;
    // Remove whitespace text nodes with text type elements
    temp.childNodes.forEach((node) => {
      if (node.type == Node.TEXT_NODE && !node.textContent.trim()) {
        temp.removeChild(node);
      }
    });

    // Case 1: Only a single <br>
    if (temp.children.length === 0 || temp.innerHTML === "<br>") {
      let pTagDiv = document.createElement("P");
      pTagDiv.innerHTML = "<br>";
      return { tempDiv: pTagDiv, isEmpty: true };
    }

    // Case 2: Only a <p> with a <br> inside (ignore styles)
    if (
      temp.children.length === 1 &&
      temp.children[0].children.length === 1 &&
      temp.children[0].children[0].tagName === "BR"
    ) {
      return { tempDiv: temp.children[0], isEmpty: true };
    }

    return { isEmpty: false };
  }

  const handleEditorKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const editor = editorRef.current;
      const selection = window.getSelection();
      if (!selection.rangeCount || !editor) return;

      const range = selection.getRangeAt(0);
      let currentNode = range.startContainer;

      let listItemNode = null;
      // Traverse up to find the nearest LI element
      while (currentNode && currentNode !== editor) {
        if (currentNode.nodeName === "LI") {
          listItemNode = currentNode;
          break;
        }
        currentNode = currentNode.parentNode;
      }

      if (listItemNode) {
        // Create new LI
        const newLI = document.createElement("li");
        newLI.appendChild(document.createElement("br"));
        // Insert after current LI
        if (listItemNode.nextSibling) {
          listItemNode.parentNode.insertBefore(newLI, listItemNode.nextSibling);
        } else {
          listItemNode.parentNode.appendChild(newLI);
        }

        // Move cursor into new LI
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(newLI);
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);
        return;
      }

      // Step 1: Find the containing <p>
      while (
        currentNode &&
        currentNode.nodeName !== "P" &&
        currentNode !== editor
      ) {
        currentNode = currentNode.parentNode;
      }

      let currentP = currentNode?.nodeName === "P" ? currentNode : null;

      // Step 2: Wrap if no <p> exists
      if (!currentP) {
        currentP = document.createElement("p");
        currentP.appendChild(document.createElement("br"));
        editor.appendChild(currentP);
        const newRange = document.createRange();
        newRange.setStart(currentP, 0);
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
        return;
      }

      // Step 3: Split text manually at caret position
      const offset = range.startOffset;
      const container = range.startContainer;

      const newP = document.createElement("p");

      if (container.nodeType === Node.TEXT_NODE) {
        const text = container.nodeValue;
        const beforeText = text.slice(0, offset);
        const afterText = text.slice(offset);

        // Update current node text
        container.nodeValue = beforeText;

        // Insert after text into new <p>
        if (afterText) {
          const afterTextNode = document.createTextNode(afterText);
          newP.appendChild(afterTextNode);
        } else {
          newP.appendChild(document.createElement("br"));
        }
      } else {
        newP.appendChild(document.createElement("br"));
      }

      // Step 4: Insert new <p> after current
      const parent = currentP.parentNode;

      // Only insert if parent is valid and accepts <p>
      if (parent && parent.contains(currentP)) {
        if (currentP.nextSibling) {
          parent.insertBefore(newP, currentP.nextSibling);
        } else {
          parent.appendChild(newP);
        }
      }
      // Step 5: Place caret in new <p>
      const newRange = document.createRange();
      newRange.setStart(newP, 0);
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const handleOpenModel = (e, type, item) => {
    e.preventDefault();
    setIsOpenModel(type);
    setSelectedItem(item);
  };

  const handleCloseModel = (e) => {
    if (e) {
      e.preventDefault();
    }
    setImageUrl("");
    setTargetElement("");
    setIsOpenModel("");
    setSelectedData({});
    setSelectedEvent(null);
  };

  const handleSaveSource = (e) => {
    e.preventDefault();
    if (editorRef?.current) {
      const trimmedSourceCode = sourceCode
        .replace(/\n\s*\n/g, "\n")
        .replace(/\s+/g, " ")
        .trim();

      editorRef.current.innerHTML = trimmedSourceCode;
      setViewSource(false);
      if (onChange) {
        onChange(trimmedSourceCode);
      }
    }
  };

  const handleSelectAll = (e) => {
    e.preventDefault();
    const selection = window.getSelection();
    if (!selection.toString()) {
      const range = document.createRange();
      range.selectNodeContents(editorRef?.current);
      selection.removeAllRanges();
      selection.addRange(range);
    } else {
      selection.removeAllRanges();
    }
  };

  const handleInsertHRClick = () => {
    handleFocusEditor();
    document.execCommand("insertHorizontalRule");
  };

  const handleFocusEditor = () => {
    const editor = editorRef?.current;
    if (editor && selectedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectedRange);
      editor.focus();
    }
  };

  const handleLinkInsert = (props) => {
    let { text, link, open_new_tab, link_type } = props;
    if (!text) {
      text = link;
    }
    let linkHTML = `<a href="${link}"`;
    if (open_new_tab && open_new_tab !== "false") {
      linkHTML += ' target="_blank"';
    }

    if (link_type === "image" && imageUrl) {
      // Use selectedEvent if available; otherwise, fall back to default image HTML
      if (selectedEvent) {
        if (selectedEvent.tagName === "IMG") {
          let src = selectedEvent.src;
          if (src === imageUrl) {
            text = selectedEvent.outerHTML;
          } else {
            text = `<img src="${imageUrl}" alt="ImageLink" />`;
          }
        } else if (selectedEvent.tagName === "A") {
          let childNode = selectedEvent.firstChild;
          if (
            childNode &&
            childNode.nodeType === Node.ELEMENT_NODE &&
            childNode.tagName === "IMG" &&
            childNode.src === imageUrl
          ) {
            text = childNode.outerHTML;
          } else {
            text = `<img src="${imageUrl}" alt="ImageLink" />`;
          }
        } else {
          text = `<img src="${imageUrl}" alt="ImageLink" />`;
        }
      } else {
        text = `<img src="${imageUrl}" alt="ImageLink" />`;
      }
    } else if (link_type === "button") {
      text = `<button contentEditable=false>${text}</button>`;
    }
    linkHTML += `>${text}</a>`;

    if (selectedEvent && selectedEvent.parentElement) {
      selectedEvent.parentElement.removeChild(selectedEvent);
    } else {
      restoreSelection();
    }

    handleFocusEditor();
    document.execCommand("insertHTML", false, linkHTML);
    handleCloseModel();
  };

  const handleRemoveLink = () => {
    let linkHTML = `${selectedEvent.textContent.trim()}`;
    if (selectedEvent.tagName === "IMG") {
      linkHTML = `<img src="${selectedEvent.src}" alt="ImageLink" />`;
    }
    if (selectedEvent) {
      const parentElement = selectedEvent.parentElement;
      if (parentElement) {
        parentElement.removeChild(selectedEvent);
      }
    }
    handleFocusEditor();
    document.execCommand("insertHTML", false, linkHTML);
    handleCloseModel();
  };

  const handleImageInsert = (data) => {
    let { link, height, width } = data;
    if (selectedEvent && selectedData) {
      selectedEvent.src = link;
      if (height) {
        selectedEvent.style.height = `${height}px`;
      } else {
        selectedEvent.style.height = null;
      }
      if (width) {
        selectedEvent.style.width = `${width}px`;
      } else {
        selectedEvent.style.width = null;
      }
      setTimeout(() => {
        setIsLoading(false);
        handleCloseModel();
      }, 0);
    } else {
      handleFocusEditor();
      let imgElement = `<img src="${link}" alt="Image" style="`;
      if (height) {
        imgElement += `height:${height}px;`;
      }
      if (width) {
        imgElement += `width:${width}px;`;
      }
      imgElement += `"/>`;
      document.execCommand("insertHTML", false, imgElement);
      // Ensure editor picks up the change
      const editorElement = document.querySelector('[contenteditable="true"]');
      if (editorElement) {
        editorElement.dispatchEvent(new Event("input", { bubbles: true }));
      }
      setIsLoading(false);
      handleCloseModel();
    }
  };

  const handleMediaInsert = (data, targetElement) => {
    let { link, height, width, type, embed_code } = data;
    const editorNode = editorRef.current;
    let iframeHTML = "";

    if (type === "general") {
      // Check if it's a direct video link
      if (link.match(/\.(mp4|mov|avi|wmv)$/)) {
        iframeHTML = `<video width="${width || "640"}" height="${
          height || "360"
        }" controls><source src="${link}" type="video/mp4"></video>`;
      } else {
        // Check for specific video platforms
        const youtubeRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo.com\/(\d+)/;

        if (link.match(youtubeRegex)) {
          const videoId = link.match(youtubeRegex)[1];
          iframeHTML = `<iframe width="${width || "640"}" height="${
            height || "360"
          }" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        } else if (link.match(vimeoRegex)) {
          const videoId = link.match(vimeoRegex)[1];
          iframeHTML = `<iframe src="https://player.vimeo.com/video/${videoId}" width="${
            width || "640"
          }" height="${
            height || "360"
          }" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        } else {
          // Insert custom embed code if available
          iframeHTML = embed_code || "";
        }
      }
    } else if (type === "embed" && embed_code && editorNode) {
      iframeHTML = embed_code;
    }

    if (targetElement && editorNode && iframeHTML) {
      handleFocusEditor();
      targetElement.parentNode.setAttribute("data-mtl-link-type", type);
      targetElement.outerHTML = iframeHTML;
    } else if (editorNode && iframeHTML) {
      const wrapper = createIframeWrapperWithSettings(
        iframeHTML,
        type,
        (wrapper) => {
          let iframe_element = wrapper.querySelector("iframe");
          setTargetElement(iframe_element);
          setTargetElementType(
            wrapper.getAttribute("data-mtl-link-type") || "general"
          );
          setIsOpenModel("video");
        }
      );

      handleFocusEditor();
      // document.execCommand("insertHTML", false, wrapper.outerHTML);
      const selection = window.getSelection();
      if (!selection.rangeCount) return;

      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(wrapper);

      // Move cursor after the inserted element
      range.setStartAfter(wrapper);
      range.setEndAfter(wrapper);
      selection.removeAllRanges();
      selection.addRange(range);
    }

    setTargetElement(null);
    setIsOpenModel(""); // Assuming this is setting some state related to the modal
  };

  function createIframeWrapperWithSettings(iframeHTML, type, onSettingsClick) {
    const iframeElement = document.createElement("div");
    iframeElement.innerHTML = iframeHTML;
    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "iframe-wrapper";
    wrapper.contentEditable = "true";
    wrapper.setAttribute("data-mtl-link-type", type);

    const overlay = document.createElement("div");
    overlay.className = "iframe-overlay";

    const settingsBtn = document.createElement("button");
    settingsBtn.className = "iframe-settings-btn";
    settingsBtn.contentEditable = "false";

    settingsBtn.innerHTML = `<div style="display: flex; align-items: center;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M10.275 22q-.425 0-.75-.275t-.375-.7l-.3-2.225q-.325-.125-.612-.3t-.563-.375l-1.55.65q-.625.275-1.25.05t-.975-.8l-1.175-2.05q-.35-.575-.2-1.225t.675-1.075l1.325-1Q4.5 12.5 4.5 12.337v-.675q0-.162.025-.337l-1.325-1Q2.675 9.9 2.525 9.25t.2-1.225L3.9 5.975q.35-.575.975-.8t1.25.05l1.55.65q.275-.2.575-.375t.6-.3l.2-1.65q.075-.675.575-1.113T10.8 2h2.4q.675 0 1.175.438t.575 1.112l.2 1.65q.325.125.613.3t.562.375l1.5-.65q.625-.275 1.263-.05t.987.8l1.175 2.05q.35.575.213 1.225t-.663 1.075L19.125 11.6q-.275.2-.562.3t-.638.1h-2.35q0-1.45-1.037-2.475T12.05 8.5q-1.475 0-2.488 1.013T8.55 12q0 1.2.688 2.1T11 15.35v5.8q0 .35-.2.6t-.525.25M20 22h-6q-.425 0-.712-.288T13 21v-6q0-.425.288-.712T14 14h6q.425 0 .713.288T21 15v2l1.575-1.575q.125-.125.275-.062t.15.237v4.8q0 .175-.15.238t-.275-.063L21 19v2q0 .425-.288.713T20 22"/></svg> <span style="margin-inline: 8px;">Settings</span></div>`;

    settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (typeof onSettingsClick === "function") {
        onSettingsClick(wrapper);
      }
    });

    // Build DOM structure
    wrapper.appendChild(overlay);
    wrapper.appendChild(settingsBtn);
    wrapper.appendChild(iframeElement.childNodes[0]);

    return wrapper;
  }

  const handlePrint = () => {
    let data = editorRef.current.innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.write(data);
    iframeDoc.close();
    iframe.contentWindow.print();
    setTimeout(() => {
      document.body.removeChild(iframe);
    }, 100);
  };

  const handleCharSelect = (e, char) => {
    e.preventDefault();
    if (editorRef?.current !== null) {
      handleFocusEditor();
      document.execCommand("insertHTML", false, char);
      setTargetElement(null);
      setIsOpenModel("");
    }
  };

  const cleanHTML = (html) => {
    const cleanedHTML = html.replace(/style="[^"]*"/g, "");
    return cleanedHTML;
  };

  const onPaste = (event) => {
    event.preventDefault();
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
                const imgElement = `<img src="${URL.createObjectURL(
                  imageBlob
                )}" alt="Image">`;
                document.execCommand("insertHTML", false, imgElement);
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
                    document.execCommand("insertHTML", false, withoutComments);
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
          } else if (item.types.includes("text/plain")) {
            item
              .getType("text/plain")
              .then((textBlob) => {
                textBlob
                  .text()
                  .then((text) => {
                    if (isValidURL(text)) {
                      // Insert the URL as a link
                      const linkElement = `<a href="${text}" target="_blank">${text}</a>`;
                      document.execCommand("insertHTML", false, linkElement);
                    } else {
                      // Insert plain text
                      document.execCommand("insertText", false, text);
                    }
                  })
                  .catch((error) => {
                    console.error("Error reading text content:", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Error getting text type from ClipboardItem:",
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

  const handleBlur = () => {
    handleSelection();
  };

  const handleNewDocument = () => {
    editorRef.current.innerHTML = "";
  };

  const handlePreview = () => {
    setPreviewContent(editorRef?.current.innerHTML);
    setOpenPreview(true);
  };

  const handleViewSource = () => {
    if (!viewSource && editorRef?.current) {
      const content = editorRef?.current.innerHTML;
      const formattedContent = transformHTML(content);
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
      setIsFullScreen(false);
    }
  };

  const handlePlaceholder = () => {
    const editor = editorRef?.current;
    if (!editor) {
      return;
    }

    if (editor.innerText.trim() === "") {
      editor.classList.add("empty");
      setIsPlaceholder(true);
    } else {
      editor.classList.remove("empty");
      setIsPlaceholder(false);
    }
  };

  const handleSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      setSelectedRange(selection.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    if (selectedRange) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(selectedRange);
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(document.fullscreenElement !== null);
    };

    handlePlaceholder();
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("input", handlePlaceholder);
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("input", handlePlaceholder);
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
            selectedData={selectedData}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            image_handler={image_handler}
            setIsLoading={setIsLoading}
          />
        ),
        title: `${selectedData?.link ? "Update" : "Insert"} Link`,
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
            selectedData={selectedData}
          />
        ),
        title: `${selectedData?.link ? "Update" : "Insert"} Image`,
      };
    } else if (isOpenModel === "video") {
      return {
        component: (
          <MediaModal
            onMediaInsert={handleMediaInsert}
            targetElement={targetElement}
            targetElementType={targetElementType}
          />
        ),
        title: `${selectedData?.link ? "Update" : "Insert"} Video`,
      };
    } else if (isOpenModel === "special_char") {
      return {
        component: <SpecialChars handleCharSelect={handleCharSelect} />,
        title: "Insert Special Characters",
      };
    }
  };

  if (theme_config && Object.keys(theme_config).length > 0) {
    Object.keys(theme_config).forEach(function (key, index) {
      document.documentElement.style.setProperty(
        `--editor-${key}`,
        theme_config[key]
      );
    });
  }

  toolbar = show_final_options(toolbar, remove_from_toolbar, TOOLBAR_ITEMS);
  navbar = show_final_options(navbar, remove_from_navbar, NAVBAR_ITEMS);

  useEffect(() => {
    if (!init) {
      if (editorRef.current && value) {
        editorRef.current.innerHTML = value;
        setInit(true);
      }
    }
    if (!value) {
      editorRef.current.innerHTML = "";
    }
    if (getEditorRef) {
      getEditorRef(editorRef);
    }
  }, [isFullScreen, editorRef, value]);

  const handlePaste = (e) => {
    e.preventDefault();
    if (!editorRef.current) {
      setTimeout(() => {
        editorRef.current.focus();
      }, 0);
    } else {
      restoreSelection();
    }
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
                const imgElement = `<img src="${URL.createObjectURL(
                  imageBlob
                )}" alt="Image">`;
                document.execCommand("insertHTML", false, imgElement);
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
                    document.execCommand("insertHTML", false, withoutComments);
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
          } else if (item.types.includes("text/plain")) {
            item
              .getType("text/plain")
              .then((textBlob) => {
                textBlob
                  .text()
                  .then((text) => {
                    if (isValidURL(text)) {
                      // Insert the URL as a link
                      const linkElement = `<a href="${text}" target="_blank">${text}</a>`;
                      document.execCommand("insertHTML", false, linkElement);
                    } else {
                      // Insert plain text
                      document.execCommand("insertText", false, text);
                    }
                  })
                  .catch((error) => {
                    console.error("Error reading text content:", error);
                  });
              })
              .catch((error) => {
                console.error(
                  "Error getting text type from ClipboardItem:",
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
    const hr_1 = document.getElementsByClassName(
      "style_wysiwygEditorToolbar__2W7yf"
    )[0];
    if (hr_1) {
      setShowHR1(hr_1.offsetHeight > 34);
    }
    const hr_2 = document.getElementsByClassName(
      "style_wysiwygEditorToolbar__2W7yf"
    )[1];
    if (hr_2) {
      setShowHR2(hr_2.offsetHeight > 34);
      setShowHR3(hr_2.offsetHeight > 65);
    }
  };

  const setCursorAtStart = () => {
    const editor = editorRef.current;
    if (editor) {
      const range = document.createRange();
      if (editor.childNodes.length > 0) {
        range.setStart(editor.childNodes[0], 0);
      } else {
        range.setStart(editor, 0);
      }
      range.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      // Update selectedRange state
      setSelectedRange(range);
    }
  };

  const handleMouseDown = (e, left) => {
    e.preventDefault();
    const startX = e.clientX;

    let element = document.querySelector(".resizeImageWrapper");
    let image_element = document.querySelector(".resizer-image");
    let startWidth = parseFloat(image_element.style.width);
    let startHeight = parseFloat(image_element.style.height);
    if (isNaN(startHeight)) {
      startHeight = parseFloat(image_element.offsetHeight);
    }

    if (isNaN(startWidth)) {
      startWidth = parseFloat(image_element.offsetWidth);
    }
    let heightRatio = startHeight / startWidth;
    const handleMouseMove = (e) => {
      let newWidth = startWidth + (e.clientX - startX);
      if (left) {
        newWidth = startWidth - (e.clientX - startX);
      }
      let width = newWidth > 50 ? newWidth : 50;
      let height = heightRatio * width;

      height = Math.round(height);
      width = Math.round(width);

      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      image_element.style.width = `${width}px`;
      image_element.style.height = `${height}px`;
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleClickImage = (event) => {
    if (
      event.target.tagName === "IMG" &&
      editorRef.current.contains(event.target)
    ) {
      const hasClass =
        event.target.parentElement?.classList?.contains("resizeImageWrapper");
      if (hasClass) return;
      let image_element = document.querySelector(".resizer-image");
      if (image_element) remove_resizer();

      const imgElement = event.target;
      const imageWidth = imgElement.offsetWidth;
      const divElement = document.createElement("div");
      divElement.style.display = "inline-block";
      divElement.style.width = `${imageWidth}px`;
      divElement.classList.add("resizeImageWrapper");

      const resizer = document.createElement("div");
      resizer.classList.add("resizer");
      resizer.onmousedown = handleMouseDown;

      const resizerRight = document.createElement("div");
      resizerRight.classList.add("resizer", "topRight");
      resizerRight.onmousedown = handleMouseDown;

      const resizerBottom = document.createElement("div");
      resizerBottom.classList.add("resizer", "bottomLeft");
      resizerBottom.onmousedown = (e) => handleMouseDown(e, "left");

      const resizerBottomRight = document.createElement("div");
      resizerBottomRight.classList.add("resizer", "topLeft");
      resizerBottomRight.onmousedown = (e) => handleMouseDown(e, "left");

      imgElement.classList.add("resizer-image");

      const clonedImgElement = imgElement.cloneNode(true);
      divElement.appendChild(clonedImgElement);
      divElement.appendChild(resizer);
      divElement.appendChild(resizerRight);
      divElement.appendChild(resizerBottom);
      divElement.appendChild(resizerBottomRight);

      imgElement.parentNode.replaceChild(divElement, imgElement);
    } else {
      const target = event.target?.classList?.contains("resizeImageWrapper");
      const hasClass =
        event.target?.parentElement?.classList?.contains("resizeImageWrapper");
      if (!target && !hasClass) {
        remove_resizer();
      }
    }
  };
  useEffect(() => {
    handle_resize();
    setCursorAtStart();
    const editor = editorRef.current;
    if (editor) {
      window.addEventListener("click", handleClickImage);
      editor.addEventListener("mouseup", handleSelection);
      editor.addEventListener("keyup", handleSelection);
    }
    window.addEventListener("resize", handle_resize);
    return () => {
      window.removeEventListener("resize", handle_resize);
      if (editor) {
        window.removeEventListener("click", handleClickImage);
        editor.removeEventListener("mouseup", handleSelection);
        editor.removeEventListener("keyup", handleSelection);
      }
    };
  }, [editorRef]);

  useEffect(() => {
    if (isFullScreen || isOpenModel || viewSource || openPreview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isFullScreen, isOpenModel, viewSource, openPreview]);

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
      <div
        {...mainProps}
        className={`${Styles.reactEditorMain} ${
          isFullScreen ? Styles.fullScreen : ""
        }`}
        id="react-editor"
      >
        <div id="action-components" className={`${Styles.actionComponents}`}>
          {navbar.length > 0 && (
            <div
              className={`${Styles.wysiwygEditorToolbar}`}
              id="editor-navbar"
            >
              <hr
                className={Styles.hr1}
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
                    {is_line && <div className={Styles.verticalLine}></div>}
                    {is_file && (
                      <SelectFileOptions
                        handleNewDocument={handleNewDocument}
                        handlePreview={handlePreview}
                        handlePrint={handlePrint}
                        item={item}
                        remove_from_navbar={remove_from_navbar}
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
                        remove_from_navbar={remove_from_navbar}
                      />
                    )}
                    {is_insert && (
                      <SelectInsert
                        onSelectOption={handleOpenModel}
                        handleInsertHR={handleInsertHRClick}
                        item={item}
                        remove_from_navbar={remove_from_navbar}
                      />
                    )}
                    {is_format && (
                      <SelectFormations
                        item={item}
                        isFullScreen={isFullScreen}
                        remove_from_navbar={remove_from_navbar}
                        editorRef={editorRef}
                      />
                    )}

                    {is_select_all && (
                      <div className={Styles.increaseIconSize}>
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
                      <div className={Styles.increaseIconSize}>
                        <button
                          onClick={(e) => handleOpenModel(e, "image", item)}
                          title={item?.title ? item.title : "Upload Image"}
                        >
                          {item?.icon ? item.icon : <ImageIcon />}
                        </button>
                      </div>
                    )}
                    {is_link && (
                      <div className={Styles.increaseIconSize}>
                        <button
                          onClick={(e) => handleOpenModel(e, "link", item)}
                          title={item?.title ? item.title : "Add Link"}
                        >
                          {item?.icon ? item.icon : <LinkIcon />}
                        </button>
                      </div>
                    )}
                    {is_video && (
                      <div className={Styles.increaseIconSize}>
                        <button
                          onClick={(e) => handleOpenModel(e, "video", item)}
                          title={item?.title ? item.title : "Upload Video"}
                        >
                          {item?.icon ? item.icon : <VideoIcon />}
                        </button>
                      </div>
                    )}
                    {is_copy && (
                      <div className={Styles.increaseIconSize}>
                        <ButtonFunction
                          editorRef={editorRef}
                          name="copy"
                          icon={<CopyIcon />}
                          title="Copy"
                          item={item}
                          disabled={isPlaceholder && placeholder && !value}
                        />
                      </div>
                    )}
                    {is_cut && (
                      <div className={Styles.increaseIconSize}>
                        <ButtonFunction
                          editorRef={editorRef}
                          name="cut"
                          icon={<CutIcon />}
                          title="Cut"
                          item={item}
                          disabled={isPlaceholder && placeholder && !value}
                        />
                      </div>
                    )}
                    {is_paste && (
                      <div className={Styles.increaseIconSize}>
                        <button
                          onClick={handlePaste}
                          title={item?.title ? item.title : "Paste"}
                        >
                          {item?.icon ? item.icon : <PasteIcon />}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <div
            className={`${Styles.wysiwygEditorToolbar} ${Styles.wysiwygEditorToolbarWrapper}`}
          >
            <hr
              className={Styles.hr1}
              style={{ display: showHR2 ? "block" : "none" }}
            />
            <hr
              className={`${Styles.hr1} ${Styles.hr2}`}
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
              let is_alignment =
                item === "alignment" || item.name === "alignment";
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
              let is_fontfamily =
                item === "fontfamily" || item.name === "fontfamily";
              let is_fontSize = item === "fontsize" || item.name === "fontsize";
              let is_copy = item === "copy" || item.name === "copy";
              let is_cut = item === "cut" || item.name === "cut";
              let is_paste = item === "paste" || item.name === "paste";
              let is_select_all =
                item === "select_all" || item.name === "select_all";
              let is_image = item === "image" || item.name === "image";
              let is_link = item === "link" || item.name === "link";
              let is_video = item === "video" || item.name === "video";

              let source_code =
                item === "source_code" || item.name === "source_code";
              let is_fullscreen =
                item === "full_screen" || item.name === "full_screen";
              let is_hr_line =
                item === "horizontal_line" || item.name === "horizontal_line";
              let is_special_char =
                item === "special_character" ||
                item.name === "special_character";

              return (
                <div key={`key${index}`}>
                  {is_line && <div className={Styles.verticalLine}></div>}
                  {is_undo && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="undo"
                      icon={<UndoIcon />}
                      title={item.title ? item.title : "Undo"}
                      item={item}
                    />
                  )}
                  {is_redo && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="redo"
                      icon={<RedoIcon />}
                      title="Redo"
                      item={item}
                    />
                  )}
                  {is_format && (
                    <SelectFormat
                      remove_from_toolbar={remove_from_toolbar}
                      editorRef={editorRef}
                    />
                  )}
                  {is_fontfamily && <SelectFontFamily editorRef={editorRef} />}
                  {is_fontSize && <FontSize editorRef={editorRef} />}
                  {is_bold && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="bold"
                      icon={<BoldIcon />}
                      title="Bold"
                      item={item}
                    />
                  )}
                  {is_italic && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="italic"
                      icon={<ItalicIcon />}
                      title="Italic"
                      item={item}
                    />
                  )}
                  {is_underline && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="underline"
                      icon={<UnderlineIcon />}
                      title="Underline"
                      item={item}
                    />
                  )}
                  {is_superscript && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="superscript"
                      icon={<SuperscriptIcon />}
                      title="Superscript"
                      item={item}
                    />
                  )}
                  {is_subscript && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="subscript"
                      icon={<SubscriptIcon />}
                      title="Subscript"
                      item={item}
                    />
                  )}
                  {is_alignment && <AlignmentOptions editorRef={editorRef} />}

                  {is_alignLeft && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyLeft"
                      icon={<AlignLeft />}
                      title="Align Left"
                      item={item}
                    />
                  )}
                  {is_alignCenter && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyCenter"
                      icon={<AlignCenter />}
                      title="Align Center"
                      item={item}
                    />
                  )}
                  {is_alignRight && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyRight"
                      icon={<AlignRight />}
                      title="Align Right"
                      item={item}
                    />
                  )}
                  {is_alignJustify && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyFull"
                      icon={<AlignJustify />}
                      title="Align Justify"
                      item={item}
                    />
                  )}
                  {is_indent && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="indent"
                      icon={<IncreaseIndentIcon />}
                      title="Increase IndentIcon"
                      item={item}
                    />
                  )}
                  {is_outdent && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="outdent"
                      icon={<DecreaseIndentIcon />}
                      title="Decrease IndentIcon"
                      item={item}
                    />
                  )}
                  {is_orderedList && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="insertOrderedList"
                      icon={<OrderdList />}
                      title="Insert/Remove Numbered List"
                      item={item}
                    />
                  )}
                  {is_unorderedList && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="insertUnorderedList"
                      icon={<UnorderdList />}
                      title="Insert/Remove Bulleted List"
                      item={item}
                    />
                  )}
                  {is_removeFormat && (
                    <ButtonFunction
                      editorRef={editorRef}
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
                      editorRef={editorRef}
                    />
                  )}
                  {is_backgroundColor && (
                    <ManageColors
                      type="hiliteColor"
                      title="Background Color"
                      item={item}
                      editorRef={editorRef}
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

                  {is_select_all && (
                    <button
                      onClick={handleSelectAll}
                      title={item?.title ? item.title : "Select All"}
                      disabled={isPlaceholder && placeholder && !value}
                    >
                      {item?.icon ? item.icon : <SelectAll />}
                    </button>
                  )}
                  {is_image && (
                    <button
                      onClick={(e) => handleOpenModel(e, "image", item)}
                      title={item?.title ? item.title : "Upload Image"}
                    >
                      {item?.icon ? item.icon : <ImageIcon />}
                    </button>
                  )}
                  {is_link && (
                    <button
                      onClick={(e) => handleOpenModel(e, "link", item)}
                      title={item?.title ? item.title : "Add Link"}
                    >
                      {item?.icon ? item.icon : <LinkIcon />}
                    </button>
                  )}
                  {is_video && (
                    <button
                      onClick={(e) => handleOpenModel(e, "video", item)}
                      title={item?.title ? item.title : "Upload Video"}
                    >
                      {item?.icon ? item.icon : <VideoIcon />}
                    </button>
                  )}
                  {is_copy && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="copy"
                      icon={<CopyIcon />}
                      title="Copy"
                      item={item}
                      disabled={isPlaceholder && placeholder && !value}
                    />
                  )}
                  {is_cut && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="cut"
                      icon={<CutIcon />}
                      title="Cut"
                      item={item}
                      disabled={isPlaceholder && placeholder && !value}
                    />
                  )}
                  {is_paste && (
                    <button
                      onClick={handlePaste}
                      title={item?.title ? item.title : "Paste"}
                    >
                      {item?.icon ? item.icon : <PasteIcon />}
                    </button>
                  )}
                  {source_code && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={handleViewSource}
                        title={item?.title || "Source Code"}
                      >
                        <CodeIcon />
                      </button>
                    </div>
                  )}
                  {is_fullscreen && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={toggleFullScreen}
                        title={
                          isFullScreen
                            ? item?.title || "Exit Full Screen"
                            : item?.title || "Full Screen"
                        }
                      >
                        {isFullScreen ? (
                          <>
                            <FullscreenExit />
                          </>
                        ) : (
                          <>
                            <FullscreenIcon />
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {is_hr_line && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={handleInsertHRClick}
                        title={item?.title || "Horizontal Line"}
                      >
                        <HorizontalLineIcon />
                      </button>
                    </div>
                  )}
                  {is_special_char && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={(e) => handleOpenModel(e, "special_char")}
                        title={item?.title || "Special Char"}
                      >
                        <SpecialCharIcon />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className={`${Styles.content__editable__container}`}>
          <div
            {...others}
            className={`${Styles.mlMainContentBox}`}
            autoFocus={isFullScreen}
            contentEditable
            ref={editorRef}
            onPaste={onPaste}
            spellCheck="true"
            onInput={handleInput}
            onBlur={handleBlur}
            data-placeholder={placeholder}
            onKeyDown={handleEditorKeyDown}
            // id="editable"
            style={{ ...style, ...dynamicStyle }}
          ></div>
          <RightClickLinkPopup
            editorRef={editorRef}
            setIsOpenModel={setIsOpenModel}
            setSelectedData={setSelectedData}
            setSelectedEvent={setSelectedEvent}
            setImageUrl={setImageUrl}
            selectedEvent={selectedEvent}
            handleRemoveLink={handleRemoveLink}
            selectedRange={selectedRange}
          />
        </div>
      </div>
      {isLoading && (
        <ViewLoadingModel
          viewSource={viewSource}
          setViewSource={setViewSource}
          sourceCode={sourceCode}
          setSourceCode={setSourceCode}
          handleSaveSource={handleSaveSource}
        />
      )}
      {isOpenModel && (
        <Modal
          isOpen={isOpenModel}
          onClose={handleCloseModel}
          title={model_component().title}
        >
          {model_component().component}
        </Modal>
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
      <div id="full-screen-overlay"></div>
    </>
  );
}
