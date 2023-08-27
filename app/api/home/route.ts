import { prisma } from "@/database/db";
import { HomeProductsResponse } from "@/types";
import { NextResponse } from "next/server";

export async function GET() {
	let response: HomeProductsResponse = {
		hero: [],
		trending: [],
		newArrival: [],
		bestSellers: [],
	};

	const hero = await prisma.product.findMany({
		take: 3,
		skip: Math.floor(Math.random() * 10),
		include: {
			images: true,
			tags: true,
		},
	});

	const trending = await prisma.product.findMany({
		take: 7,
		skip: Math.floor(Math.random() * 10),
		include: {
			images: true,
			tags: {
				where: {
					name: {
						contains: "trending",
					},
				},
			},
		},
	});

	const newArrival = await prisma.product.findMany({
		take: 7,
		skip: Math.floor(Math.random() * 10),
		include: {
			images: true,
			tags: {
				where: {
					name: {
						contains: "new",
					},
				},
			},
		},
	});

	const bestSellers = await prisma.product.findMany({
		take: 7,
		skip: Math.floor(Math.random() * 10),
		include: {
			images: true,
			tags: {
				where: {
					name: {
						contains: "best",
					},
				},
			},
		},
	});

	response.hero = hero;
	response.trending = trending;
	response.newArrival = newArrival;
	response.bestSellers = bestSellers;

	return NextResponse.json(response);
}
