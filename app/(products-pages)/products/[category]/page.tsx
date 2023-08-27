import ProductCard from "@/features/product-card";
import { ProductResponse } from "@/types";
import { getProductByCategory } from "../../actions";

const ProductDetails = async ({
	params,
}: {
	params: { category: string; sort: string };
}) => {
	const product: ProductResponse[] = await getProductByCategory(
		params.category
	);

	if (!product) throw new Error("Product not found");

	if (product.length === 0) throw new Error("Product not found");

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
