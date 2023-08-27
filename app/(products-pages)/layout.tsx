import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Cart from "@/features/cart";
import Categories from "@/features/categories";
import ProductsSort from "@/features/products-sort";
import Link from "next/link";
import React from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<nav className="flex items-center justify-between h-16 px-8">
				<ul className="flex items-center gap-2">
					<li>
						<Button asChild variant="ghost">
							<Link href="/">AmazeKart</Link>
						</Button>
					</li>

					<li>
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/products">All</Link>
						</Button>
					</li>

					<li className="hidden lg:inline-block">
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/products/trending">Trending</Link>
						</Button>
					</li>

					<li className="hidden lg:inline-block">
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/products/new-arrivals">New Arrivals</Link>
						</Button>
					</li>

					<li className="hidden lg:inline-block">
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/products/best-sellers">Best Sellers</Link>
						</Button>
					</li>
				</ul>
				<Cart />
			</nav>
			<Separator />
			<div className="flex flex-row items-start justify-center">
				<div className="mt-8 mr-8 w-32 xl:mr-12 transition-all duration-300 text-right hidden lg:block">
					<Categories />
				</div>

				<div className="lg:max-w-7xl max-w-[90vw] flex flex-col items-center justify-start">
					{/* only visible on screen sizes below lg  */}
					<div className="lg:hidden block w-full">
						<Categories />
					</div>

					{/* only visible on screen sizes below lg  */}
					<div className="lg:hidden block w-full">
						<ProductsSort />
					</div>

					{children}
				</div>

				<div className="mt-8 ml-8 w-32 xl:mr-12 transition-all duration-300 hidden lg:block">
					<ProductsSort />
				</div>
			</div>
		</div>
	);
};

export default ProductsLayout;
