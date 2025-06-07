"use client";

import { useRouter as useRouterImpl } from "next/navigation";
import NProgress from "nprogress";

export const useRouter = () => {
    const router = useRouterImpl();

    const safeWrap = async (fn, href) => {
        if (window.location.pathname === href) return
        NProgress.start();
        await fn();
    };

    return {
        push: (href) => safeWrap(() => router.push(href), href),
        replace: (href) => safeWrap(() => router.replace(href), href),
        refresh: () => safeWrap(() => router.refresh()),
        back: () => safeWrap(() => router.back()),
        forward: () => safeWrap(() => router.forward()),
    };
};