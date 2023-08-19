import { data } from "@/database/data";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { slug: string } }
) {
	console.log({ params });

	const product = data.find((product) => product.slug === params.slug);

	if (product) {
		return NextResponse.json(product);
	}

	return NextResponse.json({
		slug: "ocean-blue-shirt",
		title: "Ocean Blue Shirt",
		description:
			"Ocean blue cotton shirt with a narrow collar and buttons down the front and long sleeves. Comfortable fit and tiled kalidoscope patterns.",
		price: 50,
		images: [
			"https://burst.shopifycdn.com/photos/young-man-in-bright-fashion_925x.jpg",
		],
		tags: ["men"],
	});
}
