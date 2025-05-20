"use client";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const items = [
  {
    id: 1,
    image: "/assets/combohot1.svg",
    title: "Combo hot 1",
  },
];
const HotProduct = () => {
  return (
    <div className="">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        loop={true} // Lặp lại các slide
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative">
              {/* Hiển thị ảnh bài viết */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full  object-cover "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotProduct;
