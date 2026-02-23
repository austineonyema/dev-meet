import type { NextResponse } from "next/server";

export const ACCESS_COOKIE_NAME =
  process.env.ACCESS_COOKIE_NAME?.trim() || "dev_meet_at";
export const REFRESH_COOKIE_NAME =
  process.env.REFRESH_COOKIE_NAME?.trim() || "dev_meet_rt";

type SameSite = "lax" | "strict" | "none";

function getCookieSameSite(): SameSite {
  const value = (process.env.COOKIE_SAME_SITE ?? "lax").toLowerCase();
  if (value === "strict" || value === "none" || value === "lax") {
    return value;
  }
  return "lax";
}

function parseMaxAgeSeconds(envKey: string, fallbackMs: number): number {
  const value = process.env[envKey];
  const parsed = value ? Number.parseInt(value, 10) : Number.NaN;
  const maxAgeMs = Number.isFinite(parsed) && parsed > 0 ? parsed : fallbackMs;
  return Math.floor(maxAgeMs / 1000);
}

function getBaseCookieOptions() {
  const sameSite = getCookieSameSite();
  const isProduction = process.env.NODE_ENV === "production";
  const secure = sameSite === "none" ? true : isProduction;
  const domain = process.env.COOKIE_DOMAIN?.trim();

  return {
    httpOnly: true,
    secure,
    sameSite,
    path: "/",
    ...(domain ? { domain } : {}),
  } as const;
}

export type AuthTokenPair = {
  accessToken: string;
  refreshToken: string;
};

export function setAuthCookies(response: NextResponse, tokens: AuthTokenPair) {
  const baseOptions = getBaseCookieOptions();

  response.cookies.set(ACCESS_COOKIE_NAME, tokens.accessToken, {
    ...baseOptions,
    maxAge: parseMaxAgeSeconds("ACCESS_COOKIE_MAX_AGE_MS", 15 * 60 * 1000),
  });

  response.cookies.set(REFRESH_COOKIE_NAME, tokens.refreshToken, {
    ...baseOptions,
    maxAge: parseMaxAgeSeconds(
      "REFRESH_COOKIE_MAX_AGE_MS",
      7 * 24 * 60 * 60 * 1000,
    ),
  });
}

export function clearAuthCookies(response: NextResponse) {
  const baseOptions = getBaseCookieOptions();
  const expiredAt = new Date(0);

  response.cookies.set(ACCESS_COOKIE_NAME, "", {
    ...baseOptions,
    expires: expiredAt,
  });

  response.cookies.set(REFRESH_COOKIE_NAME, "", {
    ...baseOptions,
    expires: expiredAt,
  });
}
