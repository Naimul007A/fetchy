import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import { redis } from "@/lib/redis";

export async function DELETE(req: NextRequest) {
  const { keys } = await req.json();

  if (!keys) {
    return NextResponse.json({ error: "Missing key" }, { status: 400 });
  }

  try {
    await redis.del(keys);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete key:", error);
    return NextResponse.json(
      { error: "Failed to delete key" },
      { status: 500 }
    );
  }
}

function createStreamingResponse(stream: Readable) {
  return new Response(stream as any, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

export async function PUT(req: NextRequest) {
  const { keys, data } = await req.json();

  if (!keys || !data) {
    return NextResponse.json(
      { error: "Missing keys or data" },
      { status: 400 }
    );
  }

  const keyArray = Array.isArray(keys) ? keys : [keys];
  const stream = new Readable({ read() {} });

  // Process updates in the background
  (async () => {
    try {
      for (let i = 0; i < keyArray.length; i++) {
        const key = keyArray[i];
        const oldData: Record<string, any> = await redis.get(key);

        await redis.set(key, { ...oldData, ...data });

        stream.push(
          `data: ${JSON.stringify({
            type: "progress",
            current: i + 1,
            total: keyArray.length,
            key,
            status: "updated",
          })}\n\n`
        );

        await new Promise((resolve) => setTimeout(resolve, 10));
      }

      stream.push(
        `data: ${JSON.stringify({
          type: "complete",
          message: `Successfully updated ${keyArray.length} items`,
        })}\n\n`
      );
    } catch (error) {
      stream.push(
        `data: ${JSON.stringify({
          type: "error",
          message: "Failed to update items",
          error: error.message,
        })}\n\n`
      );
    } finally {
      // End
      stream.push(null);
    }
  })();

  return createStreamingResponse(stream);
}
