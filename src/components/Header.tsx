"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Nav from "./Nav";
import { AlignLeft, Moon, Search, SunMoon, UserRound } from "lucide-react";
import MobileNav from "./MobileNav";
import AuthLinks from "./AuthLinks";
import { useRouter } from "next/navigation";
import { useUser } from "@/components/AppContext";
import Image from "next/image";
import { useTheme } from "./ThemeContext";

const Header = () => {
	const { user, isAdmin, status } = useUser();
	const userName = user?.name || user?.email || "User";

	const router = useRouter();

	const [openNav, setOpenNav] = useState(false);
	const [profile, setProfile] = useState(false);

	const authLinksRef = useRef<HTMLDivElement>(null);
	const userRoundRef = useRef<HTMLDivElement>(null);

	const { theme, toggleTheme } = useTheme();

	const toggleProfile = () => {
		setProfile((prevProfile) => !prevProfile);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				authLinksRef.current &&
				!authLinksRef.current.contains(event.target as Node) &&
				userRoundRef.current &&
				!userRoundRef.current.contains(event.target as Node)
			) {
				setProfile(false);
			}
		};

		if (profile) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [profile]);

	const [scrollPosition, setScrollPosition] = useState(0);
	const [isHeaderVisible, setIsHeaderVisible] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.pageYOffset;
			setIsHeaderVisible(
				currentScrollPos <= scrollPosition || currentScrollPos <= 50
			);
			setScrollPosition(currentScrollPos);
		};

		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [scrollPosition]);

	return (
		<header
			className={`sticky top-0 z-[1000] transition-transform duration-500 ${
				theme === "light"
					? "bg-light text-dark"
					: "dark:bg-dark dark:text-light"
			} ${isHeaderVisible ? "translate-y-0" : "-translate-y-full"}`}
		>
			<div className="container px-4 lg:px-8 py-2 md:py-0 flex items-center justify-between">
				<AlignLeft
					onClick={() => setOpenNav((prev) => !prev)}
					size={30}
					className="cursor-pointer md:hidden dark:text-light"
				/>

				<Link href="/" className="hidden md:flex py-2">
					{theme === "light" ? (
						<Image
							src={"/logoKyleLight.png"}
							alt="LOGO"
							className="object-contain w-auto h-14"
							width={2177}
							height={968}
							priority
						/>
					) : (
						<Image
							src={"/logoKyleDark.png"}
							alt="LOGO"
							className="object-contain w-auto h-14"
							width={2709}
							height={1206}
							priority
						/>
					)}
				</Link>

				<Link
					href="/"
					className="md:hidden text-3xl font-semibold text-accent dark:text-light ml-[28px]"
				>
					KYLE
				</Link>
				{/* Navigation links for desktop */}
				<div className="hidden md:flex items-center gap-8">
					<Nav />
				</div>

				{/* Theme toggle and User profile */}
				<div className="flex items-center justify-between gap-2">
					{theme === "light" ? (
						<SunMoon
							size={28}
							className="cursor-pointer"
							onClick={toggleTheme}
						/>
					) : (
						<Moon size={28} className="cursor-pointer " onClick={toggleTheme} />
					)}
					<div ref={userRoundRef} className="relative">
						<UserRound
							size={28}
							className="cursor-pointer dark:text-light"
							onClick={toggleProfile}
						/>
						{profile && (
							<div ref={authLinksRef} className="absolute  mt-2 w-40 right-0 ">
								<AuthLinks
									status={status}
									userName={userName}
									isAdmin={isAdmin}
								/>
							</div>
						)}
					</div>
				</div>
			</div>
			{/* User icon and profile dropdown */}

			{/* Mobile navigation */}
			{openNav && (
				<MobileNav openNav={openNav} onClose={() => setOpenNav(false)} />
			)}
		</header>
	);
};

export default Header;
