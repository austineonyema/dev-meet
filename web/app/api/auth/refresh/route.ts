import { NextRequest, NextResponse } from "next/server";
import { backendRequest, BackendApiError } from "@/lib/bff/backend-client";
import { toNextErrorResponse } from "@/lib/bff/to-next-error-response";
import {
  normalizeTokenLoginResponse,
  type NormalizedTokenLoginResponse,
} from "@/lib/auth/backend-auth-contract";
import {
  clearAuthCookies,
  REFRESH_COOKIE_NAME,
  setAuthCookies,
} from "@/lib/auth/session-cookies";

function unauthorizedWithClearedCookies(message: string) {
  const response = NextResponse.json({ message }, { status: 401 });
  clearAuthCookies(response);
  return response;
}

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;
  if (!refreshToken) {
    return unauthorizedWithClearedCookies("Refresh token missing.");
  }

  try {
    const raw = await backendRequest<unknown>("/auth/token/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
    });

    const result: NormalizedTokenLoginResponse | null =
      normalizeTokenLoginResponse(raw);
    if (!result) {
      return NextResponse.json(
        { message: "Backend refresh response is invalid." },
        { status: 502 },
      );
    }

    const response = NextResponse.json({ user: result.user }, { status: 200 });
    setAuthCookies(response, {
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
    });
    return response;
  } catch (error) {
    if (error instanceof BackendApiError && error.status === 401) {
      return unauthorizedWithClearedCookies("Session expired.");
    }
    return toNextErrorResponse(error, "Unable to refresh session.");
  }
}
