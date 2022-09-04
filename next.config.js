/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['image.tmdb.org', 'www.themoviedb.org'],
  },
  pageExtensions: ['page.tsx', 'page.ts', 'api.ts']
}
