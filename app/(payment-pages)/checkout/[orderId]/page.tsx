"use client";
import { SignIn, useUser } from "@clerk/nextjs";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const OrderDetails = ({ params }: { params: { orderId: string } }) => {
	const { isLoaded, isSignedIn, user } = useUser();
	const pathname = usePathname();

	useEffect(() => {
		if (!params.orderId) return;
		if (!isSignedIn) return;

		console.log("MAKING REQUEST");

		const fetchOrder = async () => {
			try {
				const { data } = await axios.get(`/api/orders/${params.orderId}`);
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchOrder();
	}, [params.orderId, isSignedIn]);

	if (!isLoaded) {
		return <div>Loading...</div>;
	}

	if (!isSignedIn) {
		return <SignIn afterSignInUrl={pathname} />;
	}

	return <div>{}</div>;
};

export default OrderDetails;
