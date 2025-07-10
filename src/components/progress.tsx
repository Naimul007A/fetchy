"use client";
import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "./nprogress";

NProgress.configure({ showSpinner: false });
NProgress.setColor("#7f22fe");
export function Progress() {
  const pathname = usePathname();
  const renderId = useRef(Date.now());
  const searchParams = useSearchParams();
  useEffect(() => {
    NProgress.done();
    return () => {
      NProgress.remove();
    };
  }, [pathname, searchParams, renderId.current]);
  return null;
}
