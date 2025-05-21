import { getBlogs } from "@/libs/fetchData";
import BlogList from "@/components/(blog)/BlogList";

export const dynamic = "force-dynamic";

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
		url: `https://kyleskincare.vn/blog`,
		siteName: "KYLE Laboratoires Vietnam",
		type: "website",
		images: [
			{
				url: `/blog.jpg`, // ảnh trong public/
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
		images: [`/blog.jpg`],
	},
};

export default async function Blog() {
	const currentPage = 1;
	const blogPerPage = 6;

	const { blogs, totalBlogs } = await getBlogs(currentPage, blogPerPage);

	return (
		<div className="bg-light min-h-screen py-8 px-4 lg:px-20 dark:bg-dark">
			<div className="container mx-auto">
				<h1 className="text-3xl md:text-4xl font-bold text-center text-blue-900 dark:text-white mb-12">
					Bài viết hay từ Kyle
				</h1>

				{/* Blog List Component */}
				<BlogList
					initialBlogs={blogs}
					totalBlogs={totalBlogs}
					blogsPerPage={blogPerPage}
					initialPage={currentPage}
				/>
			</div>
		</div>
	);
}
