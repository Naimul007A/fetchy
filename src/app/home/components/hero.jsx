"use client";;
import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import { Link } from "@/app/components/link";
import Galaxy from "./galaxy";

const HeroSection = () => {
    return (
        <section className="w-[calc(100vw-2rem)] sm:container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 mx-auto">
            <div className="min-h-[calc(100vh-10rem-57px)] md:min-h-[calc(100vh-16rem-57px)] flex flex-col justify-evenly">
                <div className="flex flex-col space-y-6">
                    <div className="text-3xl modern:text-5xl md:text-6xl font-bold flex">
                        <h1 className="inline text-center lg:text-left">
                            <span className="inline bg-gradient-to-r from-[#7837d1] to-[#cba6ff] text-transparent bg-clip-text">
                                Fetchy,
                            </span>{" "}
                            Download Anything, Anywhere, Anytime.
                        </h1>
                    </div>
                    <p className="text-md text-center lg:text-left modern:text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                        Fetchy isn’t just another free video downloader. It’s your all-in-one tool to save everything from Instagram, Facebook, and TikTok — no watermarks, no fluff, just speed and simplicity.
                        Whether it’s a reel, post, photo, or even a Facebook story, Fetchy’s got your back. Many other tools miss the mark — Fetchy hits it dead center.
                    </p>
                </div>
                <div className="gap-4 md:gap-4 px-2 md:px-0 flex flex-col md:flex-row lg:justify-start justify-center">
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
