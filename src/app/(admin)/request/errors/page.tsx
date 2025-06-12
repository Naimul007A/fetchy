import Valkey from "ioredis";
import ErrorRequestsVaultView from "./view";

const redis = new Valkey(process.env.NEXT_REDIS_URL);

export default async function ErrorRequestsVault({ params }) {
  const keys = await redis.keys("req:P*");
  const values = await Promise.all(
    keys.map(async (key) => {
      return { key: key, value: await redis.get(key) };
    })
  );

  return <ErrorRequestsVaultView values={values} />;
}
