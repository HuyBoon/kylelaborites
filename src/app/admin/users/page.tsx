"use client";
import HeaderTitle from "@/components/layoutdashboard/HeaderTitle";
import { Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

// Define a User type with the expected properties
interface User {
	_id: string;
	name: string;
	email: string;
	admin: boolean;
	superAdmin: boolean;
}

// Define a Subscriber type
interface Subscriber {
	_id: string;
	name: string;
	phone: string;
	email: string;
	message: string;
	subscribedAt: string;
}

export default function Management() {
	const [users, setUsers] = useState<User[]>([]);
	const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
	const [userPage, setUserPage] = useState(1);
	const [subscriberPage, setSubscriberPage] = useState(1);
	const postsPerPage = 4;
	const [totalUserPages, setTotalUserPages] = useState(0);
	const [totalSubscriberPages, setTotalSubscriberPages] = useState(0);

	useEffect(() => {
		// Fetch users when the userPage changes
		async function fetchUsers() {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/adminusers?page=${userPage}&limit=${postsPerPage}`
			);
			const data = await response.json();
			setUsers(data.users);
			setTotalUserPages(Math.ceil(data.total / postsPerPage));
		}

		fetchUsers();
	}, [userPage]);

	useEffect(() => {
		// Fetch subscribers when the subscriberPage changes
		async function fetchSubscribers() {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/api/subcriber?page=${subscriberPage}&limit=${postsPerPage}`
			);
			const data = await response.json();
			setSubscribers(data.subscribers);
			setTotalSubscriberPages(Math.ceil(data.totalSubscribers / postsPerPage));
		}

		fetchSubscribers();
	}, [subscriberPage]);

	const handleDeleteUser = async (id: string) => {
		const userToDelete = users.find((user) => user._id === id);

		if (userToDelete && userToDelete.superAdmin) {
			alert("You cannot delete a Super Admin.");
			return;
		}

		if (confirm("Are you sure you want to delete this user?")) {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/adminusers/${id}`, {
				method: "DELETE",
			});
			setUsers(users.filter((user) => user._id !== id));
		}
	};

	const handleDeleteSubscriber = async (id: string) => {
		if (confirm("Are you sure you want to delete this subscriber?")) {
			await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/subcriber/${id}`, {
				method: "DELETE",
			});
			setSubscribers(subscribers.filter((subscriber) => subscriber._id !== id));
		}
	};

	return (
		<div className="container mx-auto my-6 p-6 bg-white shadow rounded-lg">
			<HeaderTitle
				title="User Management"
				path="/users/addnew"
				addItem="Add User"
			/>

			{/* User Management Table */}
			<div className="overflow-x-auto mb-6">
				<table className="min-w-full bg-white border border-gray-200 rounded-lg">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 border-b text-left">No.</th>
							<th className="py-3 px-4 border-b text-left">Name</th>
							<th className="py-3 px-4 border-b text-left">Email</th>
							<th className="py-3 px-4 border-b text-left">Admin</th>
							<th className="py-3 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{users.length > 0 ? (
							users.map((user, index) => (
								<tr key={user._id} className="hover:bg-gray-50">
									<td className="py-3 px-4 border-b">
										{(userPage - 1) * postsPerPage + index + 1}
									</td>
									<td className="py-3 px-4 border-b">{user.name}</td>
									<td className="py-3 px-4 border-b">{user.email}</td>
									<td className="py-3 px-4 border-b">
										{user.superAdmin ? (
											<span className="text-green-600 font-semibold">
												SuperAdmin
											</span>
										) : user.admin ? (
											<span className="text-green-600 font-semibold">
												Admin
											</span>
										) : (
											<span className="text-gray-600">User</span>
										)}
									</td>
									<td className="py-3 px-4 border-b">
										{/* Show delete button only if the user is not a superAdmin */}
										{!user.superAdmin && (
											<button
												onClick={() => handleDeleteUser(user._id)}
												className="text-red-500 hover:text-red-700"
											>
												<Trash2 size={20} />
											</button>
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={5} className="py-4 text-center">
									No users found
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* Pagination for Users */}
				{totalUserPages && (
					<div className="flex justify-center items-center mt-4">
						<button
							onClick={() => setUserPage(userPage - 1)}
							disabled={userPage === 1}
							className="px-2 py-1 max-w-max bg-blue-500 text-white rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronLeft />
						</button>
						<div className="text-lg mx-2">
							Page {userPage} of {totalUserPages}
						</div>
						<button
							onClick={() => setUserPage(userPage + 1)}
							disabled={userPage === totalUserPages}
							className="px-2 py-1 max-w-max bg-blue-500 text-white rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronRight />
						</button>
					</div>
				)}
			</div>

			{/* Subscriber Management Table */}
			<div className="overflow-x-auto">
				<table className="min-w-full bg-white border border-gray-200 rounded-lg">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-3 px-4 border-b text-left">No.</th>
							<th className="py-3 px-4 border-b text-left">Email</th>
							<th className="py-3 px-4 border-b text-left">Name</th>
							<th className="py-3 px-4 border-b text-left">Phone</th>
							<th className="py-3 px-4 border-b text-left">Message</th>
							<th className="py-3 px-4 border-b text-left">Actions</th>
						</tr>
					</thead>
					<tbody>
						{subscribers.length > 0 ? (
							subscribers.map((subscriber, index) => (
								<tr key={subscriber._id} className="hover:bg-gray-50">
									<td className="py-3 px-4 border-b">
										{(subscriberPage - 1) * postsPerPage + index + 1}
									</td>
									<td className="py-3 px-4 border-b">{subscriber.email}</td>
									<td className="py-3 px-4 border-b">{subscriber.name}</td>
									<td className="py-3 px-4 border-b">{subscriber.phone}</td>
									<td className="py-3 px-4 border-b">{subscriber.message}</td>
									<td className="py-3 px-4 border-b">
										<button
											onClick={() => handleDeleteSubscriber(subscriber._id)}
											className="text-red-500 hover:text-red-700"
										>
											<Trash2 size={18} />
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className="py-4 text-center">
									No subscribers found
								</td>
							</tr>
						)}
					</tbody>
				</table>

				{/* Pagination for Subscribers */}
				{totalSubscriberPages && (
					<div className="flex justify-center items-center mt-4">
						<button
							onClick={() => setSubscriberPage(subscriberPage - 1)}
							disabled={subscriberPage === 1}
							className="px-2 py-1 max-w-max bg-blue-500 text-white rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronLeft />
						</button>
						<div className="text-lg mx-2">
							Page {subscriberPage} of {totalSubscriberPages}
						</div>
						<button
							onClick={() => setSubscriberPage(subscriberPage + 1)}
							disabled={subscriberPage === totalSubscriberPages}
							className="px-2 py-1 max-w-max bg-blue-500 text-white rounded-md mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<ChevronRight />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
