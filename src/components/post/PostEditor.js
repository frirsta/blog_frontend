import dynamic from "next/dynamic";
import { useMemo } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function PostEditor({
  title,
  setTitle,
  content,
  setContent,
  error,
  onSave,
}) {
  const editorConfig = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
      showCharsCounter: false,
      disablePlugins:
        "clean-html,about,add-new-line,ai-assistant,backspace,class-span,drag-and-drop,drag-and-drop-element,dtd,file,focus,format-block,hotkeys,hr,iframe,image,image-processor,image-properties,indent,inline-popup,justify,key-arrow-outside,limit,line-height,media,paste-from-word,powered-by-jodit,resize-handler,resizer,search,select,select-cells,source,speech-recognize,stat,sticky,symbols,tab,table,table-keyboard-navigation,video,wrap-nodes,xpath,spellcheck,clipboard,copyformat,delete-command,color,enter,fullsize,mobile,paste-storage,placeholder,resize-cells",
      buttons:
        "bold,italic,underline,strikethrough,ul,ol,font,fontsize,link,undo,redo",
    }),
    []
  );

  return (
    <div>
      <label htmlFor="title" className="label">
        Post Title
      </label>
      <input
        id="title"
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        aria-label="Title"
      />
      {error.title && (
        <p className="text-error">
          <p className="text-red-500">{error.title}</p>
        </p>
      )}

      <label htmlFor="content" className="label mt-4">
        Post Content
      </label>
      <JoditEditor
        id="content"
        value={content}
        config={editorConfig}
        onChange={(newContent) => setContent(newContent)}
        className="w-full mt-4"
      />
      {error.content && (
        <p className="text-error">
          <p className="text-red-500">{error.content}</p>
        </p>
      )}

      <button onClick={() => onSave()} className="btn btn-primary mt-4">
        Save Post
      </button>
    </div>
  );
}
