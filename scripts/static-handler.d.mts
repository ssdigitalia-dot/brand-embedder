type FetchHandler = {
  fetch: (request: Request, env?: unknown, context?: unknown) => Response | Promise<Response>;
};
export function getFetchHandler(module: { default?: unknown; fetch?: unknown }, serverPath: string): FetchHandler;