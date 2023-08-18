/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["crests.football-data.org", "upload.wikimedia.org", "assets-cdn.trustwallet.com", "tokens.pancakeswap.finance"],
		// remotePatterns: [
		// 	{
		// 		protocol: "https",
		// 		hostname: "*",
		// 	},
		// ],
	},
};

module.exports = nextConfig;
