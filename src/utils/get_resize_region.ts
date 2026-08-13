import type { resizeRegion } from "../types/types";





export default function getResizeRegion(width: number): resizeRegion {
    if (width <= 430) {
        return "mobile";
    }
    if (width <= 820) {
        return "tablet";
    }
    return "desktop";
}