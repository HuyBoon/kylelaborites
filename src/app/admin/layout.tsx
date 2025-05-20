"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/components/AppContext";
import LeftSideBar from "@/components/layoutdashboard/LeftSideBar";
import { useState, useEffect } from "react";
import { LayoutDashboard } from "lucide-react";

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { user, isAdmin, profileFetched, status } = useUser() || {
		user: null,
		isAdmin: false,
		profileFetched: false,
		status: "loading",
	};
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		if (!profileFetched || status === "loading") {
			// Wait until the profile is fetched
			return;
		}

		if (!isAdmin) {
			router.push("/");
		}
	}, [isAdmin, profileFetched, status, router]);

	if (!profileFetched || status === "loading") {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="loader">Loading...</div>
			</div>
		);
	}

	if (!isAdmin) {
		return null;
	}

	const toggleSidebar = () => {
		setSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex min-h-screen">
			{/* Mobile menu button */}
			<span
				className="lg:hidden fixed top-13 right-5 z-50 bg-slate-400 text-sm px-3 py-2 rounded-full cursor-pointer shadow-md"
				onClick={toggleSidebar}
			>
				<LayoutDashboard />
			</span>

			{/* Sidebar */}
			<LeftSideBar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

			{/* Main content */}
			<div className="flex-1 p-4">{children}</div>
		</div>
	);
}
