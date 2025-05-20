"use client";
import { BlogItemProps } from "@/types/blogItem";
import Image from "next/image";

import { useRouter } from "next/navigation";

const BlogItem = ({ blog }: { blog: BlogItemProps }) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/blog/${blog.slug}`); // Redirect to the product detail page
	};
	return (
		<div
			className="dark:bg-light w-full h-full p-4 border rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer"
			onClick={handleClick}
			data-aos="fade-up"
		>
			<div className="relative w-full h-56 mb-4">
				<Image
					src={blog.thumbnail}
					alt={blog.title}
					layout="fill"
					objectFit="cover"
					className="rounded-lg"
				/>
			</div>
			<h4 className="text-lg font-semibold line-clamp-2 ">{blog.title}</h4>
		</div>
	);
};

export default BlogItem;
