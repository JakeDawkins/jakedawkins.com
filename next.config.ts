import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Match the old site's URLs (/blog/post/), which is what search engines have indexed.
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
