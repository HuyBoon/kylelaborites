"use client";

import { useState, useEffect } from "react";
import BlogItem from "@/components/(blog)/BlogItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogListProps {
	initialBlogs: any[]; // You may want to type this more specifically if you know the structure
	totalBlogs: number;
	blogsPerPage: number;
	initialPage: number;
}

const BlogList = ({
	initialBlogs = [],
	totalBlogs,
	blogsPerPage,
	initialPage,
}: BlogListProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [blogs, setBlogs] = useState<any[]>(initialBlogs);
	const totalPages = Math.ceil(totalBlogs / blogsPerPage) || 1;

	// Fetch blogs dynamically when the page changes
	useEffect(() => {
		const fetchBlogs = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/api/blog?page=${currentPage}&limit=${blogsPerPage}`,
					{
						next: { revalidate: 60 }, // ISR: Tái tạo dữ liệu sau 60 giây
					}
				);
				const data = await response.json();
				setBlogs(data.blogs || []); // Ensure the data is an array
			} catch (error) {
				console.error("Failed to fetch blogs:", error);
			}
		};

		fetchBlogs(); // Always fetch new blogs when currentPage changes
	}, [currentPage, blogsPerPage]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div>
			{/* Blog grid */}
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10">
				{Array.isArray(blogs) && blogs.length > 0 ? (
					blogs.map((item: any) => <BlogItem key={item._id} blog={item} />)
				) : (
					<p>No blogs available.</p>
				)}
			</div>

			{/* Pagination controls */}
			<div className="pagination mt-4 flex items-center justify-center">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 max-w-max"
				>
					<ChevronLeft />
				</button>

				<div className="text-lg mx-4 dark:text-light">
					Page {currentPage} of {totalPages}
				</div>

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-4 py-2 bg-blue-500 text-white rounded-md mx-2 max-w-max"
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};

export default BlogList;
