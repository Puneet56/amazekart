import AddToCart from "@/components/ui/add-to-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/features/product-card";
import Image from "next/image";
import { getProductBySlug } from "../../actions";

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
	const { product, relatedProducts } = await getProductBySlug(params.slug);

	if (!product) throw new Error("Product not found");

	return (
		<div className="w-full pb-64">
			<Card className="w-full flex flex-col items-center justify-start xl:grid grid-cols-5 pb-2 gap-4">
				<CardContent className="p-4 col-span-3">
					<Image
						className="xl:max-h-[700px] max-h-[600px] aspect-[5_/_3] object-cover"
						src={product.images[0].url}
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

					<AddToCart product={product} />
				</CardContent>
			</Card>

			{relatedProducts && (
				<>
					<h2 className="text-2xl mt-8 mb-2 2xl:col-span-3 md:col-span-2 col-span-1">
						Similar
					</h2>

					<div className="flex items-center justify-center gap-6 flex-wrap w-full h-96 transition-transform">
						{relatedProducts.map((product) => (
							<ProductCard {...product} key={product.id} />
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default ProductDetails;
