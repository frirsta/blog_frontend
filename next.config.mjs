/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/ddms7cvqu/image/upload/v1/blog_media/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ddms7cvqu/image/upload/v1/blog_media/**",
      },
    ],
  },
};

export default nextConfig;
