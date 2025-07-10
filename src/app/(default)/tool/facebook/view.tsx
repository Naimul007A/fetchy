"use client";
import { useState } from "react";

import OpenSource from "@/components/open-source";
import {
  FacebookStoryResponse,
  FacebookVideoResponse,
} from "@/types/api/downloader";
import GlobalResultView from "../components/GlobalResultView";
import { animated, useTransition } from "@react-spring/web";
import DownloaderHero from "../components/hero";
import DownloadTool from "../components/DownloadTool";
import FBStoryResultView from "../components/FBStoryResultView";
import FBLiveResultView from "../components/FBLiveResultView";
import Anchor from "../components/anchor";
import Bold from "../components/bold";
import HowToUseFetchy from "../components/howtouse";
import DownloaderFAQ from "../components/faq";
import { BSL_1_1, FETCHY_GITHUB } from "@/constants";

const FacebookDownloaderView = () => {
  const [data, setData] = useState<
    FacebookVideoResponse | FacebookStoryResponse | null
  >(null);
  const [processingTime, setProcessingTime] = useState("");

  const transition = useTransition(data, {
    from: { opacity: 0, transform: "translateY(20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 210, friction: 20 },
  });

  const faqs = [
    {
      id: "can-i-download-facebook-reels-with-fetchy",
      question: "Can I download Facebook reels with Fetchy?",
      answer:
        "Absolutely! Just paste the link and you're good to go—no watermark, no fuss.",
    },
    {
      id: "does-fetchy-work-on-mobile",
      question: "Does Fetchy work on mobile?",
      answer:
        "Yup. It's fully responsive and works smoothly on all modern browsers across devices.",
    },
    {
      id: "is-fetchy-free-to-use",
      question: "Is Fetchy free to use?",
      answer:
        "100%. No hidden fees, no sign-ups. It's open source and always will be.",
    },
    {
      id: "do-i-need-to-sign-up-to-use-fetchy",
      question: "Do I need to sign up to use Fetchy?",
      answer:
        "Nope! Fetchy is completely sign-up free. Just paste your link and download your content instantly.",
    },
    {
      id: "can-fetchy-download-private-facebook-videos",
      question: "Can Fetchy download private Facebook videos?",
      answer:
        "Currently, Fetchy supports only public Facebook content. We're exploring secure ways to support private media in the future.",
    },
    {
      id: "what-type-of-facebook-links-does-fetchy-support",
      question: "What type of Facebook links does Fetchy support?",
      answer:
        "Fetchy supports video links, story links, reels, and even shortened or mobile versions of Facebook URLs.",
    },
    {
      id: "is-there-a-limit-to-how-many-downloads-i-can-do",
      question: "Is there a limit to how many downloads I can do?",
      answer:
        "No limits here! Fetchy is built for open use. Download as much content as you need without restrictions.",
    },
    {
      id: "what-is-the-best-way-to-copy-facebook-links-for-fetchy",
      question: "What is the best way to copy Facebook links for Fetchy?",
      answer:
        "On mobile, tap the 'Share' button and then 'Copy Link'. On desktop, copy the URL from the address bar.",
    },
    {
      id: "is-fetchy-safe-to-use",
      question: "Is Fetchy safe to use?",
      answer:
        "Definitely. Fetchy is open source and doesn’t collect any personal data. Your usage stays private and secure.",
    },
    {
      id: "does-fetchy-add-watermarks",
      question: "Does Fetchy add watermarks?",
      answer:
        "Never. Fetchy ensures your downloaded content is watermark free and untouched.",
    },
    {
      id: "can-i-contribute-to-fetchy",
      question: "Can I contribute to Fetchy?",
      answer: `Yes! Fetchy is open source. Visit our <a href='${FETCHY_GITHUB}' target='_blank' rel='noopener noreferrer'><strong>GitHub</strong></a> repo to report issues, suggest features, or contribute code.`,
    },
  ];

  return (
    <>
      <DownloaderHero platform="facebook" />

      <DownloadTool
        whitelisted={[
          "facebook.com",
          "l.facebook.com",
          "fb.watch",
          "www.facebook.com",
          "m.facebook.com",
          "web.facebook.com",
        ]}
        platform="facebook"
        onDataReady={setData}
        onProcessingCalculated={setProcessingTime}
      />

      {transition((style, item) =>
        item ? (
          <animated.div style={style}>
            {item.type === "story" ? (
              <FBStoryResultView
                data={item as FacebookStoryResponse}
                processingTime={processingTime}
              />
            ) : item.type === "live" ? (
              <FBLiveResultView
                data={item as FacebookVideoResponse}
                processingTime={processingTime}
              />
            ) : (
              <GlobalResultView
                data={item as FacebookVideoResponse}
                processingTime={processingTime}
              />
            )}
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
                Download Facebook Videos, Stories & More with Fetchy
              </h2>

              <div className="max-w-none">
                <p className="text-neutral-300 mb-4">
                  Whether it&apos;s a viral video, a story, or a reel,{" "}
                  <Anchor href="/">Fetchy</Anchor> is your all in one Facebook
                  content downloader built to handle it all. No watermarks, no
                  slowdowns, no login required, just paste your link and go.
                </p>

                <p className="text-neutral-300 mb-4">
                  Unlike most tools out there, <Anchor href="/">Fetchy</Anchor>{" "}
                  is an open source solution built for <Bold>speed</Bold>,{" "}
                  <Bold>simplicity</Bold>, and reliability. It supports most
                  types of content and delivers clean, fast downloads without
                  the junk. Some formats aren’t supported <Bold>yet</Bold>, but
                  we’re actively working on it and everything the average user
                  needs is already good to go.
                </p>

                <p className="text-neutral-300 mb-4">
                  Most tools either bombard you with ads or limit what you can
                  save. Fetchy flips the script. It&apos;s clean, efficient, and
                  respects your time. Behind the scenes, our backend is
                  optimized to handle even the most complex Facebook URLs,
                  including shortened links, mobile formats, and redirects.
                </p>

                <p className="text-neutral-300 mb-4">
                  Plus, since Fetchy is open source under the{" "}
                  <Anchor href={BSL_1_1} className="underline">
                    BSL 1.1
                  </Anchor>{" "}
                  license, you&apos;re free to peek under the hood, contribute
                  to the code, or run it yourself, no paywalls, no
                  subscriptions, just community driven tech for everyone.
                </p>

                <p className="text-neutral-300 mb-4">
                  Perfect for creators, students, and everyday users, Fetchy
                  makes Facebook content downloading <Bold>effortless</Bold> and{" "}
                  <Bold>trustworthy</Bold>.
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

export default FacebookDownloaderView;
