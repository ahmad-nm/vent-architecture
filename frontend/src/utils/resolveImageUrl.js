import { imageUrl } from "./imageUrl"

export const resolveImageUrl = (src) => {

    if (!src) return ""

    if (
        src.startsWith("http") ||
        src.startsWith("data:") ||
        src.startsWith("blob:")
    ) {
        return src
    }

    return imageUrl(src)
}