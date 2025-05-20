"use client";
import HeaderTitle from "@/components/layoutdashboard/HeaderTitle";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Categories = () => {
	const router = useRouter();
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchCategories();
	}, []);

	function fetchCategories() {
		fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct`)
			.then((res) => res.json())
			.then((response) => {
				if (response.success) {
					setData(response.products || []); // Lưu danh sách sản phẩm
				}
			})
			.catch((error) => {
				console.error("Error fetching categories:", error);
			});
	}

	function handleEdit(productId: string) {
		router.push(
			`${process.env.NEXT_PUBLIC_API_URL}/categories/edit/${productId}`
		);
	}

	function handleDelete(productId: string) {
		if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
			fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct/${productId}`,
				{
					method: "DELETE",
				}
			).then(() => fetchCategories());
		}
	}

	return (
		<div className="container mx-auto my-4">
			<HeaderTitle
				title="Danh mục sản phẩm"
				path="/categories/addnew"
				addItem="Thêm sản phẩm"
			/>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border text-[14px] border-gray-200">
					<thead className="bg-gray-100 ">
						<tr className="text-center ">
							<th className="border-b">STT</th>
							<th className="border-b w-[35%] ">Tên sản phẩm</th>
							<th className="border-b">Danh mục</th>
							<th className="border-b">Giá</th>
							<th className="border-b">Giảm giá</th>
							<th className="border-b">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{data.length > 0 ? (
							data.map((product: any, index: number) => (
								<tr key={product._id} className="text-center">
									<td className="py-2 px-4 border-b whitespace-nowrap">
										{index + 1}
									</td>
									<td className="py-2 px-4 border-b break-words">
										{product.name}
									</td>
									<td className="py-2 px-4 border-b">{product.category}</td>
									<td className="py-2 px-4 border-b">
										{product.price ? `${product.price} VND` : "Không có"}
									</td>
									<td className="py-2 px-4 border-b">
										{product.discount ? `${product.discount}` : "Không có"}
									</td>
									<td className="py-2 px-4 border-b">
										<div className="flex justify-center items-center space-x-2">
											<button
												onClick={() => handleEdit(product._id)}
												className="text-blue-500 hover:text-blue-700 p-2"
											>
												<Pencil size={18} />
											</button>
											<button
												onClick={() => handleDelete(product._id)}
												className="text-red-500 hover:text-red-700 p-2"
											>
												<Trash2 size={18} />
											</button>
										</div>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="py-4 text-center">
									Không có sản phẩm nào
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Categories;
