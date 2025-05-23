// app/page.js
import Banner from "@/components/homelayout/Banner";
import Company from "@/components/homelayout/Company";
import ProductSlider from "@/components/homelayout/ProductSlider";
import RecentPost from "@/components/homelayout/RecentPost";

export const metadata = {
	title: "KYLE Laboratoires Vietnam | Skincare & Beauty",
	description:
		"Khám phá các sản phẩm chăm sóc da cao cấp và bài viết làm đẹp từ KYLE Laboratoires Vietnam.",
	keywords:
		"chăm sóc da, mỹ phẩm KYLE, skincare, làm đẹp, KYLE Laboratoires Vietnam",
	openGraph: {
		title: "KYLE Laboratoires Vietnam | Skincare & Beauty",
		description:
			"Sản phẩm chăm sóc da chất lượng cao và kiến thức làm đẹp từ KYLE.",
		url: "https://kyleskincare.vn",
		siteName: "KYLE Laboratoires Vietnam",
		type: "website",
		images: [
			{
				url: "/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "KYLE Laboratoires Vietnam",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "KYLE Laboratoires Vietnam | Skincare & Beauty",
		description: "Khám phá sản phẩm và mẹo chăm sóc da từ KYLE.",
		images: ["/kylelaborites.jpg"],
	},
};

// Fetch all products
async function getAllProducts() {
	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/products`
		);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const products = data.products || [];
		return products;
	} catch (error) {
		console.error("Error fetching all products:", error);
		return [];
	}
}

// Fetch all blogs
async function getAllBlogs() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const blogs = data.blogs || [];
		return blogs;
	} catch (error) {
		console.error("Error fetching all blogs:", error);
		return [];
	}
}

export default async function Home() {
	const products = await getAllProducts();
	const blogs = await getAllBlogs();

	return (
		<div className="w-full bg-light dark:bg-dark">
			<Banner />
			<div data-aos="fade-up">
				{products.length > 0 ? (
					<ProductSlider products={products} />
				) : (
					<div className="text-center p-10 text-gray-500">
						Không có sản phẩm nào để hiển thị.
					</div>
				)}
			</div>
			<div data-aos="fade-up">
				{blogs.length > 0 ? (
					<RecentPost blogs={blogs} />
				) : (
					<div className="text-center p-10 text-gray-500">
						Không có bài viết nào để hiển thị.
					</div>
				)}
			</div>
			<div data-aos="fade-up">
				<Company />
			</div>
		</div>
	);
}
