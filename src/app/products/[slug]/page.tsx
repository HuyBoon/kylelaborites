// app/product/[slug]/page.tsx
import { ProductItemProps } from "@/types/productItem";
import { notFound } from "next/navigation";
import ProductItemDetail from "@/components/(product)/ProductItemDetail";
import { Metadata } from "next";

async function fetchProductBySlug(
	slug: string
): Promise<ProductItemProps | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/products/${slug}`,
			{
				cache: "no-store",
			}
		);
		const response = await res.json();
		if (response.success) {
			return response.product;
		}
		return null;
	} catch (error) {
		console.error("Error fetching product:", error);
		return null;
	}
}

export async function generateMetadata(context: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await context.params;
	const product = await fetchProductBySlug(slug);
	if (!product) return {};

	const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";
	const productUrl = `${siteUrl}/products/${slug}`;

	return {
		title: `${product.name} | KYLE Laboratoires - Mỹ Phẩm Chính Hãng`,
		description: product.description || "Sản phẩm từ KYLE Laboratoires.",
		keywords: `${product.name}, mỹ phẩm chính hãng, chăm sóc da, sản phẩm chính hãng, KYLE Laboratoires`,
		openGraph: {
			title: `${product.name} | KYLE Laboratoires`,
			description:
				product.description || "Sản phẩm chính hãng từ KYLE Laboratoires.",
			url: productUrl,
			siteName: "KYLE Laboratoires",
			type: "website",
			images: [
				{
					url: `${siteUrl}${product.thumbnail}`,
					width: 1200,
					height: 630,
					alt: product.name,
				},
			],
		},

		twitter: {
			card: "summary_large_image",
			title: `${product.name} | KYLE Laboratoires`,
			description:
				product.description || "Sản phẩm chính hãng từ KYLE Laboratoires.",
			images: [`${siteUrl}${product.thumbnail}`],
		},
	};
}

export default async function ProductDetail(context: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await context.params;
	const productInfo = await fetchProductBySlug(slug);

	if (!productInfo) return notFound();

	return (
		<div className="bg-light dark:bg-dark">
			<ProductItemDetail productInfo={productInfo} />
		</div>
	);
}
