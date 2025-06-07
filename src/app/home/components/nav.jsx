"use client";
import { buttonVariants } from "@/components/ui/button";
import { GitHub } from "@mui/icons-material";
import Image from "next/image";
import { Fragment } from "react";
import { Link } from "@/app/components/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { navItems } from "@/app/components/nav.list";
import { toast } from "sonner";
import { useRouter } from "@/hooks/useRouter";

export default function Navigation({ className }) {
    const tools = navItems().filter((item) => item.title.toLowerCase() === "tools").flatMap((item) => item.subItems);
    const router = useRouter();

    return (
        <Fragment>
            <header className={cn("sticky border-b-[1px] top-0 z-40 w-full  border-b-[#333] bg-background", className)}>
                <NavigationMenu className="mx-auto">
                    <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
                        <NavigationMenuItem className="font-bold flex h-full py-2">
                            <Link
                                rel="noreferrer noopener"
                                href="/"
                                className="ml-2 font-bold text-xl flex"
                            >
                                <Image
                                    src={"/logo.png"}
                                    width={100}
                                    height={100}
                                    alt="fetchy"
                                    className="h-full w-auto"
                                />
                            </Link>
                        </NavigationMenuItem>


                        <div className="flex gap-5">
                            <div className="flex gap-2">
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                            {tools.map((tool, index) => {
                                                const isComing = tool.isAvailable === "coming";
                                                const isDisabled = !tool.isAvailable || isComing;

                                                return (
                                                    <NavigationMenuLink key={index}
                                                        onClick={() => {
                                                            if (isDisabled) {
                                                                toast.info("This tool is not available right now.");
                                                                return;
                                                            }
                                                            router.push(tool.url);
                                                        }}
                                                        className={
                                                            `block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors ${isDisabled ? "" : "hover:bg-accent hover:text-accent-foreground"} focus:bg-accent focus:text-accent-foreground relative`}
                                                    >
                                                        <div className="text-sm font-medium leading-none relative">
                                                            {tool.title}
                                                            {(tool.isHot || tool.isNew) && (
                                                                <span
                                                                    className={`ml-1 text-[10px] font-black px-1.5 py-0.5 absolute top-0 rounded-full ${tool.isHot ? "bg-orange-600" : "bg-purple-700"
                                                                        }`}
                                                                >
                                                                    {tool.isHot ? "hot" : "new"}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                                            {tool.description}
                                                        </p>
                                                        {isDisabled && <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-10 !m-0 rounded-md font-mono">
                                                            <span className="text-white">{isComing ? "Coming Soon" : "Not Available"}</span>
                                                        </div>}
                                                    </NavigationMenuLink>
                                                )
                                            })}
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </div>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                >
                                    <Link
                                        rel="noreferrer noopener"
                                        href="https://github.com/PRASSamin/fetchy"
                                        target="_blank"
                                        className={`border ${buttonVariants({ variant: "ghost" })}`}
                                    >
                                        <GitHub className="mr-2 w-5 h-5" />
                                        Github
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
        </Fragment >
    );
}