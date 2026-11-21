/** Public address of the site. Used for metadata (metadataBase) and sitemap.xml. */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://crijolise.com";
