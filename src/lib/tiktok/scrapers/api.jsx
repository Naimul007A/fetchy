import { handleScraperError } from "@/lib/facebook/scrapers/helpers";
import { _tiktokContentFetchApiByPRAS } from "@/constants";
import axios from "axios";
import { formatTiktokJson } from "./formaters";

export const fetchTiktokContent = async (url, timeout = 0) => {
    if (!url) return null;
    try {
        const api = new URL(_tiktokContentFetchApiByPRAS);
        const response = await axios.get(`${_tiktokContentFetchApiByPRAS}${url}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                Origin: api.origin,
                Referer: api.origin,
                Accept: '*/*',
                'X-API-KEY': process.env.NEXT_CDN_API_KEY,
                Host: api.host,
            }
        })
        return formatTiktokJson(response.data);
    } catch (e) {
        handleScraperError(e);
        return null;
    }
};
