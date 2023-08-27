import ProductCard from "@/features/product-card";
import { HomeProductsResponse } from "@/types";
import { getHomeProducts } from "./actions";

export default async function Home() {
	const products: HomeProductsResponse = await getHomeProducts();

	if (!products) throw new Error("Products not found");

	return (
		<main className="mx-auto">
			<h2 className="text-2xl mt-8 mb-4">Featured</h2>

			<div className="flex items-center justify-start gap-6 flex-wrap w-full transition-transform">
				{products.hero.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>

			<h2 className="text-2xl mt-8 mb-4">New Arrivals</h2>

			<div className="flex items-center justify-start gap-6 flex-wrap w-full transition-transform">
				{products.newArrival.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>

			<h2 className="text-2xl mt-8 mb-4">Trending</h2>

			<div className="flex items-center justify-start gap-6 flex-wrap w-full transition-transform">
				{products.trending.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>

			<h2 className="text-2xl mt-8 mb-4">Best Sellers</h2>

			<div className="flex items-center justify-start gap-6 flex-wrap w-full transition-transform">
				{products.bestSellers.map((product) => (
					<ProductCard {...product} key={product.id} />
				))}
			</div>
		</main>
	);
}
