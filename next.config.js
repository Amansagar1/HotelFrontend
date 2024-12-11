/** @type {import('next').NextConfig} */
const nextConfig = {
  // distDir: 'build',
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    NEXTAUTH_URL: "https://hotelsudarshan.com",
  },
  webpack: (config, { isServer }) => {
    // Modify webpack config to handle images
    if (!isServer) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/images/[name].[hash][ext]',
        },
      });
    }

    return config;
  },
};

module.exports = nextConfig;
