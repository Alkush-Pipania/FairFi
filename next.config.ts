import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    staleTimes:{
      dynamic: 0,
    },
  }
};

export default nextConfig;
