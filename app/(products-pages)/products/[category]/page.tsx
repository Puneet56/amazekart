import ProductCard from "@/features/product-card";
import { ProductResponse } from "@/types";
import { getProductByCategory } from "../../actions";

export async function generateStaticParams() {
	const categories = [
		"trending",
		"new-arrivals",
		"best-sellers",
		"apparels",
		"jewellery",
		"home-decor",
	];

	return categories.map((category) => ({
		category,
	}));
}

const ProductDetails = async ({
	params,
}: {
	params: { category: string; sort: string };
}) => {
	const products: ProductResponse[] = await getProductByCategory(
		params.category
	);

	if (!products) throw new Error("Product not found");

	if (products.length === 0) throw new Error("Product not found");

	return (
		<main className="grid 2xl:grid-cols-3 mx-auto pt-12 gap-6 md:grid-cols-2 grid-cols-1">
			{products.map((product: any, i: number) => (
				<ProductCard {...product} key={i} />
			))}
		</main>
	);
};

export default ProductDetails;
