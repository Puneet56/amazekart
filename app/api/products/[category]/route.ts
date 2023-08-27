import { NextResponse } from "next/server";

import { prisma } from "@/database/db";

export async function GET(
	request: Request,
	{ params }: { params: { category: string } }
) {
	console.log({ category: params.category });

	let products = await prisma.product.findMany({
		where: {
			tags: {
				some: {
					name: {
						contains: params.category,
					},
				},
			},
		},
		include: {
			images: true,
			tags: true,
		},
	});

	return NextResponse.json(products);
}
