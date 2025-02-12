import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  react: {
    // 高亮 hydration 不匹配的节点
    hydrateHooksWithWarning: true,
  },
};

export default nextConfig;
