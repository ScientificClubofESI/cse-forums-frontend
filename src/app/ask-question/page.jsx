"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Dropcursor from "@tiptap/extension-dropcursor";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import ListItem from "@tiptap/extension-list-item";
import {
  GalleryImport,
  Code1,
  TextBold,
  TextUnderline,
  TextItalic,
  TextalignLeft,
  TextalignCenter,
  TextalignRight,
  Document,
  Send,
} from "iconsax-react";
import { common, createLowlight } from "lowlight";
import { TfiAlignLeft, TfiListOl, TfiAlignRight } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";
import { Navbarsignedin } from "@/components/navbar/navbarsignedin";
import { useRouter } from "next/navigation";

// the custom hooks
import useAuth from "@/hooks/Auth";
import { useCreateThread, useAddTags } from "@/hooks/Questions";


const AskQuestion = () => {

  const router = useRouter();
  const { user, userId, isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, authLoading, router]);

  const [isLoading, setIsLoading] = useState(false);
  const [questionTitle, setQuestionTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [iconSize, setIconSize] = useState(25);
  const [isAnswerPopupOpen, setIsAnswerPopupOpen] = useState(false);

  const { createThread, loading: createLoading, error: createError, clearError } = useCreateThread();
  const { addTags, loading: tagsLoading, error: tagsError } = useAddTags(null);


  const handleAnswerSubmit = (answerHtml) => {
    //console.log('Answer submitted:', answerHtml);
    // Process the submitted answer
    setIsAnswerPopupOpen(false);
  };

  // Update icon size on mount and window resize
  useEffect(() => {
    const updateIconSize = () => {
      setIconSize(window.innerWidth < 768 ? 20 : 25);
    };

    // Set initial size
    updateIconSize();

    // Add event listener
    window.addEventListener("resize", updateIconSize);

    // Clean up
    return () => window.removeEventListener("resize", updateIconSize);
  }, []);

  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
      handlePaste: (view, event) => {
        // Simple paste handler for images
        const items = Array.from(event.clipboardData?.items || []);
        const imageItems = items.filter((item) => /image/.test(item.type));

        if (imageItems.length > 0) {
          event.preventDefault();
          imageItems.forEach((item) => {
            const file = item.getAsFile();
            if (file) {
              const fileReader = new FileReader();
              fileReader.readAsDataURL(file);
              fileReader.onload = () => {
                // Use view.dispatch instead of editor chain to avoid circular dependency
                const { schema } = view.state;
                const node = schema.nodes.image.create({
                  src: fileReader.result,
                });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
              };
            }
          });
          return true;
        }
        return false;
      },
      handleDrop: (view, event) => {
        // Simple drop handler for images
        const files = Array.from(event.dataTransfer?.files || []);
        const imageFiles = files.filter((file) => /image/.test(file.type));

        if (imageFiles.length > 0) {
          event.preventDefault();
          imageFiles.forEach((file) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              // Use view.dispatch instead of editor chain to avoid circular dependency
              const { schema } = view.state;
              const node = schema.nodes.image.create({
                src: fileReader.result,
              });
              const transaction = view.state.tr.replaceSelectionWith(node);
              view.dispatch(transaction);
            };
          });
          return true;
        }
        return false;
      },
    },
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Give us more details about your question…",
        emptyEditorClass:
          "is-editor-empty first:before:block before:content-[attr(data-placeholder)] before:text-[#adb5bd] before:float-left before:h-0 before:pointer-events-none",
      }),
      Underline,
      Image.configure({
        inline: true,
      }),
      Dropcursor,
      TextAlign.configure({
        types: ["heading", "paragraph", "input"],
        defaultAlignment: "left",
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Highlight,
    ],
    onBeforeCreate: () => {
      setIsLoading(true);
    },
    onCreate: () => {
      setIsLoading(false);
    },
  });

  // Custom image handler function
  const handleImageUpload = useCallback(
    (file) => {
      if (!file || !editor) return;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        editor.chain().focus().setImage({ src: fileReader.result }).run();
      };
    },
    [editor]
  );

  const handleKeyEvent = (e) => {
    if (e.key === "Enter" && e.target.value !== "") {
      setTags([...tags, e.target.value]);
      setTagInput("");
    }
  };

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("Insert an Image Link");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleFileInputClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const handleFileSelection = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Simple handling for image files
      if (file.type.startsWith("image/")) {
        handleImageUpload(file);
      } else {
        // For other document types, you could implement a simple parser
        // or just notify user that this functionality is limited
        setError("Only image uploads are supported in this version");
      }
    },
    [handleImageUpload]
  );

  // Add code block function
  const addCodeBlock = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  }, [editor]);



  const handleThreadSubmit = async () => {
    // Clear any previous errors
    clearError();

    // Validation
    if (!questionTitle.trim()) {
      setError("Title cannot be empty!");
      return;
    }

    if (!editor.getHTML().trim() || editor.getHTML() === '<p></p>') {
      setError("Content cannot be empty!");
      return;
    }

    // Prepare thread data
    const threadData = {
      title: questionTitle.trim(),
      content: editor.getHTML(),
    };

    // Create the thread
    const result = await createThread(threadData);

    if (result.success) {
      // Success - clear form
      setQuestionTitle("");
      editor.commands.clearContent();
      // tags creation
      if (tags.length > 0) {
        const tagResult = await addTags(tags, result.data.id);

        if (!tagResult.success) {
          console.error('Failed to add tags:', tagResult.error);
          setError(`Thread created but failed to add tags: ${tagResult.error}`);
        }
      }
      setTags([]);
      setTagInput("");
      router.push('/allquestions'); // Redirect to all questions page
    } else {
      // Error is already set by the hook
      console.error('Failed to create thread:', result.error);
    }
  };


  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!editor) {
    return null;
  }


  return (
    <>
      <Navbarsignedin />
      <main
        className="w-full min-h-screen px-4 sm:px-8 md:px-16 lg:px-32 py-6 md:py-14 flex flex-col gap-3 md:gap-5"
        style={{
          background:
            "linear-gradient(0deg, rgba(46, 117, 173, 0.05), rgba(46, 117, 173, 0.05)), #FFFBFE",
        }}
      >
        <div className="flex content-center justify-start">
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl leading-tight sm:leading-normal">
            Few Steps to Ask Your Question
          </h2>
        </div>

        <div className="w-full flex flex-col gap-0.5">
          <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight">
            Title <span className="text-secondary-500">*</span>
          </h3>
          <p className="font-serif font-light text-sm sm:text-base text-neutral-700 leading-normal">
            It&apos;s best to write short & to the point titles.
          </p>
          <input
            type="text"
            name="question"
            className="w-full h-10 bg-white rounded-sm p-4 font-serif focus:outline-none"
            placeholder="Enter the title of your question"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col gap-0.5">
          <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight">
            Details <span className="text-secondary-500">*</span>
          </h3>

          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0">
            <div className="flex flex-col items-center gap-1 mb-2">
              <h3 className="font-serif font-bold text-sm md:text-base text-center">
                Fonts
              </h3>
              <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                <span
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className="cursor-pointer"
                >
                  <TextBold color="#000000" size={iconSize} />
                </span>
                <span
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  className="cursor-pointer"
                >
                  <TextUnderline color="#000000" size={iconSize} />
                </span>
                <span
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className="cursor-pointer"
                >
                  <TextItalic color="#000000" size={iconSize} />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 mb-2">
              <h3 className="font-serif font-bold text-sm md:text-base text-center">
                Alignment
              </h3>
              <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                <span
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  className="cursor-pointer"
                >
                  <TextalignLeft color="#000000" size={iconSize} />
                </span>
                <span
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  className="cursor-pointer"
                >
                  <TextalignCenter color="#000000" size={iconSize} />
                </span>
                <span
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  className="cursor-pointer"
                >
                  <TextalignRight color="#000000" size={iconSize} />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 mb-2">
              <h3 className="font-serif font-bold text-sm md:text-base text-center">
                Indenting/Lists
              </h3>
              <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                <TfiAlignLeft size={iconSize} className="cursor-pointer" />
                <TfiAlignRight size={iconSize} className="cursor-pointer" />
                <span
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  className="cursor-pointer"
                >
                  <TfiListOl size={iconSize} />
                </span>
                <span
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  className="cursor-pointer"
                >
                  <TfiListOl size={iconSize} />
                </span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 mb-2">
              <h3 className="font-serif font-bold text-sm md:text-base text-center">
                Inserts
              </h3>
              <div className="flex items-center justify-center gap-2 md:gap-3 pb-4">
                <span onClick={addImage} className="cursor-pointer">
                  <GalleryImport color="#000000" size={iconSize} />
                </span>
                <span onClick={addCodeBlock} className="cursor-pointer">
                  <Code1 color="#000000" size={iconSize} />
                </span>
              </div>
            </div>
          </div>

          {error && <div className="text-red-500 mb-2">{error}</div>}

          <EditorContent
            className="w-full h-64 md:h-96 rounded-md p-3 md:p-4 lg:p-6 bg-white resize-none focus:outline-none overflow-auto"
            editor={editor}
          />
        </div>

        <div className="w-full flex flex-col gap-0.5">
          <h3 className="font-serif font-bold text-lg sm:text-xl leading-tight">
            Tags <span className="text-secondary-500">*</span>
          </h3>
          <p className="font-serif font-light text-sm sm:text-base text-neutral-700 leading-normal">
            You can choose up to 10 tags.
          </p>
          <div className="w-full min-h-[50px] bg-white rounded-sm p-2 font-serif flex flex-wrap gap-2 md:gap-3">
            {tags.map((tag, index) => (
              <div
                className="h-6 w-fit bg-black rounded-sm p-1 font-serif flex items-center justify-center gap-0.5 mb-2 md:mb-0"
                key={index}
              >
                <span
                  className="cursor-pointer"
                  onClick={() => setTags(tags.filter((t) => t !== tag))}
                >
                  <IoIosClose size={iconSize} color="white" />
                </span>
                <p className="text-white text-xs md:text-sm font-bold">{tag}</p>
              </div>
            ))}
            <input
              type="text"
              name="tag"
              className="flex-grow h-10 bg-white font-serif focus:outline-none"
              placeholder="Enter a tag"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyEvent}
            />
          </div>
        </div>

        <button
          className="bg-secondary-500 w-full h-12 md:h-14 text-center font-sans text-white rounded-md flex items-center justify-center gap-2 md:gap-4 p-2 md:p-4 hover:bg-secondary-300 transition duration-300"
          // onClick={() => setIsAnswerPopupOpen(true)}
          onClick={handleThreadSubmit}
        >
          <span className="text-sm md:text-base">Post Your Question</span>
          <Send size={iconSize} color="#d9e3f0" variant="Bold" />
        </button>
      </main>
    </>
  );
};

export default AskQuestion;
