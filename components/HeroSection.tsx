"use client";

import { useState } from "react";

import {
	ArrowLeftCircleIcon,
	ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

const HeroSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	return (
		<div className="w-full h-[50vh] bg-gray-500 relative justify-center overflow-hidden">
			<button
				onClick={() => {
					setCurrentSlide((prev) => prev - 1);
				}}
				className="absolute hover:bg-black/25 p-4 left-0 top-0 bottom-0 z-10 w-20 h-full"
			>
				<ArrowLeftCircleIcon />
			</button>

			<button
				onClick={() => setCurrentSlide((prev) => prev + 1)}
				className="absolute right-0 top-0 bottom-0 hover:bg-black/25 p-4 z-10 w-20 h-full"
			>
				<ArrowRightCircleIcon />
			</button>

			<div
				className="flex transition transform ease-out duration-500 h-full snap-x snap-mandatory"
				style={{
					transform: `translateX(-${currentSlide * 100}%)`,
				}}
			>
				{[...new Array(10)].map((_, i) => (
					<div
						key={i}
						className="min-w-full snap-center snap-always h-full bg-white shadow-md flex items-center justify-center"
					>
						<h1 className="text-4xl font-bold">Slide {i + 1}</h1>
					</div>
				))}
			</div>
		</div>
	);
};

export default HeroSection;
