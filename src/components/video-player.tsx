"use client";
import { cn } from "@/utils";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import React from "react";
import { PlyrSource } from "plyr-react";

const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

export const VideoPlayer: React.FC<
  Omit<React.ComponentProps<typeof Plyr>, "source"> & { source?: PlyrSource }
> = ({ className, source = null, ...props }) => {
  return (
    <div className={cn("relative w-full aspect-video", className)}>
      <Plyr
        options={{
          controls: [
            "play-large",
            "play",
            "progress",
            "current-time",
            "mute",
            "volume",
            "captions",
            "pip",
            "airplay",
            "download",
            "fullscreen",
          ],
          settings: ["captions", "quality", "speed"],
        }}
        source={source}
        {...props}
      />
    </div>
  );
};
