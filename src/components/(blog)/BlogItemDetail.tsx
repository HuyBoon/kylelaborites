"use client";

import { BlogItemProps } from "@/types/blogItem";
import { House } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/ThemeContext";
import { useRouter } from "next/navigation";

const BlogItemDetail = ({
	blogs,
	relatedBlogs,
}: {
	blogs: BlogItemProps;
	relatedBlogs: BlogItemProps[];
}) => {
	const { theme } = useTheme();
	const router = useRouter();

	const handleOnClick = () => {
		router.push("/");
	};

	const handleToBlog = () => {
		router.push("/blog");
	};
	const handleToBlogSlug = (slug: string) => {
		router.push(`/blog/${slug}`);
	};

	return (
		<div className="container mx-auto py-8 lg:px-20">
			<div className="flex items-center gap-2 pb-4">
				<House
					onClick={handleOnClick}
					className={`cursor-pointer ${theme === "dark" ? "text-light" : ""}`}
				/>
				<span className={theme === "dark" ? "text-light" : ""}>/</span>
				<h2
					onClick={handleToBlog}
					className={`cursor-pointer font-bold text-lg ${
						theme === "dark" ? "text-light" : ""
					}`}
				>
					Blog
				</h2>
			</div>
			{/* Blog Title */}
			<div className="text-center mb-8">
				<h1 className="text-3xl md:text-5xl font-bold text-gray-800 dark:text-gray-200">
					{blogs.title}
				</h1>
			</div>

			{/* Blog Description */}
			{blogs.description && (
				<div className="prose dark:prose-invert max-w-4xl mx-auto text-lg mb-8">
					{blogs.description}
				</div>
			)}
			{/* Blog Thumbnail */}
			{blogs.thumbnail && (
				<div className="w-full max-w-4xl mx-auto mb-8">
					<Image
						src={blogs.thumbnail}
						alt={blogs.title}
						layout="responsive"
						width={800}
						height={400}
						className="object-cover rounded-lg shadow-md"
					/>
				</div>
			)}

			{/* Blog Content */}
			<div className="prose dark:prose-invert max-w-4xl mx-auto text-lg">
				<div dangerouslySetInnerHTML={{ __html: blogs.content }} />
			</div>

			{/* Related Blogs */}
			{relatedBlogs.length > 0 && (
				<section className="mt-16">
					<h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
						Related Posts
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
						{relatedBlogs.map((relatedBlog) => (
							<article
								key={relatedBlog.slug}
								className="group border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow cursor-pointer"
								onClick={() => handleToBlogSlug(relatedBlog.slug)}
							>
								<Image
									src={relatedBlog.thumbnail}
									alt={relatedBlog.title}
									width={400}
									height={200}
									className="w-full h-48 object-cover transition-transform group-hover:scale-105"
								/>
								<div className="p-4">
									<h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors">
										{relatedBlog.title}
									</h3>
									<p className="text-sm text-gray-500 dark:text-gray-400">
										{relatedBlog.tags.join(", ")}
									</p>
								</div>
							</article>
						))}
					</div>
				</section>
			)}
		</div>
	);
};

export default BlogItemDetail;
