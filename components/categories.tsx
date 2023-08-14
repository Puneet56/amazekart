"use client";

import Link from "next/link";

const categories = [
	"T-Shirts",
	"Shirts",
	"Jeans",
	"Trousers",
	"Shorts",
	"Suits",
	"Blazers",
	"Jackets",
	"Sweatshirts",
	"Sweaters",
	"Hoodies",
	"Coats",
	"Kurtas",
];

const Categories = () => {
	return (
		<div>
			<h2 className="text-xs text-primary/50 mb-2">Categories</h2>
			<ul className="flex flex-col gap-3 text-sm font-medium">
				{categories.map((category, i) => (
					<li key={i} className="hover:underline underline-offset-4">
						<Link href="/">{category}</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
