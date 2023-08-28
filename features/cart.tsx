"use client";

import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { eventBus } from "@/lib/event-bus";
import { ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

const Cart = () => {
	const [cartOpen, setCartOpen] = useState(false);

	useEffect(() => {
		eventBus.subscribe("cart:open", () => setCartOpen(true));

		return () => {
			eventBus.unsubscribe("cart:open");
		};
	}, []);

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
					<SheetFooter>
						{/* <SheetClose asChild>
						<Button variant={"outline"} className="w-8 h-8">
								<X size={30} />
							</Button>
						</SheetClose> */}
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Cart;
