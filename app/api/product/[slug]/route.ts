import { prisma } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	const product = await prisma.product.findUnique({
		where: {
			slug: params.slug,
		},
		include: {
			images: true,
			tags: true,
		},
	});

	if (!product) {
		console.log("Product not found");
		return NextResponse.json({ error: "Product not found" }, { status: 404 });
	}

	let relatedProducts = await prisma.product.findMany({
		where: {
			tags: {
				some: {
					name: {
						contains: product.tags[0].name,
					},
				},
			},
		},
		take: 4,
		skip: Math.floor(Math.random() * 10),
		include: {
			images: true,
			tags: true,
		},
	});

	if (!relatedProducts) {
		console.log("No related products found");
		relatedProducts = await prisma.product.findMany({
			take: 4,
			skip: Math.floor(Math.random() * 15),
			include: {
				images: true,
				tags: true,
			},
		});
	}

	const response = {
		product,
		relatedProducts,
	};

	return NextResponse.json(response);
}
