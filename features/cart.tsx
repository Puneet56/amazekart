"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { eventBus } from "@/lib/event-bus";
import { ProductResponse } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type CartItem = {
	product: ProductResponse;
	quantity: number;
};

const Cart = () => {
	const [cartOpen, setCartOpen] = useState(false);
	const [cartItems, setCartItems] = useState<CartItem[]>([]);

	useEffect(() => {
		const cartItems = localStorage.getItem("cartItems");
		if (cartItems) {
			try {
				setCartItems(JSON.parse(cartItems));
			} catch (error) {
				localStorage.removeItem("cartItems");
			}
		}
	}, []);

	useEffect(() => {
		eventBus.subscribe("cart:addProduct", handleAddProductToCart);

		return () => {
			eventBus.unsubscribe("cart:addProduct");
		};
	}, []);

	const handleAddProductToCart = (product: ProductResponse) => {
		const cartItems = localStorage.getItem("cartItems");

		if (cartItems) {
			try {
				const parsedCartItems = JSON.parse(cartItems);
				const existingProduct = parsedCartItems.find(
					(item: CartItem) => item.product.id === product.id
				);

				if (existingProduct) {
					existingProduct.quantity += 1;
				} else {
					parsedCartItems.push({ product, quantity: 1 });
				}

				localStorage.setItem("cartItems", JSON.stringify(parsedCartItems));
				setCartItems(parsedCartItems);
			} catch (error) {
				localStorage.removeItem("cartItems");
			}
		} else {
			localStorage.setItem(
				"cartItems",
				JSON.stringify([{ product, quantity: 1 }])
			);
			setCartItems([{ product, quantity: 1 }]);
		}

		setCartOpen(true);
	};

	const handleProductQuantityChange = (
		productId: string,
		type: "increment" | "decrement"
	) => {
		const cartItems = localStorage.getItem("cartItems");

		if (cartItems) {
			try {
				const parsedCartItems = JSON.parse(cartItems);
				const existingProduct = parsedCartItems.find(
					(item: CartItem) => item.product.id === productId
				);

				if (existingProduct) {
					if (type === "increment") {
						existingProduct.quantity += 1;
					} else {
						if (existingProduct.quantity === 1) {
							parsedCartItems.splice(
								parsedCartItems.indexOf(existingProduct),
								1
							);
						} else {
							existingProduct.quantity -= 1;
						}
					}
				}

				localStorage.setItem("cartItems", JSON.stringify(parsedCartItems));
				setCartItems(parsedCartItems);
			} catch (error) {
				localStorage.removeItem("cartItems");
			}
		}
	};

	const cartTotal = cartItems.reduce((total, item) => {
		return total + item.quantity * item.product.price;
	}, 0);

	return (
		<>
			<Sheet open={cartOpen} onOpenChange={(open) => setCartOpen(open)}>
				<SheetTrigger asChild>
					<Button variant={"outline"} className="group shadow-md">
						<ShoppingCart
							size={20}
							className="group-hover:scale-110 transition-transform duration-150"
						/>
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>My Cart</SheetTitle>
					</SheetHeader>

					<div className="flex h-full flex-col items-center justify-between">
						<div className="flex h-full flex-col items-start justify-start mt-8 w-full gap-4">
							{cartItems.map((item) => (
								<div className="flex items-center justify-between w-full mb-4">
									<div className="flex w-full items-center justify-start gap-4">
										<Image
											src={item.product.images[0].url}
											alt={item.product.title}
											className="w-16 h-16 object-cover rounded-lg"
											width={64}
											height={64}
										/>
										<div className="flex flex-col items-start justify-start">
											<span className="text-neutral-300">
												{item.product.title}
											</span>
											<div className="flex flex-row items-center gap-4 mt-2">
												<Button
													onClick={() =>
														handleProductQuantityChange(
															item.product.id,
															"decrement"
														)
													}
													variant="outline"
													size={"sm"}
												>
													-
												</Button>
												<span className="text-neutral-300">
													{item.quantity}
												</span>
												<Button
													disabled={item.quantity >= 3}
													onClick={() =>
														handleProductQuantityChange(
															item.product.id,
															"increment"
														)
													}
													variant="outline"
													size={"sm"}
												>
													+
												</Button>
											</div>
										</div>
									</div>
									<div className="flex flex-col items-end">
										<span className="font-semibold text-white text-right">
											${item.quantity * item.product.price}
										</span>
										<span className="text-sm text-neutral-500 w-16 text-right">
											{`$${item.quantity} x ${item.product.price}`}
										</span>
									</div>
								</div>
							))}
						</div>

						<div className="w-full text-sm text-neutral-500 mb-8">
							<div className="mb-3 flex items-center justify-between pb-1 pt-1">
								<span>Shipping</span>
								<span className="text-right text-lg font-semibold text-white">
									Free Shipping
								</span>
							</div>
							<Separator />
							<div className="mb-3 flex items-center justify-between pb-1 pt-1">
								<span>Total</span>

								<span className="text-right text-lg font-semibold text-white">
									${cartTotal}
								</span>
							</div>

							{cartItems.length >= 1 && (
								<Button
									size={"lg"}
									className="bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg w-full mb-4"
								>
									Proceed to checkout
								</Button>
							)}
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Cart;
