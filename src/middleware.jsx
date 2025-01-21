import { NextResponse } from "next/server";
import { upstashBanDuration } from "./conf";
import { isRatelimited } from "./lib/rate-limit";
import { navItems } from "./app/components/nav.list";
import { geolocation, ipAddress } from "@vercel/functions";
import axios from "axios";
import geocoder from "geocoder"

const isStaticPath = (path) => {
    const staticPaths = [
        "/_next",
        "/images",
        "/favicon.ico",
        "/robots.txt",
        "/webmanifest.json",
    ];
    return staticPaths.some((staticPath) => path.startsWith(staticPath));
};

const downloadApis = [
    "/api/video/tiktok",
    "/api/video/facebook",
    "/api/video/instagram",
]

const DISCORD_WEBHOOK_URL = process.env.NEXT_DISCORD_WEBHOOK_URL;

export async function middleware(request) {
    const { pathname } = request.nextUrl;
    const ip = ipAddress(request);
    const { country, flag, latitude, longitude } = geolocation(request);

    if (request.method === "OPTIONS") {
        return NextResponse.next();
    }

    const headers = new Headers(request.headers);
    headers.set("x-current-url", request.nextUrl.href);
    headers.set("x-current-path", pathname);

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
        if (request.headers.get("host") !== "pownloader.pras.me") {
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

                // retrieve address
                let address;
                geocoder.reverseGeocode(latitude, longitude, (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        address = data.results[0].formatted_address;
                    }
                });
                const downloadUrlParam = request.headers.get("X-Download-Url");

                // Send request info to Discord
                if (DISCORD_WEBHOOK_URL) {
                    await axios.post(
                        DISCORD_WEBHOOK_URL,
                        {
                            embeds: [
                                {
                                    title: "New Request",
                                    "color": 5242879,
                                    "fields": [
                                        { "name": "Page", "value": `${pathname} (${request.method})`, "inline": false },
                                        { "name": "Download Url", "value": downloadUrlParam, "inline": false },
                                        { "name": "IP", "value": ip, "inline": false },
                                        { "name": "Location", "value": `${address}`, "inline": false },
                                        { "name": "Coordinate", "value": `${latitude}, ${longitude}`, "inline": false },
                                        { "name": "Timezone", "value": `${request.headers.get("x-vercel-ip-timezone")}`, "inline": false },
                                        { "name": "TimeStamp", "value": new Date().toLocaleString(), "inline": false },
                                    ],
                                },
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

        console.log(`${request.method} ${ip} (${country}${flag}) -> ${pathname}`);
    }

    return NextResponse.next({ headers });
}

export const config = {
    matcher: ["/:path*"],
};