import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { NextPageContext } from "next";
import Image from "next/image";

export default function ProductsPage({ ...pathname }: NextPageContext) {
	return (
		<main className="grid xl:grid-cols-3 mx-auto pt-12 gap-6 md:grid-cols-2 grid-cols-1">
			{[...new Array(25)].map((_, i) => (
				<Card
					key={i}
					className="aspect-square max-w-sm hover:border-blue-700 group transition-all duration-300 cursor-pointer"
				>
					<CardContent className="flex items-center justify-center w-full overflow-hidden">
						<Image
							className="group-hover:scale-110 transition-transform duration-300"
							src={
								"https://demo.vercel.store/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0754%2F3727%2F7491%2Ffiles%2Fshoes-1.png%3Fv%3D1690004109&w=384&q=75"
							}
							alt="Product"
							sizes="100%"
							height={500}
							width={500}
						/>
					</CardContent>
					<CardFooter>
						<div className="border rounded-full gap-4 pl-4 pr-2 py-2 flex items-center">
							<h3 className="font-semibold text-xs">Awesome Product</h3>
							<Button className="bg-blue-600 hover:bg-blue-700 rounded-full text-white">
								Add to cart
							</Button>
						</div>
					</CardFooter>
				</Card>
			))}
		</main>
	);
}
