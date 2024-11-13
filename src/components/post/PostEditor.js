import { useEffect, useMemo, useState } from "react";
import CreatableSelect from "react-select/creatable";
import dynamic from "next/dynamic";
import api from "@/utils/axiosInstance";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

export default function PostEditor({
  title,
  setTitle,
  content,
  setContent,
  error,
  onSave,
  tags,
  setTags,
  selectedCategory,
  setSelectedCategory,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/posts/category/");
        setCategories(response.data);
      } catch (err) {
        // console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

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
        className="btn btn-link btn-sm hover:no-underline no-underline absolute top-2 right-8 rounded text-base-content z-10 w-fit"
      >
        Save Post
      </button>
      <div className="sm:mt-2">
        <span className="label font-bold ml-2">Post Title</span>
        <input
          id="title"
          name="title"
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full placeholder:text-[oklch(var(--bc)/0.5)] text-[0.875rem] bg-base-200"
          aria-label="Title"
        />
        {error?.title && <p className="text-error ml-2">{error?.title}</p>}
      </div>
      <div className="sm:mt-4">
        <span className="label font-bold ml-2">Category</span>
        <select
          id="category"
          name="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="select select-bordered w-full placeholder:text-[oklch(var(--bc)/0.5)] text-base-content bg-base-200"
        >
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="sm:mt-4">
        <span className="label font-bold text-lg ml-2">Tags</span>
        <CreatableSelect
          id="tags"
          name="tags"
          isMulti
          placeholder="Enter tags..."
          value={tags.map((tag) => ({ value: tag, label: tag }))}
          onChange={(newTags) => setTags(newTags.map((tag) => tag.value))}
          className="basic-multi-select"
          classNamePrefix="tag-select"
          styles={{
            control: (styles) => ({
              ...styles,
              backgroundColor: "oklch(var(--b2))",
              borderColor: error?.tags_names
                ? "oklch(var(--er))"
                : "var(--fallback-bc,oklch(var(--bc)/0.2))",
              borderRadius: "var(--rounded-btn, 0.5rem)",
              height: "3rem",
              minHeight: "3rem",
              color: "var(--fallback-bc,oklch(var(--bc)/0.2)",
            }),
            multiValue: (styles) => ({
              ...styles,
              backgroundColor: "oklch(var(--b3))",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: "oklch(var(--bc))",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              color: "oklch(var(--bc))",
              ":hover": {
                backgroundColor: "oklch(var(--b3))",
              },
            }),
            placeholder: (styles) => ({
              ...styles,
              color: "oklch(var(--bc)/0.5)",
              fontSize: "0.875rem",
              paddingInlineStart: "8px",
              paddingInlineEnd: "8px",
            }),
            input: (styles) => ({
              ...styles,
              color: "oklch(var(--bc))",
              paddingInlineStart: "8px",
              paddingInlineEnd: "8px",
            }),
          }}
          required
        />
        {error?.tags_names && (
          <p className="text-error ml-2">{error?.tags_names}</p>
        )}
      </div>
      <div>
        <span className="label font-bold ml-2">Post Content</span>
        <JoditEditor
          id="content"
          name="content"
          value={content}
          config={editorConfig}
          onChange={(newContent) => setContent(newContent)}
          className="w-full"
        />
        {error?.content && <p className="text-error ml-2">{error?.content}</p>}
      </div>
    </div>
  );
}
