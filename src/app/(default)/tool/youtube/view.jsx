"use client";;
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";

import { AlertTriangle } from "lucide-react";
import { GitHub } from "@mui/icons-material";
import { ENABLE_YOUTUBE } from "@/conf";

const YoutubeDownloaderView = () => {
    return (
        <Card className={`w-full m-2 sm:m-5 lg:m-10 bg-card/10 backdrop-blur-[7px] ${ENABLE_YOUTUBE ? "min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-80px)]" : "min-h-auto"}`}>
            <CardHeader className="min-h-[240px] mb-5 bg-[hsl(280,7%,8%)] rounded-t-lg flex flex-col justify-center items-center gap-2 text-center relative">
                <CardTitle className="text-2xl">Youtube Downloader</CardTitle>
                <CardDescription className="text-xs">Coming Soon</CardDescription>
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
            <CardContent className={`flex ${ENABLE_YOUTUBE ? "min-h-[240px]" : "min-h-auto"}`}>
                {!ENABLE_YOUTUBE && <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-6 bg-zinc-900/30 rounded-lg border border-dashed border-zinc-700">
                    <AlertTriangle className="w-10 h-10 text-yellow-400" />
                    <p className="text-center text-base font-medium text-zinc-200">Coming Soon</p>
                    <p className="text-center text-sm text-zinc-400 max-w-md">We are currently working on this feature. Please check back soon.</p>
                </div>
                }
            </CardContent>
            <div id="container-e55b236cf17ff5980817944f93bec602"></div>
        </Card >
    )
}

export default YoutubeDownloaderView