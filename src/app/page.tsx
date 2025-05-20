import Banner from "@/components/homelayout/Banner";
import Company from "@/components/homelayout/Company";

import ProductSlider from "@/components/homelayout/ProductSlider";
import RecentPost from "@/components/homelayout/RecentPost";
import { getAllProducts, getAllBlogs } from "@/libs/fetchData";

export default async function Home() {
	// Fetch products and blogs at build time (SSG)
	const products = await getAllProducts();
	const blogs = await getAllBlogs();

	return (
		<div className="w-full bg-light dark:bg-dark">
			<Banner />
			<div data-aos="fade-up">
				<ProductSlider products={products} />
			</div>
			<div data-aos="fade-up">
				<RecentPost blogs={blogs} />
			</div>
			<div data-aos="fade-up">
				<Company />
			</div>
		</div>
	);
}
