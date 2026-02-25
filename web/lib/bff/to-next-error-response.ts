import { NextResponse } from "next/server";
import { BackendApiError } from "./backend-client";

const BACKEND_NOT_READY_STATUSES = new Set([404, 405, 501]);

export function toNextErrorResponse(error: unknown, fallback: string) {
  if (error instanceof BackendApiError) {
    if (BACKEND_NOT_READY_STATUSES.has(error.status)) {
      return NextResponse.json(
        {
          code: "BACKEND_NOT_READY",
          message:
            "Backend endpoint is not ready yet. Implement the backend contract route and retry.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      error.payload ?? { message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json({ message: fallback }, { status: 500 });
}
