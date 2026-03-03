import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Global middleware.
 * Currently does nothing.
 * Required because Next expects a `middleware` export.
 */
export function middleware(request: NextRequest) {
  return NextResponse.next();
}