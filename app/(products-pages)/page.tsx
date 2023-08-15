import { Card, CardContent } from "@/components/ui/card";
import { NextPageContext } from "next";
import Image from "next/image";

export default function Home({ ...pathname }: NextPageContext) {
	return (
		<main className="grid xl:grid-cols-3 mx-auto pt-12 gap-6 md:grid-cols-2 grid-cols-1">
			<Card className="col-span-2 row-span-2">
				<CardContent>
					<Image
						src="https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Ft-shirt-1.png%3Fv%3D1689798965&w=1920&q=75"
						alt="Picture of the author"
						width={1000}
						height={1000}
					/>
				</CardContent>
			</Card>
			<Card></Card>
		</main>
	);
}
