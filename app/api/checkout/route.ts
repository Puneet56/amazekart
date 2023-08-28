import { UserDetail } from "@/app/(payment-pages)/checkout/page";
import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const instance = new Razorpay({
	key_id: "rzp_test_6esOy2WhcgNMu8",
	key_secret: "ishkrf7tm99D07Y59A4dHIQP",
});

export type OrderItem = {
	productId: string;
	quantity: number;
};

export type Order = {
	cartDetails: OrderItem[];
	userDetails: UserDetail;
};

export async function POST(request: NextRequest) {
	const { cartDetails, userDetails }: Order = await request.json();

	const cartProducts = await prisma.product.findMany({
		where: {
			id: {
				in: cartDetails.map((item) => item.productId),
			},
		},
	});

	console.log(cartProducts, cartDetails);

	const orderAmount = cartProducts.reduce((acc, product) => {
		const cartItem = cartDetails.find((item) => item.productId === product.id);
		if (!cartItem) {
			return acc;
		}
		return acc + product.price * cartItem.quantity;
	}, 0);

	return new Promise((resolve, reject) => {
		instance.orders.create(
			{
				amount: orderAmount,
				currency: "USD",
				receipt: "receipt#1",
			},
			(err, order) => {
				if (err) {
					return reject(err);
				}

				return resolve(NextResponse.json(order));
			}
		);
	});
}
