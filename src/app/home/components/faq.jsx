import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
    const FAQList = [
        {
            question: "What makes Fetchy better than other video downloaders?",
            answer: "Most downloaders are super basic — they choke on Facebook stories or Instagram carousels. Fetchy handles Instagram reels, multi-photo posts, TikTok slideshows, and even Facebook stories like a champ. Lightweight, fast, and built with real love.",
            value: "item-1",
        },
        {
            question: "Can I use Fetchy as a Facebook Story Downloader?",
            answer: "Hell yes! Fetchy isn't just another downloader — it *actually* supports Facebook story downloads, including those that most tools can't touch. Just paste the story link and let Fetchy work its magic.",
            value: "item-2",
        },
        {
            question: "Can I download private or expired stories?",
            answer: "Nah, we play fair. Fetchy only works with public and active content. No creepy stuff. We respect user privacy and platform rules.",
            value: "item-3",
        },
        {
            question: "Is it free? Will there be annoying ads?",
            answer: "100% free. No subscriptions, no popups from hell. Just one clean banner ad to keep the server lights on — your UX stays smooth as silk.",
            value: "item-4",
        },
        {
            question: "Is it legal to download videos from Instagram, Facebook, or TikTok?",
            answer: "It depends how you use it. Fetchy is meant for personal use only — like saving your own content or public stuff you have permission to grab. Always respect creators and terms of service.",
            value: "item-5",
        },
        {
            question: "Why don’t you charge for this?",
            answer: "Fetchy’s a passion project — built for learning, sharing, and helping people. We believe in giving back. But hey, if you vibe with it, <a href='https://github.com/PRASSamin/fetchy' target='_blank' rel='noreferrer noopener'><strong>drop a star on GitHub 💖</strong></a>",
            value: "item-6",
        },
    ];
    return (
        <section
            id="faq"
            className="container px-2 md:px-0 mx-auto py-5 h-[calc(100vh-57px)]"
        >
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Frequently Asked{" "}
                    <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
                        Questions
                    </span>
                </h2>

                <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                >
                    {FAQList.map(({ question, answer, value }) => (
                        <AccordionItem
                            key={value}
                            value={value}
                        >
                            <AccordionTrigger className="text-left">
                                {question}
                            </AccordionTrigger>
                            <AccordionContent>
                                <p dangerouslySetInnerHTML={{ __html: answer }} />
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    )
}

export default FAQ
