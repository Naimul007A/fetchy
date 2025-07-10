import { FETCHY_BASE_URL } from "@/constants";

export const metatag = (
  pageTitle: string,
  pageUrl: string,
  robots: string,
  keywords: string[] = []
) => {
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

  return {
    title: pageTitle,
    canonical: pageUrl,
    keywords: margedkeywords,
    openGraph: {
      title: pageTitle,
      url: pageUrl,
      siteName: pageTitle,
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
      title: pageTitle,
      creator: "@prassamin78",
      images: [fav],
    },
    alternates: {
      canonical: pageUrl,
      languages: { "en-US": pageUrl },
    },
    robots: robots,
    structuredData: {
      name: pageTitle,
      url: pageUrl,
    },
  };
};
