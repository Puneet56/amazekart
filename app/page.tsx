"use client";

import getStripe from "@/helpers/stripe";

export default function Home() {
	const handleClick = async () => {
		const stripe = await getStripe();
		const { error } = await stripe.redirectToCheckout({
			mode: "payment",
			lineItems: [{ price: "price_1N675XSBFz36UG2C6PzGlfA1", quantity: 1 }],
			successUrl: `${window.location.origin}/success`,
			cancelUrl: `${window.location.origin}/cancel`,
		});
		if (error) {
			console.warn("Error:", error);
		}
	};

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
				<button
					onClick={handleClick}
					className="flex flex-col items-center justify-center bg-green-600 
        px-12 py-4 text-white text-4xl font-semibold border-2 border-white rounded-lg "
				>
					Pay now
				</button>
			</div>
		</main>
	);
}
