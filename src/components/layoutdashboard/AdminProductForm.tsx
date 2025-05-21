"use client";

import {
	uploadImagesToCloudinary,
	uploadThumbnailProductToCloudinary,
} from "@/libs/cloudinaryConnect";
import { generateSlug } from "@/libs/generateSlug";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface ProductFormProps {
	_id?: string;
	name?: string;
	slug?: string;
	category?: string;
	thumbnail?: string;
	description?: string;
	linktobuy?: string;
	images?: string[];
	price?: string;
	discount?: string;
	details?: string;
	isFeatured?: boolean;
}

const AdminProductForm: React.FC<ProductFormProps> = ({
	_id,
	name: existingName = "",
	slug: existingSlug = "",
	category: existingCategory = "",
	thumbnail: existingThumbnail = "",
	linktobuy: existingLinktobuy = "",
	description: existingDescription = "",
	images: existingImages = [],
	price: existingPrice = "",
	discount: existingDiscount = "",
	details: existingDetails = "",
	isFeatured: existingIsFeatured = false,
}) => {
	const [categories, setCategories] = useState([
		"Bộ sản phẩm dưỡng da",
		"Kem chống nắng",
		"Tinh chất serum dưỡng da",
		"Kem dưỡng trắng da",
		"Sửa rửa mặt",
		"Mặt nạ thải độc tẩy tế bào chết",
	]);

	const [name, setName] = useState(existingName);
	const [slug, setSlug] = useState(existingSlug);
	const [category, setCategory] = useState(existingCategory);
	const [thumbnail, setThumbnail] = useState(existingThumbnail);
	const [localImages, setLocalImages] = useState<File[]>([]); // Tạm lưu trữ các file ảnh
	const [images, setImages] = useState<string[]>(existingImages); // URL ảnh đã upload
	const [description, setDescription] = useState(existingDescription);
	const [linktobuy, setLinktobuy] = useState(existingLinktobuy);
	const [price, setPrice] = useState(existingPrice);
	const [details, setDetails] = useState(existingDetails);
	const [discount, setDiscount] = useState(existingDiscount);
	const [isFeatured, setIsFeatured] = useState(existingIsFeatured);
	const [deletedImages, setDeletedImages] = useState<string[]>([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	// Handle form changes
	const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
		setSlug(generateSlug(e.target.value));
	};
	const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) =>
		setCategory(e.target.value);
	const handleChangeDescription = (value: string) => setDescription(value);
	const handleChangeLinktobuy = (e: React.ChangeEvent<HTMLInputElement>) =>
		setLinktobuy(e.target.value);
	const handleChangeDetails = (value: string) => setDetails(value);

	const handleThumbnailChange = async (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = e.target.files?.[0];
		if (file) {
			try {
				const uploadedImageUrls = await uploadThumbnailProductToCloudinary(
					file
				);
				setThumbnail(uploadedImageUrls);
			} catch (error) {
				console.error("Failed to upload image", error);
				toast.error("Image upload failed");
			}
		}
	};

	const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPrice(e.target.value);
	const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) =>
		setDiscount(e.target.value);

	const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files);
			// Thêm vào mảng `localImages` các file đã chọn
			setLocalImages((prevFiles) => [...prevFiles, ...filesArray]);
			e.target.value = ""; // Reset file input để người dùng có thể chọn lại file
		}
	};

	// Handle removing existing image locally
	const handleRemoveExistingImage = (index: number) => {
		const imageToRemove = images[index];
		setDeletedImages((prev) => [...prev, imageToRemove]); // Add to deletedImages
		setImages((prevImages) => prevImages.filter((_, i) => i !== index)); // Remove from UI
	};

	const handleRemoveLocalImage = (index: number) => {
		setLocalImages((prevFiles) => prevFiles.filter((_, i) => i !== index));
	};

	const handleAddCategory = (newCategory: string) => {
		if (!categories.includes(newCategory)) {
			setCategories((prevCategories) => [...prevCategories, newCategory]);
		}
	};
	// Upload tất cả các ảnh khi submit form
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		toast.loading(_id ? "Cập nhật sản phẩm..." : "Đăng sản phẩm...");

		try {
			let uploadedImages: string[] = [];

			if (localImages.length > 0) {
				const uploadPromises = localImages.map((file) =>
					uploadImagesToCloudinary(file)
				);
				const urls = await Promise.all(uploadPromises);
				uploadedImages = urls.flat();
			}

			const product = {
				name,
				slug,
				category,
				thumbnail,
				description,
				linktobuy,
				images: [...images, ...uploadedImages],
				price,
				discount,
				details,
				isFeatured,
			};

			const method = _id ? "PUT" : "POST";
			const apiUrl = _id
				? `${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct/${_id}`
				: `${process.env.NEXT_PUBLIC_API_URL}/api/adminproduct`;

			const response = await fetch(apiUrl, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(product),
			});

			if (response.ok) {
				const result = await response.json();
				toast.dismiss();
				toast.success(
					_id ? "Sản phẩm đã được cập nhật!" : "Sản phẩm đã được đăng!"
				);

				if (!_id) {
					setName("");
					setSlug("");
					setCategory("");
					setDescription("");
					setLinktobuy("");
					setThumbnail("");
					setLocalImages([]);
					setImages([]);
					setPrice("");
					setDiscount("");
					setDetails("");
					setIsFeatured(false);
				}
				router.push("/categories");
			} else {
				const errorData = await response.json();
				toast.dismiss();
				toast.error(errorData.message || "Đã xảy ra lỗi khi gửi sản phẩm.");
			}
		} catch (error) {
			toast.dismiss();
			toast.error("Đã xảy ra lỗi.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="w-full my-4 mx-auto bg-white p-6 rounded-lg shadow-md overflow-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">
				{_id ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
			</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Tên sản phẩm:
					</label>
					<input
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						type="text"
						value={name}
						onChange={handleChangeName}
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Slug:
					</label>
					<input
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						type="text"
						readOnly
						value={slug}
						required
					/>
				</div>

				<div>
					<label className="block text-sm font-medium text-gray-700">
						Danh mục:
					</label>
					<select
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						value={category}
						onChange={handleChangeCategory}
						required
					>
						<option value="">Chọn danh mục</option>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>

				<div>
					<label>Hình đại diện cho sản phẩm</label>
					<input
						type="file"
						name="thumbnail"
						onChange={handleThumbnailChange}
						className="w-full p-2"
						required={!existingThumbnail}
					/>
					{thumbnail && (
						<img
							src={thumbnail}
							alt="Thumbnail preview"
							className="w-32 h-32 mt-2"
						/>
					)}
				</div>
				<div className="mb-2">
					<label className="block text-sm font-medium text-gray-700">
						Giới thiệu sản phẩm:
					</label>
					<textarea
						name="description"
						placeholder="Mô tả ngắn về sản phẩm"
						cols={30}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="mt-1 block w-full min-h-[300px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Link mua sản phẩm:
					</label>
					<input
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
						type="text"
						value={linktobuy}
						onChange={handleChangeLinktobuy}
						required
					/>
				</div>
				<div>
					<label className="block text-sm font-medium text-gray-700">
						Hình ảnh sản phẩm (có thể chọn nhiều ảnh):
					</label>
					<input
						type="file"
						multiple
						onChange={handleImagesChange}
						className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
					<div className="mt-4 flex flex-wrap gap-4">
						{images.map((url, index) => (
							<div key={`existing-${index}`} className="relative">
								<Image
									src={url}
									alt={`Uploaded image ${index + 1}`}
									width={150}
									height={150}
									className="object-cover rounded"
								/>

								<button
									onClick={() => handleRemoveExistingImage(index)}
									className="absolute top-0 right-0 text-black p-1 max-w-max border-none"
								>
									X
								</button>
							</div>
						))}

						{localImages.map((file, index) => (
							<div key={`local-${index}`} className="relative">
								<Image
									src={URL.createObjectURL(file)}
									alt={`Local image ${index + 1}`}
									width={150}
									height={150}
									className="object-cover rounded"
								/>

								<button
									onClick={() => handleRemoveLocalImage(index)}
									className="absolute top-0 right-0 text-black p-1 max-w-max border-none"
								>
									X
								</button>
							</div>
						))}
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Giá cũ
						</label>
						<input
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							type="text"
							value={price}
							onChange={handleChangePrice}
							required
						/>
					</div>

					<div>
						<label className="block text-sm font-medium text-gray-700">
							Giảm giá (nếu có):
						</label>
						<input
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
							type="text"
							value={discount}
							onChange={handleChangeDiscount}
						/>
					</div>
				</div>

				<div className="flex items-center">
					<input
						type="checkbox"
						checked={isFeatured}
						onChange={() => setIsFeatured(!isFeatured)}
						className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
					/>
					<label className="ml-2 block text-sm font-medium text-gray-700">
						Đánh dấu là sản phẩm nổi bật
					</label>
				</div>

				<div className="mb-2">
					<label className="block text-sm font-medium text-gray-700">
						Mô tả sản phẩm:
					</label>
					<textarea
						name="details"
						placeholder="Mô tả chi tiết về sản phẩm"
						cols={30}
						value={details}
						onChange={(e) => handleChangeDetails(e.target.value)}
						className="mt-1 block w-full min-h-[300px] p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
					/>
				</div>
				<div>
					<button
						type="submit"
						className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						disabled={loading}
					>
						{loading
							? "Đang xử lý..."
							: _id
							? "Cập nhật sản phẩm"
							: "Đăng sản phẩm"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AdminProductForm;
