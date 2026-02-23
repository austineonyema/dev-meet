import { NextRequest, NextResponse } from "next/server";
import { backendRequest, BackendApiError } from "@/lib/bff/backend-client";
import { toNextErrorResponse } from "@/lib/bff/to-next-error-response";
import {
  normalizeTokenLoginResponse,
  type NormalizedTokenLoginResponse,
} from "@/lib/auth/backend-auth-contract";
import {
  ACCESS_COOKIE_NAME,
  clearAuthCookies,
  REFRESH_COOKIE_NAME,
  setAuthCookies,
} from "@/lib/auth/session-cookies";

function unauthorizedWithClearedCookies(message: string) {
  const response = NextResponse.json({ message }, { status: 401 });
  clearAuthCookies(response);
  return response;
}

async function fetchCurrentUser(accessToken: string) {
  return backendRequest<unknown>("/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

async function refreshTokens(refreshToken: string) {
  const raw = await backendRequest<unknown>("/auth/token/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  });

  const normalized: NormalizedTokenLoginResponse | null =
    normalizeTokenLoginResponse(raw);
  if (!normalized) {
    throw new Error("Backend refresh response is invalid.");
  }

  return normalized;
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (!accessToken && !refreshToken) {
    return unauthorizedWithClearedCookies("Unauthorized.");
  }

  try {
    let bearer = accessToken;
    let rotated: NormalizedTokenLoginResponse | null = null;

    if (!bearer && refreshToken) {
      rotated = await refreshTokens(refreshToken);
      bearer = rotated.accessToken;
    }

    if (!bearer) {
      return unauthorizedWithClearedCookies("Unauthorized.");
    }

    let profile: unknown;
    try {
      profile = await fetchCurrentUser(bearer);
    } catch (error) {
      const shouldRetryWithRefresh =
        error instanceof BackendApiError &&
        error.status === 401 &&
        !!refreshToken;

      if (!shouldRetryWithRefresh || !refreshToken) {
        throw error;
      }

      rotated = await refreshTokens(refreshToken);
      profile = await fetchCurrentUser(rotated.accessToken);
    }

    const response = NextResponse.json(profile, { status: 200 });
    if (rotated) {
      setAuthCookies(response, {
        accessToken: rotated.accessToken,
        refreshToken: rotated.refreshToken,
      });
    }
    return response;
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return unauthorizedWithClearedCookies("Unauthorized.");
    }
    if (error instanceof Error && error.message.includes("invalid")) {
      return unauthorizedWithClearedCookies("Unauthorized.");
    }
    return toNextErrorResponse(error, "Unable to fetch current user.");
  }
}
