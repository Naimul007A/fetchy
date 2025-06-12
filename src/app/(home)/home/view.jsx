"use client";;
import React from "react";
import CursorProvider from "./components/cursor";
import Navigation from "./components/nav";
import Footer from "./components/footer";
import HeroSection from "./components/hero";
import FAQ from "./components/faq";
import BottomNavigation from "../../components/bottomNav";

import Image from "next/image";
import { Support } from "./components/support";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Toaster />
      <style>
        {
          `
          body {
          overflow: auto !important;
          }
        `
        }
      </style>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen w-full pt-3 pb-8 bg-background">
          <Image width={100} height={100} src="/logo.png" className="w-20 preloader" alt="preloader" />
        </div>
      ) : (
        <CursorProvider>
          {window.innerWidth > 768 ? (
            <Navigation className={"hidden md:block"} />
          ) : (
            <BottomNavigation />
          )}
          <main className="min-h-[calc(100vh-48px-env(safe-area-inset-bottom)-60px)]">
            <HeroSection />
            <FAQ />
            <Support />
          </main>
          <Footer />
        </CursorProvider>
      )}
    </>
  );
}
