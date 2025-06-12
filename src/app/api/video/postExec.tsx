import axios from "axios";
import type { NextResponse, NextRequest } from "next/server";
import { Discord } from "@/lib/discord";
import { SEND_TO_DISCORD } from "@/conf";

export const postExec = (request: NextRequest, response: NextResponse) => {
  if (!request.nextUrl.pathname.startsWith("/api/video")) return;

  const discord = new Discord(request, response);

  (async () => {
    try {
      const payload = await discord.payload();
      if (discord.WEBHOOK_URL && SEND_TO_DISCORD) {
        await axios.post(
          discord.WEBHOOK_URL,
          { embeds: [payload] },
          { headers: { "Content-Type": "application/json" } }
        );
      }
    } catch (err) {
      console.error("PostExec failed:", err);
    }
  })();
};
