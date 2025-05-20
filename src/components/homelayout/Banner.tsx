"use client";
import Image from "next/image";
import { useTheme } from "../ThemeContext";
import { useEffect, useState } from "react";

const Banner = () => {
	const { theme } = useTheme();
	const [isMobile, setIsMobile] = useState(false);
	const [currentTheme, setCurrentTheme] = useState(theme);
	const [isAnimating, setIsAnimating] = useState(false);

	// Detect screen size
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);


	const getImageSrc = () => {
		if (isMobile) {
			return theme === "dark"
				? "/assets/darkSmartphonebanner.webp"
				: "/assets/lightSmartphoneBanner.webp";
		} else {
			return theme === "light"
				? "/assets/bannerlight.webp"
				: "/assets/bannerdark.webp";
		}
	};

	return (
		<div className="relative w-full">
			<div
				className={`relative transition-all ${
					isAnimating
						? theme === currentTheme
							? "animate-fade-scale-in"
							: "animate-fade-scale-out"
						: ""
				}`}
				style={{ paddingBottom: isMobile ? "100%" : "40%" }}
			>
				<Image
					src={getImageSrc()}
					alt="banner"
					fill
					className="object-cover object-center"
					priority
				/>
			</div>
		</div>
	);
};

export default Banner;
