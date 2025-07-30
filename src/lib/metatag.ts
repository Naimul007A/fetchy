import { FETCHY_BASE_URL } from "@/constants";

export const metatag = ({
  title,
  url,
  robots = "index, follow",
  keywords = [],
  description,
}: {
  title: string;
  url: string;
  robots?: string;
  keywords?: string[];
  description?: string;
}) => {
  const fav = `${FETCHY_BASE_URL}/logo.svg`;

  const fixedKeywords = [
    "PRAS",
    "Fetchy",
    "Video Downloader",
    "Free Video Downloader",
    "Download Video",
    "Download Video Free",
    "Tiktok Video Downloader",
    "Tiktok",
    "Tiktok Downloader",
    "Tiktok Music Downloader",
    "Tiktok Music",
    "Tiktok Photo Downloader",
    "Facebook Video Downloader",
    "Facebook",
    "Facebook Downloader",
    "Facebook Story Downloader",
    "Facebook Reel Downloader",
    "download Facebook stories",
    "save Facebook story video",
    "Facebook story saver",
    "HD Facebook story download",
    "Instagram Video Downloader",
    "Instagram",
    "Instagram Downloader",
    "Instagram Photo Downloader",
    "Instagram Reel Downloader",
    "Free Downloader",
  ];

  const margedkeywords = fixedKeywords.concat(keywords);

  const m: any = {
    title: title,
    canonical: url,
    keywords: margedkeywords,
    openGraph: {
      title: title,
      url: url,
      siteName: title,
      images: [
        {
          url: fav,
          width: 1200,
          height: 630,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      title: title,
      creator: "@prassamin78",
      images: [fav],
    },
    alternates: {
      canonical: url,
      languages: { "en-US": url },
    },
    robots: robots,
    structuredData: {
      name: title,
      url: url,
    },
  };

  if (description) m.description = description;
  return m;
};
