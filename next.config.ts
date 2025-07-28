import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['image.tmdb.org','images.pexels.com','api.themoviedb.org'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
};

module.exports = nextConfig;
