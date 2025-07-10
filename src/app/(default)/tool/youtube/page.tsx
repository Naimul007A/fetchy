import YoutubeDownloaderView from "./view";
import { metatag } from "@/lib/metatag";
import { headers } from "next/headers";

export default async function YoutubeDownloaderPage() {
  return <YoutubeDownloaderView />;
}

YoutubeDownloaderPage.displayName = "YoutubeDownloaderPage";

export async function generateMetadata() {
  const headersList = await headers();
  const url = new URL(headersList.get("x-current-url") ?? "").toString();
  return metatag("Youtube Downloader | Fetchy", url, "index, follow");
}
