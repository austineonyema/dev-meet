export type AuthUser = {
  id: string;
  email: string;
  name?: string | null;
  role?: string;
};

export type NormalizedTokenLoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type NormalizedAccessLoginResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
};

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  if (!value || typeof value !== "object") return null;
  return value as UnknownRecord;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

export function normalizeTokenLoginResponse(
  payload: unknown,
): NormalizedTokenLoginResponse | null {
  const record = asRecord(payload);
  if (!record) return null;

  const userRecord = asRecord(record.user);
  const userId = userRecord ? asString(userRecord.id) : null;
  const email = userRecord ? asString(userRecord.email) : null;

  const accessToken =
    asString(record.accessToken) ?? asString(record.access_token);
  const refreshToken =
    asString(record.refreshToken) ?? asString(record.refresh_token);

  if (!userRecord || !userId || !email || !accessToken || !refreshToken) {
    return null;
  }

  return {
    user: {
      id: userId,
      email,
      name: asString(userRecord.name),
      role: asString(userRecord.role) ?? undefined,
    },
    accessToken,
    refreshToken,
  };
}

export function normalizeLoginResponseWithOptionalRefresh(
  payload: unknown,
): NormalizedAccessLoginResponse | null {
  const record = asRecord(payload);
  if (!record) return null;

  const userRecord = asRecord(record.user);
  const userId = userRecord ? asString(userRecord.id) : null;
  const email = userRecord ? asString(userRecord.email) : null;
  const accessToken =
    asString(record.accessToken) ?? asString(record.access_token);

  if (!userRecord || !userId || !email || !accessToken) {
    return null;
  }

  const refreshToken =
    asString(record.refreshToken) ?? asString(record.refresh_token) ?? undefined;

  return {
    user: {
      id: userId,
      email,
      name: asString(userRecord.name),
      role: asString(userRecord.role) ?? undefined,
    },
    accessToken,
    refreshToken,
  };
}
