import { data } from "@/database/data";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json(data);
}

export async function POST(request: Request) {
	return NextResponse.json(data);
}
