import React from "react";
import ProductList from "@/components/(product)/ProductList";
import { ProductItemProps } from "@/types/productItem";

const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";

// Metadata for SEO
export const metadata = {
	title: "Sản Phẩm | KYLE Laboratoires - Mỹ Phẩm Chính Hãng",
	description:
		"Khám phá các sản phẩm chăm sóc da và mỹ phẩm từ KYLE Laboratoires. Cam kết chất lượng, an toàn, hiệu quả – Phân phối chính hãng tại KimVinh-Store.",
	keywords:
		"KYLE Laboratoires, mỹ phẩm chính hãng, sản phẩm chăm sóc da, mỹ phẩm chính hãng, skincare, beauty, chăm sóc da mặt",
	openGraph: {
		title: "Sản Phẩm | KYLE Laboratoires - Mỹ Phẩm Chính Hãng",
		description:
			"Bộ sưu tập sản phẩm chính hãng từ KYLE Laboratoires - Nơi sắc đẹp và chất lượng hội tụ.",
		url: `${siteUrl}/products`,
		siteName: "KYLE Laboratoires",
		type: "website",
		images: [
			{
				url: `${siteUrl}/products.jpg`,
				width: 1200,
				height: 630,
				alt: "Sản phẩm của KYLE Laboratoires",
			},
		],
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
	products: ProductItemProps[];
	pagination: Pagination;
	error: string | null;
}

// Fetch products server-side
async function fetchProducts(
	page: number = 1,
	limit: number = 6
): Promise<FetchResult> {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${page}&limit=${limit}`,
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
				errorData.message || `Failed to fetch products: ${response.status}`
			);
		}

		const data: { products: ProductItemProps[]; pagination: Pagination } =
			await response.json();

		return {
			products: data.products,
			pagination: data.pagination,
			error: null,
		};
	} catch (err) {
		const errorMessage =
			err instanceof Error ? err.message : "An unexpected error occurred";
		console.error("Error in fetchProducts:", errorMessage, err);
		return {
			products: [],
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

export default async function Products({
	searchParams,
}: {
	searchParams: Promise<{ page?: string }>;
}) {
	const { page: pageParam } = await searchParams;
	const page = parseInt(pageParam || "1", 10);
	const productsPerPage = 6;

	const { products, pagination, error } = await fetchProducts(
		page,
		productsPerPage
	);

	// User-friendly error message
	const displayError = error
		? "Không thể tải danh sách sản phẩm. Vui lòng thử lại sau."
		: null;

	return (
		<main
			className="bg-light min-h-screen py-6 px-4 lg:px-20 dark:bg-dark"
			role="main"
		>
			<div className="container mx-auto">
				<header>
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-4 dark:text-light">
						Sản Phẩm của KYLE Laboratoires
					</h1>
					<p className="text-center text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10">
						Khám phá bộ sưu tập mỹ phẩm chăm sóc da từ KYLE Laboratoires – Sự
						lựa chọn hoàn hảo cho vẻ đẹp của bạn.
					</p>
				</header>

				<ProductList
					initialProducts={products}
					initialPagination={pagination}
					error={displayError}
					currentPage={page}
				/>
			</div>
		</main>
	);
}
