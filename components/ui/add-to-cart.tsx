"use client";

import { Button } from "@/components/ui/button";
import { eventBus } from "@/lib/event-bus";
import { ProductResponse } from "@/types";
import { Plus, ShoppingCart } from "lucide-react";

const AddToCart = ({ product }: { product: ProductResponse }) => {
	return (
		<Button
			size={"lg"}
			className="bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg w-full md:h-12 lg:h-16 lg:mt-20 md:mt-16 mt-8"
			onClick={() => eventBus.emit("cart:addProduct", product)}
		>
			<Plus />
			<ShoppingCart className="mr-4" />
			Add to cart
		</Button>
	);
};

export default AddToCart;
