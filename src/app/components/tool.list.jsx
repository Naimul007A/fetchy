import { Instagram, Facebook, YouTube } from "@mui/icons-material";
import { TiktokIcon as Tiktok } from "./icons/tiktok";
import { enableFacebook, enableInstagram, enableTiktok } from "@/conf";

export const tools = () => {
    return [
        {
            title: "Instagram",
            icon: Instagram,
            isHot: true,
            url: "/tool/instagram",
            description: "Download Instagram videos, reels, and photos.",
            feature: ["Videos", "Reels", "Photos", "Carousels"],
            isAvailable: enableInstagram,
            isNew: false
        },
        {
            title: "Facebook",
            icon: Facebook,
            isHot: false,
            url: "/tool/facebook",
            description: "Download Facebook videos, reels, and stories",
            feature: ["Videos", "Reels", "Stories"],
            isAvailable: enableFacebook,
            isNew: false
        },
        {
            title: "Tiktok",
            icon: Tiktok,
            isHot: false,
            url: "/tool/tiktok",
            description: "Download Tiktok videos, slideshows and music.",
            feature: ["Videos", "Slideshows", "Music"],
            coming: ["Playlists", "Collections"],
            isAvailable: enableTiktok,
            isNew: true
        },
        {
            title: "Youtube",
            icon: YouTube,
            isHot: false,
            url: "/tool/youtube",
            description: "Coming soon",
            feature: ["Coming soon"],
            coming: ["Coming soon"],
            isAvailable: "coming",
            isNew: false
        },
    ]
}