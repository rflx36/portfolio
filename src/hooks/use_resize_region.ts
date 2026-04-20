import { useEffect, useState } from "react";
import { type resizeRegion } from "../types/types";
// resizeRegion = "mobile" | "tablet" | "desktop"


const getResizeRegion = (width: number): resizeRegion => {
    if (width <= 430) {
        return "mobile";
    }
    if (width <= 820) {
        return "tablet";
    }
    return "desktop";
}


export default function useResizeRegion() {
    // const resizeRegion = useRef<resizeRegion>(getResizeRegion(window.innerWidth))

    const [resizeRegion, setResizeRegion] = useState<resizeRegion>(getResizeRegion(window.innerWidth))

    useEffect(() => {
       


        const handleResize = () => {
            const newRegion = getResizeRegion(window.innerWidth);

            setResizeRegion(newRegion);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    console.log("resize region rerender");
    return resizeRegion;
}