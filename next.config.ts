import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [process.env.NEXT_PUBLIC_DEV_NETWORK || ""], // 개발 네트워크 허용 --- IGNORE ---
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "archive-prod-bucket.s3.ap-northeast-2.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
