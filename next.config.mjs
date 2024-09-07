/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "s3.coinmarketcap.com",
      "www.circle.com",
      "assets-cdn.trustwallet.com",
    ],
  },
};

export default nextConfig;
