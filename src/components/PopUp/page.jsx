"use client";
import { useState, useCallback, useEffect } from "react";
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

// Import the custom hook
import { useAddAnswer } from "@/hooks/Answers";
import useAuth from "@/hooks/Auth";

export default function PopUp({
  isOpen,
  onClose,
  threadId,
  onAnswerAdded,
}) {
  const [iconSize, setIconSize] = useState(20);
  const { user, userId, isAuthenticated } = useAuth();
  const { addAnswer, loading: submitting, error: submitError, success, clearError } = useAddAnswer();

  const [error, setError] = useState(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      BulletList,
      OrderedList,
      ListItem,
      Placeholder.configure({
        placeholder: "Type your answer here...",
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
  });

  const addImage = useCallback(() => {
    if (!editor) return;

    const url = window.prompt("Insert an Image Link");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  // Add code block function
  const addCodeBlock = useCallback(() => {
    if (editor) {
      editor.chain().focus().toggleCodeBlock().run();
    }
  }, [editor]);

  // Clear editor when popup closes
  useEffect(() => {
    if (!isOpen && editor) {
      editor.commands.clearContent();
      clearError();
    }
  }, [isOpen, editor, clearError]);


  const handleAnswerSubmit = async () => {
    if (!editor) return;

    const content = editor.getHTML();

    // Validation
    if (!content || content === '<p></p>' || content.trim() === '') {
      setError('Please enter an answer before submitting.');
      return;
    }

    try {
      const result = await addAnswer(threadId, content);

      if (result.success) {
        // Clear the editor
        editor.commands.clearContent();

        // Call the callback to refresh questions/answers
        if (onAnswerAdded) {
          onAnswerAdded();
        }

        // Close the popup
        onClose();

        // Optional: Show success message
        console.log('Answer submitted successfully!');
      } else {
        // Error is already set by the hook
        console.error('Failed to submit answer:', result.error);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };


  if (!isOpen) return null;

  if (!editor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-md w-full max-w-2xl p-4 flex flex-col gap-3">
        <div className="text-lg font-serif font-bold border-b pb-2">
          Type your Answer Here
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
            {error}
          </div>
        )}
        {submitError && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-2">
            {submitError}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col items-center">
            <h3 className="text-sm font-serif font-bold">Fonts</h3>
            <div className="flex items-center gap-2">
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

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-serif font-bold">Alignment</h3>
            <div className="flex items-center gap-2">
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

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-serif font-bold">Indenting/Lists</h3>
            <div className="flex items-center gap-2">
              <TfiAlignLeft size={iconSize} className="cursor-pointer" />
              <TfiAlignRight size={iconSize} className="cursor-pointer" />
              <span
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className="cursor-pointer"
              >
                <TfiListOl size={iconSize} />
              </span>
              <span
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className="cursor-pointer"
              >
                <TfiListOl size={iconSize} />
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <h3 className="text-sm font-serif font-bold">Inserts</h3>
            <div className="flex items-center gap-2">
              <span className="cursor-pointer">
                <Document color="#000000" size={iconSize} />
              </span>
              <span onClick={addImage} className="cursor-pointer">
                <GalleryImport color="#000000" size={iconSize} />
              </span>
              <span onClick={addCodeBlock} className="cursor-pointer">
                <Code1 color="#000000" size={iconSize} />
              </span>
            </div>
          </div>
        </div>

        <div className="h-64 border rounded-md p-3 overflow-y-auto">
          <EditorContent
            className="h-full focus:outline-none"
            editor={editor}
          />
        </div>

        <div className="flex justify-between mt-2">
          <button
            className="px-4 py-2 bg-[#EAEAEA] border-none  rounded-md"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-secondary-500 text-white rounded-md flex items-center gap-2"
            onClick={() => {
              if (editor) {
                // onSubmit(editor.getHTML());
                handleAnswerSubmit();
                // getQuestions();
                onClose();
              }
            }}
          >
            <span>Drop an Answer</span>
            <Send size={iconSize} color="#ffffff" variant="Bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
