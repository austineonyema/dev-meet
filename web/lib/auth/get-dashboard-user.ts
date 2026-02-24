import { cache } from "react";
import { cookies } from "next/headers";
import type { AuthUser } from "@/lib/api";
import {
  ACCESS_COOKIE_NAME,
  REFRESH_COOKIE_NAME,
} from "@/lib/auth/session-cookies";
import {
  resolveCurrentUserSession,
  UnauthorizedSessionError,
} from "@/lib/auth/current-user-session";

export const getDashboardUser = cache(async (): Promise<AuthUser | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_COOKIE_NAME)?.value;
  const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

  try {
    const { profile } = await resolveCurrentUserSession({
      accessToken,
      refreshToken,
    });
    return profile;
  } catch (error) {
    if (error instanceof UnauthorizedSessionError) {
      return null;
    }
    return null;
  }
});
