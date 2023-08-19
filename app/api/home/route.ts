import { data } from "@/database/data";
import { NextResponse } from "next/server";

const categories = ["hero", "Trending", "New", "Best Seller"];

export async function GET() {
	let catResult = data.map((item) => {
		const category = categories[Math.floor(Math.random() * categories.length)];
		return {
			...item,
			category: category[Math.floor(Math.random() * category.length)],
		};
	});

	return NextResponse.json(catResult);
}
