"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NotebookPen, Plus, ShoppingCart, Tag } from "lucide-react";

interface Product {
	_id: string;
	name: string;
	price: number;
}

interface Blog {
	_id: string;
	title: string;
	slug: string;
}

const Dashboard = () => {
	const router = useRouter();

	const [products, setProducts] = useState<Product[]>([]);
	const [blogs, setBlogs] = useState<Blog[]>([]);

	async function fetchProducts() {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct`
			);
			const response = await res.json();
			if (response.success) {
				setProducts(response.products.slice(0, 5));
			}
		} catch (error) {
			console.error("Error fetching products:", error);
		}
	}

	async function fetchBlogs() {
		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/adminblog`
			);
			const response = await res.json();
			if (response.success) {
				setBlogs(response.blogs.slice(0, 5));
			}
		} catch (error) {
			console.error("Error fetching blogs:", error);
		}
	}

	useEffect(() => {
		fetchProducts();
		fetchBlogs();
	}, []);

	return (
		<div className="container mx-auto my-8">
			<div className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-lg p-3 mb-4">
				<h1 className="xs:text-xl  font-semibold tracking-tight">
					Admin Dashboard
				</h1>
				<div className="flex items-center justify-between space-x-2 ">
					<button
						className="flex gap-1 bg-purple-500 text-white py-2 px-2 rounded hover:bg-purple-600"
						onClick={() => router.push("/categories/addnew")}
					>
						<Plus size={20} /> <ShoppingCart size={20} />
					</button>
					<button
						className="flex gap-1 bg-purple-500 text-white py-2 px-2 rounded hover:bg-purple-600"
						onClick={() => router.push("/manageblogs/addnew")}
					>
						<Plus size={20} /> <NotebookPen size={20} />
					</button>
				</div>
			</div>

			<div className="grid gap-4">
				{/* Products Section */}
				<div className="h-[400px] bg-white shadow-lg rounded-lg p-6 overflow-scroll">
					<div className="flex justify-between items-center">
						<h2 className="xs:text-xl font-bold mb-4">Recent Products</h2>
						<button
							onClick={() => router.push("/categories")}
							className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 max-w-max"
						>
							Manage Products
						</button>
					</div>
					{products.length > 0 ? (
						<table className="min-w-full bg-white">
							<thead className="bg-gray-50">
								<tr>
									<th className="py-2 px-4 text-left font-semibold text-gray-700">
										Name
									</th>
									<th className="py-2 px-4 text-left font-semibold text-gray-700">
										Price
									</th>
								</tr>
							</thead>
							<tbody>
								{products.map((product) => (
									<tr
										key={product._id}
										className="hover:bg-gray-100 cursor-pointer"
										onClick={() =>
											router.push(`/categories/edit/${product._id}`)
										}
									>
										<td className="py-2 px-4 border-b">{product.name}</td>
										<td className="py-2 px-4 border-b">{product.price} VND</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p className="text-center text-gray-500">No products available</p>
					)}
				</div>

				{/* Blogs Section */}
				<div className="h-[400px] bg-white shadow-lg rounded-lg p-6 overflow-scroll">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
						<button
							onClick={() => router.push("/manageblogs")}
							className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 max-w-max"
						>
							Manage Blogs
						</button>
					</div>
					{blogs.length > 0 ? (
						<ul className="divide-y divide-gray-200">
							{blogs.map((blog) => (
								<li
									key={blog._id}
									className="py-2 hover:bg-gray-100 cursor-pointer transition-colors duration-300"
									onClick={() => router.push(`/manageblogs/edit/${blog._id}`)}
								>
									{blog.title}
								</li>
							))}
						</ul>
					) : (
						<p className="text-center text-gray-500">No blogs available</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
