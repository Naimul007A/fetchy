import { BadRequest } from "@/lib/exceptions";
import { fetchTiktokContent } from "./scrapers/api";
import { TiktokResponse } from "@/types/api/downloader";

export const fetchTiktokContentJson = async (
  url: string,
  timeout: number = 5000
) => {
  const result: TiktokResponse | null = await fetchTiktokContent(url, timeout);
  if (result) {
    return result;
  }

  throw new BadRequest(
    "Unfortunately, this video may be private or does not exist",
    404
  );
};
