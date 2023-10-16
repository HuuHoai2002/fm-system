/** @type {import('next').NextConfig} */
const path = require("path");

const isProduction = process.env.MODE === "production";

const API_URL = isProduction
  ? process.env.NEXT_PUBLIC_PROD_API_URL
  : process.env.NEXT_PUBLIC_DEV_API_URL;

const nextConfig = {
  rewrites: async () => [
    {
      source: "/api/:path*",
      destination: `${API_URL}/:path*`,
    },
  ],
  reactStrictMode: false,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "./"),
    };

    return config;
  },
};

module.exports = nextConfig;
