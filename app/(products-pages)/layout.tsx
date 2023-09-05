import { Separator } from "@/components/ui/separator";
import Categories from "@/features/categories";
import Filters from "@/features/filters";
import Navbar from "@/features/navbar";
import ProductsSort from "@/features/products-sort";
import React, { Suspense } from "react";

const ProductsLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<Navbar />
			<Separator />
			<div className="flex flex-col items-center lg:flex-row lg:items-start justify-center">
				<div className="mt-8 mr-8 w-32 xl:mr-12 transition-all duration-300 text-right hidden lg:block">
					<Suspense fallback={<div>Loading...</div>}>
						<Categories />
					</Suspense>
				</div>

				<div className="lg:max-w-7xl max-w-[90vw] mx-auto flex flex-col items-center justify-start">
					<div className="w-full flex items-center justify-end mt-4 lg:hidden">
						<Filters />
					</div>
					{children}
				</div>

				<div className="mt-8 ml-8 w-32 xl:mr-12 transition-all duration-300 hidden lg:block">
					<Suspense fallback={<div>Loading...</div>}>
						<ProductsSort />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default ProductsLayout;
