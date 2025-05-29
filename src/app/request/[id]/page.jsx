
import Valkey from "ioredis";
import RequestDetailsView from "./view";

const redis = new Valkey(process.env.NEXT_REDIS_URL);

export default async function RequestDetails({ params }) {
    const { id } = await params;
    const raw = await redis.get(`req:${id}`);

    if (!raw) {
        return (
            <body>
                <main className="w-[calc(100vw-2rem)] md:container mx-auto">
                    <div className="flex flex-col items-center justify-center w-full h-screen">
                        <div className="max-w-md p-8 bg-background rounded-lg flex flex-col items-center justify-center">
                            <h2 className="font-mono text-center text-2xl text-white/90">Request Expired</h2>
                            <p className="mt-2 text-sm text-muted-foreground text-center">
                                This request data is no longer available. Requests are stored in cache for 30 minutes.
                            </p>
                            <code className="text-xs absolute bottom-5 left-1/2 -translate-x-1/2 text-muted-foreground">{id}</code>
                        </div>
                    </div>
                </main>
            </body>
        );
    }

    return <RequestDetailsView raw={raw} id={id} />
}