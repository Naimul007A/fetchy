import { BoltIcon } from "@/components/icons/bolt";
import { PasteIcon } from "@/components/icons/paste";
import { useWhitelisted } from "@/hooks/useWhitelisted";
import { cn } from "@/utils";
import { useKeybindy } from "@keybindy/react";
import axios from "axios";
import { Link, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fluid } from "@/utils/fluid";

const EXAMPLE_URLS = {
  instagram: {
    url: "https://www.instagram.com/reel/CrP-cWGONf8",
    placeholder: "instagram.com/reel/Cr..",
  },
  facebook: {
    url: "https://www.facebook.com/share/r/1ATKSKQVYL/",
    placeholder: "facebook.com/sha...",
  },
  tiktok: {
    url: "https://www.tiktok.com/@fifaclubworldcup/video/7522108591046675734",
    placeholder: "tiktok.com/@fi...",
  },
};

const DownloadTool = ({
  whitelisted,
  platform = "instagram",
  onDataReady,
  onProcessingCalculated,
}: {
  whitelisted: string[];
  platform?: "instagram" | "facebook" | "tiktok";
  onDataReady: (data: any) => void;
  onProcessingCalculated: (time: string) => void;
}) => {
  const { isValid } = useWhitelisted(whitelisted);
  const [url, setUrl] = useState("");
  const urlRef = useRef(url);
  const [isDownloading, setIsDownloading] = useState(false);
  const isDownloadingRef = useRef(isDownloading);
  const binder = useKeybindy({ logs: false });
  const router = useRouter();

  useEffect(() => {
    urlRef.current = url;
  }, [url]);

  useEffect(() => {
    console.log(binder);
    binder.register(["Ctrl", "V"], handlePaste, { preventDefault: true });
    binder.register(
      ["Ctrl", "X"],
      () => {
        setUrl("");
      },
      { preventDefault: true }
    );
    binder.register([["Enter"], ["Numpad Enter"]], fetchVideoData, {
      preventDefault: true,
    });
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text && isValid(text).isValid) {
        setUrl(text);
      } else {
        toast.error(
          "URL is not whitelisted for this tool. Please enter a valid one."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to paste from clipboard");
    }
  };

  const fetchVideoData = async () => {
    if (isDownloadingRef.current) return;
    if (!urlRef.current) {
      toast.error("Please enter a URL");
      return;
    }
    const cleanUrl = isValid(urlRef.current);
    if (!cleanUrl.isValid) {
      toast.error(
        "URL is not whitelisted for this tool. Please enter a valid one."
      );
      return;
    }

    isDownloadingRef.current = true;
    setIsDownloading(true);
    const start = performance.now();

    try {
      const response = await axios.post(
        `/api/dl/${platform}`,
        { url: cleanUrl.url },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Download-Url": cleanUrl.url,
          },
        }
      );
      onDataReady(response.data.data);
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Session expired, please refresh the page", {
          dismissible: false,
          duration: 20000,
          action: {
            label: "Refresh",
            onClick: () => {
              router.refresh();
            },
          },
        });
        return;
      }
      toast.error(err.response?.data?.error || "An error occurred");
    } finally {
      const end = performance.now();
      onProcessingCalculated(`${((end - start) / 1000).toFixed(2)}s`);
      setIsDownloading(false);
      isDownloadingRef.current = false;
    }
  };

  return (
    <section id="download-tool" className="pb-5 md:pb-10 bg-black relative">
      <div className="max-w-[calc(100%-1rem)] md:container mx-auto md:px-6">
        <div className="max-w-3xl mx-auto  relative z-20">
          <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800/50 rounded-xl shadow-xl p-6 md:p-8">
            <h2 className="block capitalize text-neutral-400 mb-2 text-sm">
              {platform} URL
            </h2>

            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <Link size={20} className="text-neutral-400" />
              </div>
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                type="text"
                className="w-full bg-neutral-800/50 border border-neutral-700/50 rounded-lg py-3 pl-12 pr-14 text-white focus:outline-none focus:ring-2 focus:ring-[#7837d1] focus:border-transparent transition-all placeholder:text-sm"
                placeholder={`https://${EXAMPLE_URLS[platform].placeholder}`}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 text-xs font-mono">
                {url.length ? "⌘ + X" : "⌘ + V"}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-6 overflow-hidden">
              <button
                onClick={handlePaste}
                className="px-3 py-1.5 bg-neutral-800 rounded-full text-neutral-400 text-xs flex items-center cursor-pointer hover:bg-neutral-700 transition-colors gap-1.5"
              >
                <PasteIcon size={12} />
                Paste link
              </button>
              <button
                onClick={() => setUrl(EXAMPLE_URLS[platform].url)}
                className="px-3 py-1.5 bg-neutral-800 rounded-full text-neutral-400 text-xs flex items-center cursor-pointer hover:bg-neutral-700 transition-colors"
              >
                Example: {EXAMPLE_URLS[platform].placeholder}
              </button>
            </div>

            <button
              disabled={isDownloading}
              onClick={fetchVideoData}
              style={{
                fontSize: fluid("0.75rem", "1rem") as string,
                lineHeight: fluid("1rem", "1.25rem") as string,
              }}
              className={cn(
                "w-full bg-gradient-to-r from-[#7837d1] to-[#a168e3] text-white py-3 rounded-lg mt-10 transition-all duration-300 shadow-lg shadow-[#7837d1]/20 flex items-center justify-center gap-2 disabled:opacity-50",
                !isDownloading && "hover:from-[#8a42e3] hover:to-[#b47aff]"
              )}
            >
              {isDownloading ? (
                <Loader2
                  style={{
                    width: fluid("1rem", "1.25rem") as string,
                    height: fluid("1rem", "1.25rem") as string,
                  }}
                  className="animate-spin"
                />
              ) : (
                <BoltIcon />
              )}
              Download
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadTool;
