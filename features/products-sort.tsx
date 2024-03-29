"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const sortOptions = ["relevance", "price-low-to-high", "price-high-to-low"];

const nameMap = {
	relevance: "Relevance",
	"price-low-to-high": "Price: Low to High",
	"price-high-to-low": "Price: High to Low",
};

const ProductsSort = () => {
	let pathName = usePathname();

	const params = useSearchParams();

	let sort = "";

	if (pathName === "/") {
		pathName = "/products";
	}

	if (params.has("sort")) {
		sort = params.get("sort") as string;
	}

	return (
		<div className="">
			<h2 className="text-xs text-primary/50 mb-2">Sort by</h2>
			<ul className="flex flex-col gap-3 text-sm font-medium">
				{sortOptions.map((option, i) => (
					<li
						key={i}
						className={`hover:underline underline-offset-4 ${
							option === sort ? "underline" : ""
						}`}
					>
						<Link href={`${pathName}?sort=${option}`}>
							{/* @ts-ignore */}
							{nameMap[option]}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ProductsSort;
