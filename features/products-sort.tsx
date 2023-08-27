"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const sortOptions = ["relevance", "price-low-to-high", "price-high-to-low"];

const nameMap = {
	relevance: "Relevance",
	"price-low-to-high": "Price: Low to High",
	"price-high-to-low": "Price: High to Low",
};

const ProductsSort = () => {
	const pathName = usePathname();

	const params = useSearchParams();

	let sort = "";

	if (params.has("sort")) {
		sort = params.get("sort") as string;
	}

	const router = useRouter();

	return (
		<>
			<div className="hidden lg:block">
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

			<div className="lg:hidden block w-full">
				<label className="text-primary/50 mb-4">Sort by</label>
				<Select
					onValueChange={(value) => {
						router.push(`${pathName}?sort=${value}`);
					}}
					value={sort ? sort : ""}
				>
					<SelectTrigger className="w-full">
						<SelectValue placeholder="Sort by" />
					</SelectTrigger>
					<SelectContent>
						{sortOptions.map((option, i) => (
							<SelectItem value={option}>
								{/* @ts-ignore */}
								{nameMap[option]}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</>
	);
};

export default ProductsSort;
