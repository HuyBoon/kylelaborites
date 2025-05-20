"use client";
import { useUser } from "@/components/AppContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RegisterPage = () => {
	const router = useRouter();
	const { profileFetched, status } = useUser();

	// Hiển thị loading nếu status là loading
	if (status === "loading") {
		return <div>Loading...</div>;
	}

	// Nếu đã authenticated, redirect đến trang chính
	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status, router]);

	// Nếu đã authenticated, không render gì
	if (status === "authenticated") {
		return null;
	}

	// Khởi tạo state ở đây, không phụ thuộc vào bất kỳ điều kiện nào
	const [formData, setFormData] = useState({
		email: "",
		password: "",
		name: "",
	});
	const [creatingUser, setCreatingUser] = useState(false);
	const [userCreated, setUserCreated] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function handleFormSubmit(ev: React.FormEvent<HTMLFormElement>) {
		ev.preventDefault();
		setCreatingUser(true);
		setError(null);
		setUserCreated(false);

		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/register`,
				{
					method: "POST",
					body: JSON.stringify(formData),
					headers: { "Content-Type": "application/json" },
				}
			);

			if (response.ok) {
				setUserCreated(true);
				setFormData({ email: "", password: "", name: "" }); // Reset form sau khi đăng ký thành công
			} else {
				const errorData = await response.json();
				setError(errorData.message || "An error occurred");
			}
		} catch (e) {
			setError("Failed to register. Please try again later.");
		}

		setCreatingUser(false);
	}

	return (
		<section className="m-8">
			<h1 className="text-center text-4xl mb-4">Register</h1>
			{userCreated && (
				<div className="my-4 text-center">
					User created.
					<br />
					Now you can{" "}
					<Link className="underline" href={"/login"}>
						Login &raquo;
					</Link>
				</div>
			)}
			{error && <div className="my-4 text-center text-red-600">{error}</div>}
			<form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
				<input
					type="text"
					placeholder="Name"
					value={formData.name}
					disabled={creatingUser}
					onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					required
					className="mb-4 p-2 border border-gray-300 w-full"
				/>
				<input
					type="email"
					placeholder="Email"
					value={formData.email}
					disabled={creatingUser}
					onChange={(e) => setFormData({ ...formData, email: e.target.value })}
					required
					className="mb-4 p-2 border border-gray-300 w-full"
				/>
				<input
					type="password"
					placeholder="Password"
					value={formData.password}
					disabled={creatingUser}
					onChange={(e) =>
						setFormData({ ...formData, password: e.target.value })
					}
					required
					className="mb-4 p-2 border border-gray-300 w-full"
				/>
				<button
					type="submit"
					disabled={creatingUser}
					className={`${
						creatingUser ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
					} text-white font-bold py-2 px-4 w-full rounded`}
				>
					{creatingUser ? "Registering..." : "Register"}
				</button>
			</form>
		</section>
	);
};

export default RegisterPage;
