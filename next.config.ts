import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";
import { withFrontmatter } from "./plugins/frontmatter";
import { withToolsMapper } from "./plugins/mapper";

const withMDX = createMDX();
const withFM = withFrontmatter({
  dir: [
    "content/**/*",
    "src/app/(default)/tool/**/page.{tsx,jsx,ts,js}",
    "src/app/(default)/tool/",
  ],
  frequency: 10,
});
const withMapper = withToolsMapper();

const baseConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default withMapper(withMDX(withFM(baseConfig)));
