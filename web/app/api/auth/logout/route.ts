import { NextRequest, NextResponse } from "next/server";
import { backendRequest } from "@/lib/bff/backend-client";
import {
  clearAuthCookies,
  REFRESH_COOKIE_NAME,
} from "@/lib/auth/session-cookies";

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (refreshToken) {
    try {
      await backendRequest<{ ok: boolean }>("/auth/logout", {
        method: "POST",
        body: JSON.stringify({ refreshToken }),
      });
    } catch {
      // Keep logout idempotent even if backend logout fails.
    }
  }

  const response = NextResponse.json({ ok: true }, { status: 200 });
  clearAuthCookies(response);
  return response;
}
