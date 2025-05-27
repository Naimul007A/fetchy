import { BadRequest } from "@/lib/exceptions";
import { fetchFromFbGraphQL } from "./scrapers/graphql";
import axios from "axios";

const isRedirectorUrl = (url) => {
    const redirectorPatterns = [
        /https?:\/\/(?:l\.facebook\.com|fb\.watch|facebook\.com\/l\.php)[^\s]*/
    ];
    return redirectorPatterns.some((pattern) => pattern.test(url));
};

export const resolveRedirectUrl = async (url) => {
    try {
        const response = await axios.get(url, {
            maxRedirects: 0,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.8",
                cookie: "datr=YL6OZ9N5-1Lklte7br433knu; sb=YL6OZ4dJAzSXgjX7oX9o4K2F; wd=775x834; ps_l=1; ps_n=1",
                Host: "www.facebook.com",
                "Alt-Used": "www.facebook.com"

            },
            validateStatus: (status) => status >= 200 && status < 400
        });

        if (response.headers.location) {
            return response.headers.location;
        }
        return url;
    } catch (error) {
        if (error.response && error.response.headers.location) {
            return error.response.headers.location;
        }
        console.error("Failed to resolve redirect URL:", (error.response.headers));
        throw new BadRequest("Failed to resolve redirect URL");
    }
};

// Extract Facebook content ID from URL
export const getContentFbId = (url) => {
    const videoRegex = /\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/;
    const storyRegex = /stories\/(\d+)/;

    let contentId;

    if (!url) {
        throw new BadRequest("Facebook URL was not provided");
    }

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

export const fetchContentJson = async (url, timeout) => {
    try {
        const isRedirector = isRedirectorUrl(url);

        if (isRedirector) {
            throw new BadRequest(
                "Apologies, we currently don't support redirector links. However, you can still download your content! Simply open the link in your browser, allow it to redirect you to the original URL, copy that URL, and paste it here again. It should work perfectly!"
            );
        }
        
        const urlDet = getContentFbId(url);

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
