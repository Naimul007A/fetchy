import Home from "./view";
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

export default async function HomePage() {
  return <Home />;
}

HomePage.displayName = "HomePage";

export async function generateMetadata() {
  const headersList = await headers();
  const url = new URL(headersList.get("x-current-url") ?? "");
  return metatag({
    title: "Fetchy - Ultimate Video Downloader",
    url: url.toString(),
  });
}
