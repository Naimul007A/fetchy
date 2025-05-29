import axios from "axios";
import type { NextResponse, NextRequest } from "next/server";
import { Discord } from "@/lib/discord";

export const postExec = async (
  request: NextRequest,
  response: NextResponse
) => {
  const { pathname } = request.nextUrl;
  const discord = new Discord(request, response);

  if (pathname.startsWith("/api/video")) {
    if (discord.WEBHOOK_URL) {
      void axios
        .post(
          discord.WEBHOOK_URL,
          {
            embeds: [await discord.payload()],
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
};
