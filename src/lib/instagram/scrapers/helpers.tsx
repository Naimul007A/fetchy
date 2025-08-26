import { BadRequest, TimeoutException } from "@/lib/exceptions";
import { getTimedFilename } from "@/utils";

export const getIGVideoFileName = (id: string) =>
  getTimedFilename(`PRAS_IG_VID_${id}`, "mp4");

export const getIGImageFileName = (id: string) =>
  getTimedFilename(`PRAS_IG_IMG_${id}`, "jpg");

export const getIGAudioFileName = (id: string) =>
  getTimedFilename(`PRAS_IG_AUD_${id}`, "mp3");

export const handleScraperError = (error: Error) => {
  console.error("Scraper error:", error.message);
  if (error.message.includes("status code 404")) {
    throw new BadRequest("This post is private or does not exist", 404);
  } else if (error instanceof TimeoutException) {
    throw new TimeoutException();
  }
};
