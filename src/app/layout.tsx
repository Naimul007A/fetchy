import { cn } from "@/utils";
import "./globals.css";
import { Russo_One } from "next/font/google";
import "nprogress/nprogress.css";
import { Montserrat } from "next/font/google";
import { Manrope } from "next/font/google";
import { Rethink_Sans } from "next/font/google";
import { FETCHY_BASE_URL } from "@/constants";
import { Suspense } from "react";
import { Progress } from "@/components/progress";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { GoogleAnalytics } from "@/lib/GoogleAnalytics";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const rethink = Rethink_Sans({
  weight: ["400", "800"],
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
});

const russo = Russo_One({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const manrope = Manrope({
  weight: ["400", "700"],
  style: "normal",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#09090b",
};

const title = "Fetchy - Ultimate Video Downloader";
const description =
  "Fetchy - The ultimate free video downloader for everyone. Download high-quality videos and photos from Instagram, Facebook, and TikTok with one click. Free, easy, and efficient!";

export const metadata = {
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96" },
      { url: "/favicon-192x192.png", sizes: "192x192" },
      { url: "/favicon-512x512-any.png", sizes: "512x512" },
      { url: "/favicon.svg" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
  publisher: "PRAS",
  appleWebApp: {
    title: "Fetchy",
  },
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
  },
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    image: {
      "@type": "ImageObject",
      url: `${FETCHY_BASE_URL}/favicon.svg`,
      width: 1200,
      height: 630,
    },
  },
  copyright: "© 2024 PRAS",
};

export default function DefaultRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TooltipProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            `antialiased bg-background font-sans overflow-x-hidden`
          )}
        >
          <Suspense fallback={null}>
            <Progress />
          </Suspense>
          <Toaster />
          {children}
          <Analytics />
          <SpeedInsights />
          <GoogleAnalytics />
        </body>
      </html>
    </TooltipProvider>
  );
}
