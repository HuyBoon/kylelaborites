import { getProducts } from "@/libs/fetchData";
import ProductList from "@/components/(product)/ProductList";

export const dynamic = "force-dynamic";

const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";

export const metadata = {
	title: "Sản Phẩm | KYLE Laboratoires - Mỹ Phẩm Chính Hãng",
	description:
		"Khám phá các sản phẩm chăm sóc da và mỹ phẩm từ KYLE Laboratoires. Cam kết chất lượng, an toàn, hiệu quả – Phân phối chính hãng tại KimVinh-Store.",
	keywords:
		"KYLE Laboratoires, mỹ phẩm chính hãng, sản phẩm chăm sóc da, mỹ phẩm chính hãng, skincare, beauty, chăm sóc da mặt",
	openGraph: {
		title: "Sản Phẩm | KYLE Laboratoires - Mỹ Phẩm Chính Hãng",
		description:
			"Bộ sưu tập sản phẩm chính hãng từ KYLE Laboratoires - Nơi sắc đẹp và chất lượng hội tụ.",
		url: `${siteUrl}/products`,
		siteName: "KYLE Laboratoires",
		type: "website",
		images: [
			{
				url: `${siteUrl}/products.jpg`,
				width: 1200,
				height: 630,
				alt: "Sản phẩm của KYLE Laboratoires",
			},
		],
	},
};

export default async function Products() {
	const currentPage = 1;
	const productsPerPage = 6;

	const { products, totalProducts } = await getProducts(
		currentPage,
		productsPerPage
	);

	return (
		<main
			className="bg-light min-h-screen py-6 px-4 lg:px-20 dark:bg-dark"
			role="main"
		>
			<div className="container mx-auto">
				<header>
					<h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-blue-900 mb-4 dark:text-light">
						Sản Phẩm của KYLE Laboratoires
					</h1>
					<p className="text-center text-base md:text-lg text-gray-700 dark:text-gray-300 mb-10">
						Khám phá bộ sưu tập mỹ phẩm chăm sóc da từ KYLE Laboratoires – Sự
						lựa chọn hoàn hảo cho vẻ đẹp của bạn.
					</p>
				</header>

				<ProductList
					initialProducts={products}
					totalProducts={totalProducts}
					productsPerPage={productsPerPage}
					initialPage={currentPage}
				/>
			</div>
		</main>
	);
}
