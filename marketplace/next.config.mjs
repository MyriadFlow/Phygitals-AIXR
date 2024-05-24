/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    webpack: config => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding')
      return config
    }
  }
  
  export default nextConfig;