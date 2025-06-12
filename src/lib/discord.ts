import { geolocation, ipAddress } from "@vercel/functions";
import * as iso from "iso-3166-1";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";
import { getRedis } from "./redis";

export async function serializeRequest(req: NextRequest, res: NextResponse) {
  const headers = Object.fromEntries(req.headers.entries());

  let body = "";
  try {
    body = await req.json();
  } catch (e) {
    body = "[unreadable]";
  }
  return {
    cookies: headers.cookie || null,
    credentials: req.credentials,
    destination: req.destination,
    headers,
    integrity: req.integrity,
    keepalive: req.keepalive,
    method: req.method,
    mode: req.mode,
    nextUrl: req.nextUrl
      ? {
          pathname: req.nextUrl.pathname,
          search: req.nextUrl.search,
          href: req.nextUrl.href,
        }
      : null,
    redirect: req.redirect,
    referrer: req.referrer,
    body: body,
    url: req.url,
    timestamp: Date.now(),
    response: {
      status: res?.status,
      result: res?.body,
    },
  };
}

export class Discord {
  private request: NextRequest;
  private response: NextResponse;

  constructor(request: NextRequest, response: NextResponse) {
    this.request = request;
    this.response = response;
  }

  public WEBHOOK_URL = process.env.NEXT_DISCORD_WEBHOOK_URL;

  public async payload() {
    const downloadUrlParam = this.request.headers.get("X-Download-Url");
    const { pathname } = this.request.nextUrl;
    const ip =
      ipAddress(this.request) || this.request.headers.get("x-forwarded-for");
    const { country, flag } = geolocation(this.request);
    const redis = getRedis();

    const body = await serializeRequest(this.request, this.response);

    const id = nanoid(12);
    const ttl = 60 * 30; // 30 minutes

    try {
      if (this.response?.status >= 400) {
        await redis.set(`req:P${id}`, JSON.stringify(body));
      } else {
        await redis.set(`req:T${id}`, JSON.stringify(body), "EX", ttl);
      }
    } catch {
      console.error("Failed to cache");
    } finally {
      redis.disconnect();
    }

    const pl = {
      title: "New Request",
      color: this.response?.status >= 400 ? 16711680 : 5242879,
      fields: [
        {
          name: "Page",
          value: `${pathname} (${this.request.method})`,
          inline: false,
        },
        {
          name: "Status",
          value: this.response?.status || "N/A",
          inline: false,
        },
        {
          name: "Download Url",
          value: downloadUrlParam || "N/A",
          inline: false,
        },
        { name: "IP", value: ip || "N/A", inline: false },
        { name: "TimeStamp", value: new Date(), inline: false },
        {
          name: "Referer",
          value: this.request.headers.get("referer"),
          inline: false,
        },
        {
          name: "Request Details",
          value: `[View Request](${this.request.nextUrl.origin}/request/${
            this.response?.status >= 400 ? `P${id}` : `T${id}`
          })`,
          inline: false,
        },
      ],
    };

    if (country && flag) {
      pl.fields.push({
        name: "Country",
        value: `${iso.whereCountry(country)?.country || country} ${flag}`,
        inline: false,
      });
    }

    if (this.request.headers.get("x-requested-with")) {
      pl.fields.push({
        name: "Requested With",
        value: this.request.headers.get("x-requested-with"),
        inline: false,
      });
    }

    return pl;
  }
}
