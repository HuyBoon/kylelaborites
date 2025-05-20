import { ProductItemPropsSlide } from "@/types/productItem";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";

const ProductSliderItem = ({ product }: { product: ProductItemPropsSlide }) => {
	const router = useRouter();

	const handleClick = () => {
		router.push(`/products/${product.slug}`);
	};

	return (
		<div
			onClick={handleClick}
			className=" flex flex-col gap-2 cursor-pointer p-4"
		>
			<div className="relative w-[300px] h-[350px] sm:w-[280px] sm:h-[350px] lg:w-[270px] lg:h-[360px] mx-auto flex items-center justify-center">
				<Image
					src={product.thumbnail}
					alt={product.name}
					width={1919}
					height={2558}
					className="w-[100%] h-[100%] object-cover transition-transform duration-300 ease-in-out hover:scale-[1.02]"
				/>
				{product.discount && (
					<div className="absolute top-2 left-2 bg-primary text-white text-xs font-semibold px-4 py-1 rounded">
						{Math.round(
							((product.price - product.discount) / product.price) * 100
						)}
						%
					</div>
				)}
			</div>

			<div className="p-2 sm:p-4 flex flex-col gap-2 text-center">
				{product.discount ? (
					<div className="flex justify-center items-center gap-2">
						<span className="dark:text-gray-100 line-through text-sm">
							₫{product.price}
						</span>
						<span className="text-base font-bold dark:text-gray-100">
							₫{product.discount}
						</span>
					</div>
				) : (
					<div className="text-base font-bold dark:text-gray-100">
						₫{product.price}
					</div>
				)}
				<h3 className="text-[14px] sm:text-[15px] lg:text-[16px] dark:text-gray-100 font-semibold overflow-hidden text-ellipsis line-clamp-2">
					{product.name}
				</h3>
			</div>
		</div>
	);
};

export default ProductSliderItem;
