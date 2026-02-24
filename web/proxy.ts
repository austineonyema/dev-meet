import { NextRequest, NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
  clearAuthCookies,
  setAuthCookies,
} from "@/lib/auth/session-cookies";

const DEFAULT_BACKEND_API_BASE_URL = "http://localhost:3000/api/v1";
const DASHBOARD_PATH = "/dashboard";
const LOGIN_PATH = "/login";

const AUTH_ROUTES = new Set(["/login", "/register"]);

const PROTECTED_ROUTE_PREFIXES = [
  "/dashboard",
  "/profile",
  "/settings",
  "/posts",
  "/connections",
  "/test",
];

type RefreshedSession = {
  accessToken: string;
  refreshToken?: string;
};

function getBackendApiBaseUrl(): string {
  const value = process.env.BACKEND_API_URL || DEFAULT_BACKEND_API_BASE_URL;
  return value.replace(/\/+$/, "");
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function normalizeRefreshPayload(payload: unknown): RefreshedSession | null {
  if (!payload || typeof payload !== "object") return null;

  const record = payload as Record<string, unknown>;
  const accessToken =
    asString(record.accessToken) ?? asString(record.access_token);
  const refreshToken =
    asString(record.refreshToken) ?? asString(record.refresh_token) ?? undefined;

  if (!accessToken) return null;

  return {
    accessToken,
    refreshToken,
  };
}

async function refreshSession(refreshToken: string): Promise<RefreshedSession | null> {
  try {
    const response = await fetch(`${getBackendApiBaseUrl()}/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = (await response.json().catch(() => null)) as unknown;
    return normalizeRefreshPayload(payload);
  } catch {
    return null;
  }
}

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

function buildLoginRedirect(request: NextRequest): URL {
  const loginUrl = new URL(LOGIN_PATH, request.url);
  const nextPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("next", nextPath);
  return loginUrl;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get(ACCESS_COOKIE_NAME)?.value;
  const refreshToken = request.cookies.get(REFRESH_COOKIE_NAME)?.value;

  if (isProtectedRoute(pathname)) {
    if (accessToken) {
      return NextResponse.next();
    }

    if (refreshToken) {
      const refreshed = await refreshSession(refreshToken);
      if (refreshed) {
        const response = NextResponse.next();
        setAuthCookies(response, {
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken ?? refreshToken,
        });
        return response;
      }
    }

    const response = NextResponse.redirect(buildLoginRedirect(request));
    clearAuthCookies(response);
    return response;
  }

  if (AUTH_ROUTES.has(pathname)) {
    if (accessToken) {
      const redirectUrl = new URL(DASHBOARD_PATH, request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (refreshToken) {
      const refreshed = await refreshSession(refreshToken);
      if (refreshed) {
        const redirectUrl = new URL(DASHBOARD_PATH, request.url);
        const response = NextResponse.redirect(redirectUrl);
        setAuthCookies(response, {
          accessToken: refreshed.accessToken,
          refreshToken: refreshed.refreshToken ?? refreshToken,
        });
        return response;
      }

      const response = NextResponse.next();
      clearAuthCookies(response);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/posts/:path*",
    "/connections/:path*",
    "/test/:path*",
    "/login",
    "/register",
  ],
};