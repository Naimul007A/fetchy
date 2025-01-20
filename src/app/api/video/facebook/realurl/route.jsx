import { NextResponse } from "next/server";
import { handleError } from "../../helper";

export async function POST(request) {
    try {
        const { url } = await request.json();

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.8",
                "Referer": "https://www.facebook.com/",
                "Origin": "https://www.facebook.com",
                "Host": "www.facebook.com",
            },
            maxRedirects: 0,
            validateStatus: (status) => status >= 200 && status < 400,
        });

        if (response.headers.location) {
            return NextResponse.json({ url: response.headers.location }, { status: 200 });
        }
    } catch (error) {
        if (error.response && error.response.headers.location) {
            return NextResponse.json({ url: error.response.headers.location }, { status: 200 });
        }
        return handleError(error);
    }
}