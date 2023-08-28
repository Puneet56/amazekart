"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";

const formSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email.",
	}),

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

export default function CheckoutPage() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}

	return (
		<div className="flex flex-row items-start justify-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="gap-x-2 gap-y-4 grid grid-cols-2"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder="you@example.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

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
	);
}
