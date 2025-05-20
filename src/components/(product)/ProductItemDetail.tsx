"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ProductItemProps } from "@/types/productItem";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { House, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeContext";

const ProductItemDetail = ({
	productInfo,
}: {
	productInfo: ProductItemProps;
}) => {
	const { theme } = useTheme();
	const [mainImage, setMainImage] = useState(productInfo.thumbnail);
	const [isVertical, setIsVertical] = useState(false);
	const router = useRouter();

	const handleOnClick = () => router.push("/");
	const handleToProduct = () => router.push("/products");
	useEffect(() => {
		const handleResize = () => {
			setIsVertical(window.innerWidth >= 960);
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<div className="container mx-auto py-6 lg:px-20">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 pb-4">
				<House
					onClick={handleOnClick}
					className={`cursor-pointer ${theme === "dark" ? "text-light" : ""}`}
				/>
				<span className={theme === "dark" ? "text-light" : ""}>/</span>
				<h2
					onClick={handleToProduct}
					className={`cursor-pointer font-bold text-lg ${
						theme === "dark" ? "text-light" : ""
					}`}
				>
					Products
				</h2>
			</div>

			{/* Main Content */}
			<div className="flex flex-col md:flex-row md:justify-between gap-4">
				{/* Product Images */}
				<div className="flex flex-col gap-4 lg:flex-row justify-center items-center lg:items-start">
					{/* Hình chính */}
					<div className="border rounded-md w-[90%] max-w-[400px] h-[400px] xs:h-[466px] lg:h-[500px] xl:min-w-[450px] lg:order-2 overflow-hidden">
						<Image
							src={mainImage}
							alt={productInfo.name}
							width={500}
							height={500}
							className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
						/>
					</div>

					{/* Thumbnail slider */}
					<div
						className={`flex ${
							isVertical ? "lg:flex-col" : "flex-row"
						} gap-3 mt-4 lg:mt-0 justify-between items-center lg:items-start`}
					>
						<Swiper
							modules={[Autoplay]}
							spaceBetween={8}
							slidesPerView={4}
							autoplay={{ delay: 4000 }}
							loop={true}
							breakpoints={{
								0: { slidesPerView: 4, direction: "horizontal" },
								480: { slidesPerView: 4, direction: "horizontal" },
								768: { slidesPerView: 3, direction: "horizontal" },
								960: { slidesPerView: 4, direction: "vertical" },
							}}
							className={`${
								isVertical ? "lg:h-[500px]" : "h-auto "
							} w-full max-w-[400px]`}
						>
							{(productInfo.images || []).map((image, index) => (
								<SwiperSlide
									key={index}
									className="cursor-pointer flex justify-center"
								>
									<Image
										src={image}
										alt={`Image ${index + 1}`}
										width={90}
										height={110}
										className="w-[80px] h-[100px] xs:w-[90px] xs:h-[110px] object-cover rounded-md hover:scale-105 transition-transform"
										onClick={() => setMainImage(image)}
									/>
								</SwiperSlide>
							))}
						</Swiper>
					</div>
				</div>

				{/* Product Details */}
				<div className="w-full md:w-1/2">
					<h1
						className={`text-3xl font-bold mb-4 ${
							theme === "dark" ? "text-light" : ""
						}`}
					>
						{productInfo.name}
					</h1>
					<p
						className={`text-lg ${
							theme === "dark" ? "text-light" : "text-gray-600"
						} mb-4`}
					>
						Danh mục: {productInfo.category}
					</p>

					{/* Price and Discount */}
					{productInfo.discount ? (
						<div>
							<span className="text-gray-500 line-through text-sm sm:text-lg">
								{productInfo.price}
								<small className="align-super text-xs ml-1">₫</small>
							</span>
							<span className="ml-1 text-base font-bold text-white bg-red-500 px-3 py-2 rounded-md">
								{productInfo.discount}
								<small className="align-super text-xs ml-1">₫</small>
							</span>
						</div>
					) : (
						<div>
							<span className="ml-1 text-base font-bold text-white bg-red-500 px-2 py-1 rounded-md">
								{productInfo.price}
								<small className="align-super text-xs ml-1">₫</small>
							</span>
						</div>
					)}

					{/* Description */}
					<div
						className={`hidden md:block mt-2 prose prose-indigo ${
							theme === "dark" ? "dark-quill-content" : "text-gray-600"
						}`}
						dangerouslySetInnerHTML={{ __html: productInfo.description }}
					></div>

					{/* Purchase Link */}
					<div className="mt-2 flex items-center space-x-2">
						<h4 className="font-bold text-lg text-green-700">
							Mua sản phẩm tại đây
						</h4>
						<Link
							href={productInfo.linktobuy || "https://shopee.vn/_gontrang"}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-block text-orange-500 hover:text-orange-600"
						>
							<ShoppingCart className="w-8 h-8" />
						</Link>
					</div>
				</div>
			</div>

			{/* Product Details Section */}
			<div className="mt-12 w-full">
				<h1
					className={`text-3xl font-bold mb-4 ${
						theme === "dark" ? "text-light" : ""
					}`}
				>
					Mô tả sản phẩm
				</h1>
				<div
					className={`mt-2 text-justify ${
						theme === "dark" ? "dark-quill-content" : "text-gray-600"
					}`}
					dangerouslySetInnerHTML={{ __html: productInfo.details }}
				></div>
			</div>
		</div>
	);
};

export default ProductItemDetail;
