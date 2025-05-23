"use client";
import { useState } from "react";
import BlogItem from "@/components/(blog)/BlogItem";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

// Blog interface (based on provided BlogItemProps)
interface IBlog {
	_id: string;
	title: string;
	slug: string;
	tags: string[];
	description: string;
	thumbnail: string;
	content: string;
}

// Pagination interface
interface Pagination {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
}

interface BlogListProps {
	initialBlogs: IBlog[];
	initialPagination: Pagination;
	error: string | null;
	currentPage: number;
}

const BlogList = ({
	initialBlogs,
	initialPagination,
	error,
	currentPage: initialPage,
}: BlogListProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const router = useRouter();
	const searchParams = useSearchParams();

	const { totalPages } = initialPagination;

	// Handle page change by updating the URL query parameter
	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
			const params = new URLSearchParams(searchParams.toString());
			params.set("page", newPage.toString());
			router.push(`/blog?${params.toString()}`);
		}
	};

	return (
		<div>
			{error ? (
				<div className="text-center text-red-500 dark:text-red-400 py-8">
					{error}
				</div>
			) : (
				<>
					{/* Blog grid */}
					<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-10">
						{initialBlogs.length > 0 ? (
							initialBlogs.map((blog) => (
								<BlogItem key={blog._id} blog={blog} />
							))
						) : (
							<div className="text-center text-gray-700 dark:text-gray-300 col-span-full py-8">
								Không có bài viết nào để hiển thị.
							</div>
						)}
					</div>

					{/* Pagination controls */}
					{totalPages > 1 && (
						<div className="pagination flex justify-center items-center gap-4 mt-8">
							<button
								onClick={() => handlePageChange(currentPage - 1)}
								disabled={currentPage === 1}
								className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
									currentPage === 1
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-blue-600"
								}`}
							>
								<ChevronLeft />
							</button>

							<div className="text-lg dark:text-light">
								Trang {currentPage} / {totalPages}
							</div>

							<button
								onClick={() => handlePageChange(currentPage + 1)}
								disabled={currentPage === totalPages}
								className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
									currentPage === totalPages
										? "opacity-50 cursor-not-allowed"
										: "hover:bg-blue-600"
								}`}
							>
								<ChevronRight />
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default BlogList;
