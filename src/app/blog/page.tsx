import React from "react";
import BlogList from "@/components/(blog)/BlogList";

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

const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";

// Metadata for SEO
export const metadata = {
	title: "Blog | KYLE Laboratoires Vietnam",
	description:
		"Khám phá những bài viết chăm sóc da, kiến thức làm đẹp và mẹo skincare hữu ích từ KYLE Laboratoires Vietnam.",
	keywords:
		"blog làm đẹp, chăm sóc da, kiến thức skincare, mẹo làm đẹp, mỹ phẩm KYLE, KYLE Laboratoires",
	openGraph: {
		title: "Blog | KYLE Laboratoires Vietnam",
		description:
			"Bài viết chia sẻ kiến thức làm đẹp và chăm sóc da hiệu quả từ KYLE.",
		url: `${siteUrl}/blog`,
		siteName: "KYLE Laboratoires Vietnam",
		type: "website",
		images: [
			{
				url: `${siteUrl}/blog.jpg`,
				width: 1200,
				height: 630,
				alt: "Blog KYLE Laboratories",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Blog | KYLE Laboratoires Vietnam",
		description: "Tổng hợp những chia sẻ và mẹo skincare từ KYLE Laboratories.",
		images: [`${siteUrl}/blog.jpg`],
	},
};

// Pagination interface
interface Pagination {
	totalItems: number;
	totalPages: number;
	currentPage: number;
	pageSize: number;
}

// Fetch result interface
interface FetchResult {
	blogs: IBlog[];
	pagination: Pagination;
	error: string | null;
}

// Fetch blogs server-side
async function fetchBlogs(
	page: number = 1,
	limit: number = 6
): Promise<FetchResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/blog?page=${page}&limit=${limit}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				cache: "no-store",
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(
				errorData.message || `Failed to fetch blogs: ${response.status}`
			);
		}

		const data: { blogs: IBlog[]; pagination: Pagination } =
			await response.json();

		return {
			blogs: data.blogs,
			pagination: data.pagination,
			error: null,
		};
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unexpected error occurred";
		console.error("Error in fetchBlogs:", errorMessage, err);
		return {
			blogs: [],
			pagination: {
				totalItems: 0,
				totalPages: 0,
				currentPage: 1,
				pageSize: limit,
			},
			error: errorMessage,
		};
	}
}

export default async function Blog({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page: pageParam } = await searchParams;
	const page = parseInt(pageParam || "1", 10);
	const blogsPerPage = 6;

	const { blogs, pagination, error } = await fetchBlogs(page, blogsPerPage);

	// User-friendly error message
	const displayError = error
		? "Không thể tải danh sách bài viết. Vui lòng thử lại sau."
		: null;

	return (
		<div className="bg-light min-h-screen py-8 px-4 lg:px-20 dark:bg-dark">
			<div className="container mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-white mb-12">
					Bài viết hay từ Kyle
				</h1>

				<BlogList
					initialBlogs={blogs}
					initialPagination={pagination}
					error={displayError}
					currentPage={page}
				/>
			</div>
		</div>
	);
}
