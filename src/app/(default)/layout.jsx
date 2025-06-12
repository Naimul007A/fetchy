import "../globals.css";
import 'nprogress/nprogress.css';
import { Progress } from "../components/progress";
import { Suspense } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/sidebar";
import { Toaster } from "@/components/ui/sonner";
import BottomNavigation from "../components/bottomNav";

import CanvasBackground from "@/app/components/background";
import GoogleAna from "@/lib/GoogleAna";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
export { metadata, viewport } from "../layout";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true} className="overflow-x-hidden scroll-smooth">
      <body
        className={cn(`antialiased overflow-hidden bg-black font-sans`)}
      >
        <Suspense fallback={null}>
          <Progress />
        </Suspense>
        <CanvasBackground />
        <SidebarProvider>
          <AppSidebar />
          <main
            className="w-full flex items-start
                 justify-center md:max-h-full max-h-[calc(100vh-56px-env(safe-area-inset-bottom))] pb-14 md:pb-0 overflow-auto"
          >
            {children}
          </main>
          <Toaster />
        </SidebarProvider>
        <BottomNavigation />

        {/* <Script type='text/javascript' src='//stinklistedtobacco.com/d0/7b/28/d07b28b3691bcf72dff435e793eaa941.js'></Script> */}
        <Script async="async" data-cfasync="false" src="//stinklistedtobacco.com/e55b236cf17ff5980817944f93bec602/invoke.js"></Script>
        <Analytics />
        <SpeedInsights />
        <GoogleAna />
      </body>
    </html>
  );
}
