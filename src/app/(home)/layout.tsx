import "@/app/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import CanvasBackground from "@/app/components/background";
import GoogleAna from "@/lib/GoogleAna";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { cn } from "@/lib/utils";
import { Progress } from "../components/progress";
import { Suspense } from "react";
export { metadata, viewport } from "../layout";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TooltipProvider>
      <html
        className="overflow-x-hidden scroll-smooth"
        lang="en"
        suppressHydrationWarning={true}
      >
        <body className={cn(`antialiased overflow-hidden bg-black font-sans`)}>
          <Suspense fallback={null}>
            <Progress />
          </Suspense>
          <CanvasBackground />
          {children}
          <Analytics />
          <SpeedInsights />
          <GoogleAna />
        </body>
      </html>
    </TooltipProvider>
  );
}
