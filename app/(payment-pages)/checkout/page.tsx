"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { NewOrder } from "@/app/api/checkout/route";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/features/cart";
import { SignIn, useUser } from "@clerk/nextjs";
import axios from "axios";
import { ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
	firstName: z.string().nonempty({
		message: "Please enter your first name.",
	}),

	lastName: z.string().nonempty({
		message: "Please enter your last name.",
	}),

	country: z.string().nonempty({
		message: "Please select a country.",
	}),

	address: z.string().nonempty({
		message: "Please enter your address.",
	}),

	apartment: z
		.string()
		.nonempty({
			message: "Please enter your apartment/ street number.",
		})
		.optional(),

	city: z.string().nonempty({
		message: "Please enter your city.",
	}),

	state: z.string().nonempty({
		message: "Please enter your state.",
	}),
});

export type UserDetail = z.infer<typeof formSchema>;

export default function CheckoutPage() {
	const [cartItems, setCartItems] = useState<CartItem[]>([]);
	const [paymentLoading, setPaymentLoading] = useState(false);
	const router = useRouter();

	const { isSignedIn, isLoaded, user } = useUser();

	useEffect(() => {
		const cartItems = localStorage.getItem("cartItems");
		if (cartItems) {
			try {
				setCartItems(JSON.parse(cartItems));
			} catch (error) {
				localStorage.removeItem("cartItems");
			}
		}
	}, []);

	const handleProductQuantityChange = (
		productId: string,
		type: "increment" | "decrement"
	) => {
		const cartItems = localStorage.getItem("cartItems");

		if (cartItems) {
			try {
				const parsedCartItems = JSON.parse(cartItems);
				const existingProduct = parsedCartItems.find(
					(item: CartItem) => item.product.id === productId
				);

				if (existingProduct) {
					if (type === "increment") {
						existingProduct.quantity += 1;
					} else {
						if (existingProduct.quantity === 1) {
							parsedCartItems.splice(
								parsedCartItems.indexOf(existingProduct),
								1
							);
						} else {
							existingProduct.quantity -= 1;
						}
					}
				}

				localStorage.setItem("cartItems", JSON.stringify(parsedCartItems));
				setCartItems(parsedCartItems);
			} catch (error) {
				localStorage.removeItem("cartItems");
			}
		}
	};

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		const cartDetails = cartItems.map((item) => ({
			productId: item.product.id,
			quantity: item.quantity,
		}));

		const payload: NewOrder = {
			cartDetails,
			// @ts-ignore
			userDetails: values,
		};

		console.log(payload);

		const { data } = await axios.post("/api/checkout", payload);

		console.log(data);

		router.push(`/checkout/${data.orderId}`);

		return;

		// const options = {
		// 	name: data.name,
		// 	currency: data.currency,
		// 	amount: data.amount,
		// 	order_id: data.id,
		// 	description: data.amountDesc,
		// 	handler: function (response: any) {
		// 		console.log(response);
		// 	},
		// 	prefill: {
		// 		name: values.firstName + " " + values.lastName,
		// 		email: user?.emailAddresses[0].emailAddress,
		// 	},
		// };

		// //@ts-ignore
		// const paymentObject = new window.Razorpay(options);

		// paymentObject.open();

		// paymentObject.on("payment.success", function (...args: any[]) {
		// 	console.log(args);

		// 	console.log("Payment success");
		// });

		// paymentObject.on("payment.failed", function () {
		// 	alert("Payment failed. Please try again. Contact support for help");
		// });
	}

	if (!isLoaded) {
		return (
			<div className="flex items-center justify-center h-80 w-full">
				<Loader2 className="animate-spin" size={80} />
			</div>
		);
	}

	if (!isSignedIn) {
		return <SignIn afterSignInUrl={"/checkout"} />;
	}

	return (
		<div className="flex items-center justify-start">
			<div className="flex mx-auto flex-col lg:flex-row items-center lg:items-start justify-center gap-8 py-8 px-4">
				<div className="flex w-full h-full flex-col items-start justify-start gap-4">
					<h2 className="text-3xl mb-6">Your Order</h2>
					{cartItems.map((item) => (
						<div
							key={item.product.id}
							className="flex items-center justify-between mb-4"
						>
							<div className="flex w-full items-center justify-start gap-4">
								<Image
									src={item.product.images[0].url}
									alt={item.product.title}
									className="w-16 h-16 object-cover rounded-lg"
									width={128}
									height={128}
								/>
								<div className="flex flex-col items-start justify-start">
									<span className="text-neutral-300">{item.product.title}</span>
									<div className="flex flex-row items-center gap-4 mt-2">
										<Button
											onClick={() =>
												handleProductQuantityChange(
													item.product.id,
													"decrement"
												)
											}
											variant="outline"
											size={"sm"}
										>
											-
										</Button>
										<span className="text-neutral-300">{item.quantity}</span>
										<Button
											disabled={item.quantity >= 3}
											onClick={() =>
												handleProductQuantityChange(
													item.product.id,
													"increment"
												)
											}
											variant="outline"
											size={"sm"}
										>
											+
										</Button>
									</div>
								</div>
							</div>
							<div className="flex flex-col items-end">
								<span className="font-semibold text-white text-right">
									${item.quantity * item.product.price}
								</span>
								<span className="text-sm text-neutral-500 w-16 text-right">
									{`$${item.quantity} x ${item.product.price}`}
								</span>
							</div>
						</div>
					))}
				</div>

				<Separator orientation="horizontal" className="w-full lg:hidden" />

				<Separator
					orientation="vertical"
					className="h-[90vh] hidden lg:block"
				/>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="gap-x-2 w-full gap-y-4 grid grid-cols-2"
					>
						<h2 className="text-3xl col-span-2">Shipping Details</h2>

						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>First Name</FormLabel>
									<FormControl>
										<Input placeholder="John" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Last Name</FormLabel>
									<FormControl>
										<Input placeholder="Doe" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="country"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Country</FormLabel>
									<FormControl>
										<Input placeholder="United States" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="address"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input placeholder="123 Main St." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="apartment"
							render={({ field }) => (
								<FormItem className="col-span-2">
									<FormLabel>Apartment, suite, etc.</FormLabel>
									<FormControl>
										<Input placeholder="Apartment or suite" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="city"
							render={({ field }) => (
								<FormItem>
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="San Francisco" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="state"
							render={({ field }) => (
								<FormItem>
									<FormLabel>State</FormLabel>
									<FormControl>
										<Input placeholder="California" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<span></span>
						<Button
							className="h-16 group bg-blue-600 hover:bg-blue-700 text-white text-lg w-full"
							variant={"default"}
							type="submit"
						>
							Continue{" "}
							<ArrowRight className="ml-2 group-hover:translate-x-2 transition-all" />
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
