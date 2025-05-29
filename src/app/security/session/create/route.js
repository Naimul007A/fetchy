import { NextResponse } from "next/server";
import { TokenManager } from "@/lib/security";
import { ipAddress } from "@vercel/functions";
import { downloadSessionTTL } from "@/conf";

export async function POST(req) {
  const manager = new TokenManager(
    process.env.NEXT_API_KEY,
    downloadSessionTTL
  );
  const { key } = await req.json();
  if (!key || key !== process.env.NEXT_API_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = manager.createToken({
    ip: ipAddress(req) || req.headers.get("x-forwarded-for"),
    userAgent: req.headers.get("x-user-agent"),
  });

  return NextResponse.json({ token });
}
