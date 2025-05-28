import { NextResponse } from "next/server";

import { fetchContentJson } from "@/lib/facebook";
import { SuccessResponse } from "@/utils";
import { enableFacebook } from "@/conf";
import { handleError } from "../helper";
import bycrypt from "bcryptjs";

export async function POST(request) {
    if (!enableFacebook) {
        return NextResponse.json(
            { error: "Facebook downloading server currently unavailable" },
            { status: 403 }
        );
    }
    try {
        const body = await request.json();
        const { url } = body;
        const api_hash = request.cookies.get("d_session")?.value;

        if (!api_hash) {
            return NextResponse.json(
                { error: "Invalid Request" },
                { status: 401 }
            );
        }

        const isValidHash = await bycrypt.compare(process.env.NEXT_API_KEY, api_hash);

        if (!isValidHash) {
            return NextResponse.json(
                { error: "Invalid Request" },
                { status: 401 }
            );
        }

        const postJson = await fetchContentJson(url);
        const response = SuccessResponse(postJson);
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
