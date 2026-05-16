import createMDX from '@next/mdx';

const withMDX = createMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Project-repo Pages URL: <user>.github.io/<repo>/.
  // basePath rewrites internal links and asset URLs to live under /shubhamkaushal765.
  basePath: '/shubhamkaushal765',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx'],
};

export default withMDX(nextConfig);
