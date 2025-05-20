"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, NotebookPen, Shapes, UsersRound } from "lucide-react";
import { useState } from "react";

const navLinks = [
	{
		url: "/admin/dashboard",
		icon: <LayoutDashboard />,
		label: "Dashboard",
	},
	{
		url: "/admin/categories",
		icon: <Shapes />,
		label: "Categories",
	},
	{
		url: "/admin/manageblogs",
		icon: <NotebookPen />,
		label: "Blogs",
	},
	{
		url: "/admin/users",
		icon: <UsersRound />,
		label: "Users",
	},
];

const LeftSideBar = ({
	isOpen,
	toggleSidebar,
}: {
	isOpen: boolean;
	toggleSidebar: () => void;
}) => {
	const pathname = usePathname();

	return (
		<div
			className={`fixed z-50 min-h-screen w-[250px] top-0 left-0 bg-blue-2 shadow-xl pt-20 px-10 transition-transform duration-300 bg-slate-100 ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} lg:translate-x-0 lg:static lg:flex lg:w-[250px]`}
		>
			<div className="flex flex-col gap-12">
				{navLinks.map((link) => (
					<Link
						href={link.url}
						key={link.label}
						onClick={toggleSidebar} // Close sidebar after click on mobile
						className={`flex gap-4 text-body-medium ${
							pathname === link.url ? "text-blue-1" : "text-grey-1"
						}`}
					>
						{link.icon} <p>{link.label}</p>
					</Link>
				))}
			</div>
		</div>
	);
};

export default LeftSideBar;
