import { BadRequest } from "@/lib/exceptions";
import { getTiktokContentFileName } from "./helper";

export const formatTiktokJson = async (data) => {
    if (!data) {
        throw new BadRequest("This post does not exist");
    }

    const { resources, ...rest } = data;

    const updatedResources = await Promise.all(
        resources.map(async (res) => ({
            ...res,
            filename: getTiktokContentFileName(res.type, res.mime_type.split("/")[1]),
        }))
    );

    const json = {
        ...rest,
        resources: updatedResources,
    };

    return json;
};