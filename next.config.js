/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 이미지 도메인
  images: {
    domains: ['assets.codepen.io'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
