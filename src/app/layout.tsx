import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { AppProvider } from "@/components/AppContext";
import { ThemeProvider } from "@/components/ThemeContext";
import AOSProvider from "@/components/AOSProvider";

const nuntio = Nunito_Sans({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-nuntio",
});

const siteUrl = process.env.NEXT_PUBLIC_API_URL || "https://kyleskincare.vn";

export const metadata: Metadata = {
	title: "KYLE Laboratories Vietnam - Mỹ phẩm chính hãng ",
	description:
		"KYLE Laboratories Vietnam cung cấp các sản phẩm chăm sóc da và mỹ phẩm , chính hãng. Cam kết chất lượng và hiệu quả cho sắc đẹp của bạn.",
	keywords:
		"KYLE Laboratories, mỹ phẩm , chăm sóc da, skincare, beauty, sản phẩm chính hãng, mỹ phẩm Việt Nam, KimVinh Store",
	metadataBase: new URL(siteUrl),
	openGraph: {
		title: "KYLE Laboratories Vietnam - Mỹ phẩm chính hãng ",
		description:
			"Khám phá các sản phẩm chất lượng từ KYLE Laboratories - thương hiệu mỹ phẩm hàng đầu tại Việt Nam.",
		url: siteUrl,
		siteName: "KYLE Laboratories Vietnam",
		type: "website",
		images: [
			{
				url: `${siteUrl}/products.jpg`, // ảnh OG nằm trong public/
				width: 1200,
				height: 630,
				alt: "KYLE Laboratories Vietnam - Mỹ phẩm chính hãng ",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "KYLE Laboratories Vietnam - Mỹ phẩm chính hãng ",
		description:
			"Khám phá sản phẩm chăm sóc da chất lượng từ KYLE Laboratories Vietnam.",
		images: [`${siteUrl}/products.jpg`],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${nuntio.variable} } antialiased`}>
				<ThemeProvider>
					<AppProvider>
						<Toaster />
						<Header />
						<AOSProvider>{children}</AOSProvider>
						<Footer />
					</AppProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
