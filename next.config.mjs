/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frirsta-blog-53010ec1265c.herokuapp.com",
        pathname: "/media/posts/**",
      },
    ],
  },
};

export default nextConfig;
