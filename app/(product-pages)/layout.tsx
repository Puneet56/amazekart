import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Cart from "@/features/cart";
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
			<div className="w-full mx-auto max-w-[90vw] mt-4">{children}</div>
		</div>
	);
};

export default ProductLayout;
