"use client";
import { useState } from "react";

import OpenSource from "@/components/open-source";
import { TiktokResponse } from "@/types/api/downloader";
import GlobalResultView from "../components/GlobalResultView";
import { animated, useTransition } from "@react-spring/web";
import DownloaderHero from "../components/hero";
import DownloadTool from "../components/DownloadTool";
import Bold from "../components/bold";
import Anchor from "../components/anchor";
import { BSL_1_1 } from "@/constants";
import HowToUseFetchy from "../components/howtouse";
import DownloaderFAQ from "../components/faq";

const faqs = [
  {
    id: "can-i-download-tiktok-videos-without-watermark",
    question: "Can I download TikTok videos without watermark using Fetchy?",
    answer:
      "Yes! Fetchy removes watermarks from downloaded TikTok videos automatically no extra steps needed.",
  },
  {
    id: "does-fetchy-support-tiktok-slideshows",
    question: "Does Fetchy support downloading TikTok slideshows?",
    answer:
      "Yup! Fetchy fully supports TikTok slideshows. Just copy the post link and paste it in to download.",
  },
  {
    id: "is-fetchy-free-for-tiktok-downloads",
    question: "Is Fetchy free for downloading TikTok videos and content?",
    answer:
      "Totally free. No hidden fees, no accounts required. Fetchy is open source and always will be.",
  },
  {
    id: "do-i-need-an-account-to-use-fetchy",
    question: "Do I need a TikTok or Fetchy account to download?",
    answer:
      "Nope! Just paste your link into Fetchy and go. No sign ups or logins ever.",
  },
  {
    id: "does-fetchy-support-tiktok-playlists",
    question: "Does Fetchy support TikTok playlists or collections?",
    answer:
      "Not yet! TikTok playlist support is on our radar and coming soon. For now, you can download individual posts and videos.",
  },
  {
    id: "can-i-use-fetchy-on-mobile",
    question: "Can I use Fetchy to download TikToks on my phone?",
    answer:
      "Definitely. Fetchy is mobile friendly and works smoothly in any modern browser on any device.",
  },
  {
    id: "is-there-a-download-limit-on-fetchy",
    question: "Is there a limit to how many TikToks I can download?",
    answer:
      "No limits. Download as many TikToks as you want Fetchy’s built for open, unrestricted use.",
  },
  {
    id: "is-fetchy-safe-and-private",
    question: "Is Fetchy safe and private to use?",
    answer:
      "Yes! Fetchy doesn’t track you, collect data, or store history. It’s open source and privacy focused.",
  },
  {
    id: "can-i-contribute-to-fetchy",
    question: "Can I contribute to Fetchy or run my own TikTok downloader?",
    answer:
      "Heck yeah. Visit our <a href='https://github.com/PRASSamin/fetchy' target='_blank' rel='noopener noreferrer'><strong>GitHub</strong></a> to fork, contribute, suggest features, or report bugs.",
  },
];

const TiktokDownloaderView = () => {
  const [data, setData] = useState<TiktokResponse | null>(null);
  const [processingTime, setProcessingTime] = useState("");

  const transition = useTransition(data, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 210, friction: 20 },
  });

  return (
    <>
      <DownloaderHero platform="tiktok" />

      <DownloadTool
        whitelisted={["tiktok.com", "vm.tiktok.com", "vt.tiktok.com"]}
        platform="tiktok"
        onDataReady={setData}
        onProcessingCalculated={setProcessingTime}
      />

      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            <GlobalResultView data={item} processingTime={processingTime} />
          </animated.div>
        ) : null
      )}

      <div className="w-full bg-gradient-to-b from-black to-neutral-900">
        <OpenSource className="bg-gradient-to-b from-black to-neutral-900 !w-full !max-w-full !py-16" />
      </div>

      <section id="seo-content" className="pt-16 pb-6 bg-neutral-900">
        <div className="max-w-[calc(100%-1rem)] md:container mx-auto md:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col">
              <h2 className="text-3xl text-white mb-6 font-montserrat">
                Download TikTok Videos, Slideshows & Audios with Fetchy
              </h2>

              <div className="max-w-none">
                <p className="text-neutral-300 mb-4">
                  Whether it&apos;s a trending <Bold>video</Bold>, a vibey{" "}
                  <Bold>slideshow</Bold>, or an addicting TikTok{" "}
                  <Bold>sound</Bold>, <Anchor href="/">Fetchy</Anchor> lets you
                  save it instantly. Just paste the link, hit download, and
                  you’re set no watermark, no app install, no login.
                </p>

                <p className="text-neutral-300 mb-4">
                  Unlike clunky TikTok saver sites,{" "}
                  <Anchor href="/">Fetchy</Anchor> is an{" "}
                  <Bold>open source</Bold> project built for <Bold>speed</Bold>,{" "}
                  <Bold>simplicity</Bold>, and privacy. It supports all major
                  content types including public videos, slideshows, and
                  standalone audio tracks.
                </p>

                <p className="text-neutral-300 mb-4">
                  Some newly introduced TikTok features like{" "}
                  <Bold>playlist collections</Bold> aren’t supported{" "}
                  <Bold>yet</Bold>, but don’t sweat it we&apos;re actively
                  tracking updates and expanding support fast. Most users
                  already have everything they need.
                </p>

                <p className="text-neutral-300 mb-4">
                  Fetchy’s backend is fine tuned to handle tricky links like{" "}
                  <Bold>shortened URLs</Bold>, <Bold>mobile redirects</Bold>,
                  and even TikTok share URLs from within the app. It just works,
                  no matter where you&apos;re copying from.
                </p>

                <p className="text-neutral-300 mb-4">
                  As always, Fetchy is fully open under the{" "}
                  <Anchor href={BSL_1_1} className="underline">
                    BSL 1.1
                  </Anchor>{" "}
                  license. That means you can fork it, contribute, or even run
                  your own instance locally. No paywalls, no rate limits just
                  pure, community powered downloading.
                </p>

                <p className="text-neutral-300 mb-4">
                  Loved by creators, students, and archivists alike
                  <Bold>Fetchy</Bold> is your all in one solution for{" "}
                  <Bold>safe</Bold>, <Bold>clean</Bold>, and{" "}
                  <Bold>hassle free</Bold> TikTok content saving.
                </p>
              </div>
            </div>

            <HowToUseFetchy />
            <DownloaderFAQ faqs={faqs} />
          </div>
        </div>
      </section>
    </>
  );
};

export default TiktokDownloaderView;
