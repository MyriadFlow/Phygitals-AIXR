/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  images: {
    domains: ["qcntguqlgvrnctpcvjle.supabase.co"],
  },
};

export default nextConfig;
