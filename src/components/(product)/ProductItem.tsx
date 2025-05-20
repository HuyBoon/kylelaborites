"use client";
import Image from "next/image";
import { ProductItemProps } from "@/types/productItem";
import { useRouter } from "next/navigation";

const ProductItem = ({ product }: { product: ProductItemProps }) => {
	const router = useRouter();
	const handleClick = () => {
		router.push(`/products/${product.slug}`); // Redirect to the product detail page
	};
	return (
		<div
			className="dark:bg-light w-full h-full p-5 border rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-200 cursor-pointer "
			onClick={handleClick}
			data-aos="fade-up"
		>
			<div className="relative h-[300px] mb-2">
				<Image
					src={product.thumbnail}
					alt={product.name}
					width={300}
					height={300}
					className="w-[100%] mx-auto h-[100%] object-cover object-center"
				/>
			</div>

			{/* Adjusted the product name styling with responsive font sizes */}
			<h4 className="text-sm sm:text-base md:text-base lg:text-lg  font-semibold  overflow-hidden line-clamp-2">
				{product.name}
			</h4>

			{product.discount ? (
				<div className="flex flex-col sm:flex-row items-center sm:items-center mt-4">
					<span className="text-gray-500 line-through text-sm sm:text-lg">
						{product.price}
						<small className="align-super text-xs ml-1">₫</small>
					</span>
					<span className="text-blue-900 font-bold text-sm sm:text-lg ml-0 sm:ml-2">
						{product.discount}
						<small className="align-super text-xs ml-1">₫</small>
					</span>
				</div>
			) : (
				<div className="flex flex-col sm:flex-row items-start sm:items-center mt-4">
					<span className="text-blue-900 font-bold text-sm sm:text-lg">
						{product.price}
						<small className="align-super text-xs ml-1">₫</small>
					</span>
				</div>
			)}
		</div>
	);
};

export default ProductItem;
