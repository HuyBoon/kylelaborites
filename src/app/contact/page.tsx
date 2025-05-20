"use client";
import React, { useState } from "react";
import { Facebook, Instagram } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Contact = () => {
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		email: "",
		message: "",
	});

	const [loading, setLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [errorMessage, setErrorMessage] = useState("");

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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
					body: JSON.stringify(formData),
				}
			);

			if (response.ok) {
				const result = await response.json();
				setSuccessMessage("Thông điệp đã được gửi thành công!");
				setFormData({ name: "", phone: "", email: "", message: "" });
			} else {
				setErrorMessage("Đã xảy ra lỗi khi gửi thông điệp, vui lòng thử lại.");
			}
		} catch (error) {
			setErrorMessage("Lỗi kết nối, vui lòng kiểm tra kết nối mạng.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen py-12 px-4 lg:px-20 bg-light dark:bg-dark text-gray-900 dark:text-gray-100 transition-all duration-300">
			<div className="container mx-auto">
				<h1 className="text-4xl font-bold text-center text-blue-900 dark:text-blue-200 mb-8">
					Liên hệ với KYLE Skincare
				</h1>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
					<div className="space-y-6">
						<h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400">
							Thông tin liên hệ
						</h2>
						<p className="text-gray-600 dark:text-gray-300">
							Cảm ơn bạn đã ghé thăm KYLE! Chúng tôi luôn sẵn sàng lắng nghe và
							giải đáp mọi thắc mắc của bạn.
						</p>

						<div>
							<h4 className="text-xl font-semibold">Điện thoại</h4>
							<p className="text-gray-600 dark:text-gray-300">0397 590 999</p>
						</div>

						<h2 className="text-xl font-bold text-blue-800 dark:text-blue-400">
							Theo dõi chúng tôi
						</h2>
						<div className="flex items-center space-x-4">
							<Link
								href="https://www.facebook.com/kylelaboratories"
								target="_blank"
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition-all"
							>
								<Facebook />
							</Link>
							<Link
								href="https://www.instagram.com/kyleskincare_/"
								target="_blank"
								rel="noopener noreferrer"
								className="text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-500 transition-all"
							>
								<Instagram />
							</Link>
							<Link
								href="https://tiktok.com"
								target="_blank"
								rel="noopener noreferrer"
								className="text-black hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-300 transition-all"
							>
								<Image
									src="/assets/tiktokdark.svg"
									alt="tiktok"
									width={28}
									height={28}
									className="hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-500 transition-all"
								/>
							</Link>
						</div>
					</div>

					<div>
						<h2 className="text-2xl font-bold text-blue-800 dark:text-blue-400">
							Gửi thông điệp cho chúng tôi
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6 mt-4">
							<div className="flex justify-between gap-2">
								<div className="flex-1">
									<label
										htmlFor="name"
										className="block text-gray-700 dark:text-gray-300 font-medium"
									>
										Tên của bạn
									</label>
									<input
										id="name"
										name="name"
										type="text"
										value={formData.name}
										onChange={handleChange}
										className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700"
										placeholder="Nhập tên của bạn"
									/>
								</div>
								<div className="flex-1">
									<label
										htmlFor="phone"
										className="block text-gray-700 dark:text-gray-300 font-medium"
									>
										Số điện thoại
									</label>
									<input
										id="phone"
										name="phone"
										type="text"
										value={formData.phone}
										onChange={handleChange}
										className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700"
										placeholder="Nhập số điện thoại của bạn"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-gray-700 dark:text-gray-300 font-medium"
								>
									Email
								</label>
								<input
									id="email"
									name="email"
									type="email"
									value={formData.email}
									onChange={handleChange}
									className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700"
									placeholder="Nhập email của bạn"
									required
								/>
							</div>
							<div>
								<label
									htmlFor="message"
									className="block text-gray-700 dark:text-gray-300 font-medium"
								>
									Lời nhắn
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									rows={4}
									className="mt-1 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-gray-700"
									placeholder="Nhập lời nhắn của bạn"
								></textarea>
							</div>
							{successMessage && (
								<p className="text-green-600 dark:text-green-400">
									{successMessage}
								</p>
							)}
							{errorMessage && (
								<p className="text-red-600 dark:text-red-400">{errorMessage}</p>
							)}
							<button
								type="submit"
								className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 transition-all"
								disabled={loading}
							>
								{loading ? "Đang gửi..." : "Gửi tin nhắn"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contact;
