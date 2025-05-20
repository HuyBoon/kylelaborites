"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{
		name: "home",
		path: "/",
	},
	{
		name: "products",
		path: "/products",
	},
	{
		name: "blog",
		path: "/blog",
	},
	{
		name: "contact",
		path: "/contact",
	},
];

const Nav = () => {
	const pathname = usePathname();
	return (
		<nav className="flex gap-8 ">
			{links.map((link, i) => {
				return (
					<Link
						href={link.path}
						key={i}
						className={`${
							link.path === pathname &&
							"text-[#0b66ae] border-b-2 border-accent dark:text-light dark:border-b-2 dark:border-light "
						} capitalize text-xl font-bold hover:text-accent transition-all dark:`}
					>
						{link.name}
					</Link>
				);
			})}
		</nav>
	);
};

export default Nav;
