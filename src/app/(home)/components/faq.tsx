import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FETCHY_GITHUB } from "@/constants";
import { fluid } from "@/utils/fluid";

const FAQ = () => {
  const FAQList = [
    {
      question: "What makes Fetchy better than other video downloaders?",
      answer:
        "Most downloaders are super basic — they choke on Facebook stories or Instagram carousels. Fetchy handles Instagram reels, multi-photo posts, TikTok slideshows, and even Facebook stories like a champ. Lightweight, fast, and built with real love.",
      value: "item-1",
    },
    {
      question: "Can I use Fetchy as a Facebook Story Downloader?",
      answer:
        "Hell yes! Fetchy isn't just another downloader, it actually supports Facebook story downloads, including those that most tools can't touch. Just paste the story link and let Fetchy work its magic.",
      value: "item-2",
    },
    {
      question: "Can I download private or expired stories?",
      answer:
        "Nah, we play fair. Fetchy only works with public and active content. No creepy stuff. We respect user privacy and platform rules.",
      value: "item-3",
    },
    {
      question: "Is it free? Will there be annoying ads?",
      answer:
        "100% free. No subscriptions, no popups from hell. Just one clean banner ad to keep the server lights on, your UX stays smooth as silk.",
      value: "item-4",
    },
    {
      question:
        "Is it legal to download videos from Instagram, Facebook, or TikTok?",
      answer:
        "It depends how you use it. Fetchy is meant for personal use only, like saving your own content or public stuff you have permission to grab. Always respect creators and terms of service.",
      value: "item-5",
    },
    {
      question: "Why don’t you charge for this?",
      answer: `Fetchy’s a passion project — built for learning, sharing, and helping people. We believe in giving back. But hey, if you vibe with it, <a href='${FETCHY_GITHUB}' target='_blank' rel='noreferrer noopener'><strong>drop a star on GitHub 💖</strong></a>`,
      value: "item-6",
    },
  ];
  return (
    <section
      id="faq"
      className="bg-gradient-to-b from-background to-neutral-900"
    >
      <div className="max-w-[calc(100vw-1rem)] px-0 container mx-auto pb-8">
        <div className="flex flex-col">
          <div className="mb-10 text-center">
            <h2 className="bg-gradient-to-r from-foreground to-purple-600 text-transparent bg-clip-text inline-block text-3xl md:text-4xl font-bold mb-1 font-montserrat">
              Frequently Asked Questions
            </h2>
            <p
              style={{
                fontSize: fluid("0.875rem", "1rem") as string,
                lineHeight: fluid("1.25rem", "1.5rem") as string,
              }}
              className="text-muted-foreground"
            >
              Quick answers to common questions about Fetchy.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQList.map(({ question, answer, value }) => (
              <AccordionItem
                className="focus-within:ring-0"
                key={value}
                value={value}
              >
                <AccordionTrigger
                  style={{
                    fontSize: fluid("0.875rem", "1rem") as string,
                    lineHeight: fluid("1.25rem", "1.5rem") as string,
                  }}
                  className="outline-none text-left cursor-pointer"
                >
                  {question}
                </AccordionTrigger>
                <AccordionContent
                  style={{
                    fontSize: fluid("0.875rem", "1rem") as string,
                    lineHeight: fluid("1.25rem", "1.5rem") as string,
                  }}
                >
                  <p dangerouslySetInnerHTML={{ __html: answer }} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
