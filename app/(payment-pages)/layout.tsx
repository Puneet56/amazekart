import Navbar from "@/features/navbar";
import Script from "next/script";
import React from "react";

const PaymentLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col">
			<Navbar />
			<Script
				id="razorpay-checkout-js"
				src="https://checkout.razorpay.com/v1/checkout.js"
			/>
			{children}
		</div>
	);
};

export default PaymentLayout;
