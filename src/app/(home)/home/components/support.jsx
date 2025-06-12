"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useRouter } from "@/hooks/useRouter";
import { tools } from "@/app/components/tool.list";

export function Support() {
    const router = useRouter()

    return (
        <section
            id="support-platforms"
            className="max-w-[calc(100vw-1rem)] modern:max-w-[calc(100vw-2rem)] container mx-auto pb-10 pt-20"        >
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
                            <TableHead>Coming Soon</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tools().map((tool) => (
                            <TableRow onClick={() => router.push(tool.url)} className="bg-muted/30 cursor-pointer" key={tool.title}>
                                <TableCell className="font-medium">{tool.title} {tool.isNew && <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-mono font-bold italic text-center">new</span>} {tool.isHot && <span className="text-xs bg-orange-600 text-white px-2 py-0.5 rounded-full font-mono font-bold italic text-center">hot</span>}</TableCell>
                                <TableCell>{tool.feature.join(", ")}</TableCell>
                                <TableCell>{tool?.coming?.join(", ")}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section>

    )
}