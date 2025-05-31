import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BadRequest } from "./exceptions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isRedirectorUrl = ({
  regex,
  url,
}: {
  regex: RegExp[];
  url: string;
}) => {
  const redirectorPatterns = regex;
  return redirectorPatterns.some((pattern) => pattern.test(url));
};

export const resolveRedirectUrl = async ({
  url,
  headers,
  maxHops = 5,
}: {
  url: string;
  headers?: Record<string, string>;
  maxHops?: number;
}): Promise<string> => {
  let currentUrl = url;
  let hopCount = 0;

  while (hopCount < maxHops) {
    try {
      const response = await axios.get(currentUrl, {
        maxRedirects: 0,
        headers,
        validateStatus: (status) => status >= 200 && status < 400,
      });

      if (
        response.status >= 300 &&
        response.status < 400 &&
        response.headers.location
      ) {
        currentUrl = response.headers.location.startsWith("http")
          ? response.headers.location
          : new URL(response.headers.location, currentUrl).toString();
        hopCount++;
      } else {
        return currentUrl;
      }
    } catch (error: any) {
      if (error.response && error.response.headers?.location) {
        currentUrl = error.response.headers.location.startsWith("http")
          ? error.response.headers.location
          : new URL(error.response.headers.location, currentUrl).toString();
        hopCount++;
      } else {
        console.error("Failed to resolve redirect URL:", error);
        throw new BadRequest("Failed to resolve redirect URL");
      }
    }
  }

  throw new BadRequest("Too many redirect hops");
};
