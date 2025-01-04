/** @type {import('next').NextConfig} */
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "node_modules/pdfkit/js/data/"),
              to: path.resolve(__dirname, ".next/server/data/"),
            },
          ],
        })
      );
    }
    return config;
  },
  experimental: {
    appDir: true,
    typedRoutes: true,
  },
  images: {
    unoptimized: true,
    domains: ["*"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "kcsh.by",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
