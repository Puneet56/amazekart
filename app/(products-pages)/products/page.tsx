import ProductCard from "@/features/product-card";

export type Product = {
	slug: string;
	title: string;
	description: string;
	price: number;
	images: string[];
	tags: string[];
};

export default async function ProductsPage() {
	const result = await fetch("http://localhost:3000/api/products");
	const products: Product[] = await result.json();

	return (
		<main className="grid xl:grid-cols-3 mx-auto pt-12 gap-6 md:grid-cols-2 grid-cols-1">
			{products.map((product, i) => (
				<ProductCard {...product} key={i} />
			))}
		</main>
	);
}
