const DEFAULT_API_BASE_URL = "/api";
const DEFAULT_UNAUTH_REDIRECT_PATH = "/login";

const NON_REFRESHABLE_PATHS = new Set([
  "/auth/login",
  "/auth/register",
  "/auth/verify",
  "/auth/refresh",
  "/auth/logout",
  "/auth/user",
]);

type ApiErrorPayload = {
  message?: string | string[];
  code?: string;
};

type ApiRequestInit = RequestInit & {
  _hasRetriedAfterRefresh?: boolean;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_WEB_API_BASE_URL || DEFAULT_API_BASE_URL;
}

function getUnauthorizedRedirectPath(): string {
  return (
    process.env.NEXT_PUBLIC_UNAUTHORIZED_REDIRECT_PATH ||
    DEFAULT_UNAUTH_REDIRECT_PATH
  );
}

function extractMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const message = (payload as ApiErrorPayload).message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.join(", ");
  return null;
}

function extractCode(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const code = (payload as ApiErrorPayload).code;
  return typeof code === "string" && code.length > 0 ? code : null;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof ApiError) return error.message;
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function isBackendNotReadyError(error: unknown): boolean {
  if (!(error instanceof ApiError)) return false;
  const code = extractCode(error.payload);
  if (code === "BACKEND_NOT_READY" || code === "BACKEND_UNAVAILABLE") {
    return true;
  }
  return error.status === 503 || error.status === 501 || error.status === 504;
}

function shouldAttemptRefresh(path: string, init: ApiRequestInit): boolean {
  if (typeof window === "undefined") return false;
  if (init._hasRetriedAfterRefresh) return false;
  if (NON_REFRESHABLE_PATHS.has(path)) return false;
  if (init.credentials === "omit") return false;
  return true;
}

async function refreshSessionCookie(): Promise<boolean> {
  const response = await fetch(`${getApiBaseUrl()}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  return response.ok;
}

async function forceLogoutAndRedirect(): Promise<void> {
  try {
    await fetch(`${getApiBaseUrl()}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch {
    // Best-effort cleanup only.
  }

  if (typeof window !== "undefined") {
    window.location.replace(getUnauthorizedRedirectPath());
  }
}

export async function apiRequest<TResponse>(
  path: string,
  init: ApiRequestInit = {},
): Promise<TResponse> {
  const headers = new Headers(init.headers ?? {});

  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers,
    credentials: init.credentials ?? "include",
  });

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    if (response.status === 401 && shouldAttemptRefresh(path, init)) {
      const refreshed = await refreshSessionCookie();

      if (refreshed) {
        return apiRequest<TResponse>(path, {
          ...init,
          _hasRetriedAfterRefresh: true,
        });
      }

      await forceLogoutAndRedirect();
      throw new ApiError("Session expired", 401, payload);
    }

    throw new ApiError(
      extractMessage(payload) ?? `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}
