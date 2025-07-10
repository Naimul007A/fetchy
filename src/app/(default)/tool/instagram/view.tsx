"use client";
import { useState } from "react";

import OpenSource from "@/components/open-source";
import { InstagramResponse } from "@/types/api/downloader";
import GlobalResultView from "../components/GlobalResultView";
import { animated, useTransition } from "@react-spring/web";
import DownloaderHero from "../components/hero";
import DownloadTool from "../components/DownloadTool";
import HowToUseFetchy from "../components/howtouse";
import Bold from "../components/bold";
import Anchor from "../components/anchor";
import { BSL_1_1, FETCHY_GITHUB } from "@/constants";
import DownloaderFAQ from "../components/faq";

const faqs = [
  {
    id: "can-i-download-instagram-reels-with-fetchy",
    question: "Can I download Instagram Reels with Fetchy?",
    answer:
      "Absolutely! Just paste the Reel link into Fetchy and hit download. No watermarks, no quality loss, no BS.",
  },
  {
    id: "does-fetchy-work-with-instagram-posts",
    question: "Does Fetchy work with Instagram post videos?",
    answer:
      "Yup! Fetchy supports downloading videos from standard Instagram posts, including single videos and carousel video posts.",
  },
  {
    id: "is-instagram-story-download-supported",
    question: "Can I download Instagram stories with Fetchy?",
    answer:
      "Currently, Fetchy does not support story downloads. We're working on adding it in a future update stay tuned!",
  },
  {
    id: "is-fetchy-free-for-instagram-downloads",
    question: "Is Fetchy free for Instagram downloads?",
    answer:
      "100% free. No paywalls, no subscriptions. Fetchy is open source and always free to use.",
  },
  {
    id: "does-fetchy-add-watermarks-to-instagram-videos",
    question: "Does Fetchy add watermarks to Instagram videos?",
    answer:
      "Never. All Instagram videos downloaded through Fetchy come clean no watermarks or branding.",
  },
  {
    id: "is-instagram-login-required-to-use-fetchy",
    question: "Do I need to log into Instagram to use Fetchy?",
    answer:
      "Nope! You can download public Instagram content without logging in. Just paste the link and go.",
  },
  {
    id: "can-i-use-fetchy-on-mobile-to-download-instagram-reels",
    question: "Can I use Fetchy on mobile to download Instagram Reels?",
    answer:
      "Yes! Fetchy is fully responsive and optimized for mobile browsers. Works like a charm on any device.",
  },
  {
    id: "how-do-i-copy-an-instagram-link-to-use-with-fetchy",
    question: "How do I copy an Instagram link to use with Fetchy?",
    answer:
      "Tap the three dots on the post or reel, select 'Copy Link', then paste it into Fetchy. Easy peasy.",
  },
  {
    id: "can-i-download-private-instagram-videos",
    question: "Can Fetchy download private Instagram videos?",
    answer:
      "No. For privacy reasons, Fetchy only supports public content. Private videos require access and are not downloadable through Fetchy.",
  },
  {
    id: "is-fetchy-safe-for-instagram-downloads",
    question: "Is Fetchy safe for Instagram downloads?",
    answer:
      "Definitely. Fetchy doesn’t collect any personal info and doesn’t ask for your Instagram login. It’s clean, secure, and open source.",
  },
  {
    id: "can-i-download-multiple-instagram-videos",
    question: "Can I download multiple Instagram videos?",
    answer:
      "Yes, one by one. Just paste each link and download. Batch support isn’t available yet, but it's on our roadmap.",
  },
  {
    id: "can-i-contribute-to-instagram-downloader-open-source",
    question: "Can I contribute to Fetchy’s Instagram downloader?",
    answer: `Totally! Head over to our <a href='${FETCHY_GITHUB}' target='_blank' rel='noopener noreferrer'><strong>GitHub</strong></a> to contribute, suggest features, or report bugs.`,
  },
  {
    id: "what-content-types-does-instagram-downloader-support",
    question: "What content types does Fetchy support from Instagram?",
    answer:
      "Currently, Fetchy supports Reels, regular post videos, and carousel videos/images. Stories and private content are not supported yet.",
  },
];

const InstagramDownloaderView = () => {
  const [data, setData] = useState<InstagramResponse | null>(null);
  const [processingTime, setProcessingTime] = useState("");

  const transition = useTransition(data, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 210, friction: 20 },
  });

  return (
    <>
      <DownloaderHero platform="instagram" />

      <DownloadTool
        whitelisted={["instagram.com"]}
        platform="instagram"
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
                Download Instagram Reels, Posts & More with Fetchy
              </h2>

              <div className="max-w-none">
                <p className="text-neutral-300 mb-4">
                  Whether it&apos;s a viral reel, a carousel post, or a high
                  quality video, <Anchor href="/">Fetchy</Anchor> is your go to
                  Instagram content downloader. No watermarks, no sign ups, no
                  sketchy redirects just paste the link and download.
                </p>

                <p className="text-neutral-300 mb-4">
                  Unlike most tools out there, <Anchor href="/">Fetchy</Anchor>{" "}
                  is an open source project focused on
                  <Bold> speed</Bold>, <Bold> simplicity</Bold>, and
                  reliability. It supports reels, post videos, and more content
                  handling all with clean, instant downloads.
                </p>

                <p className="text-neutral-300 mb-4">
                  Most Instagram downloaders are packed with popups or make you
                  wait forever. Fetchy is built different optimized for mobile
                  and desktop links, and designed to skip the nonsense so you
                  get your content fast.
                </p>

                <p className="text-neutral-300 mb-4">
                  Since Fetchy is open source under the{" "}
                  <Anchor href={BSL_1_1} className="underline">
                    BSL 1.1
                  </Anchor>{" "}
                  license, you’re free to contribute, explore the code, or even
                  run your own instance locally. No ads, no paywalls just tech
                  that respects you.
                </p>

                <p className="text-neutral-300 mb-4">
                  Whether you’re backing up your content, saving inspirational
                  clips, or downloading videos for offline viewing, Fetchy makes{" "}
                  <Bold>Instagram</Bold> downloading <Bold>easy</Bold>,{" "}
                  <Bold>safe</Bold>, and <Bold>open</Bold>.
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

export default InstagramDownloaderView;
