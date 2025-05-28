import { NextResponse } from "next/server";

import { fetchPostJson } from "@/lib/instagram";
import { SuccessResponse } from "@/utils";

import { enableInstagram } from "@/conf";
import { handleError } from "../helper";

import bycrypt from "bcryptjs";

export async function POST(request) {
    if (!enableInstagram) {
        return NextResponse.json(
            { error: "Instagram downloading server currently unavailable" },
            { status: 403 }
        );
    }

    try {
        const body = await request.json();
        const { url } = body;
        const api_hash = request.cookies.get("d_session")?.value;

        if (!api_hash) {
            return NextResponse.json(
                { error: "Invalid API Credentials" }, { status: 401 }
            );
        }

        const isValidHash = await bycrypt.compare(process.env.NEXT_API_KEY, api_hash);

        if (!isValidHash) {
            return NextResponse.json(
                { error: "Invalid API Credentials" }, { status: 401 }
            );
        }

        if (/\/stories|highlights\//.test(url)) {
            return NextResponse.json(
                { error: "Downloading stories and highlights is not supported yet" },
                { status: 400 }
            );
        }

        const postJson = await fetchPostJson(url, 15000);
        const response = SuccessResponse(postJson);

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return handleError(error);
    }
}
