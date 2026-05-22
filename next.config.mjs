/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: "/artists", destination: "/magazine", permanent: true },
      { source: "/explore", destination: "/gallery", permanent: true },
    ]
  },
}

export default nextConfig
