import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/features/product-card";
import Image from "next/image";
import AddToCart from "../../../../components/ui/add-to-cart";

export type Product = {
	slug: string;
	title: string;
	description: string;
	price: number;
	images: string[];
	tags: string[];
};

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
	const result = await fetch(
		`http://localhost:3000/api/product/${params.slug}`
	);

	const {
		product,
		otherProducts,
	}: {
		product: Product;
		otherProducts: Product[];
	} = await result.json();

	return (
		<div className="w-full pb-64">
			<Card className="w-full flex flex-col items-center justify-start xl:grid grid-cols-5 pb-2 gap-4">
				<CardContent className="p-4 col-span-3">
					<Image
						className="xl:max-h-[700px] max-h-[600px] aspect-[5_/_3] object-cover"
						src={product.images[0]}
						alt={params.slug}
						width={1000}
						height={1000}
					/>
				</CardContent>
				<CardContent className="p-4 col-span-2 w-10/12">
					<h1 className="lg:text-6xl md:pt-8 md:text-5xl text-3xl ">
						{product.title}
					</h1>
					<Button
						size={"lg"}
						className="bg-blue-600 hover:bg-blue-600 rounded-full text-white text-lg px-12 mt-8"
					>
						${product.price} USD
					</Button>

					<Separator className="my-8" />

					<p className="text-lg">{product.description}</p>

					<AddToCart />
				</CardContent>
			</Card>

			<h2 className="lg:text-4xl pt-8 md:pb-3 md:text-2xl md:font-semibold">
				Similar
			</h2>

			<div className="flex items-center justify-start gap-6 overflow-x-auto w-full h-96 transition-transform">
				{otherProducts.map((product, i) => (
					<ProductCard {...product} key={i} />
				))}
			</div>
		</div>
	);
};

export default ProductDetails;
