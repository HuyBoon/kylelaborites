"use client";
import React from "react";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogSliderItem from "./BlogSliderItem";
import { BlogItemProps } from "@/types/blogItem";

const RecentPost = ({ blogs }: { blogs: BlogItemProps[] }) => {
  return (
    <section className="container p-10 rounded-[20px] shadow-lg">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center  text-gray-800 mb-2 dark:text-light">
        Bài viết của Kyle
      </h2>
      <p className=" font-bold text-center mb-8 text-gray-400 dark:text-gray-300">
        Khám phá mẹo hay từ KYLE
      </p>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1} // Default for mobile
        autoplay={{ delay: 5000 }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 }, // Mobile screens
          768: { slidesPerView: 2 }, // Tablets
          960: { slidesPerView: 3 }, // Small laptops
          1440: { slidesPerView: 4 }, // Desktops
        }}
        className="w-[90%]"
      >
        {blogs.map((blog) => (
          <SwiperSlide key={blog._id}>
            <BlogSliderItem blog={blog} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default RecentPost;
