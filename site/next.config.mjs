import createMDX from '@next/mdx';

const withMDX = createMDX({ extension: /\.mdx?$/ });

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '',
  trailingSlash: true,
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx'],
};

export default withMDX(nextConfig);
