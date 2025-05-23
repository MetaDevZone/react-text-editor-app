import React, { useState, useCallback, useRef } from "react";
import ReactCrop from "react-image-crop";

export const ImageCropper = ({
  imageSrc,
  onCropComplete,
  aspectRatio = 16 / 9,
}) => {
  const [crop, setCrop] = useState({ aspect: aspectRatio });
  const imgRef = useRef(null);

  const onImageLoaded = useCallback((img) => {
    imgRef.current = img;
    return false;
  }, []);

  const handleCropComplete = useCallback(
    (crop) => {
      onCropComplete(crop, imgRef.current);
    },
    [onCropComplete]
  );

  return (
    <ReactCrop crop={crop} onChange={setCrop} onComplete={handleCropComplete}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt="Crop preview"
        onLoad={(e) => onImageLoaded(e.currentTarget)}
      />
    </ReactCrop>
  );
};
