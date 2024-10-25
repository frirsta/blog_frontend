import dynamic from "next/dynamic";
import { useMemo } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function PostEditor({ title, setTitle, content, setContent }) {
  const editorConfig = useMemo(
    () => ({
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif", "svg", "webp"],
      },
    }),
    []
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Post Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="input input-bordered w-full"
        aria-label="Title"
        required
      />
      <JoditEditor
        value={content}
        config={editorConfig}
        onChange={(newContent) => setContent(newContent)}
        className="w-full mt-4"
      />
    </div>
  );
}
