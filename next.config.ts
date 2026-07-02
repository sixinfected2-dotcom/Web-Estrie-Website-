import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  turbopack: {
    root: import.meta.dirname,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
