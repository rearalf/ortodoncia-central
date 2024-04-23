/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		disableStaticImages: true,
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'firebasestorage.googleapis.com',
				port: '',
				pathname: '/v0/b/ortodoncia-central.appspot.com/**',
			},
		],
	},
}

export default nextConfig
