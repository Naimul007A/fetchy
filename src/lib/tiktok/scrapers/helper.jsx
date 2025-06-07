import { getTimedFilename } from "@/utils";

export const getTiktokContentFileName = (type, ext) => {
    return getTimedFilename(`PRAS-${type}`, ext);
}