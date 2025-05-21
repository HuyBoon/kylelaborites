"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import { generateSlug } from "@/libs/generateSlug";
import {
	uploadBlogImageToCloudinary,
	uploadThumbnailToCloudinary,
} from "@/libs/cloudinaryConnect";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";

interface BlogFormProps {
	_id?: string;
	title?: string;
	slug?: string;
	tags?: string[];
	description?: string;
	thumbnail?: string;
	content?: string;
}

const AdminBlogForm: React.FC<BlogFormProps> = ({
	_id,
	title: existingTitle = "",
	slug: existingSlug = "",
	tags: existingTags = [""],
	description: existingDescription = "",
	thumbnail: existingThumbnail = "",
	content: existingContent = "",
}) => {
	const [title, setTitle] = useState(existingTitle);
	const [slug, setSlug] = useState(existingSlug);
	const [tags, setTags] = useState(existingTags); // Store tags as an array
	const [description, setDescription] = useState(existingDescription);
	const [thumbnail, setThumbnail] = useState(existingThumbnail);
	const [content, setContent] = useState(existingContent);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
		setSlug(generateSlug(e.target.value));
	};

	const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		const tagsArray = input.split(",").map((tag) => tag.trim());
		setTags(tagsArray);
	};

	const handleDescriptionChange = (
		e: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setDescription(e.target.value);
	};

	const handleImagesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const uploadedImageUrls = await uploadThumbnailToCloudinary(file);
				setThumbnail(uploadedImageUrls);
			} catch (error) {
				console.error("Failed to upload image", error);
				toast.error("Image upload failed");
			}
		}
	};

	const example_image_upload_handler = (
		blobInfo: any,
		progress: (percent: number) => void
	): Promise<string> =>
		new Promise(async (resolve, reject) => {
			try {
				const url = await uploadBlogImageToCloudinary(blobInfo.blob());
				resolve(url);
			} catch (error) {
				reject(new Error("Image upload failed"));
			}
		});

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		toast.loading(slug ? "Updating blog..." : "Creating blog...");

		const blogData = {
			title,
			slug,
			description,
			tags,
			thumbnail,
			content,
		};

		try {
			const method = _id ? "PUT" : "POST";
			const apiUrl = _id
				? `${process.env.NEXT_PUBLIC_API_URL}/api/adminblog/${_id}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/adminblog`;
			const response = await fetch(apiUrl, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(blogData),
			});

			if (response.ok) {
				const result = await response.json();
				toast.dismiss();
				toast.success(
					_id ? "Blog updated successfully!" : "Blog created successfully!"
				);

				if (!slug) {
					// Reset form after successful submission
					setTitle("");
					setSlug("");
					setDescription("");
					setTags([]); // Reset tags to an empty array
					setThumbnail("");
					setContent("");
				}
				router.push("/manageblogs");
			} else {
				const errorData = await response.json();
				toast.dismiss();
				toast.error(errorData.message || "An error occurred.");
			}
		} catch (error) {
			console.error("Error saving blog", error);
			toast.dismiss();
			toast.error("An error occurred while saving the blog.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label>Title</label>
				<input
					type="text"
					name="title"
					value={title}
					onChange={handleChangeTitle}
					required
					className="w-full p-2 border"
				/>
			</div>
			<div>
				<label>Slug</label>
				<input
					type="text"
					name="slug"
					value={slug}
					readOnly
					className="w-full p-2 border bg-gray-100"
				/>
			</div>
			<div>
				<label>Tags (comma separated)</label>
				<input
					type="text"
					value={tags.join(", ")} // Display tags as a comma-separated string
					onChange={handleTagChange}
					name="tag"
					id="tag"
					placeholder="Enter blog tags separated by commas"
					className="w-full p-2 border"
				/>
			</div>
			<div>
				<label>Description</label>
				<textarea
					name="description"
					value={description}
					onChange={handleDescriptionChange}
					className="w-full p-2 border"
				/>
			</div>
			<div>
				<label>Thumbnail</label>
				<input
					type="file"
					name="thumbnail"
					onChange={handleImagesChange}
					className="w-full p-2"
					required={!existingThumbnail}
				/>
				{thumbnail && (
					<img
						src={thumbnail}
						alt="Thumbnail preview"
						className="w-32 h-32 mt-2"
					/>
				)}
			</div>
			<div>
				<label>Content</label>
				<Editor
					onEditorChange={(newValue: any) => setContent(newValue)}
					apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
					value={content}
					init={{
						height: 500,
						menubar: true,
						plugins: [
							"advlist autolink lists link image charmap print preview anchor",
							"searchreplace visualblocks code fullscreen",
							"insertdatetime media table paste code help wordcount fullscreen",
							"link",
							"image",
							"media",
							"table",
						],
						toolbar:
							"undo redo | formatselect | bold italic backcolor | \
                blockquote h1 h2 h3 h4| \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist image media | removeformat | table | help",
						block_formats:
							"Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6",
						style_formats: [
							{ title: "Bold text", inline: "b" },
							{
								title: "Red text",
								inline: "span",
								styles: { color: "#ff0000" },
							},
							{
								title: "Red header",
								block: "h1",
								styles: { color: "#ff0000" },
							},
							{ title: "Example 1", inline: "span", classes: "example1" },
							{ title: "Example 2", inline: "span", classes: "example2" },
							{ title: "Table styles" },
							{ title: "Table row 1", selector: "tr", classes: "tablerow1" },
							{ title: "Image formats" },
							{
								title: "Rounded",
								selector: "img",
								styles: { borderRadius: "5px" },
							},
							{ title: "Alignments" },
							{
								title: "Align Left",
								block: "div",
								classes: "text-left",
							},
							{
								title: "Align Center",
								block: "div",
								classes: "text-center",
							},
							{
								title: "Align Right",
								block: "div",
								classes: "text-right",
							},
							{
								title: "Align Justify",
								block: "div",
								classes: "text-justify",
							},
						],
						images_upload_handler: example_image_upload_handler,
						images_upload_url: "postAcceptor.php",
					}}
				/>
			</div>
			<button
				type="submit"
				className="bg-blue-500 text-white p-2 rounded"
				disabled={loading}
			>
				{loading ? "Saving..." : _id ? "Update Blog" : "Create Blog"}
			</button>
		</form>
	);
};

export default AdminBlogForm;
