/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ⭐ static export enable

  images: {
    unoptimized: true, // ⭐ static export ke liye image optimization disable
  },

  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all pages
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // ✅ CRITICAL
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
