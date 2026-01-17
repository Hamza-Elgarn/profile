/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // يتجاهل أخطاء الـ Typescript أثناء عملية الـ Build
    ignoreBuildErrors: true,
  },
  eslint: {
    // يتجاهل أخطاء التنسيق (Linting) أثناء النشر
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;