"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./cart";

const Navbar = () => {
	const { isSignedIn } = useUser();

	const pathname = usePathname();

	return (
		<nav className="flex items-center justify-between h-16 px-8">
			{" "}
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
			<div className="flex gap-4 items-center justify-center">
				<Button
					asChild
					variant="link"
					className="text-primary/50 font-light hover:text-primary"
				>
					<Link href="/orders">Your orders</Link>
				</Button>

				{isSignedIn ? (
					<UserButton
						afterSignOutUrl={pathname === "/checkout" ? "/" : pathname}
					/>
				) : (
					<Button asChild variant="ghost">
						<SignInButton afterSignInUrl={pathname} afterSignUpUrl={pathname}>
							Sign In
						</SignInButton>
					</Button>
				)}
				<Cart />
			</div>
		</nav>
	);
};

export default Navbar;
