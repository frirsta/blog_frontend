import React, { useRef } from "react";
import "@pqina/pintura/pintura.css";
import { PinturaEditor } from "@pqina/react-pintura";
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_filter,
  plugin_finetune_defaults,
  plugin_filter_defaults,
  markup_editor_defaults,
} from "@pqina/pintura";
import {
  LocaleCore,
  LocaleCrop,
  LocaleFinetune,
  LocaleFilter,
  LocaleMarkupEditor,
} from "@pqina/pintura/locale/en_GB";

setPlugins(plugin_crop, plugin_finetune, plugin_filter);

const editorDefaults = {
  utils: ["crop", "filter", "finetune"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter({
    quality: 0.8,
    mimeType: "image/jpeg",
  }),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleMarkupEditor,
  },
};
const ImageEditor = ({ imageSrc, onNext, onProcessImage }) => {
  const editorRef = useRef(null);

  const handleNext = async () => {
    const editor = editorRef.current.editor;
    const imageWriterResult = await editor.processImage();
    const editedImageFile = new File(
      [imageWriterResult.dest],
      "edited-image.jpg",
      { type: "image/jpeg" }
    );
    onProcessImage(editedImageFile);
    onNext();
  };

  return (
    <div className="w-full h-[100%]">
      <div className="flex justify-between">
        <button
          className="btn btn-sm btn-link hover:no-underline no-underline absolute top-2 right-8 rounded text-base-content z-10"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
      <PinturaEditor
        ref={editorRef}
        {...editorDefaults}
        imageCropAspectRatio={16 / 9}
        layoutDirectionPreference="horizontal"
        src={imageSrc}
      />
    </div>
  );
};

export default ImageEditor;
