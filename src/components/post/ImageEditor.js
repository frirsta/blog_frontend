import { PinturaEditor } from "@pqina/react-pintura";
import {
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,
  plugin_finetune_defaults,
  plugin_filter_defaults,
  markup_editor_defaults,
  setPlugins,
  plugin_crop,
  plugin_finetune,
  plugin_filter,
  plugin_annotate,
} from "@pqina/pintura";
import {
  LocaleCore,
  LocaleCrop,
  LocaleFinetune,
  LocaleFilter,
  LocaleAnnotate,
  LocaleMarkupEditor,
} from "@pqina/pintura/locale/en_GB";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...LocaleCore,
    ...LocaleCrop,
    ...LocaleFinetune,
    ...LocaleFilter,
    ...LocaleAnnotate,
    ...LocaleMarkupEditor,
  },
};

export default function ImageEditor({ image, onImageSave, onCancel }) {
  useEffect(() => {
    let objectUrl = null;
    if (image instanceof Blob) {
      objectUrl = URL.createObjectURL(image);
      console.log("Created object URL", objectUrl);
    }
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        console.log("Revoked object URL", objectUrl);
      }
    };
  }, [image]);

  const handleImageSave = async (output) => {
    const response = await fetch(output);
    const blob = await response.blob();
    console.log(image, blob);
    onImageSave(blob);
  };

  return (
    <div className="relative aspect-square">
      {image && image instanceof Blob && (
        <PinturaEditor
          {...editorDefaults}
          src={URL.createObjectURL(image)}
          onProcess={({ dest }) => handleImageSave(URL.createObjectURL(dest))}
          onClose={onCancel}
        />
      )}
      <button
        type="button"
        onClick={onCancel}
        className="absolute top-0 left-2 btn btn-circle btn-outline btn-xs transition-colors duration-300"
        aria-label="Cancel editing"
      >
        <FaTimes />
      </button>
    </div>
  );
}
