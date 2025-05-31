import { NextResponse } from "next/server";

import { fetchContentJson } from "@/lib/facebook";
import { SuccessResponse } from "@/utils";
import { enableFacebook } from "@/conf";
import { postExec } from "../postExec";
import { handleError } from "../helper";
import { TokenManager } from "@/lib/security";
import { ipAddress } from "@vercel/functions";

const manager = new TokenManager();

export async function POST(request) {
    if (!enableFacebook) {
        return NextResponse.json(
            { error: "Facebook downloading server currently unavailable" },
            { status: 403 }
        );
    }
    let response;

    try {
        const clonedRequest = request.clone();
        const body = await clonedRequest.json();
        const { url } = body;
        const session = request.cookies.get("d_session")?.value;

        if (!session) {
            response = handleError(new Error("Invalid API Credentials", { status: 401 }))
            return NextResponse.json(response.body.error, { status: response.status });
        }

        const isValid = manager.verifyToken({ token: session, ip: ipAddress(request) || request.headers.get("x-forwarded-for"), userAgent: request.headers.get("user-agent") })

        if (!isValid) {
            response = handleError(new Error("Invalid API Credentials", { status: 401 }))
            return NextResponse.json(response.body.error, { status: response.status });
        }

        const postJson = await fetchContentJson(url);
        const data = SuccessResponse(postJson);
        response = { body: data, status: 200 }
        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        response = handleError(error)
        return NextResponse.json(response.body, { status: response.status });
    }
    finally {
        postExec(request, response).catch((err) => console.error("Failed to execute postExec:", err));
    }
}