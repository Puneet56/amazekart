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
import { useState } from "react";
import Categories from "./categories";
import ProductsSort from "./products-sort";

const Filters = () => {
	const [filtersOpen, setFiltersOpen] = useState(false);

	return (
		<>
			<Sheet open={filtersOpen} onOpenChange={(open) => setFiltersOpen(open)}>
				<SheetTrigger asChild>
					<Button variant={"outline"} className="group shadow-md">
						Filters
					</Button>
				</SheetTrigger>
				<SheetContent>
					<SheetHeader>
						<SheetTitle>Filter Products</SheetTitle>
					</SheetHeader>

					<div className="flex flex-col gap-8 mt-12">
						<Categories />
						<ProductsSort />
					</div>

					<SheetFooter></SheetFooter>
				</SheetContent>
			</Sheet>
		</>
	);
};

export default Filters;
