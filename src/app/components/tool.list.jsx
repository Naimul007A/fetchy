import { Instagram, Facebook } from "@mui/icons-material";
import { TiktokIcon as Tiktok } from "./icons/tiktok";

export const tools = () => {
    return [
        {
            title: "Instagram",
            icon: Instagram,
            isHot: true,
            url: "/tool/instagram",
            description: "Download Instagram videos, reels, and photos.",
            feature: ["Videos", "Reels", "Photos", "Carousels"],
            isAvailable: true,
            isNew: false
        },
        {
            title: "Facebook",
            icon: Facebook,
            isHot: false,
            url: "/tool/facebook",
            description: "Download Facebook videos, reels, and stories",
            feature: ["Videos", "Reels", "Stories"],
            isAvailable: true,
            isNew: false
        },
        {
            title: "Tiktok",
            icon: Tiktok,
            isHot: false,
            url: "/tool/tiktok",
            description: "Download Tiktok videos, slideshows and music.",
            feature: ["Videos", "Slideshows", "Music"],
            isAvailable: true,
            isNew: false
        }
    ]
}