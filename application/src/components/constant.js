export const TOOLBAR_ITEMS = [
  "undo",
  "redo",
  "|",
  "format",
  "fontfamily",
  "fontsize",
  "|",
  "bold",
  "italic",
  "underline",
  "superscript",
  "subscript",
  "|",
  // "alignLeft",
  // "alignCenter",
  // "alignRight",
  // "alignJustify",
  "alignment",
  "|",
  "indent",
  "outdent",
  "|",
  "orderedList",
  "unorderedList",
  "|",
  "removeFormat",
  "|",
  "textColor",
  "backgroundColor",
  "|",
  "ltr",
  "rtl",
  "|",
  "copy",
  "cut",
  "paste",
  "select_all",
  "|",
  "image",
  "link",
  "video",
  "|",
  "source_code",
  "full_screen",
  "special_character",
  "horizontal_line",
];

export const NAVBAR_ITEMS = [
  "file",
  "view",
  "insert",
  "format",
  "|",
  "select_all",
  "|",
  "image",
  "link",
  "video",
  "|",
  "copy",
  "cut",
  "paste",
  "|",
];

export const FORMAT_OPTIONS = [
  "bold",
  "italic",
  "underline",
  "superscript",
  "subscript",
  "font",
  "font_size",
  "alignment",
];

export const INSER_OPTIONS = [
  "image",
  "link",
  "video",
  "hr_line",
  "special_char",
];

export const FILE_OPTIONS = ["new_document", "preview", "print"];
export const VIEW_OPTIONS = ["source_code", "full_screen"];

export function generateRandomID(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters.charAt(randomIndex);
  }
  return id;
}

export function transformHTML(htmlString) {
  let parser = new DOMParser();
  if (htmlString) {
    let doc = parser.parseFromString(htmlString, "text/html");

    doc.querySelectorAll("div").forEach((divElement) => {
      let pElement = doc.createElement("p");
      pElement.innerHTML = divElement.innerHTML;
      divElement.replaceWith(pElement);
    });

    let transformedHTML = doc.body.innerHTML;

    transformedHTML = transformedHTML.replace(/<br\s*\/?>/g, "&nbsp;");
    transformedHTML = transformedHTML.replace(
      /<(?=[^/])/g,
      (match) => `\n${match}`
    );
    transformedHTML = transformedHTML.trim();

    const lines = transformedHTML.split("\n");
    const processedLines = lines.map((line) => {
      const hasLeading = /^<.*?>|<.*?>$/.test(line);
      if (!hasLeading && line.trim()) {
        return `<p>${line}</p>`;
      }
      return line;
    });
    return processedLines.join("\n").trim();
  }
  return "";
}

export const remove_resizer = () => {
  let element = document.querySelector(".resizeImageWrapper");
  let image_element = document.querySelector(".resizer-image");
  if (element && image_element) {
    element.insertAdjacentElement("afterend", image_element);
    image_element.classList.remove("resizer-image");
    element.parentNode.removeChild(element);
  }
};

export const getCroppedImage = async (image, crop, originalFile) => {
  if (!crop || !image) {
    console.error("No crop data or image reference");
    return null;
  }

  const canvas = document.createElement("canvas");
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext("2d");

  // Preserve transparency by clearing canvas with transparent pixels
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );

  return new Promise((resolve) => {
    // Determine the correct file type and extension
    let fileType = "image/png"; // Default to PNG for transparency support
    let fileExt = "png";

    if (originalFile) {
      if (typeof originalFile === "string") {
        // Extract extension from URL
        const urlParts = originalFile.split(".");
        fileExt = urlParts[urlParts.length - 1].toLowerCase();
        fileType = `image/${fileExt === "jpg" ? "jpeg" : fileExt}`;
      } else {
        // Use the original file's type
        fileType = originalFile.type || "image/png";
        fileExt = fileType.split("/").pop();
        if (fileExt === "jpeg") fileExt = "jpg";
      }
    }

    // Use PNG if we need transparency, regardless of original format
    const needsTransparency =
      fileType === "image/png" || fileType === "image/gif";
    const outputType = needsTransparency ? "image/png" : fileType;

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          console.error("Canvas is empty");
          resolve(null);
          return;
        }

        let fileName = "cropped-image.png"; // Default name with PNG
        if (originalFile) {
          if (typeof originalFile === "string") {
            const urlParts = originalFile.split("/");
            const originalName = urlParts[urlParts.length - 1].replace(
              /\.[^/.]+$/,
              ""
            );
            fileName = `${originalName}-cropped.${fileExt}`;
          } else {
            const originalName =
              originalFile.name.replace(/\.[^/.]+$/, "") || "cropped-image";
            fileName = `${originalName}-cropped.${fileExt}`;
          }
        }

        const file = new File([blob], fileName, {
          type: outputType,
          lastModified: Date.now(),
        });
        resolve(file);
      },
      outputType, // Use the determined output type
      outputType === "image/jpeg" ? 0.9 : 1 // Only apply quality for JPEG
    );
  });
};
