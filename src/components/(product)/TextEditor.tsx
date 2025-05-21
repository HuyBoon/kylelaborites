"use client";

import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { toast } from "sonner";

interface TinyMCEEditorProps {
	value: string;
	onChange: (value: string) => void;
	height: number;
}

const TextEditor: React.FC<TinyMCEEditorProps> = ({
	value,
	onChange,

	height,
}) => {
	const editorRef = useRef<any>(null);

	return (
		<Editor
			apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"}
			onEditorChange={(content) => onChange(content)}
			value={value}
			init={{
				height: height,
				menubar: true,
				plugins: [
					"advlist autolink lists link image charmap print preview anchor",
					"searchreplace visualblocks code",
					"insertdatetime media table paste code help wordcount",
					"link",
					"image",
					"media",
					"table",
					"lists",
				],
				fontsize_formats: "8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt",
				toolbar:
					"undo redo | formatselect | fontsizeselect | bold italic backcolor | \
          blockquote h1 h2 h3 h4 | alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | image media | removeformat | table | help",
				content_style:
					"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
				automatic_uploads: true,
			}}
		/>
	);
};

export default TextEditor;
