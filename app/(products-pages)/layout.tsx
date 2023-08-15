import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Cart from "@/features/cart";
import Categories from "@/features/categories";
import Link from "next/link";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
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
							<Link href="/trending">Trending</Link>
						</Button>
					</li>
					<li>
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/new-arrivals">New Arrivals</Link>
						</Button>
					</li>
					<li>
						<Button
							asChild
							variant="link"
							className="text-primary/50 font-light hover:text-primary"
						>
							<Link href="/best-sellers">Best Sellers</Link>
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

				<div className="lg:max-w-7xl max-w-[90vw]">{children}</div>

				<div className="mt-8 ml-8 w-32 xl:mr-12 transition-all duration-300 hidden lg:block">
					<h2 className="text-xs text-primary/50 mb-2">Categories</h2>
					<ul className="flex flex-col gap-3 text-sm font-medium">
						{[...new Array(10)].map((_, i) => (
							<li key={i} className="hover:underline underline-offset-4">
								<Link href="/">Sort 1</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ProductLayout;
