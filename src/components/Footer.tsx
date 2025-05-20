"use client";
import { Facebook, Instagram, Youtube } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
	const [formData, setFormData] = useState({ email: "" });
	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setSuccessMessage("");
		setErrorMessage("");

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/subcriber`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ email: formData.email }),
				}
			);

			if (response.ok) {
				setSuccessMessage("Đăng ký thành công!");
				setFormData({ email: "" });
			} else {
				setErrorMessage("Đã xảy ra lỗi khi đăng ký, vui lòng thử lại.");
			}
		} catch (error) {
			setErrorMessage("Lỗi kết nối, vui lòng kiểm tra kết nối mạng.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<footer className="bg-dark dark:bg-black text-white dark:text-gray-300 py-12">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
				{/* Subscription Section */}
				<div className="space-y-6">
					<h4 className="text-xl font-semibold text-gray-100">
						Đăng ký nhận tin
					</h4>
					<p className="text-sm text-gray-400">
						Nhận các tin tức mới nhất và khuyến mãi từ KYLE.
					</p>
					<form onSubmit={handleSubmit} className="space-y-4">
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-4 py-2 rounded-md bg-blue-800 dark:bg-gray-700 text-gray-100 placeholder-blue-300 dark:placeholder-gray-400 focus:outline-none"
							placeholder="Nhập email của bạn"
							required
						/>
						<button
							type="submit"
							className="w-full px-4 py-2 bg-white dark:bg-gray-700 text-blue-900 dark:text-gray-300 rounded-md hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors duration-200"
							disabled={loading}
						>
							{loading ? "Đang đăng ký..." : "Đăng ký"}
						</button>
						{successMessage && (
							<p className="text-green-500 text-sm">{successMessage}</p>
						)}
						{errorMessage && (
							<p className="text-red-500 text-sm">{errorMessage}</p>
						)}
					</form>
				</div>

				{/* Contact & Social Media Section */}
				<div className="text-center space-y-6">
					<h4 className="text-xl font-semibold">Theo dõi chúng tôi</h4>
					<div className="flex justify-center space-x-6 text-2xl">
						<Link
							href="https://www.facebook.com/kylelaboratories"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-blue-500 transition-colors duration-200"
						>
							<Facebook />
						</Link>
						<Link
							href="https://www.instagram.com/kyleskincare_/"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-pink-500 transition-colors duration-200"
						>
							<Instagram />
						</Link>
						<Link
							href="https://tiktok.com"
							target="_blank"
							rel="noopener noreferrer"
							className="text-white hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300 transition-all"
						>
							<Image
								src="/assets/tiktokdark.svg"
								alt="tiktok"
								width={26}
								height={26}
								className="transition-all"
							/>
						</Link>
					</div>
					<div className="text-center space-y-2">
						<h4 className="text-lg font-semibold">Liên hệ với chúng tôi</h4>
						<p className="text-sm md:text-base">Điện thoại: 0397 590 999</p>
					</div>
				</div>

				{/* Useful Links Section */}
				<div className="text-center space-y-6">
					<h4 className="text-xl font-semibold">Liên kết hữu ích</h4>
					<div className="space-y-2 flex flex-col">
						<Link href="/" className="text-lg text-gray-400 hover:underline">
							Home
						</Link>
						<Link
							href="/products"
							className="text-lg text-gray-400 hover:underline"
						>
							Products
						</Link>
						<Link
							href="/blog"
							className="text-lg text-gray-400 hover:underline"
						>
							Blog
						</Link>
						<Link
							href="/contact"
							className="text-lg text-gray-400 hover:underline"
						>
							Contact
						</Link>
					</div>
				</div>
			</div>

			<div className="mt-4 p-2 text-center text-xs md:text-sm border-t border-gray-700 dark:border-gray-600">
				© 2024 KYLE. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
