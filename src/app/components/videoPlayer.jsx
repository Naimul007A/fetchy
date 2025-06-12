'use client';;
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

export default function VideoPlayer({ src, className = "", ...props }) {

    return (
        <div className={`relative w-full aspect-video ${className}`}>
            <Plyr
                src={src}
                options={{
                    controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'captions',
                        'settings',
                        'pip',
                        'airplay',
                        'download',
                        'fullscreen',
                    ],
                    settings: ['captions', 'quality', 'speed'],
                }}
                {...props}
            />
        </div>
    );
}