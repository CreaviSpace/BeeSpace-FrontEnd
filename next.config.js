/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 이미지 도메인
  images: {
    domains: ['assets.codepen.io', 'creavi.s3.ap-northeast-2.amazonaws.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [550, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
