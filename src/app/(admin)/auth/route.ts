import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  const { password } = await req.json();
  if (!password)
    return NextResponse.json(
      { success: false, message: "Password is required" },
      { status: 400 }
    );
  const cookieStore = await cookies();

  if (password === process.env.NEXT_ADMIN_PASSWORD) {
    cookieStore.set("admin_auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60,
      path: "/",
    });
    return NextResponse.json(
      { success: true, message: "Login successful" },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Invalid password" },
    { status: 401 }
  );
}
