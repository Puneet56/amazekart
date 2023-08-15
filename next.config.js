/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "demo.vercel.store",
			},
			{
				protocol: "https",
				hostname: "burst.shopifycdn.com",
			},
		],
	},
};

module.exports = nextConfig;
