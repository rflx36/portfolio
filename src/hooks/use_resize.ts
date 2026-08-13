import { useEffect, useState } from "react";
import type { resizeRegion } from "../types/types";
import getResizeRegion from "../utils/get_resize_region";
import getBarrierIndex from "../utils/get_barrier_index";



interface useResizeProps {
    responsiveBarrier?: number;
    rerenderBarrier?: Array<number>;
}


export default function useResize({ responsiveBarrier, rerenderBarrier }: useResizeProps = {}) {
    const [resizeRegion, setResizeRegion] = useState<resizeRegion>(getResizeRegion(window.innerWidth))
    const [aboveBarrier, setAboveBarrier] = useState<boolean | string>(responsiveBarrier !== undefined ? window.innerWidth > responsiveBarrier : "Not Initialized");
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [currentBarrier, setCurrentBarrier] = useState<number | undefined>(undefined);


    useEffect(() => {
        const handleResize = () => {
            const newRegion = getResizeRegion(window.innerWidth);
            setResizeRegion(newRegion);

            setWidth(window.innerWidth);
            
            if (responsiveBarrier !== undefined) {
                setAboveBarrier(window.innerWidth > responsiveBarrier);
            }

            if (rerenderBarrier !== undefined) {
        
                setCurrentBarrier(getBarrierIndex(window.innerWidth, rerenderBarrier));
                console.log("Current Barrier:", getBarrierIndex(window.innerWidth, rerenderBarrier));
                console.log("Window Width:", window.innerWidth);
            }

                

        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [])

    return { resizeRegion, aboveBarrier, width, currentBarrier };
}