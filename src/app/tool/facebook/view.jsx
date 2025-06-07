"use client";;
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import StoryView from "./components/StoryView";
import RegularView from "./components/RegularView";

import axios from "axios";
import { toast } from "sonner";
import UrlInput from "@/app/components/UrlInput";
import { Root } from "@/app/root";
import { GitHub } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { enableFacebook } from "@/conf";
import { AlertTriangle } from "lucide-react";

const FacebookDownloaderView = () => {
    const [data, setData] = useState(null);
    const router = useRouter();

    const fetchVideoData = async (url) => {
        try {
            const response = await axios.post(
                '/api/video/facebook',
                { url },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Download-Url': url
                    }
                }
            );
            setData(response.data.data);
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Session expired, please refresh the page", {
                    dismissible: false,
                    action: {
                        duration: 20000,
                        label: "Refresh",
                        onClick: () => {
                            router.refresh()
                        }
                    }
                });
                return;
            }
            toast.error(err.response?.data?.error || "An error occurred");
        }
    };

    return (
        <Root>
            <Card className={`w-full m-2 sm:m-5 lg:m-10 bg-card/10 backdrop-blur-[7px] ${enableFacebook ? "min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-80px)]" : "min-h-auto"}`}>
                <CardHeader className="min-h-[240px] bg-[hsl(280,7%,8%)] rounded-t-lg flex flex-col justify-center items-center mb-5 relative">
                    <CardTitle className="text-2xl">Facebook Downloader</CardTitle>
                    <CardDescription className="text-xs">Download Facebook reels, videos and stories</CardDescription>
                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/PRASSamin/fetchy"
                        target="_blank"
                        className={`mt-4 inline-flex items-center px-3 py-1.5 text-sm rounded-md border border-zinc-700 hover:bg-zinc-800 transition-colors absolute top-1.5 right-2 ${buttonVariants({ variant: "ghost" })}`}
                    >
                        Star us on GitHub
                        <GitHub className="w-4 h-4" />
                    </a>
                </CardHeader>
                <CardContent className={`${enableFacebook ? "min-h-[240px]" : "min-h-auto"}`}>
                    {!enableFacebook ? <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-6 bg-zinc-900/30 rounded-lg border border-dashed border-zinc-700">
                        <AlertTriangle className="w-10 h-10 text-yellow-400" />
                        <p className="text-center text-base font-medium text-zinc-200">Facebook Downloader Currently Unavailable</p>
                        <p className="text-center text-sm text-zinc-400 max-w-md">We&apos;re experiencing issues with our Facebook downloading service. Please try again later or check back soon.</p>
                    </div> : <div className="w-full flex flex-col gap-10">
                        <div className="w-full xl:w-1/2 xl:self-center">
                            <UrlInput
                                allowedDomains={["facebook.com", "l.facebook.com", "fb.watch", "www.facebook.com", "m.facebook.com"]}
                                onFetch={fetchVideoData}
                            />
                        </div>
                        {data && (data.type === "story" ?
                            <StoryView data={data} /> :
                            <RegularView data={data} />)}
                    </div>}
                </CardContent>
                <div id="container-e55b236cf17ff5980817944f93bec602"></div>
            </Card>
        </Root>
    )
}

export default FacebookDownloaderView