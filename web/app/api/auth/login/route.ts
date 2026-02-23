import { NextRequest, NextResponse } from "next/server";
import { backendRequest } from "@/lib/bff/backend-client";
import { toNextErrorResponse } from "@/lib/bff/to-next-error-response";
import {
  normalizeTokenLoginResponse,
  type NormalizedTokenLoginResponse,
} from "@/lib/auth/backend-auth-contract";
import { setAuthCookies } from "@/lib/auth/session-cookies";

type LoginPayload = {
  email: string;
  password: string;
};

function isLoginPayload(payload: unknown): payload is LoginPayload {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as Record<string, unknown>;
  return (
    typeof candidate.email === "string" &&
    candidate.email.length > 0 &&
    typeof candidate.password === "string" &&
    candidate.password.length > 0
  );
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => null)) as unknown;
    if (!isLoginPayload(payload)) {
      return NextResponse.json(
        { message: "Invalid login payload." },
        { status: 400 },
      );
    }

    const raw = await backendRequest<unknown>("/auth/token/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const result: NormalizedTokenLoginResponse | null =
      normalizeTokenLoginResponse(raw);
    if (!result) {
      return NextResponse.json(
        { message: "Backend auth response is invalid." },
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
    return toNextErrorResponse(error, "Unable to login.");
  }
}
