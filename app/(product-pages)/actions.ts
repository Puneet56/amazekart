import { prisma } from "@/database/db";

export const getProductBySlug = async (slug: string) => {
	const product = await prisma.product.findUnique({
		where: {
			slug: slug,
		},
		include: {
			images: true,
			tags: true,
		},
	});

	if (!product) {
		return {
			product: null,
			relatedProducts: null,
		};
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

	return response;
};
