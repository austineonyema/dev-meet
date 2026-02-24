import { backendRequest, BackendApiError } from "@/lib/bff/backend-client";
import {
  normalizeLoginResponseWithOptionalRefresh,
  normalizeTokenLoginResponse,
} from "@/lib/auth/backend-auth-contract";
import type { AuthUser } from "@/lib/api";

export type RotatedTokens = {
  accessToken: string;
  refreshToken?: string;
};

export class UnauthorizedSessionError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedSessionError";
  }
}

function isBackendUnauthorized(error: unknown): boolean {
  return error instanceof BackendApiError && error.status === 401;
}

async function fetchCurrentUser(accessToken: string): Promise<AuthUser> {
  return backendRequest<AuthUser>("/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function refreshSession(refreshToken: string): Promise<RotatedTokens> {
  const raw = await backendRequest<unknown>("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  const strict = normalizeTokenLoginResponse(raw);
  if (strict) {
    return {
      accessToken: strict.accessToken,
      refreshToken: strict.refreshToken,
    };
  }

  const accessOnly = normalizeLoginResponseWithOptionalRefresh(raw);
  if (!accessOnly) {
    throw new Error("Backend refresh response is invalid.");
  }

  return {
    accessToken: accessOnly.accessToken,
    refreshToken: accessOnly.refreshToken,
  };
}

export async function resolveCurrentUserSession(tokens: {
  accessToken?: string;
  refreshToken?: string;
}): Promise<{ profile: AuthUser; rotatedTokens?: RotatedTokens }> {
  let accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;
  let rotatedTokens: RotatedTokens | undefined;

  if (!accessToken && !refreshToken) {
    throw new UnauthorizedSessionError();
  }

  if (!accessToken && refreshToken) {
    try {
      const refreshed = await refreshSession(refreshToken);
      accessToken = refreshed.accessToken;
      rotatedTokens = refreshed;
    } catch (error) {
      if (isBackendUnauthorized(error)) {
        throw new UnauthorizedSessionError();
      }
      throw error;
    }
  }

  if (!accessToken) {
    throw new UnauthorizedSessionError();
  }

  try {
    const profile = await fetchCurrentUser(accessToken);
    return { profile, rotatedTokens };
  } catch (error) {
    const shouldRetryWithRefresh =
      isBackendUnauthorized(error) && !!refreshToken;

    if (!shouldRetryWithRefresh || !refreshToken) {
      if (isBackendUnauthorized(error)) {
        throw new UnauthorizedSessionError();
      }
      throw error;
    }

    try {
      const refreshed = await refreshSession(refreshToken);
      const profile = await fetchCurrentUser(refreshed.accessToken);
      return { profile, rotatedTokens: refreshed };
    } catch (retryError) {
      if (isBackendUnauthorized(retryError)) {
        throw new UnauthorizedSessionError();
      }
      throw retryError;
    }
  }
}
