"use client";;
import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@mui/icons-material";
import { Button } from "@/components/ui/button";
import Galaxy from "./galaxy";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSpring } from "@react-spring/web";
import Link from "next/link";


const HeroSection = () => {
    const router = useRouter()
    const [isChoiceOpen, setIsChoiceOpen] = useState(false)

    const popupStyle = useSpring({
        transform: isChoiceOpen
            ? "scale(1) translateY(0%)"
            : "scale(0.1) translateY(50%)",
        opacity: isChoiceOpen ? 1 : 0,
        width: isChoiceOpen ? "95%" : "0%",
        height: isChoiceOpen ? "100%" : "0%",
        borderRadius: "10px",
        config: { tension: 300, friction: 20 },
    });

    return (
        <section className="w-[calc(100vw-2rem)] sm:container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10 mx-auto">
            <div className="min-h-[calc(100vh-10rem-57px)] md:min-h-[calc(100vh-16rem-57px)] flex flex-col justify-evenly gap-10 modern:gap-0">
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
                <div className="gap-2 md:gap-4 px-2 md:px-0 flex flex-col md:flex-row lg:justify-start justify-center">
                    {/* <div className="w-full md:w-1/3 relative"> */}
                    <Button
                        // onClick={() => setIsChoiceOpen(!isChoiceOpen)} 
                        className="w-full md:w-1/3">
                        <Link href="/tools"> Get Started</Link>
                    </Button> {/* TODO: */}
                    {/* {isChoiceOpen && <animated.div
                            className="absolute -top-[450%] left-1/2 bg-[#202124] border w-full h-[100%] border-[#46464d] p-5 z-[1400] flex gap-3 flex-wrap justify-start items-start overflow-y-auto"
                            style={{
                                ...popupStyle,
                                transform: "translateX(-50%)",
                                transformOrigin: "center bottom",
                            }}
                        >
                            {tools().map((tool, index) => (
                                <button
                                    key={index}
                                    disabled={!tool.isAvailable}
                                    onClick={() => {
                                        if (!tool.isAvailable) {
                                            toast.info("This tool is not available right now.");
                                            return
                                        }
                                        router.push(tool.url);
                                        setIsChoiceOpen(false);
                                    }}
                                    className={`w-24 h-24 border border-[#37373d] bg-card/30 hover:bg-card/50 flex flex-col items-center justify-center gap-2 rounded-md cursor-pointer transition-all duration-200 ${tool.isAvailable ? "" : "opacity-50"} relative group overflow-hidden ${location && location.pathname === tool.url ? "bg-card/60" : ""}`}
                                >
                                    {<tool.icon />}
                                    <span style={{ fontSize: "0.8rem", fontWeight: "bold" }}>{tool.title}</span>
                                    {tool.isNew || tool.isHot && <span className={`text-xs ${tool.isNew ? "bg-purple-700/50" : "bg-orange-700/50"} font-black w-full h-1 absolute bottom-0 left-0 flex items-center justify-center group-hover:h-4 transition-all duration-300`}><span className="opacity-0 group-hover:opacity-100 transition-all duration-300 uppercase text-xs">{tool.isNew ? "new" : "hot"}</span></span>}
                                </button>
                            ))}
                        </animated.div>} */}
                    {/* </div> */}
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
