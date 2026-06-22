import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/conference",
        destination: "https://conference.tum-blockchain.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
