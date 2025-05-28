import { NextResponse } from "next/server";
import { upstashBanDuration } from "./conf";
import { isRatelimited } from "./lib/rate-limit";
import { navItems } from "./app/components/nav.list";
import { geolocation, ipAddress } from "@vercel/functions";
import axios from "axios";
import { COLLAB_OPPORTUNITIES, collabMessage } from "./middleware/collab";
import { BANNED_SCRAPPERS } from "./middleware/ban";
import { isStaticPath } from "./middleware/isStatic";
import { Discord } from "./middleware/discord";

const downloadApis = [
    "/api/video/tiktok",
    "/api/video/facebook",
    "/api/video/instagram",
]

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const ip = ipAddress(request);
    const { country, flag } = geolocation(request);
    const discord = new Discord(request)

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

            if (downloadApis.includes(pathname)) {
                if (discord.WEBHOOK_URL) {
                    await axios.post(
                        discord.WEBHOOK_URL,
                        {
                            embeds: [
                                discord.payload(),
                            ],
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    )
                        .catch((err) => console.error("Failed to send Discord webhook:", err));
                }
            }
        }

        if (!isStaticPath(pathname)) {
            console.log(`${request.method} ${ip} (${country}${flag}) -> ${pathname}`);
        }
    }

    const response = NextResponse.next({ headers });

    if (pathname.startsWith("/tool")) {
        const resp = await axios.get(new URL("/bycrypt/hash", request.nextUrl.origin), {
            headers: {
                "string": process.env.NEXT_API_KEY,
                "salt": "10"
            }
        })
        response.cookies.set("d_session", resp.data.hash, {
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