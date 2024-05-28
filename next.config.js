/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
          formats: ['image/webp'],
     remotePatterns: [
       {
         protocol: "https",
         hostname: "loremflickr.com"
       }
    ],
  }
}

module.exports = nextConfig
