/** Cloudflare Worker entry point for the Vinext runtime. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
  DB: unknown;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const pathname = new URL(request.url).pathname;
    const blockedImageOptimizerPaths = ["/_vinext/image", "/_next/image"];
    if (
      blockedImageOptimizerPaths.some(
        (path) => pathname === path || pathname.startsWith(`${path}/`),
      )
    ) {
      return new Response("Not found", { status: 404 });
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
