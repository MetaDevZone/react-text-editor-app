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
import LineHeight from "./components/LineHeight";

import "react-image-crop/dist/ReactCrop.css";
import { CheckAccessDataApi } from "./DAL/CheckAcces";
import { getBaseDomain } from "./utils/Constants";

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
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
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
    apiKey,
    height,
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
  const [isDisable, setIsDisable] = useState(false);
  const [allowPaste, setAllowPaste] = useState(true);
  const [selectedData, setSelectedData] = useState({
    link: "",
    height: "",
    width: "",
    type: "general",
    text: "",
    open_new_tab: false,
  });
  console.log(isDisable, "isDisableisDisable");
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
    console.log("Input event triggered");

    //if isDisable is true  set editor content to empty and  contentEditable to false
    if (isDisable && editorRef.current) {
      editorRef.current.innerHTML = "";
      editorRef.current.setAttribute("contentEditable", "false");
      return;
    }

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

      const traverse = (node, depth = 0) => {
        // Prevent infinite recursion
        if (depth > 100) {
          console.warn("Maximum traversal depth reached");
          return;
        }

        if (node.nodeType === Node.TEXT_NODE) {
          if (offset <= node.length) {
            setCaret(node, offset);
            throw "done"; // stop traversal
          } else {
            offset -= node.length;
          }
        } else {
          for (let i = 0; i < node.childNodes.length; i++) {
            traverse(node.childNodes[i], depth + 1);
          }
        }
      };

      try {
        traverse(wrapper);
      } catch (e) {}
    }

    function clearEditorFormatting(editor, tempDiv) {
      // Always clear to truly empty string
      editor.setAttribute("data-mlx-editor-empty", "true");
      // Save current selection
      const selection = window.getSelection();
      const range = document.createRange();
      // Completely clear the editor
      range.selectNodeContents(editor);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      editor.innerHTML = "";
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

    let checkEditorIsEmptyAndGetTagName = isEditorEmpty(content);
    // First check if the content is "effectively empty"
    // Allow spaces at the beginning - don't strip them when checking for empty content
    const hasOnlySpaces =
      tempDiv.textContent &&
      tempDiv.textContent.replace(/[\s\u00A0]/g, "").length === 0 &&
      tempDiv.textContent.length > 0;

    const isEffectivelyEmpty =
      (!tempDiv.textContent || tempDiv.textContent.length === 0) &&
      checkEditorIsEmptyAndGetTagName.isEmpty;

    if (isEffectivelyEmpty) {
      clearEditorFormatting(editor, checkEditorIsEmptyAndGetTagName.tempDiv);
      onChange?.("");
    } else {
      editor.removeAttribute("data-mlx-editor-empty");
      onChange?.(tempDiv.innerHTML);
    }

    // Update placeholder state after content changes
    handlePlaceholder();
  };

  function isEditorEmpty(html) {
    // Create a temporary DOM element to parse and inspect the structure
    const temp = document.createElement("div");
    temp.innerHTML = html;
    // Remove only completely empty text nodes, but preserve those with spaces
    temp.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent === "") {
        temp.removeChild(node);
      }
    });

    // Case 1: Only a single <br> or empty
    if (
      temp.children.length === 0 ||
      temp.innerHTML === "<br>" ||
      temp.innerHTML === ""
    ) {
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

    // Case 3: Only a <p>&nbsp;</p>, <p> </p> (unicode nbsp), or <p> </p> (treat as empty)
    if (temp.children.length === 1 && temp.children[0].tagName === "P") {
      const inner = temp.children[0].innerHTML;
      // Check for HTML &nbsp;, unicode nbsp, or only whitespace
      if (inner === "&nbsp;" || inner === "\u00A0") {
        let pTagDiv = document.createElement("P");
        pTagDiv.innerHTML = "<br>";
        return { tempDiv: pTagDiv, isEmpty: true };
      }
    }

    return { isEmpty: false };
  }

  // Helper function to clone formatting from a text node's parent elements
  const cloneFormatting = (textNode, textContent) => {
    const formattingElements = [
      "B",
      "STRONG",
      "I",
      "EM",
      "U",
      "S",
      "STRIKE",
      "SUB",
      "SUP",
      "SPAN",
    ];
    let currentNode = textNode.parentNode;
    let formattedElement = document.createTextNode(textContent);

    // Traverse up the DOM tree to find formatting elements
    while (currentNode && currentNode !== editorRef.current) {
      if (formattingElements.includes(currentNode.nodeName)) {
        const clonedElement = currentNode.cloneNode(false); // Clone without children
        clonedElement.appendChild(formattedElement);
        formattedElement = clonedElement;
      }
      currentNode = currentNode.parentNode;
    }

    return formattedElement;
  };

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

      // Step 1: Find the containing block element (P, H1, H2, etc.)
      let currentBlock = null;
      let container = range.startContainer;

      // Traverse up to find existing block element
      while (container && container !== editor) {
        if (
          container.nodeName === "P" ||
          container.nodeName === "H1" ||
          container.nodeName === "H2" ||
          container.nodeName === "H3" ||
          container.nodeName === "H4" ||
          container.nodeName === "H5" ||
          container.nodeName === "H6" ||
          container.nodeName === "DIV"
        ) {
          currentBlock = container;
          break;
        }
        container = container.parentNode;
      }

      // If no block element found, create a paragraph
      if (!currentBlock) {
        currentBlock = document.createElement("p");
        // Move all content into the paragraph
        while (editor.firstChild) {
          currentBlock.appendChild(editor.firstChild);
        }
        editor.appendChild(currentBlock);

        // Set cursor at the end of the new paragraph
        const newRange = document.createRange();
        newRange.selectNodeContents(currentBlock);
        newRange.collapse(false);
        selection.removeAllRanges();
        selection.addRange(newRange);
        return;
      }

      // Step 2: Determine what tag to create for the new line
      let newTagName = "p"; // Default to paragraph

      // Check if current block is a heading tag
      if (
        currentBlock.nodeName === "H1" ||
        currentBlock.nodeName === "H2" ||
        currentBlock.nodeName === "H3" ||
        currentBlock.nodeName === "H4" ||
        currentBlock.nodeName === "H5" ||
        currentBlock.nodeName === "H6"
      ) {
        // Check if there's text after the cursor position
        const offset = range.startOffset;
        const textContainer = range.startContainer;
        let hasTextAfterCursor = false;

        if (textContainer.nodeType === Node.TEXT_NODE) {
          const text = textContainer.nodeValue;
          const afterText = text.slice(offset);
          hasTextAfterCursor = afterText.trim() !== "";
        } else {
          // If cursor is at element boundary, check if there are more text nodes after
          let nextNode = textContainer.nextSibling;
          while (nextNode) {
            if (
              nextNode.nodeType === Node.TEXT_NODE &&
              nextNode.textContent.trim() !== ""
            ) {
              hasTextAfterCursor = true;
              break;
            }
            nextNode = nextNode.nextSibling;
          }
        }

        if (hasTextAfterCursor) {
          // If there's text after cursor, create same type of heading
          newTagName = currentBlock.nodeName.toLowerCase();
        } else {
          // If no text after cursor, always create paragraph
          newTagName = "p";
        }
      }

      // Step 3: Split the block at cursor position
      const offset = range.startOffset;
      const textContainer = range.startContainer;

      // Create new block element for the split content
      const newBlock = document.createElement(newTagName);

      if (textContainer.nodeType === Node.TEXT_NODE) {
        const text = textContainer.nodeValue;
        const beforeText = text.slice(0, offset);
        const afterText = text.slice(offset);

        // Update current text node with text before cursor
        textContainer.nodeValue = beforeText;

        // Add text after cursor to new block with preserved formatting
        if (afterText.trim()) {
          // Clone the formatting from the current text node's parent elements
          const formattedText = cloneFormatting(textContainer, afterText);
          newBlock.appendChild(formattedText);
        } else {
          newBlock.appendChild(document.createElement("br"));
        }
      } else {
        // If cursor is at element boundary, just add a br
        newBlock.appendChild(document.createElement("br"));
      }

      // Step 4: Insert new block after currecnt one
      const parent = currentBlock.parentNode;
      if (parent && parent.contains(currentBlock)) {
        if (currentBlock.nextSibling) {
          parent.insertBefore(newBlock, currentBlock.nextSibling);
        } else {
          parent.appendChild(newBlock);
        }
      }

      // Step 5: Position cursor at start of new block
      const newRange = document.createRange();
      if (
        newBlock.firstChild &&
        newBlock.firstChild.nodeType === Node.TEXT_NODE
      ) {
        newRange.setStart(newBlock.firstChild, 0);
      } else {
        newRange.setStart(newBlock, 0);
      }
      newRange.collapse(true);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
  };

  const handleOpenModel = (e, type, item) => {
    if (isDisable) {
      return;
    }
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

      // Update placeholder after setting content (ensure DOM is updated first)
      setTimeout(() => {
        handlePlaceholder();
      }, 1000);
    }
  };

  const handleSelectAll = (e) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();

    if (!editorRef?.current) {
      console.warn("Editor not available for select all");
      return;
    }

    try {
      const selection = window.getSelection();
      if (!selection.toString()) {
        const range = document.createRange();
        range.selectNodeContents(editorRef.current);
        selection.removeAllRanges();
        selection.addRange(range);
      } else {
        selection.removeAllRanges();
      }
    } catch (error) {
      console.warn("Select all failed:", error);
    }
  };

  const handleInsertHRClick = () => {
    if (isDisable) {
      return;
    }
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
        // Update placeholder after image update
        handlePlaceholder();
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
      // Update placeholder after image insertion
      handlePlaceholder();
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
    // Update placeholder after embedded content is inserted/updated
    setTimeout(() => {
      handlePlaceholder();
    }, 100);
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

    // Add null check for iframe element
    const iframeChild = iframeElement.childNodes[0];
    if (iframeChild) {
      wrapper.appendChild(iframeChild);
    } else {
      console.warn("No iframe element found to append");
    }

    return wrapper;
  }

  const handlePrint = () => {
    if (!editorRef.current) {
      console.warn("Editor not available for printing");
      return;
    }

    let data = editorRef.current.innerHTML;
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    try {
      iframeDoc.write(data);
      iframeDoc.close();
      iframe.contentWindow.print();
    } catch (error) {
      console.error("Print failed:", error);
    }

    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 100);
  };

  const handleCharSelect = (e, char) => {
    e.preventDefault();
    if (editorRef?.current !== null) {
      handleFocusEditor();
      document.execCommand("insertHTML", false, char);
      setTargetElement(null);
      setIsOpenModel("");
      // Update placeholder after character insertion
      handlePlaceholder();
    }
  };

  const cleanHTML = (html) => {
    // Create a temporary div to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Function to clean styles from an element
    const cleanStyles = (element) => {
      if (element.style) {
        // Get computed styles
        const color = element.style.color;
        const fontWeight = element.style.fontWeight;
        const fontStyle = element.style.fontStyle;
        const textDecoration = element.style.textDecoration;
        const fontSize = element.style.fontSize;
        const fontFamily = element.style.fontFamily;

        // Clear all styles
        element.removeAttribute("style");

        // Re-apply only the styles we want to keep
        if (color) element.style.color = color;
        if (fontWeight) element.style.fontWeight = fontWeight;
        if (fontStyle) element.style.fontStyle = fontStyle;
        if (textDecoration) element.style.textDecoration = textDecoration;
        if (fontSize) element.style.fontSize = fontSize;
        if (fontFamily) element.style.fontFamily = fontFamily;
      }

      // Recursively clean child elements
      Array.from(element.children).forEach((child) => cleanStyles(child));
    };

    // Clean all elements
    Array.from(tempDiv.children).forEach((element) => cleanStyles(element));

    return tempDiv.innerHTML;
  };

  const onPaste = (event) => {
    event.preventDefault();

    // Check if modern clipboard API is available and in secure context
    if (
      navigator.clipboard &&
      navigator.clipboard.read &&
      window.isSecureContext
    ) {
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
                      document.execCommand(
                        "insertHTML",
                        false,
                        withoutComments
                      );
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
          // Fallback to traditional paste handling
          fallbackPasteHandler(event);
        });
    } else {
      // Fallback for non-secure contexts or when modern API is not available
      fallbackPasteHandler(event);
    }
  };

  const fallbackPasteHandler = (event) => {
    try {
      // Use the traditional clipboardData API as fallback
      const clipboardData = event.clipboardData || window.clipboardData;
      if (clipboardData) {
        // Check for text data
        const text =
          clipboardData.getData("text/plain") || clipboardData.getData("text");
        const html = clipboardData.getData("text/html");

        if (html) {
          // Process HTML content
          const cleanedHTML = cleanHTML(html);
          const withoutComments = cleanedHTML.replace(/<!--[\s\S]*?-->/g, "");
          document.execCommand("insertHTML", false, withoutComments);
        } else if (text) {
          // Process plain text
          if (isValidURL(text)) {
            // Insert the URL as a link
            const linkElement = `<a href="${text}" target="_blank">${text}</a>`;
            document.execCommand("insertHTML", false, linkElement);
          } else {
            // Insert plain text
            document.execCommand("insertText", false, text);
          }
        }

        // Check for files (images)
        const files = clipboardData.files;
        if (files && files.length > 0) {
          for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (file.type.startsWith("image/")) {
              const imgElement = `<img src="${URL.createObjectURL(
                file
              )}" alt="Image">`;
              document.execCommand("insertHTML", false, imgElement);
            }
          }
        }
      } else {
        console.warn(
          "No clipboard data available, trying navigator.clipboard.readText as fallback"
        );
        // Try navigator.clipboard.readText() for text-only content
        if (navigator.clipboard && navigator.clipboard.readText) {
          navigator.clipboard
            .readText()
            .then((text) => {
              if (text) {
                if (isValidURL(text)) {
                  const linkElement = `<a href="${text}" target="_blank">${text}</a>`;
                  document.execCommand("insertHTML", false, linkElement);
                } else {
                  document.execCommand("insertText", false, text);
                }
              }
            })
            .catch((error) => {
              console.warn("navigator.clipboard.readText failed:", error);
            });
        }
      }
    } catch (error) {
      console.warn("Fallback paste handler failed:", error);
      // Try one more fallback with readText
      if (navigator.clipboard && navigator.clipboard.readText) {
        navigator.clipboard
          .readText()
          .then((text) => {
            if (text) {
              if (isValidURL(text)) {
                const linkElement = `<a href="${text}" target="_blank">${text}</a>`;
                document.execCommand("insertHTML", false, linkElement);
              } else {
                document.execCommand("insertText", false, text);
              }
            }
          })
          .catch((err) => {
            console.warn("All paste methods failed:", err);
          });
      }
    }
  };

  const handleBlur = () => {
    handleSelection();
  };

  const handleNewDocument = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      // Update placeholder after clearing content
      handlePlaceholder();
    }
  };

  const handlePreview = () => {
    setPreviewContent(editorRef?.current.innerHTML);
    setOpenPreview(true);
  };

  const handleViewSource = () => {
    if (isDisable) {
      return;
    }
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
    if (isDisable) {
      return;
    }
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

    // Check both innerText and innerHTML to handle all content types
    const hasTextContent = editor.innerText.trim() !== "";
    const hasHTMLContent =
      editor.innerHTML.trim() !== "" &&
      editor.innerHTML.trim() !== "<br>" &&
      editor.innerHTML.trim() !== "<p><br></p>";

    const hasContent = hasTextContent || hasHTMLContent;

    if (!hasContent) {
      editor.classList.add("empty");
      setIsPlaceholder(true);
    } else {
      editor.classList.remove("empty");
      setIsPlaceholder(false);
    }
  };

  const handleSelection = () => {
    try {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        setSelectedRange(selection.getRangeAt(0));
      }
    } catch (error) {
      console.warn("Failed to handle selection:", error);
    }
  };

  const restoreSelection = () => {
    if (selectedRange) {
      try {
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(selectedRange);
      } catch (error) {
        console.warn("Failed to restore selection:", error);
        // Clear invalid selection
        setSelectedRange(null);
      }
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
        setInit(true);
        // Update placeholder after setting initial content
        setTimeout(() => handlePlaceholder(), 0);
      }
    }

    if (!value && editorRef.current) {
      editorRef.current.innerHTML = "";
      // Update placeholder when content is cleared
      setTimeout(() => handlePlaceholder(), 0);
    }
    if (getEditorRef) {
      getEditorRef(editorRef);
    }
  }, [isFullScreen, editorRef, value]);

  const handlePaste = (e) => {
    if (isDisable) {
      return;
    }
    e.preventDefault();

    if (!editorRef.current) {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.focus();
        }
      }, 0);
    } else {
      restoreSelection();
    }

    // Check if modern clipboard API is available and in secure context
    if (
      navigator.clipboard &&
      navigator.clipboard.read &&
      window.isSecureContext
    ) {
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
                      document.execCommand(
                        "insertHTML",
                        false,
                        withoutComments
                      );
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
          // Fallback to traditional paste handling
          fallbackPasteHandler(e);
        });
    } else {
      // Fallback for non-secure contexts or when modern API is not available
      fallbackPasteHandler(e);
    }
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

    // Add null checks
    if (!element || !image_element) {
      console.warn("Required elements not found for image resize");
      return;
    }

    let startWidth = parseFloat(image_element.style.width);
    let startHeight = parseFloat(image_element.style.height);
    if (isNaN(startHeight)) {
      startHeight = parseFloat(image_element.offsetHeight);
    }

    if (isNaN(startWidth)) {
      startWidth = parseFloat(image_element.offsetWidth);
    }

    // Prevent division by zero
    if (startWidth === 0) {
      console.warn("Image width is zero, cannot resize");
      return;
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
  const CheckAccess = async (apiKey) => {
    try {
      let postData = {
        apiKey: apiKey,
        domain: getBaseDomain(),
        // domain: "localhost",
      };
      const result = await CheckAccessDataApi(postData);
      if (result.success) {
        if (result.access == "full") {
          setIsDisable(false);
          setAllowPaste(true);
        } else {
          setIsDisable(true);
          setAllowPaste(true);
        }
      } else {
        setIsDisable(true);
        setAllowPaste(true);
      }
    } catch (error) {
      setIsDisable(true);
      setAllowPaste(true);
    }
  };

  useEffect(() => {
    if (apiKey) {
      CheckAccess(apiKey);
    } else {
      // If no API key is provided, allow basic functionality
      setIsDisable(true);
      setAllowPaste(true);
    }
  }, [apiKey]);
  return (
    <>
      <div
        {...mainProps}
        className={`${Styles.reactEditorMain} ${
          isFullScreen ? Styles.fullScreen : ""
        }`}
        style={{ height: isFullScreen ? "100vh" : height ?? "auto" }}
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
                        isDisable={isDisable}
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
                        isDisable={isDisable}
                      />
                    )}
                    {is_insert && (
                      <SelectInsert
                        onSelectOption={handleOpenModel}
                        handleInsertHR={handleInsertHRClick}
                        item={item}
                        remove_from_navbar={remove_from_navbar}
                        isDisable={isDisable}
                      />
                    )}
                    {is_format && (
                      <SelectFormations
                        item={item}
                        isFullScreen={isFullScreen}
                        remove_from_navbar={remove_from_navbar}
                        editorRef={editorRef}
                        isDisable={isDisable}
                      />
                    )}

                    {is_select_all && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <button
                          onClick={handleSelectAll}
                          title={item?.title ? item.title : "Select All"}
                          disabled={
                            isPlaceholder && placeholder && !value && isDisable
                          }
                        >
                          {item?.icon ? item.icon : <SelectAll />}
                        </button>
                      </div>
                    )}
                    {is_image && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <button
                          onClick={(e) => handleOpenModel(e, "image", item)}
                          title={item?.title ? item.title : "Upload Image"}
                          disabled={isDisable}
                        >
                          {item?.icon ? item.icon : <ImageIcon />}
                        </button>
                      </div>
                    )}
                    {is_link && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <button
                          onClick={(e) => handleOpenModel(e, "link", item)}
                          title={item?.title ? item.title : "Add Link"}
                          disabled={isDisable}
                        >
                          {item?.icon ? item.icon : <LinkIcon />}
                        </button>
                      </div>
                    )}
                    {is_video && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <button
                          onClick={(e) => handleOpenModel(e, "video", item)}
                          title={item?.title ? item.title : "Upload Video"}
                          disabled={isDisable}
                        >
                          {item?.icon ? item.icon : <VideoIcon />}
                        </button>
                      </div>
                    )}
                    {is_copy && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <ButtonFunction
                          editorRef={editorRef}
                          name="copy"
                          icon={<CopyIcon />}
                          title="Copy"
                          item={item}
                          disabled={
                            isPlaceholder && placeholder && !value && isDisable
                          }
                        />
                      </div>
                    )}
                    {is_cut && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <ButtonFunction
                          editorRef={editorRef}
                          name="cut"
                          icon={<CutIcon />}
                          title="Cut"
                          item={item}
                          disabled={
                            isPlaceholder && placeholder && !value && isDisable
                          }
                        />
                      </div>
                    )}
                    {is_paste && (
                      <div
                        className={`${Styles.increaseIconSize} ${
                          isDisable ? Styles.disabledButton : ""
                        }`}
                      >
                        <button
                          onClick={handlePaste}
                          title={item?.title ? item.title : "Paste"}
                          disabled={isDisable}
                          className={` ${
                            isDisable ? Styles.disabledButton : ""
                          }`}
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
              let is_lineHeight =
                item === "lineHeight" || item.name === "lineHeight";
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
                      isDisable={isDisable}
                    />
                  )}
                  {is_redo && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="redo"
                      icon={<RedoIcon />}
                      title="Redo"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_format && (
                    <SelectFormat
                      remove_from_toolbar={remove_from_toolbar}
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}
                  {is_fontfamily && (
                    <SelectFontFamily
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}
                  {is_fontSize && (
                    <FontSize editorRef={editorRef} isDisable={isDisable} />
                  )}
                  {is_lineHeight && (
                    <LineHeight editorRef={editorRef} isDisable={isDisable} />
                  )}
                  {is_bold && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="bold"
                      icon={<BoldIcon />}
                      title="Bold"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_italic && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="italic"
                      icon={<ItalicIcon />}
                      title="Italic"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_underline && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="underline"
                      icon={<UnderlineIcon />}
                      title="Underline"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_superscript && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="superscript"
                      icon={<SuperscriptIcon />}
                      title="Superscript"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_subscript && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="subscript"
                      icon={<SubscriptIcon />}
                      title="Subscript"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_alignment && (
                    <AlignmentOptions
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}

                  {is_alignLeft && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyLeft"
                      icon={<AlignLeft />}
                      title="Align Left"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_alignCenter && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyCenter"
                      icon={<AlignCenter />}
                      title="Align Center"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_alignRight && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyRight"
                      icon={<AlignRight />}
                      title="Align Right"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_alignJustify && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="justifyFull"
                      icon={<AlignJustify />}
                      title="Align Justify"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_indent && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="indent"
                      icon={<IncreaseIndentIcon />}
                      title="Increase IndentIcon"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_outdent && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="outdent"
                      icon={<DecreaseIndentIcon />}
                      title="Decrease IndentIcon"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_orderedList && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="insertOrderedList"
                      icon={<OrderdList />}
                      title="Insert/Remove Numbered List"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_unorderedList && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="insertUnorderedList"
                      icon={<UnorderdList />}
                      title="Insert/Remove Bulleted List"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_removeFormat && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="removeFormat"
                      icon={<ClearFormatting />}
                      title="Remove Format"
                      item={item}
                      isDisable={isDisable}
                    />
                  )}
                  {is_textColor && (
                    <ManageColors
                      type="foreColor"
                      title="Text Color"
                      item={item}
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}
                  {is_backgroundColor && (
                    <ManageColors
                      type="hiliteColor"
                      title="Background Color"
                      item={item}
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}
                  {is_ltr && (
                    <SimpleButton
                      name="ltr"
                      title="Left To Right"
                      item={item}
                      icon={<LTRIcon />}
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}
                  {is_rtl && (
                    <SimpleButton
                      name="rtl"
                      title="Right To Left"
                      item={item}
                      icon={<RTLIcon />}
                      editorRef={editorRef}
                      isDisable={isDisable}
                    />
                  )}

                  {is_select_all && (
                    <button
                      onClick={handleSelectAll}
                      title={item?.title ? item.title : "Select All"}
                      disabled={
                        isPlaceholder && placeholder && !value && isDisable
                      }
                      className={` ${isDisable ? Styles.disabledButton : ""}`}
                    >
                      {item?.icon ? item.icon : <SelectAll />}
                    </button>
                  )}
                  {is_image && (
                    <button
                      onClick={(e) => handleOpenModel(e, "image", item)}
                      title={item?.title ? item.title : "Upload Image"}
                      className={` ${isDisable ? Styles.disabledButton : ""}`}
                      disabled={isDisable}
                    >
                      {item?.icon ? item.icon : <ImageIcon />}
                    </button>
                  )}
                  {is_link && (
                    <button
                      onClick={(e) => handleOpenModel(e, "link", item)}
                      title={item?.title ? item.title : "Add Link"}
                      className={` ${isDisable ? Styles.disabledButton : ""}`}
                      disabled={isDisable}
                    >
                      {item?.icon ? item.icon : <LinkIcon />}
                    </button>
                  )}
                  {is_video && (
                    <button
                      onClick={(e) => handleOpenModel(e, "video", item)}
                      title={item?.title ? item.title : "Upload Video"}
                      className={` ${isDisable ? Styles.disabledButton : ""}`}
                      disabled={isDisable}
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
                      disabled={
                        isPlaceholder && placeholder && !value && isDisable
                      }
                      isDisable={isDisable}
                    />
                  )}
                  {is_cut && (
                    <ButtonFunction
                      editorRef={editorRef}
                      name="cut"
                      icon={<CutIcon />}
                      title="Cut"
                      item={item}
                      disabled={
                        isPlaceholder && placeholder && !value && isDisable
                      }
                      isDisable={isDisable}
                    />
                  )}
                  {is_paste && (
                    <button
                      onClick={handlePaste}
                      title={item?.title ? item.title : "Paste"}
                      className={` ${isDisable ? Styles.disabledButton : ""}`}
                      disabled={isDisable}
                    >
                      {item?.icon ? item.icon : <PasteIcon />}
                    </button>
                  )}
                  {source_code && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={handleViewSource}
                        title={item?.title || "Source Code"}
                        className={` ${isDisable ? Styles.disabledButton : ""}`}
                        disabled={isDisable}
                      >
                        <CodeIcon />
                      </button>
                    </div>
                  )}
                  {is_fullscreen && (
                    <div className={Styles.increaseIconSize}>
                      <button
                        onClick={toggleFullScreen}
                        className={` ${isDisable ? Styles.disabledButton : ""}`}
                        disabled={isDisable}
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
                        className={` ${isDisable ? Styles.disabledButton : ""}`}
                        disabled={isDisable}
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
                        className={` ${isDisable ? Styles.disabledButton : ""}`}
                        disabled={isDisable}
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
          {isDisable && (
            <div className={`${Styles.warning_container}`}>
              ⚠️ Please enter a valid API key to continue{" "}
              <a
                href="https://6000-firebase-studio-1750316005416.cluster-73qgvk7hjjadkrjeyexca5ivva.cloudworkstations.dev/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </a>
            </div>
          )}
          <div
            {...others}
            className={`${Styles.mlMainContentBox}`}
            autoFocus={isFullScreen}
            contentEditable={!isDisable}
            ref={editorRef}
            onPaste={onPaste}
            spellCheck="true"
            onInput={handleInput}
            onBlur={handleBlur}
            data-placeholder={isDisable ? "" : placeholder}
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
            isDisable={isDisable}
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
