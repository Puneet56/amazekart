import { prisma } from "@/database/db";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export type OrderItem = {
	productId: string;
	quantity: number;
};

export type Order = OrderItem[];

export async function POST(request: NextRequest) {
	const cartDetails: Order = await request.json();

	const cartProducts = await prisma.product.findMany({
		where: {
			id: {
				in: cartDetails.map((item) => item.productId),
			},
		},
	});

	const orderAmount = cartProducts.reduce((acc, product) => {
		const cartItem = cartDetails.find((item) => item.productId === product.id);
		if (!cartItem) {
			return acc;
		}
		return acc + product.price * cartItem.quantity;
	}, 0);

	if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
		return NextResponse.json(
			{
				error:
					"Sorry we cannot accept payments right now. Please try again later",
			},
			{ status: 500 }
		);
	}

	let instance = new Razorpay({
		key_id: process.env.RAZORPAY_KEY_ID,
		key_secret: process.env.RAZORPAY_KEY_SECRET,
	});

	return new Promise((resolve, reject) => {
		instance.orders.create(
			{
				amount: orderAmount * 1000 * 100,
				currency: "INR",
				receipt: Math.random().toString(36).substring(7),
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
