import {client} from "./client";
import createImageUrlBuilder from "@sanity/image-url";

/**
 * @description Converts sanity media objects to a image builder object.
 * @param source {SanityMediaObject} Image Object fetched from SanityIO
 * @returns {ImageUrlBuilder}
 * @example urlFor(<your-sanity-media-object>).url() returns 'https://<cdn-link>/image.jpg'
 * @example urlFor(<your-sanity-media-object>).width(500).url() returns 'https://<cdn-link>/image.jpg?revision=500&...'
 */
export const urlFor = (source) => {
    return createImageUrlBuilder(client).image(source)
}
