import { BadRequest } from "@/lib/exceptions";
import {
  getIGVideoFileName,
  getIGImageFileName,
  getIGAudioFileName,
} from "./helpers";
import { _generateRandomId } from "@/lib/facebook/scrapers/formaters";
import { DOMParser } from "xmldom";
import { InstagramResource, InstagramResponse } from "@/types/api/downloader";
import * as fs from "fs";
export const formatGraphqlJson = async (postJson: any) => {
  const data = postJson.data.xdt_shortcode_media;

  if (!data) {
    throw new BadRequest("This post does not exist");
  }

  const owner = data.owner;
  owner.profile_pic = owner.profile_pic_url;
  owner.name = owner.full_name;
  owner.profile_url = `https://www.instagram.com/${owner.username}/`;

  const keysToRemove = [
    "is_verified",
    "is_private",
    "blocked_by_viewer",
    "followed_by_viewer",
    "restricted_by_viewer",
    "followed_by_viewer",
    "has_blocked_viewer",
    "is_embeds_disabled",
    "is_unpublished",
    "requested_by_viewer",
    "pass_tiering_recommendation",
    "edge_owner_to_timeline_media",
    "edge_followed_by",
    "profile_pic_url",
    "full_name",
  ];

  keysToRemove.forEach((key) => {
    if (key in owner) delete owner[key];
  });

  if (!data.is_video) {
    const childrenEdges =
      data.edge_sidecar_to_children?.edges || [
        {
          node: {
            id: _generateRandomId(),
            width: data.display_resources.at(-1).config_width,
            height: data.display_resources.at(-1).config_height,
          },
        },
      ] ||
      [];

    const PostJson: InstagramResponse = {
      id: data.id,
      owner: owner,
      thumbnail: data.thumbnail_src,
      resources: [
        ...childrenEdges.map((edge: any) => {
          const resource: InstagramResource = {
            id: edge.node.id,
            filename: edge.node.is_video
              ? getIGVideoFileName(edge.node.id)
              : getIGImageFileName(edge.node.id),
            type: edge.node.is_video ? "video" : "image",
            mime_type: edge.node.is_video ? "video/mp4" : "image/jpeg",
            has_audio: edge.node.is_video ? edge.node.has_audio : false,
            width: edge.node?.dimensions?.width || edge.node.width,
            height: edge.node?.dimensions?.height || edge.node.height,
            baseURL: edge.node.is_video
              ? edge.node.video_url
              : edge.node.display_url,
            thumbnail: edge.node.display_url,
          };

          if (edge.node.is_video) resource.quality = "720p";

          return resource;
        }),
      ],
    };
    return PostJson;
  }

  const filename = getIGVideoFileName(data.id);
  const videoUrl = data.video_url;
  const { width, height } = data.dimensions;
  const thumbnailUrl = data.thumbnail_src;

  if (!videoUrl || !thumbnailUrl) {
    return null;
  }

  const videoJson: InstagramResponse = {
    id: data.id,
    thumbnail: thumbnailUrl,
    owner: owner,
    resources: [
      {
        id: data.id,
        filename: filename,
        type: "video",
        mime_type: "video/mp4",
        quality: "720p",
        has_audio: true,
        width: width,
        height: height,
        baseURL: videoUrl,
        thumbnail: thumbnailUrl,
      },
    ],
  };

  if (data.dash_info?.video_dash_manifest) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(
      data.dash_info.video_dash_manifest,
      "application/xml"
    );
    const AdaptationSet = doc.getElementsByTagName("AdaptationSet");

    for (let i = 0; i < AdaptationSet.length; i++) {
      const adp = AdaptationSet[i];
      const rep = adp.getElementsByTagName("Representation");

      for (let j = 0; j < rep.length; j++) {
        const baseURL = rep[j].getElementsByTagName("BaseURL")[0]?.textContent;
        if (!baseURL) continue;

        const width = rep[j].getAttribute("width");
        const height = rep[j].getAttribute("height");
        const mimeType = rep[j].getAttribute("mimeType");
        const quality =
          rep[j].getAttribute("FBQualityLabel") ||
          rep[j].getAttribute("FBQualityClass") ||
          `${width}p`;
        const type = adp.getAttribute("contentType");

        if (type === "video") {
          videoJson.resources.push({
            id: `${rep[j].getAttribute("id")}`,
            mime_type: mimeType || "video/mp4",
            filename: getIGVideoFileName(rep[j].getAttribute("id")),
            type: "video",
            quality: quality,
            has_audio: false,
            width: Number(width),
            height: Number(height),
            baseURL: baseURL,
            thumbnail: thumbnailUrl,
          });
        } else if (type === "audio") {
          videoJson.resources.push({
            id: `${rep[j].getAttribute("id")}`,
            mime_type: "audio/mp3",
            filename: getIGAudioFileName(rep[j].getAttribute("id")),
            has_audio: true,
            type: "audio",
            bitrate: "128kbps",
            baseURL: baseURL,
          });
        }
      }
    }
  }

  return videoJson;
};
