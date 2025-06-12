"use client";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Copy, CopyCheck, SquarePlay, Volume2, VolumeOff } from 'lucide-react';
import { BetterImage } from "@/components/ui/BetterImage";
import { useState } from "react";
import { toast } from "sonner";

const LiveView = ({ data }) => {
    const [isCopying, setIsCopying] = useState(false);

    const copyToClipboard = (text) => {
        setIsCopying(true);
        navigator.clipboard.writeText(text);
        toast.success("Copied!", {
            description: "DASH URL has been copied to clipboard.",
        });
        setTimeout(() => setIsCopying(false), 2000);
    };

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
            <div className="col-span-5 sm:col-span-3 md:col-span-5 lg:col-span-3 xl:col-span-4 flex flex-col gap-2">
                <p className="text-md font-bold w-full text-center border py-2 rounded bg-[hsl(280,7%,8%)]/60">Live Stream Information</p>
                <div className="w-full flex flex-wrap items-center gap-2 justify-center">
                    {data?.resources?.length > 0 && data.resources.map((resource, index) => (
                        <HoverCard key={index} openDelay={0} closeDelay={0}>
                            <Dialog>
                                <HoverCardTrigger asChild>
                                    <DialogTrigger asChild>
                                        <div className="bg-background/40 rounded-lg max-w-28 w-28 h-28 border-muted border hover:bg-muted/50 hover:border-muted-foreground hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center justify-center gap-3">
                                            <div className="flex gap-2"><div className="relative">
                                                <div className="absolute inset-0 z-10">
                                                    <span className="relative flex h-2 w-2">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                                                        <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
                                                    </span>
                                                </div>
                                                {resource?.type === "video" ? <SquarePlay className="w-5 h-5" /> : null}</div>
                                                {resource?.has_audio ? <Volume2 className="w-5 h-5" /> : !resource?.has_audio && <VolumeOff className="w-5 h-5" />}
                                            </div>
                                            <p className="text-sm font-bold select-none">{resource?.quality ? resource?.quality : resource?.width && resource?.height ? `${resource.width}x${resource.height}` : resource?.bitrate}</p>
                                        </div>
                                    </DialogTrigger>
                                </HoverCardTrigger>
                                <DialogContent className="sm:max-w-md p-6 z-[1500] flex flex-col">
                                    <DialogTitle className="text-center mb-4">Live Stream Information</DialogTitle>
                                    <div className="space-y-4">
                                        <p className="text-sm text-muted-foreground">
                                            This is a live stream and cannot be downloaded directly. Please try again after the live session ends to access the VOD.
                                        </p>
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">DASH URL (For VLC/Players):</p>
                                            <div className="flex items-center gap-2">
                                                <code className="flex-1 p-2 bg-muted rounded text-xs truncate">
                                                    {resource?.baseURL}
                                                </code>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="aspect-square"
                                                    onClick={() => copyToClipboard(resource?.baseURL)}
                                                    disabled={isCopying}
                                                >

                                                    {isCopying ? <CopyCheck className="h-4 w-4 " /> : <Copy className="h-4 w-4 " />}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <DialogClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DialogClose>
                                    </div>
                                </DialogContent>
                            </Dialog>
                            <HoverCardContent className="w-40 h-40 p-0 relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <SquarePlay className="w-12 h-12 text-muted-foreground" />
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LiveView;