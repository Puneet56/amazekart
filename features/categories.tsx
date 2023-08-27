"use client";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

	const router = useRouter();

	return (
		<>
			<div className="hidden lg:block">
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

			<div className="lg:hidden block w-full py-4">
				<label className="text-primary/50 mb-4">Categories</label>

				<Select
					onValueChange={(category) => {
						router.push(`/products/${category}${sort}`);
					}}
					value={pathName.replace("/products/", "")}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						{categories.map((category, i) => (
							<SelectItem value={category}>
								{/* @ts-ignore */}
								{nameMap[category]}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</>
	);
};

export default Categories;
