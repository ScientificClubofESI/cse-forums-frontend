'use client';
import { useState, useCallback, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Dropcursor from '@tiptap/extension-dropcursor';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import FileHandler from '@tiptap-pro/extension-file-handler';
import Import from '@tiptap-pro/extension-import';
import DragHandle from '@tiptap-pro/extension-drag-handle-react';
import { common, createLowlight } from 'lowlight';
import {
  FiBold,
  FiUnderline,
  FiItalic,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiList,
  FiFile,
  FiImage,
  FiTerminal,
} from 'react-icons/fi';
import { TfiAlignLeft, TfiListOl, TfiAlignRight } from 'react-icons/tfi';
import { IoIosClose } from 'react-icons/io';
import './page.css';
import ListItem from '@tiptap/extension-list-item';
const iconSize = 25;
const styles = {
  container:
    'w-full min-h-[100vh] px-32 py-14 flex content-start justify-start flex-col flex-wrap gap-5',
  titleContainer: 'flex content-center justify-start',
  title: 'font-sans font-semibold text-5xl leading-[84px] ',
  subPartContainer:
    'w-full flex content-start justify-start flex-col gap-0.5  flex-wrap',
  subtitle: 'font-serif font-bold text-xl leading-[40px] ',
  asterix: 'text-secondary-500',
  subsubtitle: 'font-serif font-light text-l leading-[24px] ',
  smallInput: 'w-full h-10 bg-white rounded-sm p-4 font-serif',
  paramsContainer: 'w-full flex content-center justify-evenly ',
  params:
    'w-1/8  flex content-center justify-center flex-col gap-1 flex-wrap mb-2',
  paramsTitle: 'font-serif font-bold text-m leading-[20px] text-center',
  paramsIcons: 'w-full flex content-center justify-center gap-3',
  bigInput:
    'w-full h-42 bg-white rounded-sm p-4 font-serif resize-none focus:outline-none',
  tagContainer:
    'w-full h-min-10 bg-white rounded-sm p-2 font-serif flex content-start justify-start flex-wrap flex-row gap-3',
  tag: 'h-6 w-fit bg-black rounded-sm p-1 font-serif flex content-center justify-center flex-wrap gap-0.5',
  tagText: 'text-white text-sans font-bold',
  tagInput: 'min-w-max h-full bg-white  font-serif focus:outline-none',
  closeTag: 'cursor-pointer',
  button:
    'bg-secondary-500 w-full h-10 text-center font-sans text-white rounded-sm',
};

const AskQuestion = () => {
  const APP_ID = process.env.TIP_TAP_PROJECT_ID;
  const JWT = process.env.TIP_TAP_JWT;
  const [isLoading, setIsLoading] = useState(false);
  const [questionTitle, setQuestionTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const importRef = useRef(null);
  const [error, setError] = useState(null);
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: 'focus:outline-none ',
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
        placeholder: 'Give us more details about your question …',
        emptyEditorClass:
          'is-editor-empty first:before:block before:content-[attr(data-placeholder)] before:text-[#adb5bd] before:float-left before:h-0 before:pointer-events-none',
      }),
      Underline,
      Image.configure({
        inline: true,
      }),
      Dropcursor,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'input'],
        defaultAlignment: 'left',
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
      }),
      Highlight,
      FileHandler.configure({
        allowedMimeTypes: [
          'image/png',
          'image/jpeg',
          'image/gif',
          'image/webp',
        ],
        onDrop: (currentEditor, files, pos) => {
          files.forEach((file) => {
            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(pos, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach((file) => {
            if (htmlContent) {
              // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
              // you could extract the pasted file from this url string and upload it to a server for example
              console.log(htmlContent); // eslint-disable-line no-console
              return false;
            }

            const fileReader = new FileReader();

            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor
                .chain()
                .insertContentAt(currentEditor.state.selection.anchor, {
                  type: 'image',
                  attrs: {
                    src: fileReader.result,
                  },
                })
                .focus()
                .run();
            };
          });
        },
      }), // ...
      Import.configure({
        // The Convert App-ID from the Convert settings page: https://cloud.tiptap.dev/convert-settings
        appId: APP_ID,

        // The JWT token you generated in the previous step
        token: JWT,

        // The URL to upload images to, if not provided, images will be stripped from the document
        imageUploadCallbackUrl: 'https://your-image-upload-url.com',

        // Enables the experimental DOCX import which should better preserve content styling
        experimentalDocxImport: true,
      }),
    ],
    onBeforeCreate: ({ editor }) => {
      setIsLoading(true);
    },
    onCreate: ({ editor }) => {
      setIsLoading(false);
    },
    immediatelyRender: false,
    shouldRerenderOnTransaction: false,
    content: `
     
  `,
  });

  const handleKeyEvent = (e) => {
    if (e.key === 'Enter' && e.target.value !== '') {
      setTags([...tags, e.target.value]);
      setTagInput('');
    }
  };

  const addImage = useCallback(() => {
    const url = window.prompt('Insert an Image Link');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const handleImportClick = useCallback(() => {
    importRef.current.click();
  }, []);

  const handleImportFilePick = useCallback(
    (e) => {
      const file = e.target.files[0];

      importRef.current.value = '';

      if (!file) {
        return;
      }

      setIsLoading(true);
      setError(null);
      editor
        .chain()
        .import({
          file,
          onImport(context) {
            if (context.error) {
              setError(context.error);
              setIsLoading(false);
              return;
            }
            context.setEditorContent(context.content);
            setError(null);
            setIsLoading(false);
          },
        })
        .run();
    },
    [editor]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!editor) {
    return null;
  }

  return (
    <main
      className={styles.container}
      style={{
        background:
          'linear-gradient(0deg, rgba(46, 117, 173, 0.05), rgba(46, 117, 173, 0.05)), #FFFBFE',
      }}
    >
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Few Steps to Ask Your Question</h2>
      </div>
      <div className={styles.subPartContainer}>
        <h3 className={styles.subtitle}>
          Title <span className={styles.asterix}>*</span>
        </h3>
        <p className={styles.subsubtitle}>
          It’s best to wright short & to the point titles.
        </p>
        <input
          type="text"
          name="question"
          className={styles.smallInput}
          placeholder="Enter The title of your question"
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
      </div>
      <div className={styles.subPartContainer}>
        <h3 className={styles.subtitle}>
          Details <span className={styles.asterix}>*</span>
        </h3>
        <div className={styles.paramsContainer}>
          <div className={styles.params}>
            <h3 className={styles.paramsTitle}>Fonts</h3>
            <div className={styles.paramsIcons}>
              <span onClick={() => editor.chain().focus().toggleBold().run()}>
                <FiBold size={iconSize} />
              </span>
              <span
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <FiUnderline size={iconSize} />
              </span>
              <span onClick={() => editor.chain().focus().toggleItalic().run()}>
                <FiItalic size={iconSize} />
              </span>
            </div>
          </div>
          <div className={styles.params}>
            <h3 className={styles.paramsTitle}>Alignment</h3>
            <div className={styles.paramsIcons}>
              <FiAlignLeft
                size={iconSize}
                onClick={() => editor.commands.setTextAlign('left')}
              />
              <FiAlignCenter
                size={iconSize}
                onClick={() => editor.commands.setTextAlign('center')}
              />
              <FiAlignRight
                size={iconSize}
                onClick={() => editor.commands.setTextAlign('right')}
              />
            </div>
          </div>
          <div className={styles.params}>
            <h3 className={styles.paramsTitle}>Indenting/Lists</h3>
            <div className={styles.paramsIcons}>
              <TfiAlignLeft size={iconSize} />
              <TfiAlignRight size={iconSize} />
              <FiList
                size={iconSize}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              />
              <TfiListOl
                size={iconSize}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              />
            </div>
          </div>
          <div className={styles.params}>
            <h3 className={styles.paramsTitle}>Inserts</h3>
            <div className={styles.paramsIcons}>
              <button onClick={handleImportClick}>
                <FiFile size={iconSize} />
                <input
                  onChange={handleImportFilePick}
                  type="file"
                  ref={importRef}
                  style={{ display: 'none' }}
                />
              </button>

              <FiImage size={iconSize} onClick={addImage} />
              <FiTerminal
                size={iconSize}
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              />
            </div>
          </div>
        </div>
        <DragHandle editor={editor}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </DragHandle>
        <EditorContent
          className={styles.bigInput}
          placeholder="Give us more details about your question"
          editor={editor}
        />
      </div>
      <div className={styles.subPartContainer}>
        <h3 className={styles.subtitle}>
          Tags <span className={styles.asterix}>*</span>
        </h3>
        <p className={styles.subsubtitle}>You can choose up to 10 tags.</p>
        <div className={styles.tagContainer}>
          {tags.map((tag, index) => (
            <div className={styles.tag} key={index}>
              <span
                className={styles.closeTag}
                onClick={() => setTags(tags.filter((t) => t !== tag))}
              >
                <IoIosClose size={25} color="white" />
              </span>
              <p className={styles.tagText}>{tag}</p>
            </div>
          ))}
          <input
            type="text"
            name="tag"
            className={styles.tagInput}
            placeholder="Enter a tag"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleKeyEvent}
          />
        </div>
      </div>
      <button className={styles.button}> Post Your Question</button>
    </main>
  );
};

export default AskQuestion;
