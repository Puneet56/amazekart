import ProductCard from "@/features/product-card";
import { HomeProductsResponse } from "@/types";
import { getHomeProducts } from "./actions";

export default async function Home() {
	const products: HomeProductsResponse = await getHomeProducts();

	if (!products) throw new Error("Products not found");

	return (
		<main className="mx-auto">
			<div className="grid 2xl:grid-cols-3 mx-auto gap-6 md:grid-cols-2 grid-cols-1">
				<h2 className="text-2xl mt-8 2xl:col-span-3 md:col-span-2 col-span-1">
					Featured
				</h2>

				{products.hero.map((product: any, i: number) => (
					<ProductCard {...product} key={i} />
				))}
			</div>

			<div className="grid 2xl:grid-cols-3 mx-auto gap-6 md:grid-cols-2 grid-cols-1">
				<h2 className="text-2xl mt-8 2xl:col-span-3 md:col-span-2 col-span-1">
					New Arrivals
				</h2>

				{products.newArrival.map((product: any, i: number) => (
					<ProductCard {...product} key={i} />
				))}
			</div>

			<div className="grid 2xl:grid-cols-3 mx-auto gap-6 md:grid-cols-2 grid-cols-1">
				<h2 className="text-2xl mt-8 2xl:col-span-3 md:col-span-2 col-span-1">
					Trending
				</h2>

				{products.trending.map((product: any, i: number) => (
					<ProductCard {...product} key={i} />
				))}
			</div>

			<div className="grid 2xl:grid-cols-3 mx-auto gap-6 md:grid-cols-2 grid-cols-1">
				<h2 className="text-2xl mt-8 2xl:col-span-3 md:col-span-2 col-span-1">
					Best Sellers
				</h2>

				{products.bestSellers.map((product: any, i: number) => (
					<ProductCard {...product} key={i} />
				))}
			</div>
		</main>
	);
}
