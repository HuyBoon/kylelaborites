"use client";

import HeaderTitle from "@/components/layoutdashboard/HeaderTitle";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const ManageBlog = () => {
	const router = useRouter();
	const [blogs, setBlogs] = useState<any[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const postsPerPage = 5; // Number of blogs to show per page

	useEffect(() => {
		fetchBlogs(currentPage);
	}, [currentPage]);

	function fetchBlogs(page: number) {
		fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/adminblog?page=${page}&limit=${postsPerPage}`
		)
			.then((res) => res.json())
			.then((response) => {
				if (response.success) {
					setBlogs(response.blogs || []);
					setTotalPages(response.totalPages);
				}
			})
			.catch((error) => {
				console.error("Error fetching blogs:", error);
			});
	}


	function handleEdit(id: string) {
		router.push(`/manageblogs/edit/${id}`);
	}

	function handleDelete(id: string) {
		if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adminblog/${id}`, {
				method: "DELETE",
			}).then(() => fetchBlogs(currentPage));
		}
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className="container mx-auto my-6 p-6 bg-white shadow-md rounded-lg">
			<HeaderTitle
				title="Quản lý bài viết"
				path="/manageblogs/addnew"
				addItem="Thêm bài viết"
			/>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border text-[14px] border-gray-200">
					<thead className="bg-gray-100">
						<tr className="text-center">
							<th className="border-b py-2 px-4">STT</th>
							<th className="border-b py-2 px-4 w-[35%]">Tiêu đề</th>
							<th className="border-b py-2 px-4">Thẻ</th>
							<th className="border-b py-2 px-4">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{blogs.length > 0 ? (
							blogs.map((blog: any, index: number) => (
								<tr key={blog._id} className="text-center">
									<td className="py-2 px-4 border-b whitespace-nowrap">
										{(currentPage - 1) * postsPerPage + index + 1}
									</td>
									<td className="py-2 px-4 border-b break-words">
										{blog.title}
									</td>
									<td className="py-2 px-4 border-b break-words">
										{/* Ensure tags is an array and safely join */}
										{Array.isArray(blog.tags) ? blog.tags.join(", ") : ""}
									</td>
									<td className="py-2 px-4 border-b">
										<div className="flex justify-center items-center space-x-2">
											<button
												onClick={() => handleEdit(blog._id)}
												className="text-blue-500 hover:text-blue-700 p-2 max-w-max"
											>
												<Pencil size={18} />
											</button>
											<button
												onClick={() => handleDelete(blog._id)}
												className="text-red-500 hover:text-red-700 p-2 max-w-max"
											>
												<Trash2 size={18} />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4} className="py-4 text-center">
									Không có bài viết nào
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>

			{/* Pagination */}
			{totalPages > 1 && (
				<div className="flex justify-center mt-6">
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={`mx-1 px-3 py-1 rounded-full border max-w-max ${
								page === currentPage
									? "bg-blue-500 text-white"
									: "bg-white text-blue-500 border-blue-500"
							} hover:bg-blue-500 hover:text-white`}
						>
							{page}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default ManageBlog;
