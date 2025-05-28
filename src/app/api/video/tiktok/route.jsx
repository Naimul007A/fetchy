import { NextResponse } from "next/server";
import { fetchTiktokContentJson } from "@/lib/tiktok";
import { SuccessResponse } from "@/utils";
import { handleError } from "../helper";
import { enableTiktok } from "@/conf";
import bycrypt from "bcryptjs";

export async function POST(request) {
    if (!enableTiktok) {
        return NextResponse.json(
            { error: "Tiktok downloading server currently unavailable" },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { url } = body;
        const api_hash = request.cookies.get("d_session")?.value;

        if (!api_hash) {
            return NextResponse.json(
                { error: "Invalid API Credentials" },
                { status: 401 }
            );
        }

        const isValidHash = await bycrypt.compare(process.env.NEXT_API_KEY, api_hash);

        if (!isValidHash) {
            return NextResponse.json(
                { error: "Invalid API Credentials" },
                { status: 401 }
            );
        }

        const postJson = await fetchTiktokContentJson(url);
        const response = SuccessResponse(postJson);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}