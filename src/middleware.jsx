import { NextResponse } from "next/server";
import { upstashBanDuration } from "./conf";
import { isRatelimited } from "./lib/rate-limit";
import { navItems } from "./app/components/nav.list";
import { geolocation, ipAddress } from "@vercel/functions";
import axios from "axios";
import { COLLAB_OPPORTUNITIES, collabMessage } from "./middleware/collab";
import { BANNED_SCRAPPERS } from "./middleware/ban";
import { isStaticPath } from "./middleware/isStatic";
import { TokenManager } from "./lib/security";

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const ip = ipAddress(request);
    const { country, flag } = geolocation(request);
    const securityManager = new TokenManager()

    if (request.method === "OPTIONS") {
        return NextResponse.next();
    }

    const headers = new Headers(request.headers);
    headers.set("x-current-url", request.nextUrl.href);
    headers.set("x-current-path", pathname);

    if (COLLAB_OPPORTUNITIES.includes(request.headers.get("x-requested-with"))) {
        return NextResponse.json({ ...collabMessage() }, { status: 401 });
    }

    if (BANNED_SCRAPPERS.includes(request.headers.get("x-requested-with"))) {
        return NextResponse.json({ error: "Your scraper is currently banned from using our API." }, { status: 401 });
    }

    if (pathname === "/github") {
        return NextResponse.redirect(new URL("https://github.com/PRASSamin/fetchy", request.url));
    }

    const tools = navItems()
        .filter((item) => item.title.toLowerCase() === "tools")
        .flatMap((item) => item.subItems);

    if (pathname === "/tools" && tools.length > 0 && tools[0].url) {
        return NextResponse.redirect(new URL(tools[0].url, request.url));
    }

    if (pathname === "/home") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (process.env.NEXT_STAGE === "production") {
        if (request.headers.get("host") !== "fetchy.pras.me" && request.headers.get("host") !== "pownloader.pras.me") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        if (isStaticPath(pathname)) {
            return NextResponse.next({ headers });
        }

        if (pathname.startsWith("/api")) {
            const isLimited = await isRatelimited(request);
            if (isLimited) {
                const banDuration = Math.floor(upstashBanDuration / 60 / 60);
                return NextResponse.json(
                    {
                        error: `Too many requests, you have been banned for ${banDuration} hours.`,
                    },
                    { status: 429 }
                );
            }

            const session = request.cookies.get("d_session")?.value;
            if (session) {
                try {
                    if (!securityManager.isTokenValid(session)) {
                        return NextResponse.json({ error: "Session expired" }, { status: 401 });
                    }
                } catch (err) {
                    return NextResponse.json({ error: "Invalid session format" }, { status: 401 });
                }
            } else {
                return NextResponse.json({ error: "Invalid session" }, { status: 401 });
            }
        }

        if (!isStaticPath(pathname)) {
            console.log(`${request.method} ${ip} (${country}${flag}) -> ${pathname}`);
        }
    }

    const response = NextResponse.next({ headers });

    if (pathname.startsWith("/tool")) {
        const resp = await axios.post(
            new URL("/security/session/create", request.nextUrl.origin),
            { key: process.env.NEXT_API_KEY },
            {
                headers: {
                    ...Object.fromEntries(request.headers.entries()),
                    "X-User-Agent": request.headers.get("user-agent")
                    , "x-user-ip": ip
                }
            }
        );

        response.cookies.set("d_session", resp.data.token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60,
        });
    }

    return response
}

export const config = {
    matcher: ["/:path*"],
};