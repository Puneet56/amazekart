import { prisma } from "@/database/db";
import { NextResponse } from "next/server";

export async function GET(
	request: Request,
	{ params }: { params: { orderId: string } }
) {
	const orderId = params.orderId; // 'a', 'b', or 'c'

	console.log(orderId);

	const order = await prisma.order.findUnique({
		where: {
			id: orderId,
		},
		include: {
			orderItems: {
				include: {
					product: true,
				},
			},
		},
	});

	console.log(order);

	return NextResponse.json(order);
}
