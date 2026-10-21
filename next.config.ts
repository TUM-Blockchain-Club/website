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
      {
        source: "/info-event",
        destination: "/membership",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
