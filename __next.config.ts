import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["example.com"],
  },
  reactStrictMode: true,
};
module.exports = nextConfig;
export default nextConfig;
