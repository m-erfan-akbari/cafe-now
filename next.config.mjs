/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    outputFileTracingIncludes: {
      "/order": ["./data/*"],
    },
    outputFileTracingRoot: path.join(__dirname, "./data/db.json"),
  },
};

export default nextConfig;
