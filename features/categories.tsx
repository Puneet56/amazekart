"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const categories = [
	"trending",
	"new-arrivals",
	"best-sellers",
	"apparels",
	"jewellery",
	"home-decor",
];

const nameMap = {
	trending: "Trending",
	"new-arrivals": "New Arrivals",
	"best-sellers": "Best Sellers",
	apparels: "Apparels",
	jewellery: "Jewellery",
	"home-decor": "Home Decor",
};

const Categories = () => {
	const params = useSearchParams();

	let sort = "";

	if (params.has("sort")) {
		sort = ("?sort=" + params.get("sort")) as string;
	}

	const pathName = usePathname();

	return (
		<div>
			<h2 className="text-xs text-primary/50 mb-3">Categories</h2>
			<ul className="flex flex-col gap-2 text-sm font-medium">
				{categories.map((category, i) => (
					<li
						key={i}
						className={`hover:underline underline-offset-4 ${
							pathName === `/products/${category}` ? "underline" : ""
						}`}
					>
						<Link href={`/products/${category}${sort}`}>
							{/* @ts-ignore */}
							{nameMap[category]}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
