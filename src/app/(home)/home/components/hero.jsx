"use client";;
import { useEffect, useState, useRef } from "react";
import { useRouter } from "@/hooks/useRouter";
import { animated, useTransition } from "@react-spring/web";
import { toast } from "sonner";
import { GitHub } from "@mui/icons-material";

import { tools } from "../../../components/tool.list";
import { Button, buttonVariants } from "@/components/ui/button";
import Galaxy from "./galaxy";

const Tag = ({ label, color }) => {
    const bgMap = {
        purple: "bg-purple-600/80",
        orange: "bg-orange-500/80",
        blue: "bg-blue-600/80",
        green: "bg-green-500/80",
        yellow: "bg-yellow-400/90 text-black",
    };

    return (
        <div
            className={`absolute top-1 right-1 px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${bgMap[color] ?? "bg-white/20"}`}
        >
            {label}
        </div>
    );
};

const HeroSection = () => {
    const router = useRouter();
    const [isChoiceOpen, setIsChoiceOpen] = useState(false);
    const [height, setHeight] = useState(0);
    const popupRef = useRef(null);
    const popupWrapperRef = useRef(null);

    const transitions = useTransition(isChoiceOpen, {
        from: { opacity: 0, transform: "scale(0.9)" },
        enter: { opacity: 1, transform: "scale(1)" },
        leave: { opacity: 0, transform: "scale(0.9)" },
        config: { tension: 250, friction: 20 },
    });

    const
        [popupPosition, setPopupPosition] = useState({
            left: "0px",
            top: "100%",
        });

    useEffect(() => {
        const calcHeight = () => {
            setHeight(window.innerHeight - 57);
        };
        window.addEventListener("resize", calcHeight);
        calcHeight();
        return () => window.removeEventListener("resize", calcHeight);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setIsChoiceOpen(false);
            }
        };

        if (isChoiceOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isChoiceOpen]);

    useEffect(() => {
        if (!isChoiceOpen || !popupWrapperRef.current || !popupRef.current) return;

        const wrapperRect = popupWrapperRef.current.getBoundingClientRect();
        const popupRect = popupRef.current.getBoundingClientRect();

        const spaceRight = window.innerWidth - wrapperRect.left;
        const spaceBottom = window.innerHeight - wrapperRect.bottom;

        let left = "0px";
        let top = "100%";

        if (spaceRight < popupRect.width) {
            left = `-${popupRect.width - wrapperRect.width}px`;
        }

        if (spaceBottom < popupRect.height + 10) {
            top = `-${popupRect.height + 10}px`;
        }

        setPopupPosition({ left, top });
    }, [isChoiceOpen]);

    return (
        <section
            style={{ minHeight: height }}
            className="max-w-[calc(100vw-1rem)] modern:max-w-[calc(100vw-2rem)] container mx-auto grid lg:grid-cols-2 gap-16 items-center relative"
        >
            {/* TEXT SIDE */}
            <div className="flex flex-col gap-20 lg:gap-10 relative">
                <div className="space-y-6 text-center lg:text-left">
                    <h1 className="~text-4xl/6xl font-black leading-tight">
                        <span className="bg-gradient-to-r from-[#7837d1] to-[#cba6ff] text-transparent bg-clip-text">
                            Fetchy,
                        </span>{" "}
                        Download Anything, Anywhere, Anytime.
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                        Fetchy isn’t just another free video downloader. It’s your all-in-one tool to save everything from Instagram, Facebook, and TikTok — no watermarks, no fluff, just speed and simplicity.
                        Whether it’s a reel, post, photo, or even a Facebook story, Fetchy’s got your back.
                    </p>
                </div>

                {/* CTA AREA */}
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-2 relative">
                    <div className="relative w-full sm:w-auto" ref={popupWrapperRef}>
                        <Button onClick={() => setIsChoiceOpen(!isChoiceOpen)} className="w-full sm:w-auto py-5">
                            Get Started
                        </Button>

                        {transitions((style, item) =>
                            item && (
                                <animated.div
                                    ref={popupRef}
                                    style={{
                                        ...style,
                                        position: "absolute",
                                        left: popupPosition.left,
                                        top: popupPosition.top,
                                        marginTop: popupPosition.top === "100%" ? "5px" : undefined,
                                        marginBottom: popupPosition.top !== "100%" ? "5px" : undefined,
                                    }}
                                    className="w-[320px] sm:w-[400px] rounded-2xl shadow-2xl backdrop-blur-md border border-white/10 bg-white/5 overflow-hidden z-[2000]"
                                >
                                    <div className="grid grid-cols-3 gap-3 p-4 max-h-[400px] overflow-y-auto">
                                        {tools().map((tool, index) => {
                                            const isComing = tool.isAvailable === "coming";
                                            const isDisabled = !tool.isAvailable || isComing;

                                            return (
                                                <div
                                                    key={index}
                                                    className={`relative group cursor-pointer transition-all duration-300 ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.05]"}`}
                                                    onClick={() => {
                                                        if (isDisabled) {
                                                            toast.info("This tool is not available right now.");
                                                            return;
                                                        }
                                                        router.push(tool.url);
                                                        setIsChoiceOpen(false);
                                                    }}
                                                >
                                                    <div className="w-full aspect-square rounded-xl bg-[#121212]/50 border border-white/10 flex flex-col items-center justify-center p-3 gap-2 text-white text-sm hover:bg-white/10 transition-all">
                                                        <tool.icon className="text-white text-2xl" />
                                                        <span className="text-center text-xs font-medium">{tool.title}</span>
                                                    </div>

                                                    {tool.isNew && <Tag label="NEW" color="purple" />}
                                                    {tool.isHot && <Tag label="HOT" color="orange" />}

                                                    {isDisabled && (
                                                        <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center text-xs text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity select-none">
                                                            {isComing ? "Coming Soon" : "Not Available"}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </animated.div>
                            )
                        )}
                    </div>

                    <a
                        rel="noopener noreferrer"
                        href="https://github.com/PRASSamin/fetchy"
                        target="_blank"
                        className={`w-full sm:w-auto inline-flex items-center justify-center py-5 ${buttonVariants({ variant: "outline" })}`}
                    >
                        Star on GitHub
                        <GitHub className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* GALAXY SIDE */}
            <div className="hidden lg:flex justify-center items-center z-10">
                <Galaxy />
            </div>
        </section>
    );
};

export default HeroSection;