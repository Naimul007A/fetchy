"use client";;
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";

import axios from "axios";
import { toast } from "sonner";
import UrlInput from "@/app/components/UrlInput";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { AlertTriangle, Loader, Image as LucideImage } from "lucide-react";
import { Volume2 } from 'lucide-react';
import { VolumeOff } from 'lucide-react';
import { SquarePlay } from 'lucide-react';
import { downloadFile } from "@/utils";
import { BetterImage, BetterVersion, Img, Fallback } from "@/components/ui/BetterImage";
import { Root } from "@/app/root";
import { GitHub } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { enableInstagram } from "@/conf";

const InstagramDownloaderView = () => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [data, setData] = useState(null);
    const router = useRouter();

    const fetchVideoData = async (url) => {
        try {
            const response = await axios.post(
                '/api/video/instagram',
                { url },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-Download-Url': url,
                    }
                }
            );
            setData(response.data.data);
        } catch (err) {
            if (err.response?.status === 401) {
                toast.error("Session expired, please refresh the page", {
                    dismissible: false,
                    duration: 20000,
                    action: {
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
            <Card className={`w-full m-2 sm:m-5 lg:m-10 bg-card/10 backdrop-blur-[7px] ${enableInstagram ? "min-h-[calc(100vh-16px)] sm:min-h-[calc(100vh-40px)] lg:min-h-[calc(100vh-80px)]" : "min-h-auto"}`}>

                <CardHeader className="min-h-[240px] bg-[hsl(280,7%,8%)] rounded-t-lg flex flex-col justify-center items-center mb-5 relative">
                    <CardTitle className="text-2xl">Instagram Downloader</CardTitle>
                    <CardDescription className="text-xs">Download Instagram videos and photos</CardDescription>

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
                <CardContent className={`${enableInstagram ? "min-h-[240px] " : "min-h-auto"}`}>
                    {!enableInstagram ? <div className="w-full h-full flex flex-col items-center justify-center space-y-4 p-6 bg-zinc-900/30 rounded-lg border border-dashed border-zinc-700">
                        <AlertTriangle className="w-10 h-10 text-yellow-400" />
                        <p className="text-center text-base font-medium text-zinc-200">Instagram Downloader Currently Unavailable</p>
                        <p className="text-center text-sm text-zinc-400 max-w-md">We&apos;re experiencing issues with our Instagram downloading service. Please try again later or check back soon.</p>
                    </div> : <div className="w-full flex flex-col gap-10">
                        <div className="w-full xl:w-1/2 xl:self-center">
                            <UrlInput
                                allowedDomains={["instagram.com"]}
                                onFetch={fetchVideoData}
                            />
                        </div>
                        {data && <div className="w-full grid grid-cols-5 gap-4">
                            <div className="order-last md:order-last lg:order-first sm:order-first col-span-5 sm:col-span-2 md:col-span-5 lg:col-span-2 xl:col-span-1">
                                <AspectRatio ratio={9 / 16} className="relative bg-muted rounded-lg">
                                    {/* Main Image */}
                                    <BetterImage
                                        className="rounded-lg object-cover object-center"
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority
                                        alt={data?.id}
                                        src={data?.thumbnail}
                                    />

                                    <div className="absolute rounded-lg inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

                                    {/* Avatar and Text */}
                                    <div className="absolute top-2 left-2 flex items-center gap-1 p-2 overflow-hidden w-full">
                                        <a href={data?.owner?.profile_url} target="_blank" rel="noopener noreferrer">
                                            <BetterImage
                                                className="rounded-full !w-8 !h-8 border border-white"
                                                width={150}
                                                height={150}
                                                alt={data?.owner?.name}
                                                src={data?.owner?.profile_pic}
                                            />
                                        </a>
                                        <a className="truncate" href={data?.owner?.profile_url} target="_blank" rel="noopener noreferrer">
                                            <p className="text-xs font-bold text-white truncate">{data?.owner?.username}</p>
                                        </a>
                                    </div>
                                </AspectRatio>
                            </div>
                            <div className=" col-span-5 sm:col-span-3 md:col-span-5 lg:col-span-3 xl:col-span-4 flex flex-col gap-2">
                                <p className="text-md font-bold w-full text-center border py-2 rounded bg-[hsl(280,7%,8%)]/60 ">Download Information</p>
                                <div className="w-full flex flex-wrap items-center gap-2 justify-center">
                                    {data?.resources?.length > 0 && data.resources.map((resource, index) => {
                                        return (
                                            <HoverCard key={index} openDelay={0} closeDelay={0}>
                                                <Dialog>
                                                    <HoverCardTrigger asChild>
                                                        <DialogTrigger asChild>
                                                            <div className="bg-background/40 rounded-lg max-w-28 w-28 h-28 border-muted border hover:bg-muted/50 hover:border-muted-foreground hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center gap-3">
                                                                <div className="flex gap-2">{resource?.type === "image" ? <LucideImage className="w-5 h-5" /> : resource?.type === "video" ? <SquarePlay className="w-5 h-5" /> : null}
                                                                    {resource?.type === "video" && resource?.has_audio ? <Volume2 className="w-5 h-5" /> : resource?.type === "video" && !resource?.has_audio ? <VolumeOff className="w-5 h-5" /> : resource?.type === "audio" ? <Volume2 className="w-5 h-5" /> : null}
                                                                </div>
                                                                <p className="text-sm font-bold select-none">{resource?.quality ? resource?.quality : resource?.width && resource?.height ? `${resource.width}x${resource.height}` : resource?.bitrate}</p>
                                                            </div>
                                                        </DialogTrigger>
                                                    </HoverCardTrigger>
                                                    <DialogContent className="sm:max-w-md p-2 z-[1500] flex flex-col items-center justify-center max-h-[95vh] gap-2">
                                                        <DialogTitle className="w-full flex flex-row items-center gap-2 justify-end">
                                                            <Button onClick={() => downloadFile(resource?.baseURL, resource?.filename, resource?.type, setIsDownloading)} variant="default" size="sm">{isDownloading ? <Loader className="animate-spin" size={20} /> : "Download"}</Button>
                                                            <DialogClose asChild>
                                                                <Button variant="outline" size="sm" className="!mt-0 border-muted">Close</Button>
                                                            </DialogClose>
                                                        </DialogTitle>
                                                        <DialogFooter className="flex w-full h-full overflow-hidden items-center justify-center">
                                                            {resource?.type === "image" ?
                                                                <BetterVersion>
                                                                    <Img
                                                                        priority
                                                                        src={resource?.baseURL}
                                                                        width={resource?.width}
                                                                        height={resource?.height}
                                                                        alt={resource?.id}></Img>
                                                                    <Fallback className="min-h-[300px] max-h-full" />
                                                                </BetterVersion>
                                                                : resource?.type === "audio" ?
                                                                    <audio controls src={resource?.baseURL} width={resource?.width} height={resource?.height} alt={resource?.id} className="rounded w-full mt-10"></audio>
                                                                    :
                                                                    <video controls src={resource?.baseURL} width={resource?.width} height={resource?.height} alt={resource?.id}></video>
                                                            }
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                <HoverCardContent className="w-40 h-40 p-0 relative flex items-center justify-center">
                                                    {resource?.type === "audio" ? <Volume2 /> : <BetterImage
                                                        priority
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        className="p-3 object-cover object-center rounded-lg"
                                                        src={resource?.thumbnail}
                                                        alt={resource?.id}></BetterImage>}
                                                </HoverCardContent>
                                            </HoverCard>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>}
                    </div>}
                </CardContent>
                <div id="container-e55b236cf17ff5980817944f93bec602"></div>
            </Card>
        </Root>
    )
}

export default InstagramDownloaderView