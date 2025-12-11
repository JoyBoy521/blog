import type { NextConfig } from 'next';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig: NextConfig = {
  output: "standalone",
  // 此处留空，不再需要 'experimental.appDir: true'
  // 因为您的项目结构 (src/app) 已经表明您正在使用 App Router，它已默认启用。
  experimental: {
    // 移除 appDir: true，避免警告。
    // 如果没有其他实验性配置，此 experimental 块可以完全移除。
  },

  // 示例：如果您的项目使用 Tailwind CSS 和 SWC 编译器
  // 您通常不需要在这里添加任何配置，Next.js 默认配置已足够。
  // compiler: {
  //   styledComponents: true, // 示例：如果使用 Styled Components
  // },

  // 示例：如果需要配置图片外部域名
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'example.com',
  //     },
  //   ],
  // },
};

export default nextConfig;