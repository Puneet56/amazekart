import { data } from "@/database/data";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	console.log({ params });

	const product = data.find((product) => product.slug === params.slug);

	const otherProducts = data.reduce((acc, product) => {
		if (Math.random() > 0.5) {
			// @ts-ignore
			acc.push(product);
			return acc;
		}
		return acc;
	}, []);

	const response = {
		product,
		otherProducts,
	};

	if (product) {
		return NextResponse.json(response);
	}

	return NextResponse.json({
		product: {
			slug: "ocean-blue-shirt",
			title: "Ocean Blue Shirt",
			description:
				"Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.",
			price: 50,
			images: [
				"https://burst.shopifycdn.com/photos/young-man-in-bright-fashion_925x.jpg",
			],
			tags: ["men"],
		},
		otherProducts,
	});
}
