import { BadRequest } from "@/lib/exceptions";
import { fetchFromFbGraphQL } from "./scrapers/graphql";
import { resolveRedirectUrl } from "@/utils";
import { USER_AGENT } from "@/constants";

export function extractFacebookRedirectedUrl(fullUrl: string) {
  try {
    const parsedUrl = new URL(fullUrl);
    const nextParam = parsedUrl.searchParams.get("next");

    if (nextParam) {
      const decodedNext = decodeURIComponent(nextParam);

      // Check if it's a Facebook story URL
      const isStory = /facebook\.com\/stories\/\d+/.test(decodedNext);

      if (isStory) {
        return decodedNext;
      }
    }

    return fullUrl;
  } catch (err) {
    return fullUrl;
  }
}

const facebookVideoIdStoredKeys = ["story_fbid"];

export const getContentFbId = ({
  url,
  html,
}: {
  url: string;
  html?: string;
}): {
  type: "video" | "story";
  contentId: string;
} => {
  const videoRegex = /\/(?:videos|reel|watch)(?:\/?)(?:\?v=)?(\d+)/;
  const storyRegex = /stories\/(\d+)/;
  const postRegex = /\/posts\/(pfbid[^/?]+)/i;

  let contentId: any;

  if (!url) {
    throw new BadRequest("Facebook URL was not provided");
  }

  // Check for post URLs first
  const postCheck = url.match(postRegex);
  if (postCheck)
    throw new BadRequest(
      "We currently don't support extracting content from Facebook posts. This feature will be available soon."
    );

  // video handler
  const videoCheck = url.match(videoRegex);
  if (videoCheck) {
    contentId = videoCheck.at(-1);
    return {
      type: "video",
      contentId,
    };
  }

  // story handler
  const storyCheck = url.match(storyRegex);
  if (storyCheck) {
    contentId = storyCheck.at(-1);
    return {
      type: "story",
      contentId,
    };
  }

  // group content handler
  if (html) {
    const match = html.match(/"permalink_url":"([^"]+)"/);
    if (match) {
      const permalink = decodeURIComponent(
        match[1].replace(/\\u0025/g, "%")
      ).replace(/\\/g, "");
      return getContentFbId({ url: permalink });
    }
  }

  // special case for video
  for (const key of facebookVideoIdStoredKeys) {
    const newUrl = new URL(url);
    const match = newUrl.searchParams.get(key);

    if (match) {
      return {
        type: "video",
        contentId: match,
      };
    }

    const nextUrl = newUrl.searchParams.get("next");
    if (nextUrl) {
      return getContentFbId({
        url: decodeURIComponent(nextUrl),
      });
    }
  }

  throw new BadRequest("Content not found or private.", 404);
};

export const fetchFBContentJson = async (
  url: string,
  timeout: number = 5000
) => {
  try {
    const { url: resolvedUrl, html } = await resolveRedirectUrl({
      url,
      headers: {
        "User-Agent": USER_AGENT,
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.8",
        cookie:
          "datr=YL6OZ9N5-1Lklte7br433knu; sb=YL6OZ4dJAzSXgjX7oX9o4K2F; wd=775x834; ps_l=1; ps_n=1",
        Host: "www.facebook.com",
        referrer: "https://www.facebook.com/",
      },
    });

    const orgUrl = extractFacebookRedirectedUrl(resolvedUrl);
    const urlDet = getContentFbId({ url: orgUrl, html });

    const contentJson = await fetchFromFbGraphQL(
      urlDet.type,
      urlDet.contentId,
      orgUrl,
      timeout
    );

    if (contentJson) return contentJson;

    throw new BadRequest("Content not found or private.", 404);
  } catch (error: any) {
    throw new BadRequest(
      error.message || "An error occurred while fetching content"
    );
  }
};
