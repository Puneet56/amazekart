import ProductCard from "@/features/product-card";

type Product = {
	slug: string;
	title: string;
	description: string;
	price: number;
	images: string[];
	tags: string[];
};

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
	const result = await fetch(
		`http://localhost:3000/api/products/${params.slug}`
	);

	const product = await result.json();

	console.log(product);

	return (
		<div>
			<ProductCard {...product} />
		</div>
	);
};

export default ProductDetails;
