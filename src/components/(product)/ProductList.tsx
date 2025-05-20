"use client";
import { useState, useEffect } from "react";
import ProductItem from "@/components/(product)/ProductItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductListProps {
	initialProducts: any[];
	totalProducts: number;
	productsPerPage: number;
	initialPage: number;
}

const ProductList = ({
	initialProducts,
	totalProducts,
	productsPerPage,
	initialPage,
}: ProductListProps) => {
	const [currentPage, setCurrentPage] = useState(initialPage);
	const [products, setProducts] = useState(initialProducts);
	const totalPages = Math.ceil(totalProducts / productsPerPage);

	// Fetch products dynamically when the page changes
	useEffect(() => {
		const fetchProducts = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${currentPage}&limit=${productsPerPage}`,
				{
					next: { revalidate: 60 },
				}
			);
			const data = await response.json();
			setProducts(data.products);
		};

		fetchProducts(); // Always fetch new products when currentPage changes
	}, [currentPage, productsPerPage]);

	const handlePageChange = (newPage: number) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return (
		<div>
			{/* Product grid */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
				{products.map((item: any) => (
					<ProductItem key={item._id} product={item} />
				))}
			</div>

			{/* Pagination controls */}
			<div className="pagination">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-1 py-1 bg-blue-500 text-white rounded-md mx-2 max-w-max"
				>
					<ChevronLeft />
				</button>

				<div className="text-lg dark:text-light">
					Page {currentPage} of {totalPages}
				</div>

				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-1 py-1 bg-blue-500 text-white rounded-md mx-2 max-w-max"
				>
					<ChevronRight />
				</button>
			</div>
		</div>
	);
};

export default ProductList;
