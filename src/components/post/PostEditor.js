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
      <button
        onClick={() => onSave()}
        className="btn btn-circle btn-link hover:no-underline no-underline absolute top-2 right-8 btn-sm rounded text-base z-10 w-fit"
      >
        Save Post
      </button>
      <div className="divider my-3"></div>
      <div>
        <label htmlFor="title" className="label font-bold text-lg ml-2 mt-2">
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
          <p className="text-error ml-2">
            <p className="text-error">{error.title}</p>
          </p>
        )}
      </div>
      <div>
        <label htmlFor="content" className="label font-bold text-lg ml-2 mt-2">
          Post Content
        </label>

        <JoditEditor
          id="content"
          value={content}
          config={editorConfig}
          onChange={(newContent) => setContent(newContent)}
          className="w-full"
        />
        {error.content && (
          <p className="text-error ml-2">
            <p className="text-error">{error.content}</p>
          </p>
        )}
      </div>
    </div>
  );
}
