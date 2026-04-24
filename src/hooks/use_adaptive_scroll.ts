import { useEffect, useRef, useState } from "react";
import type { useAdaptiveScrollPosition, useAdaptiveScrollResultProps } from "../types/hook_types";

/**
 * a optimized scroll hook that returns
 * @param mode use once to trigger when a threshold is met else returns a realtime scroll positions
 * @param threshold use once threshold to trigger else realtime throttle threshold to update
 * @returns boolean | Object:{ x:scrollXValue, y: scrollYValue } 
 */
export default function useAdaptiveScroll(mode: "use once" | "realtime" = "realtime", threshold: number = 10): useAdaptiveScrollResultProps {
    const [scrollPos, setScrollPos] = useState<useAdaptiveScrollPosition>({ x: window.scrollX, y: window.scrollY });
    
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    
    const timeoutId = useRef<number | null>(null);
    const scrollMount = useRef<number | null>(null);
    const scrollLastValue = useRef<number>(0);


    const scrollUpdateTick = useRef<boolean>(false);

    useEffect(() => {
        const handleScroll = (): void => {
            if (mode == "use once") {

                const currentPos = window.scrollY;
                console.log(currentPos);
                if (currentPos >= threshold) {
                    setIsScrolled(true);
                    window.removeEventListener('scroll', handleScroll)
                    return;
                }

                if (scrollMount.current === null) {
                    scrollMount.current = 0;
                    window.scrollTo(0, 0);

                }
                else if (scrollMount.current !== currentPos) {
                    setIsScrolled(true)
                    window.removeEventListener('scroll', handleScroll)
                }
                return;

                // if (initialScroll.current === null) {
                //     console.log("triggered- 1")
                //     if (currentPos < threshold) {
                //         console.log("threshold triggered");
                //         setTimeout(() => {
                //             window.scroll({ top: 0, behavior: "smooth" });

                //         }, 10);
                //         initialScroll.current = 0;
                //     }
                //     else {
                //         console.log("null > and threshold > 200")
                //         setIsScrolled(true);
                //         window.removeEventListener("scroll", handleScroll);

                //     }

                //     return;
                // }


                // if ((initialScroll.current !== null) && (currentPos !== initialScroll.current)) {
                //     // window.scrollTo({ top: 0, behavior: "instant" });
                //     console.log("has value and initial not equal")
                //     setIsScrolled(true);
                //     window.removeEventListener("scroll", handleScroll);
                // }
                // return;
            }


            if (scrollUpdateTick.current) {
                return;
            }

            requestAnimationFrame(() => {
                const currentScroll = window.scrollY;
                if (Math.abs(currentScroll - scrollLastValue.current) > threshold) {
                    scrollLastValue.current = currentScroll;
                    setScrollPos({ x: window.scrollX, y: window.scrollY });
                }
                scrollUpdateTick.current = false;
            })
            scrollUpdateTick.current = true;


            // const now = Date.now();

            // if (startTime.current === null) {
            //     startTime.current = now;
            // }

            // const elapsed = now - startTime.current;

            // if (elapsed < 2000) {
            //     if (scrollMount.current !== null) {
            //         cancelAnimationFrame(scrollMount.current);
            //     }

            //     scrollMount.current = requestAnimationFrame(() => {
            //         setScrollPos({ x: window.scrollX, y: window.scrollY });
            //     });
            // } else {
            //     if (isThrottling.current) {
            //         return;
            //     }

            //     isThrottling.current = true;
            //     setScrollPos({ x: window.scrollX, y: window.scrollY });

            //     window.setTimeout(() => {
            //         isThrottling.current = false;
            //     }, 1000);
            // }

            // if (timeoutId.current !== null) {
            //     window.clearTimeout(timeoutId.current);
            // }

            // timeoutId.current = window.setTimeout(() => {
            //     startTime.current = null;
            // }, 150);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutId.current) {
                window.clearTimeout(timeoutId.current);
            }
            if (scrollMount.current) {
                cancelAnimationFrame(scrollMount.current);
            }
        };
    }, [mode, threshold]);

    return mode == "realtime" ? scrollPos : isScrolled;
}