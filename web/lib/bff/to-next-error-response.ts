import { NextResponse } from "next/server";
import { BackendApiError } from "./backend-client";

export function toNextErrorResponse(error: unknown, fallback: string) {
  if (error instanceof BackendApiError) {
    return NextResponse.json(
      error.payload ?? { message: error.message },
      { status: error.status },
    );
  }

  return NextResponse.json({ message: fallback }, { status: 500 });
}
