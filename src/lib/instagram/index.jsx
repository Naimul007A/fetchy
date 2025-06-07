import { BadRequest } from "@/lib/exceptions";
import { fetchFromGraphQL } from "./scrapers/graphql";
import { resolveRedirectUrl } from "../utils";

export const getPostId = (url) => {
  const postRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/p\/([a-zA-Z0-9_-]+)\/?/;
  const reelRegex =
    /^https:\/\/(?:www\.)?instagram\.com\/reels|reel?\/([a-zA-Z0-9_-]+)\/?/;

  let postId;

  if (!url) {
    throw new BadRequest("Instagram URL was not provided", 400);
  }

  const postCheck = url.match(postRegex);
  if (postCheck) {
    postId = postCheck.at(-1);
  }

  const reelCheck = url.match(reelRegex);
  if (reelCheck) {
    postId = reelCheck.at(-1);
  }

  if (!postId) {
    throw new BadRequest("Instagram post/reel ID was not found", 400);
  }

  return postId;
};

export const fetchInstaContentJson = async (
  url, timeout
) => {
  if (/\/stories|highlights\//.test(url)) {
    throw new BadRequest("Downloading stories and highlights is not supported yet", 400);
  }

  const orgUrl = await resolveRedirectUrl({
    url, headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.8",
      Host: "www.instagram.com",
      referrer: "https://www.instagram.com/",
    }
  })

  const postId = getPostId(orgUrl.url);

  const apiJson = await fetchFromGraphQL(postId, timeout);
  if (apiJson) return apiJson;

  throw new BadRequest("Video link for this post is not public.", 401);
};
