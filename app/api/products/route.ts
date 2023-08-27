import { prisma } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET() {
	const products = await prisma.product.findMany({
		take: 10,
		select: {
			title: true,
			description: true,
			slug: true,
			id: true,
			price: true,
			images: true,
			tags: true,
		},
	});

	console.log(products);

	return NextResponse.json(products);
}
