import { notFound } from "next/navigation";
import BlogItemDetail from "@/components/(blog)/BlogItemDetail";
import { BlogItemProps } from "@/types/blogItem";
const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";

// Fetch main blog by slug
async function fetchBlogBySlug(slug: string): Promise<BlogItemProps | null> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`,
			{
				next: { revalidate: 60 },
			}
		);
		const response = await res.json();
		return response.success ? response.blog : null;
	} catch (error) {
		console.error("Error fetching blog:", error);
		return null;
	}
}

// Fetch related blogs based on tag or category
async function fetchRelatedBlogs(tag: string): Promise<BlogItemProps[]> {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/blog?tags=${tag}&limit=3`
		);
		const data = await res.json();
		return data.success ? data.blogs : [];
	} catch (error) {
		console.error("Error fetching related blogs:", error);
		return [];
	}
}
export async function generateMetadata(context: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await context.params;

	const blogInfo = await fetchBlogBySlug(slug);

	if (!blogInfo) return {};

	return {
		title: blogInfo.title,
		description: blogInfo.description || "Xem bài viết từ Kyle Laboratories",
		openGraph: {
			title: blogInfo.title,
			description: blogInfo.description || "Bài viết từ Kyle",
			url: `${siteUrl}/blog/${slug}`,
			siteName: "KYLE Laboratoires Vietnam",
			type: "article",
			images: [
				{
					url: blogInfo.thumbnail || `${siteUrl}/blog.jpg`,
					width: 1200,
					height: 630,
					alt: blogInfo.title,
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: blogInfo.title,
			description: blogInfo.description,
			images: [blogInfo.thumbnail],
		},
	};
}
export default async function BlogDetail(context: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await context.params;
	const blogInfo = await fetchBlogBySlug(slug);

	if (!blogInfo) {
		return notFound();
	}

	const relatedBlogs = await fetchRelatedBlogs(blogInfo.tags?.join(",")); // Fetch related blogs

	return (
		<div className="bg-light dark:bg-dark min-h-screen">
			<BlogItemDetail blogs={blogInfo} relatedBlogs={relatedBlogs} />
		</div>
	);
}
