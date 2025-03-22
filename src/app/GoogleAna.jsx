import Script from 'next/script';

const GoogleAna = () => {
    return (
        <>
            <Script
                strategy='afterInteractive'
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_GTAG}`}
            />
            <Script
                id='google-analytics'
                strategy='afterInteractive'
            >
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){
            dataLayer.push(arguments);
          }
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_GTAG}');
        `}
            </Script>
        </>
    );
}

export default GoogleAna;
