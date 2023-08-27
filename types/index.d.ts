import { Product, ProductImage, ProductTag } from "@prisma/client";

export type ProductResponse = Product & {
	images: ProductImage[];
	tags: ProductTag[];
};

export type HomeProductsResponse = {
	hero: ProductResponse[];
	trending: ProductResponse[];
	newArrival: ProductResponse[];
	bestSellers: ProductResponse[];
};

export type ProductDetailResponse = {
	product: ProductResponse;
	relatedProducts: ProductResponse[];
};
