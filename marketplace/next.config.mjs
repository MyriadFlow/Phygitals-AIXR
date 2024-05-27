/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    },
    images: {
      domains: ['qcntguqlgvrnctpcvjle.supabase.co'],
    },
  }
  
  export default nextConfig;