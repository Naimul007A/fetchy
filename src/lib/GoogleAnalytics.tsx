import Script from "next/script";

export const GoogleAnalytics = () => {
  const gtagId = process.env.NEXT_PUBLIC_GTAG;
  return (
    <>
      <Script
        strategy="afterInteractive"
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`}
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${gtagId}');
        `}
      </Script>
    </>
  );
};
