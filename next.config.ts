import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/dvcaskrss/**', // Cho phép các tệp trong thư mục này trên Cloudinary
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**', // Cho phép tất cả đường dẫn từ Googleusercontent
      },
    ],
  },
};

export default nextConfig;
