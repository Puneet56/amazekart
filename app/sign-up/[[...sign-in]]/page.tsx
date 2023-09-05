import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";

export default function Page() {
	const router = useRouter();

	return (
		<div className="flex justify-center pt-12">
			<SignUp />
		</div>
	);
}
