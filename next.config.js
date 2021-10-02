module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/wpapi/:slug*',
				destination: `https://acf.apph3.com/:slug*`,
			},
		]
	}
}
