"use client";
import React from "react";
import ProductSliderItem from "./ProductSliderItem";
import { ProductItemPropsSlide } from "@/types/productItem";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ProductSlider = ({ products }: { products: ProductItemPropsSlide[] }) => {
	return (
		<section className="p-10  shadow-lg">
			<h2 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center  text-gray-800 mb-2 dark:text-light">
				Sản phẩm của Kyle
			</h2>
			<p className=" font-bold text-center mb-8 text-gray-400 dark:text-gray-300">
				Hãy để Kyle chăm sóc làn da của bạn
			</p>

			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				autoplay={{ delay: 5000 }}
				loop={true}
				breakpoints={{
					468: { slidesPerView: 1 },
					640: { slidesPerView: 2 },
					960: { slidesPerView: 3 },
					1200: { slidesPerView: 4 },
					1440: { slidesPerView: 5 },
				}}
			>
				{products.map((product) => (
					<SwiperSlide key={product._id}>
						<ProductSliderItem product={product} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default ProductSlider;
