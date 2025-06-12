'use client';;
import dynamic from 'next/dynamic';
import "plyr-react/plyr.css";

const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

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