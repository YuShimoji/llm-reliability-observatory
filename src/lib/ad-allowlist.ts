type AdEligibility = {
  published: boolean;
  hasSubstantiveContent: boolean;
};

function normalizePath(pathname: string) {
  const withoutQuery = pathname.split(/[?#]/)[0] || "/";
  if (withoutQuery !== "/" && withoutQuery.endsWith("/")) return withoutQuery.slice(0, -1);
  return withoutQuery;
}

export function isAdEligiblePage(pathname: string, state: AdEligibility) {
  if (!state.published || !state.hasSubstantiveContent) return false;
  const normalized = normalizePath(pathname);
  return /^\/(cases|articles)\/[^/]+$/.test(normalized);
}
