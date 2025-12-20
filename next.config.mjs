/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  eslint: {
    // Disable ESLint during production builds
    ignoreDuringBuilds: true,
  },
    // Force dynamic rendering for all pages
  experimental: {
    dynamicIO: true,
  },
  output: 'standalone',
};

export default nextConfig;
