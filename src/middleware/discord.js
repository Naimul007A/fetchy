import { geolocation, ipAddress } from "@vercel/functions";
import * as iso from "iso-3166-1";

export class Discord {
  request;

  constructor(request) {
    this.request = request;
  }

  WEBHOOK_URL = process.env.NEXT_DISCORD_WEBHOOK_URL;

  payload() {
    const downloadUrlParam = this.request.headers.get("X-Download-Url");
    const { pathname } = this.request.nextUrl;
    const ip = ipAddress(this.request);
    const { country, flag, latitude, longitude } = geolocation(this.request);
    return {
      title: "New Request",
      color: 5242879,
      fields: [
        {
          name: "Page",
          value: `${pathname} (${this.request.method})`,
          inline: false,
        },
        { name: "Download Url", value: downloadUrlParam, inline: false },
        { name: "IP", value: ip, inline: false },
        {
          name: "Country",
          value: `${iso.whereCountry(country)?.country || country} ${flag}`,
          inline: false,
        },
        {
          name: "Coordinate",
          value: `${latitude}, ${longitude}`,
          inline: false,
        },
        {
          name: "Timezone",
          value: `${this.request.headers.get("x-vercel-ip-timezone")}`,
          inline: false,
        },
        { name: "TimeStamp", value: new Date(), inline: false },
        {
          name: "referer",
          value: this.request.headers.get("referer"),
          inline: false,
        },
        {
          name: "User-Agent",
          value: this.request.headers.get("user-agent"),
          inline: false,
        },
        {
          name: "Cookies",
          value: this.request.headers.get("cookie"),
          inline: false,
        },
        {
          name: "Requested With",
          value: this.request.headers.get("x-requested-with"),
          inline: false,
        },
      ],
    };
  }
}
