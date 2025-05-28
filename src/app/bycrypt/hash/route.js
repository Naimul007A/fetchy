import bycrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(req) {
  const string = req.headers.get("string");
  const salt = req.headers.get("salt");
  const hash = await bycrypt.hash(string, Number(salt));
  return NextResponse.json({ hash });
}
