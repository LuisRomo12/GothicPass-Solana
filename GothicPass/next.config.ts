import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude all Solana Kit packages + Anchor from server-side bundling.
  // The new @solana/* kit uses ESM-only modules with native .node binaries
  // that webpack cannot resolve during the SSR/server build phase.
  serverExternalPackages: [
    "ws",
    "@coral-xyz/anchor",
    "@solana/web3.js",
    "@solana/client",
    "@solana/react-hooks",
    "@solana/sysvars",
    "@solana/rpc",
    "@solana/rpc-api",
    "@solana/rpc-subscriptions",
    "@solana/transactions",
    "@solana/addresses",
    "@solana/keys",
    "@solana/signers",
    "@solana/codecs",
  ],
  // Webpack: stub out Node.js built-ins for the browser bundle
  // (used by @coral-xyz/anchor and @solana/web3.js v1)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
        http: false,
        https: false,
        zlib: false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;

