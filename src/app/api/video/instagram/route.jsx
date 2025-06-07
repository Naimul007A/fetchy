import { NextResponse } from "next/server";

import { fetchInstaContentJson } from "@/lib/instagram";
import { SuccessResponse } from "@/utils";

import { enableInstagram } from "@/conf";

import { postExec } from "../postExec";
import { handleError } from "../helper";
import { TokenManager } from "@/lib/security";
import { ipAddress } from "@vercel/functions";
import { Exception } from "@/lib/exceptions";

const manager = new TokenManager();

export async function POST(request) {
    let response;

    try {
        if (!enableInstagram) {
            return NextResponse.json(
                { error: "Instagram downloading server currently unavailable" },
                { status: 403 }
            );
        }

        const clonedRequest = request.clone();
        const body = await clonedRequest.json();
        const { url } = body;

        const session = request.cookies.get("d_session")?.value;
        const ip = (ipAddress(request) || request.headers.get("x-forwarded-for")?.split(',')[0])?.trim();
        const userAgent = request.headers.get("user-agent");

        if (!session || !manager.verifyToken({ token: session, ip, userAgent })) {
            return NextResponse.json({ error: "Invalid API Credentials" }, { status: 401 });
        }

        const json = await fetchInstaContentJson(url, 15000).catch((err) => {
            response = handleError(err);
            throw new Exception(response.body.error, response.status);
        });

        const data = SuccessResponse(json);
        response = { body: data, status: 200 };
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        response = handleError(error);
        return NextResponse.json(response.body, { status: response.status });
    } finally {
        postExec(request, response).catch((err) =>
            console.error("Failed to execute postExec:", err)
        );
    }
}