const DEFAULT_BACKEND_API_BASE_URL = "http://localhost:3000/api/v1";

type ApiErrorPayload = {
  message?: string | string[];
  code?: string;
};

export class BackendApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly payload?: unknown,
  ) {
    super(message);
    this.name = "BackendApiError";
  }
}

function getBackendApiBaseUrl(): string {
  const value = process.env.BACKEND_API_URL || DEFAULT_BACKEND_API_BASE_URL;
  return value.replace(/\/+$/, "");
}

function extractMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const message = (payload as ApiErrorPayload).message;
  if (typeof message === "string") return message;
  if (Array.isArray(message)) return message.join(", ");
  return null;
}

export async function backendRequest<TResponse>(
  path: string,
  init: RequestInit = {},
): Promise<TResponse> {
  const headers = new Headers(init.headers ?? {});

  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  let response: Response;
  try {
    response = await fetch(`${getBackendApiBaseUrl()}${path}`, {
      ...init,
      headers,
      cache: "no-store",
    });
  } catch {
    throw new BackendApiError("Backend service unavailable.", 503, {
      code: "BACKEND_UNAVAILABLE",
      message:
        "Backend service is unavailable. Ensure backend is running and routes are implemented.",
    });
  }

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    throw new BackendApiError(
      extractMessage(payload) ?? `Request failed with status ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as TResponse;
}
