import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { BlogItemProps } from "@/types/blogItem";

const BlogSliderItem = ({ blog }: { blog: BlogItemProps }) => {
  const router = useRouter(); // Initialize router

  // Function to handle click and navigate to the product detail page
  const handleClick = () => {
    router.push(`/blog/${blog.slug}`); // Navigate to product detail page
  };

  return (
    <div
      onClick={handleClick} // Add click handler
      className=" dark:bg-light border rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 cursor-pointer" // Add hover and scale effect
    >
      <Image
        src={blog.thumbnail}
        alt={blog.title}
        width={200}
        height={200}
        className="w-[90%] mx-auto h-64 object-cover p-5"
      />
      <div className="px-4 pb-6 flex items-center justify-between">
        {/* Limit product name to 2 lines */}
        <h3 className="text-[15px]  font-semibold text-ellipsis  whitespace-nowrap overflow-hidden ">
          {blog.title}
        </h3>
      </div>
    </div>
  );
};

export default BlogSliderItem;
