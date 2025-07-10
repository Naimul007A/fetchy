import Script from "next/script";
import Navigation from "@/components/navigation-bar";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <>
        <Navigation />
        {children}
        <Footer />
        <Script
          async
          data-cfasync="false"
          src="//stinklistedtobacco.com/e55b236cf17ff5980817944f93bec602/invoke.js"
        ></Script>
      </>
    </>
  );
}
