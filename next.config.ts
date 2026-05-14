import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Point the plugin at our request config so server components can resolve
// locale + messages without a per-page wrapper.
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
