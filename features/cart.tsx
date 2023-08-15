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
import { ShoppingCart } from "lucide-react";

const Cart = () => {
	return (
		<>
			<Sheet>
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
