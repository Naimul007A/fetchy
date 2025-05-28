"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "next/navigation";

export function Support() {
    const router = useRouter()
    const features = [
        {
            platfrom: "Instagram",
            features: "Reels, Posts, Photos, Carousels",
            href: "/tool/instagram"
        },
        {
            platfrom: "Facebook",
            features: "Posts, Stories, Reels, Videos",
            href: "/tool/facebook"
        },
        {
            platfrom: "TikTok",
            features: "Videos, Slideshows, Music",
            href: "/tool/tiktok"
        },
    ]

    return (
        <section
            id="support-platforms"
            className="container px-2 md:px-0 mx-auto py-5"
        >
            <div className="flex flex-col">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Supported{" "}
                    <span className="bg-gradient-to-r from-lime-500 to-lime-100 text-transparent bg-clip-text">
                        Features
                    </span>
                </h2><Table className="rounded-lg overflow-hidden">
                    <TableHeader>
                        <TableRow className="bg-muted hover:bg-muted">
                            <TableHead>Platform</TableHead>
                            <TableHead>Features</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((feature) => (
                            <TableRow onClick={() => router.push(feature.href)} className="bg-muted/30 cursor-pointer" key={feature.platfrom}>
                                <TableCell className="font-medium">{feature.platfrom}</TableCell>
                                <TableCell>{feature.features}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>

    )
}