import ProductList from "@/features/product-list";
import { getProducts } from "../actions";

export default async function ProductsPage() {
	const products = await getProducts();

	if (!products) throw new Error("Products not found");

	return (
		<main className="grid xl:grid-cols-3 mx-auto pt-12 gap-6 md:grid-cols-2 grid-cols-1">
			<ProductList products={products} />
		</main>
	);
}
