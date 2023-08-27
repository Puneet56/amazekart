import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ProductResponse } from "@/types";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ images, price, slug, title }: ProductResponse) => {
	return (
		<Link className="max-h-full" href={`/product/${slug}`}>
			<Card className="max-w-sm w-96 h-[22rem] hover:border-blue-700 group transition-all duration-300 cursor-pointer overflow-hidden">
				<CardContent className="p-0 h-60 flex items-center justify-center overflow-hidden">
					<Image
						className="group-hover:scale-105 transition-transform duration-300"
						src={images[0].url}
						alt="Product"
						height={250}
						width={360}
					/>
				</CardContent>
				<CardFooter className="pt-6 flex items-center">
					<div className="border rounded-full gap-4 pl-4 pr-2 py-2 flex items-center">
						<h3 className="font-semibold text-xs">{title}</h3>
						<Button className="bg-blue-600 hover:bg-blue-700 rounded-full text-white w-24">
							${price}
						</Button>
					</div>
				</CardFooter>
			</Card>
		</Link>
	);
};

export default ProductCard;
