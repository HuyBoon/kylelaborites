// components/AddUser.tsx
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddUser = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);
	const [isSuperAdmin, setIsSuperAdmin] = useState(false); // Trường Super Admin

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		// Tạo đối tượng người dùng
		const newUser = {
			name,
			email,
			password,
			admin: isAdmin,
			superAdmin: isSuperAdmin,
		};

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/api/register`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newUser),
			}
		);

		if (response.ok) {
			toast.success("User created successfully");
			// Clear fields after successful submission
			setName("");
			setEmail("");
			setPassword("");
			setIsAdmin(false);
			setIsSuperAdmin(false);
		} else {
			const errorData = await response.json();
			toast.error(`Error: ${errorData.message}`);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl mb-4">Add New User</h2>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label className="block text-sm font-medium">Name</label>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Email</label>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div>
					<label className="block text-sm font-medium">Password</label>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="w-full border px-3 py-2 rounded"
					/>
				</div>
				<div className="flex items-center">
					<input
						type="checkbox"
						checked={isAdmin}
						onChange={(e) => setIsAdmin(e.target.checked)}
						className="mr-2"
					/>
					<label>Admin</label>
				</div>
				{isAdmin && (
					<div className="flex items-center">
						<input
							type="checkbox"
							checked={isSuperAdmin}
							onChange={(e) => setIsSuperAdmin(e.target.checked)}
							className="mr-2"
						/>
						<label>Super Admin</label>
					</div>
				)}
				<button
					type="submit"
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Add User
				</button>
			</form>
		</div>
	);
};

export default AddUser;
