"use client";
import { cn } from "@/utils";
import { Link } from "lucide-react";
import { PasteIcon } from "@/components/icons/paste";
import { BoltIcon } from "@/components/icons/bolt";
import { fluid } from "@/utils/fluid";

const HowToUseFetchy: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const steps = [
    {
      icon: (
        <Link
          style={{
            width: fluid("1.25rem", "1.5rem") as string,
            height: fluid("1.25rem", "1.5rem") as string,
          }}
          className="text-white/75"
        />
      ),
      title: "Copy the Link",
      description:
        "Go to the content you want to download, tap Share, then Copy Link. Boom, first step done!",
      badgeColor: "bg-purple-600",
    },
    {
      icon: (
        <PasteIcon
          style={{
            width: fluid("1.25rem", "1.5rem") as string,
            height: fluid("1.25rem", "1.5rem") as string,
          }}
          className="text-white/75"
        />
      ),
      title: "Paste on Fetchy",
      description:
        "Jump back here, paste the copied link into Fetchy’s input, and hit that slick Download button.",
      badgeColor: "bg-rose-500",
    },
    {
      icon: (
        <BoltIcon
          style={{
            width: fluid("1rem", "1.25rem") as string,
            height: fluid("1rem", "1.25rem") as string,
          }}
          className="text-white/75"
        />
      ),
      title: "Download & Enjoy",
      description:
        "Wait just a sec while we fetch it for you. Then download, no watermark, no BS.",
      badgeColor: "bg-emerald-500",
    },
  ];

  return (
    <div {...props} className={cn("flex flex-col mt-10", className)}>
      <h2 className="text-3xl text-white mb-5 font-montserrat">
        How to Use Fetchy
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              padding: fluid("1rem", "1.5rem") as string,
            }}
            className="relative bg-white/5 rounded-2xl border border-white/10 hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:border-purple-500/30 transition-all overflow-hidden group"
          >
            <span className="absolute -right-2 -bottom-6 text-9xl font-rethink font-extrabold text-neutral-900 z-0 select-none [text-shadow:-0.3px_0_rgba(85,85,85,0.8),0_0.3px_rgba(85,85,85,0.8),0.3px_0_rgba(85,85,85,0.8),0_-0.3px_rgba(85,85,85,0.8)]">
              {index + 1}
            </span>

            <div
              style={{
                width: fluid("2.5rem", "3rem") as string,
                height: fluid("2.5rem", "3rem") as string,
              }}
              className="relative z-10 rounded-full flex items-center justify-center mb-4 bg-neutral-900/90"
            >
              {step.icon}
            </div>

            <h3
              style={{
                fontSize: fluid("1rem", "1.25rem") as string,
                lineHeight: fluid("1.25rem", "1.5rem") as string,
              }}
              className="text-white font-semibold mb-2 relative z-10"
            >
              {step.title}
            </h3>
            <p
              style={{
                fontSize: fluid("0.875rem", "1.125rem") as string,
                lineHeight: fluid("1.25rem", "1.75rem") as string,
              }}
              className="text-muted-foreground text-lg relative z-10 leading-relaxed"
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowToUseFetchy;
