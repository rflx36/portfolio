import { useEffect, useState } from "react";
import { preloadImage } from "../../utils/preload_image";
import "./projects_card_hover.css";
import isMobile from "../../utils/is_mobile";


export default function ProjectsCardHover(props: {
    imageList: Array<string>,
    title: string,
    isActive: boolean,
    preload?: (src: string) => Promise<string>;
}) {
    const [index, setIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);
    const [ready, setReady] = useState(false);

    const active = props.isActive;
    const nextIndex = (index + 1) % props.imageList?.length || 1;
    const nextSrc = props.imageList[nextIndex];

    useEffect(() => {
        if (!active) setIndex(0);
    }, [active, props.imageList]);

    useEffect(() => {
        if (!active) return;
        let cancelled = false;
        setReady(false);
        (props.preload || preloadImage)(nextSrc)
            .then(() => {
                if (!cancelled) setReady(true);
            })
            .catch(() => {
                /* stays not-ready: the ring remains paused */
            });
        return () => {
            cancelled = true;
        };
    }, [active, nextSrc, props.preload]);

    const advance = () => {
        if (ready) {
            setPreviousIndex(index);
            setIndex(nextIndex);
        }
    };


    return (
        <div
            className="w-full h-max"
        >
            {
                props.imageList.map((src, i) => (
                    <img
                        key={i}
                        src={src}
                        alt={props.title}
                        className={`object cover absolute inset-0 h-full w-full transition-opacity duration-500 ease-bezier-in motion-reduce:transition-none ${i == previousIndex ? "delay-100" : ""}  ${i == index ? "opacity-100" : "opacity-0"}`}
                        fetchPriority={i == 0 ? "high" : "auto"}
                    />
                ))

            }
            <span
                style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                className={`pointer-events-none absolute top-4 right-4 flex h-7 w-7
                      items-center justify-center rounded-full transition-opacity
                      duration-200 group-hover:duration-1000 ease-bezier-in group-hover:opacity-100
                      ${active ? "opacity-100" : "opacity-0"}
                      ${active && !ready ? "animate-pulse" : ""}`}
            >
                <svg viewBox="0 0 24 24" className="h-6 w-6 -rotate-90">
                    <circle
                        cx="12"
                        cy="12"
                        r="9"
                        fill="none"
                        stroke="white"
                        strokeOpacity="0.2"
                        strokeWidth="3"
                    />
                    {active && (
                        <circle
                            key={index}
                            cx="12"
                            cy="12"
                            r="9"
                            fill="none"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            pathLength="100"
                            strokeDasharray="100"
                            style={{
                                animation: `ring-fill ${isMobile() ? 2000 : 1500}ms linear forwards`,
                                animationPlayState: ready ? "running" : "paused",
                            }}
                            onAnimationEnd={advance}
                        />
                    )}
                </svg>
            </span>
            {/* <img src={`${props.imageList[0]}`} alt={props.title} className="object-cover" fetchPriority="high" /> */}


        </div>
    )

}