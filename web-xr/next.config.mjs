/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa'

const nextConfig = {}

// const withPWA = new WithPWA()
const PWA = withPWA({
	dest: 'public',
})

// export default nextConfig

export default PWA({
	nextConfig,
})
