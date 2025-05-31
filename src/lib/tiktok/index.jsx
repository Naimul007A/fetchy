import { BadRequest } from "@/lib/exceptions";
import { fetchTiktokContent } from "./scrapers/api";
import { resolveRedirectUrl } from "../utils";
import { isRedirectorUrl } from "../utils";

export const fetchTiktokContentJson = async (url, timeout = 5000) => {
    const resolvedUrl = isRedirectorUrl({
        regex: [
            /https?:\/\/(?:vm|vt)\.tiktok\.com\/[A-Za-z0-9]+/
        ],
        url
    }) ? await resolveRedirectUrl({
        url, headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
            Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.8",
            Host: "www.tiktok.com",
            "Alt-Used": "www.tiktok.com",
            referrer: "https://www.tiktok.com/",
        }
    }) : url;

    const result = await fetchTiktokContent(resolvedUrl, timeout);
    if (result) {
        return result;
    }

    throw new BadRequest("Unfortunately, this video may be private or does not exist", 401);
};
