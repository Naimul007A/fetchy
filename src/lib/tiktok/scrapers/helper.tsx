import { getTimedFilename } from "@/utils";

export const getTiktokContentFileName = (type: string, ext: string) => {
  return getTimedFilename(`PRAS-${type}`, ext);
};
