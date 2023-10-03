/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  optimizeFonts: false,
  env: {
    APP_URL: process.env.REACT_APP_URL,
    APP_ENV: process.env.REACT_APP_ENV,
    APP_SERVER_URL: process.env.REACT_APP_SERVER_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET : process.env.NEXTAUTH_SECRET
  },

  async rewrites() {
    return [
      // {
      //   source: "/api/auth/:path*",
      //   destination: "http://localhost:3000/api/auth/:path*",
      // },
      // {
      //   source: "/api/:path*",
      //   destination: "http://localhost:4000/api/:path*",
      // },
      
      {
        source: "/uploads/:path*",
        destination: "http://localhost:4000/uploads/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
