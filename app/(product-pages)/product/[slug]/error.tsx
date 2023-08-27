"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProductDetailsError = () => {
	return (
		<div className="w-full h-96 flex items-center justify-center flex-col gap-8">
			<h1 className="text-2xl text-gray-500">Product not found</h1>

			<Button
				asChild
				variant="outline"
				className="text-primary/50 font-light hover:text-primary"
			>
				<Link href="/products">Browse Products</Link>
			</Button>
		</div>
	);
};

export default ProductDetailsError;
