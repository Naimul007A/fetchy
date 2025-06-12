import Valkey from "ioredis";
import RequestDetailsView from "./view";

const redis = new Valkey(process.env.NEXT_REDIS_URL);

export default async function RequestDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const raw = await redis.get(`req:${id}`);

  return <RequestDetailsView raw={raw} id={id} />;
}
