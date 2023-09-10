import { prisma } from "@/database/db";
import { getAuth } from "@clerk/nextjs/server";
import { AddressDetails } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export type NewOrder = {
	cartDetails: {
		productId: string;
		quantity: number;
	}[];
	userDetails: AddressDetails;
};

export async function POST(request: NextRequest) {
	const { cartDetails, userDetails }: NewOrder = await request.json();
	const { userId } = getAuth(request);

	if (!userId) {
		return NextResponse.json(
			{
				message: "You need to be logged in to place an order",
			},
			{ status: 401 }
		);
	}

	const order = await prisma.order.create({
		data: {
			userId,
			address: {
				create: userDetails,
			},
			orderItems: {
				create: cartDetails.map((item) => ({
					quantity: item.quantity,
					product: {
						connect: {
							id: item.productId,
						},
					},
				})),
			},
		},
	});

	return NextResponse.json({
		message: "Order placed successfully",
		orderId: order.id,
	});

	// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
	// 	return NextResponse.json(
	// 		{
	// 			error:
	// 				"Sorry we cannot accept payments right now. Please try again later",
	// 		},
	// 		{ status: 500 }
	// 	);
	// }

	// let instance = new Razorpay({
	// 	key_id: process.env.RAZORPAY_KEY_ID,
	// 	key_secret: process.env.RAZORPAY_KEY_SECRET,
	// });

	// return new Promise((resolve, reject) => {
	// 	instance.orders.create(
	// 		{
	// 			amount: orderAmount * 1000 * 100,
	// 			currency: "INR",
	// 			receipt: Math.random().toString(36).substring(7),
	// 		},
	// 		(err, order) => {
	// 			if (err) {
	// 				return reject(err);
	// 			}

	// 			return resolve(NextResponse.json(order));
	// 		}
	// 	);
	// });
}
