const allowedExactPaths = new Set(["/", "/taxonomy", "/methodology"]);

const disallowedExactPaths = new Set([
  "/cases",
  "/articles",
  "/about",
  "/privacy",
  "/terms",
  "/removal-request",
  "/disclosures",
  "/submit",
  "/admin",
  "/admin/review"
]);

const allowedDynamicPatterns = [
  /^\/cases\/[^/]+$/,
  /^\/articles\/[^/]+$/,
  /^\/taxonomy\/[^/]+$/,
  /^\/methodology\/[^/]+$/
];

function normalizePath(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/)[0] || "/";
  if (withoutQuery !== "/" && withoutQuery.endsWith("/")) {
    return withoutQuery.slice(0, -1);
  }
  return withoutQuery;
}

export function isAdAllowedPath(pathname: string) {
  const normalized = normalizePath(pathname);

  if (normalized === "/api" || normalized.startsWith("/api/")) {
    return false;
  }
  if (disallowedExactPaths.has(normalized)) {
    return false;
  }
  if (allowedExactPaths.has(normalized)) {
    return true;
  }

  return allowedDynamicPatterns.some((pattern) => pattern.test(normalized));
}
