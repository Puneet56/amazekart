import { NextPageContext } from "next";

export default function Home({ ...pathname }: NextPageContext) {
	return <main className="grid grid-cols-3 pt-12 gap-6">Hello</main>;
}
