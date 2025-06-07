"use client";;
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
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Loader, Image as LucideImage } from "lucide-react";
import { Volume2 } from 'lucide-react';
import { VolumeOff } from 'lucide-react';
import { SquarePlay } from 'lucide-react';
import { downloadFile, renderVideo } from "@/utils";
import { BetterImage, BetterVersion, Img, Fallback } from "@/components/ui/BetterImage";
import { useState } from "react";

const RegularView = ({ data }) => {
    const [isDownloading, setIsDownloading] = useState(false);
    const [isRendering, setIsRendering] = useState(false);

    return (
        <div className="w-full grid grid-cols-5 gap-4">
            <div className="order-last md:order-last lg:order-first sm:order-first col-span-5 sm:col-span-2 md:col-span-5 lg:col-span-2 xl:col-span-1">
                <AspectRatio ratio={9 / 16} className="relative bg-muted rounded-lg">
                    {/* Main Image */}
                    <BetterImage
                        className="rounded-lg object-cover object-center"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        fill
                        alt={data?.id}
                        src={data?.thumbnail}
                    />

                    <div className="absolute rounded-lg inset-0 bg-gradient-to-b from-black/40 to-transparent"></div>

                    {/* Avatar and Text */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 p-2 overflow-hidden w-full">
                        <a href={data?.owner?.profile_url} target="_blank" rel="noopener noreferrer">
                            <BetterImage
                                className="rounded-full w-8 h-8 border border-white"
                                width={150}
                                height={150}
                                alt={data?.owner?.name || data?.owner?.username}
                                src={data?.owner?.profile_pic}
                            />
                        </a>
                        <a className="truncate" href={data?.owner?.profile_url} target="_blank" rel="noopener noreferrer">
                            <p className="text-xs font-bold text-white truncate">{data?.owner?.username || data?.owner?.name}</p>
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
                                                    {resource?.has_audio ? <Volume2 className="w-5 h-5" /> : !resource?.has_audio && <VolumeOff className="w-5 h-5" />}
                                                </div>
                                                <p className="text-sm font-bold select-none">{resource?.quality ? resource?.quality : resource?.width && resource?.height ? `${resource.width}x${resource.height}` : resource?.bitrate}</p>
                                            </div>
                                        </DialogTrigger>
                                    </HoverCardTrigger>
                                    <DialogContent className="sm:max-w-md p-2 z-[1500] flex flex-col items-center justify-center">
                                        <DialogTitle className="w-full flex flex-row items-center gap-2 justify-end">
                                            {resource.type === "video" && !resource.has_audio && <Button
                                                onClick={() => renderVideo(resource?.baseURL, data?.resources?.filter((r) => r?.type === "audio")[0].baseURL, resource?.filename, setIsRendering)}
                                                variant="default"
                                                size="sm"
                                            >
                                                {isRendering ? <Loader className="animate-spin" size={20} /> : "Render"}
                                            </Button>}
                                            <Button
                                                onClick={() => downloadFile(resource?.baseURL, resource?.filename, resource?.type, setIsDownloading)}
                                                variant="default"
                                                size="sm"
                                            >
                                                {isDownloading ? <Loader className="animate-spin" size={20} /> : "Download"}
                                            </Button>
                                            <DialogClose asChild>
                                                <Button variant="outline" size="sm" className="!mt-0 border-muted">Close</Button>
                                            </DialogClose>
                                        </DialogTitle>
                                        <DialogFooter className="flex items-center justify-center">
                                            <div className="w-full h-full flex justify-center items-center">
                                                {resource?.type === "image" ? (
                                                    <BetterVersion>
                                                        <Img
                                                            src={resource?.baseURL}
                                                            className="max-w-full max-h-[calc(95vh-32px)] object-contain"
                                                            width={resource?.width}
                                                            height={resource?.height}
                                                            alt={resource?.id}></Img>
                                                        <Fallback className="min-h-[300px] max-h-full" />
                                                    </BetterVersion>
                                                ) : (
                                                    <video
                                                        controls
                                                        src={resource?.baseURL}
                                                        className="max-w-full max-h-[calc(95vh-32px)] object-contain"
                                                        alt={resource?.id}
                                                    />
                                                )}
                                            </div>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <HoverCardContent className="w-40 h-40 p-0 relative flex items-center justify-center">
                                    {resource?.thumbnail ? <BetterImage
                                        priority
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className=" object-cover object-center p-3 rounded-lg"
                                        src={resource?.thumbnail}
                                        alt={resource?.id}></BetterImage> : <Volume2 />}
                                </HoverCardContent>
                            </HoverCard>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default RegularView
