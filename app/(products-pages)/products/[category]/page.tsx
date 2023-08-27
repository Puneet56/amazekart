import ProductCard from "@/features/product-card";
import { ProductResponse } from "@/types";

type Product = {
	slug: string;
	title: string;
	description: string;
	price: number;
	images: string[];
	tags: string[];
};

const ProductDetails = async ({
	params,
}: {
	params: { category: string; sort: string };
}) => {
	const result = await fetch(
		`http://localhost:3000/api/products/${params.category}`
	);

	const product: ProductResponse[] = await result.json();

	return (
		<>
			<div className="flex items-center mx-auto mt-8 justify-center gap-6 flex-wrap transition-transform">
				{product.map((product: ProductResponse) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>
		</>
	);
};

export default ProductDetails;
