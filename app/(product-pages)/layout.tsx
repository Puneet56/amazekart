import { Separator } from "@/components/ui/separator";
import Navbar from "@/features/navbar";
import React from "react";

const ProductLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			<Separator />
			<div className="w-full mx-auto max-w-[90vw] mt-4">{children}</div>
		</div>
	);
};

export default ProductLayout;
