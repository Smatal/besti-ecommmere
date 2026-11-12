import createImageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "../env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "bestie-sample",
  dataset: dataset || "production",
});

export const urlForImage = (source: unknown) => {
  if (!source) return "";
  if (typeof source === "string") return source;
  try {
    return imageBuilder.image(source as any).auto("format").fit("max").url();
  } catch {
    return "";
  }
};
