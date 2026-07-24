const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

if (!configuredSiteUrl) {
  throw new Error("NEXT_PUBLIC_SITE_URL is required.");
}

const parsedSiteUrl = new URL(configuredSiteUrl);

if (
  parsedSiteUrl.protocol !== "https:" ||
  parsedSiteUrl.username ||
  parsedSiteUrl.password ||
  parsedSiteUrl.pathname !== "/" ||
  parsedSiteUrl.search ||
  parsedSiteUrl.hash
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a credential-free HTTPS origin.");
}

export const siteUrl = parsedSiteUrl.origin;
