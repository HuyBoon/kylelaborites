"use client";

import AdminBlogForm from "@/components/layoutdashboard/AdminBlogForm";
import HeaderTitle from "@/components/layoutdashboard/HeaderTitle";
import { useParams, useRouter } from "next/navigation"; // Import useRouter and useParams
import { useEffect, useState } from "react";

// Define the BlogFormProps interface (import this if already defined in a separate file)
interface BlogFormProps {
	_id?: string;
	title?: string;
	thumbnail?: string;
	slug?: string;
	content?: string;
	tags?: string[];
}

const EditBlog = () => {
	const params = useParams();
	const router = useRouter();
	const id = Array.isArray(params.id) ? params.id[0] : params.id; // Ensure slug is a string

	const [blogInfo, setBlogInfo] = useState<BlogFormProps | null>(null);
	const [loading, setLoading] = useState(true); // Add loading state

	useEffect(() => {
		if (id) {
			fetchBlogBySlug(id); // Fetch blog if slug is available
		}
	}, [id]);

	async function fetchBlogBySlug(id: string) {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/adminblog/${id}`
			);
			const response = await res.json();

			if (response.success) {
				setBlogInfo(response.blog); // Set blog info in state
			} else {
				console.error("Failed to fetch blog:", response.message);
				router.push("/dashboard"); // Redirect if the blog is not found
			}
		} catch (error) {
			console.error("Error fetching blog:", error);
		} finally {
			setLoading(false); // Stop loading once done
		}
	}

	// Display loading message while fetching
	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="container mx-auto my-4">
			<HeaderTitle
				title="Edit Blog"
				path="/manageblogs"
				addItem="Back to Blog List"
			/>

			{blogInfo && <AdminBlogForm {...blogInfo} />}
		</div>
	);
};

export default EditBlog;
