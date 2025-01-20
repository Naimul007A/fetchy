import { handleScraperError } from "@/lib/facebook/scrapers/helpers";
import { _tiktokVideoFetchApiByPRAS } from "@/constants";
import axios from "axios";
import { SSSTik } from "./sssTik";
import { formatSSSTikJson, formatTiktokDataJson } from "./formaters";
import cheerio from "cheerio";
import { Key } from "lucide-react";

export const fetchTiktokContent = async (url, timeout = 0) => {
    if (!url) return null;

    if (/\/photo|music\//.test(url)) {
        try {
            const response = await SSSTik(url)
            return formatSSSTikJson(response.result, url);
        } catch (e) { }
    } else {
        try {
            const response = await ScrapVideo(url)
            return formatTiktokDataJson(response.data);
        } catch (e) {
            console.log(e)
            handleScraperError(e);
            return null;
        }
    }
};


const ScrapVideo = async (url) => {
    if (!url) return null;

    try {
        const response = await fetch(tiktokUrl, {
            method: 'GET',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                'Accept-Language': 'en-US,en;q=0.9',
                'Accept-Encoding': 'gzip, deflate, br',
                Origin: 'https://www.tiktok.com',
                Referer: 'https://www.tiktok.com/',
                Host: 'www.tiktok.com',
                Accept: '*/*',
            },
        });

        if (!response.ok) {
            return null
        }

        const htmlContent = await response.text();
        const $ = cheerio.load(htmlContent);

        const element = $('#__UNIVERSAL_DATA_FOR_REHYDRATION__')
        if (!element) {
            return null
        }

        const data = JSON.parse(element.text())['__DEFAULT_SCOPE__']['webapp.video-detail']?.itemInfo?.itemStruct;
        if (!data) {
            return null
        }

        const headersArray = Array.from(response.headers.entries());

        // Filter the Set-Cookie headers.
        const setCookieHeaders = headersArray.filter(([key]) => key.toLowerCase() === 'set-cookie').map(([, value]) => value);
        const cookies = setCookieHeaders.join('; ');

        const dataForWorker = {
            cookies,
            playAddr: data.video.playAddr,
            downloadAddr: data.video.downloadAddr,
            musicUrl: data.music.playUrl,
            authorAvatar: data.author.avatarLarger,
            authorCover: data.author.cover,
        }

        const responseWorker = await axios.post(_tiktokVideoFetchApiByPRAS, dataForWorker, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
                "Access-Key": process.env.NEXT_CDN_ACCESS_KEY,
                Accept: '*/*',
            }
        });

        if (!responseWorker) {
            return null
        }

        return responseWorker
    } catch {
        return null
    }
}
