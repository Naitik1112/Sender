/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: true, // Ensures compatibility with Turbopack
  },
};

module.exports = withPWA(nextConfig);
