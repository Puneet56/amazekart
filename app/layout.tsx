import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

export const metadata: Metadata = {
	title: "AmazeKart",
	description: "AmazeKart is an e-commerce website built with Next.js",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en" className="dark">
			<NextTopLoader showSpinner={false} />
			<body className="bg-neutral-900 min-h-screen">{children}</body>
		</html>
	);
}
