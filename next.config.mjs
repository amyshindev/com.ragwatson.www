/** @type {import('next').NextConfig} */
const backendUrl =
  process.env.BACKEND_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000"

const nextConfig = {
  devIndicators: false,
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
      { source: "/library", destination: "/studio/library", permanent: true },
    ]
  },
  async rewrites() {
    return [
      {
        source: "/backend-api/:path*",
        destination: `${backendUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
