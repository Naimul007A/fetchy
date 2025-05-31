import { BadRequest } from "@/lib/exceptions";
import { fetchFromFbGraphQL } from "./scrapers/graphql";
import { isRedirectorUrl, resolveRedirectUrl } from "../utils";

// Extract Facebook content ID from URL
export const getContentFbId = (url) => {
    const videoRegex = /\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/;
    const storyRegex = /stories\/(\d+)/;
    const postRegex = /\/posts\/(pfbid[^/?]+)/i;

    let contentId;

    if (!url) {
        throw new BadRequest("Facebook URL was not provided");
    }

    // Check for post URLs first
    const postCheck = url.match(postRegex);
    if (postCheck)
        throw new BadRequest("We currently don't support extracting content from Facebook posts. This feature will be available soon.")

    const videoCheck = url.match(videoRegex);
    if (videoCheck) {
        contentId = videoCheck.at(-1);
        return {
            type: "video",
            contentId,
        };
    }

    const storyCheck = url.match(storyRegex);
    if (storyCheck) {
        contentId = storyCheck.at(-1);
        return {
            type: "story",
            contentId,
        };
    }

    return null;
};

export const fetchFBContentJson = async (url, timeout) => {
    try {
        const isRedirector = isRedirectorUrl({
            regex: [
                /https?:\/\/(?:(?:l\.facebook\.com|fb\.watch|(?:www\.)?facebook\.com\/(?:l\.php|share\/[^/]+\/\S*))[^\s]*)/
            ], url
        });
        let orgUrl = url;
        if (isRedirector) {
            orgUrl = await resolveRedirectUrl({
                url, headers: {
                    "User-Agent":
                        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                    Accept:
                        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.8",
                    cookie:
                        "datr=YL6OZ9N5-1Lklte7br433knu; sb=YL6OZ4dJAzSXgjX7oX9o4K2F; wd=775x834; ps_l=1; ps_n=1",
                    Host: "www.facebook.com",
                    referrer: "https://www.facebook.com/",
                }
            })
        }

        const urlDet = getContentFbId(orgUrl);

        const contentJson = await fetchFromFbGraphQL(
            urlDet.type,
            urlDet.contentId,
            timeout
        );

        if (contentJson) return contentJson;

        throw new BadRequest("Video link for this post is not public.", 401);
    } catch (error) {
        throw new BadRequest(
            error.message || "An error occurred while fetching content"
        );
    }
};
