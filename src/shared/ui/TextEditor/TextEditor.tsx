import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "code"],
    ["clean"]
  ]
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "code"
];

interface OnChangeHandler {
  (e: any): void;
}

type ITextEditorProps = {
  value: string;
  placeholder?: string;
  readonly?: boolean;
  onChange?: OnChangeHandler;
};

const TextEditor = ({
  value,
  onChange,
  placeholder,
  readonly
}: ITextEditorProps) => {
  return (
    <ReactQuill
      theme="snow"
      value={value || ""}
      modules={modules}
      formats={formats}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readonly ?? false}
    />
  );
};

export default TextEditor;
