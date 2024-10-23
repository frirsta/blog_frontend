/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/ddms7cvqu/image/upload/v1/blog_media/**",
      },
      {
        protocol: "http",
        hostname: "res.cloudinary.com",
        pathname: "/ddms7cvqu/image/upload/v1/blog_media/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/profiles/reset/:uidb64/:token/",
        destination: "/profiles/reset-password",
      },
      {
        source: "/profiles/password-reset-confirm/:uid/:token/",
        destination: "/profiles/reset-password-confirm",
      },
    ];
  },
};

export default nextConfig;
