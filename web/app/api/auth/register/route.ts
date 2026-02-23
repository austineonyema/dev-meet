import { NextRequest, NextResponse } from "next/server";
import { backendRequest } from "@/lib/bff/backend-client";
import { toNextErrorResponse } from "@/lib/bff/to-next-error-response";
import {
  normalizeTokenLoginResponse,
  type AuthUser,
} from "@/lib/auth/backend-auth-contract";
import { setAuthCookies } from "@/lib/auth/session-cookies";

type RegisterPayload = {
  email: string;
  name: string;
  password: string;
};

type RegisterResponse = {
  user: AuthUser;
  requiresLogin: boolean;
  message?: string;
};

function isRegisterPayload(payload: unknown): payload is RegisterPayload {
  if (!payload || typeof payload !== "object") return false;
  const candidate = payload as Record<string, unknown>;
  return (
    typeof candidate.email === "string" &&
    candidate.email.length > 0 &&
    typeof candidate.name === "string" &&
    candidate.name.length > 0 &&
    typeof candidate.password === "string" &&
    candidate.password.length > 0
  );
}

function normalizeRegisterUser(payload: unknown): AuthUser | null {
  if (!payload || typeof payload !== "object") return null;
  const record = payload as Record<string, unknown>;

  const nestedUser =
    typeof record.user === "object" && record.user !== null
      ? (record.user as Record<string, unknown>)
      : null;
  const source = nestedUser ?? record;

  const id = typeof source.id === "string" ? source.id : null;
  const email = typeof source.email === "string" ? source.email : null;
  if (!id || !email) return null;

  return {
    id,
    email,
    name: typeof source.name === "string" ? source.name : null,
    role: typeof source.role === "string" ? source.role : undefined,
  };
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json().catch(() => null)) as unknown;
    if (!isRegisterPayload(payload)) {
      return NextResponse.json(
        { message: "Invalid registration payload." },
        { status: 400 },
      );
    }

    const raw = await backendRequest<unknown>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const tokenContract = normalizeTokenLoginResponse(raw);
    if (tokenContract) {
      const response = NextResponse.json<RegisterResponse>(
        { user: tokenContract.user, requiresLogin: false },
        { status: 201 },
      );
      setAuthCookies(response, {
        accessToken: tokenContract.accessToken,
        refreshToken: tokenContract.refreshToken,
      });
      return response;
    }

    const user = normalizeRegisterUser(raw);
    if (!user) {
      return NextResponse.json(
        { message: "Backend register response is invalid." },
        { status: 502 },
      );
    }

    return NextResponse.json<RegisterResponse>(
      {
        user,
        requiresLogin: true,
        message: "Registration successful. Please login to continue.",
      },
      { status: 201 },
    );
  } catch (error) {
    return toNextErrorResponse(error, "Unable to register.");
  }
}
