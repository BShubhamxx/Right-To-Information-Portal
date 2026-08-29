import { updateSession } from "@/lib/middleware";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) { return updateSession(request); }

export const config = { matcher: ["/dashboard/:path*", "/notifications/:path*", "/appeal/:path*", "/second-appeal/:path*"] };
