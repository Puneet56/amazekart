"use client";

import { ProductResponse } from "@/types";
import { useSearchParams } from "next/navigation";
import ProductCard from "./product-card";

const ProductList = ({ products }: { products: ProductResponse[] }) => {
	const searchParams = useSearchParams();

	const sort = searchParams.get("sort");

	let sortedProducts = products;

	if (sort === "price-low-to-high") {
		sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
	}

	if (sort === "price-high-to-low") {
		sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
	}

	return (
		<>
			{sortedProducts.map((product: any, i: number) => (
				<ProductCard {...product} key={i} />
			))}
		</>
	);
};

export default ProductList;
