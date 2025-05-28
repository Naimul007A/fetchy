"use client";
import { useEffect } from "react";
import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Galaxy from "./galaxy";

const HeroSection = () => {
    useEffect(() => {
        let isScrolling = false;
        let startY = 0;

        const scrollHeight = window.innerHeight - 57;

        const scrollToNextSection = (direction) => {
            if (isScrolling) return;
            isScrolling = true;

            const currentScroll = window.scrollY;
            const newScroll =
                direction === "down"
                    ? Math.ceil(currentScroll / scrollHeight) * scrollHeight + scrollHeight
                    : Math.floor(currentScroll / scrollHeight) * scrollHeight - scrollHeight;

            window.scrollTo({
                top: newScroll,
                behavior: "smooth",
            });

            // Add a delay to prevent multiple scrolls
            setTimeout(() => {
                isScrolling = false;
            }, 1000); // Adjust duration based on scroll speed
        };

        const handleWheel = (e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? "down" : "up";
            scrollToNextSection(direction);
        };

        const handleTouchStart = (e) => {
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            const currentY = e.touches[0].clientY;
            const direction = startY > currentY ? "down" : "up";
            scrollToNextSection(direction);
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
        };
    }, []);


    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 mx-auto">
            <div className="text-center lg:text-start space-y-6 h-[calc(100vh-10rem-57px)] md:h-[calc(100vh-16rem-57px)] flex flex-col justify-between md:justify-start">
                <div className="flex flex-col space-y-6">
                    <main className="text-5xl md:text-6xl font-bold">
                        <h1 className="inline">
                            <span className="inline bg-gradient-to-r from-[#7837d1] to-[#cba6ff] text-transparent bg-clip-text">
                                Fetchy,
                            </span>{" "}
                            Download Anything, Anywhere, Anytime.
                        </h1>
                    </main>
                    <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                        Fetchy isn’t just another free video downloader. It’s your all-in-one tool to save everything from Instagram, Facebook, and TikTok — no watermarks, no fluff, just speed and simplicity.
                        Whether it’s a reel, post, photo, or even a Facebook story, Fetchy’s got your back. Many other tools miss the mark — Fetchy hits it dead center.
                    </p>
                </div>
                <div className="space-y-4 md:space-y-0 md:space-x-4 px-2 md:px-0">
                    <Button asChild className="w-full md:w-1/3">
                        <Link href="/tools">Get Started</Link>
                    </Button>
                    <a
                        rel="noreferrer noopener"
                        href="https://github.com/PRASSamin/fetchy"
                        target="_blank"
                        className={`w-full md:w-1/3 ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        Star on GitHub
                        <GitHub className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>
            <div className="z-10 hidden lg:flex">
                <Galaxy />
            </div>
        </section>
    )
}

export default HeroSection
