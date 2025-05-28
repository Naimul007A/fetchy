"use client";

import { useRouter as useRouterImpl } from "next/navigation";
import NProgress from "nprogress";

export const useRouter = () => {
    const router = useRouterImpl();

    const safeWrap = async (fn) => {
        NProgress.start();
        await fn();
    };

    return {
        push: (href) => safeWrap(() => router.push(href)),
        replace: (href) => safeWrap(() => router.replace(href)),
        refresh: () => safeWrap(() => router.refresh()),
        back: () => safeWrap(() => router.back()),
        forward: () => safeWrap(() => router.forward()),
    };
};