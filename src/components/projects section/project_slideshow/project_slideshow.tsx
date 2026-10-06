
import { useEffect, useRef, useState } from "react";
import type { MouseEvent, PointerEvent } from "react";
import { preloadImage } from "../../../utils/preload_image";
import "./project_slideshow.css";
import { useCursor } from "../../../hooks/use_cursor";

const THUMB_W = 96;
const THUMB_H = 64;
const THUMB_EDGE_GAP = 8;

type Props = {
    imageList: Array<string>;
    title: string;
    isActive: boolean;
    preload?: (src: string) => Promise<string>;
    className?: string;
    /** Time each image stays on screen. Defaults to 5000ms. */
    duration?: number;
    /** Time a manually selected image stays on screen. Defaults to 10000ms. */
    clickDuration?: number;
};

export default function ImageSlideshowCard({
    imageList,
    title,
    isActive,
    preload,
    className,
    duration = 5000,
    clickDuration = 12500,
}: Props) {
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [index, setIndex] = useState(0);
    const [previousIndex, setPreviousIndex] = useState(0);

    // Which index was picked manually (gets the longer duration). Cleared on auto-advance.
    const [extendedIndex, setExtendedIndex] = useState<number | null>(null);

    // Bumped on every jump so the fill restarts, even when re-clicking the current block.
    const [restartKey, setRestartKey] = useState(0);

    // Stores which full-resolution src finished loading.
    const [readySrc, setReadySrc] = useState<string | null>(null);

    // Tracks which full-resolution images have finished loading.
    // This allows images to progressively load without affecting the slideshow logic.
    const [loadedImages, setLoadedImages] = useState<Set<string>>(
        () => new Set(),
    );

    // Pager hover state.
    const [isHovering, setIsHovering] = useState(false);
    const [previewIndex, setPreviewIndex] = useState(0);
    const [thumbX, setThumbX] = useState(0);

    const count = imageList.length;
    const hasMultiple = count > 1;

    const nextIndex = hasMultiple ? (index + 1) % count : index;
    const nextSrc = imageList[nextIndex];

    const ready = readySrc === nextSrc;
    const currentDuration = extendedIndex === index ? clickDuration : duration;

    /**
     * Low-resolution version.
     *
     * Example:
     *   /images/project.png
     * becomes
     *   /images/project.webp
     */
    const getLowResSrc = (src: string) => src.replace(".png", ".webp");

    const markLoaded = (src: string) => {
        setLoadedImages((previous) => {
            if (previous.has(src)) return previous;

            const next = new Set(previous);
            next.add(src);
            return next;
        });
    };

    // Reset to the first image when the card is no longer active.
    useEffect(() => {
        if (!isActive) {
            setIndex(0);
            setPreviousIndex(0);
            setExtendedIndex(null);
        }
    }, [isActive, imageList]);

    // Preload the upcoming full-resolution image.
    // The low-resolution image is rendered immediately by the browser.
    useEffect(() => {
        if (!isActive || !hasMultiple || !nextSrc) return;

        let cancelled = false;

        (preload || preloadImage)(nextSrc)
            .then(() => {
                if (!cancelled) {
                    setReadySrc(nextSrc);
                    markLoaded(nextSrc);
                }
            })
            .catch(() => {
                /* stays not-ready: progress remains paused */
            });

        return () => {
            cancelled = true;
        };
    }, [isActive, hasMultiple, nextSrc, preload]);

    const goTo = (target: number, manual = false) => {
        if (target !== index) {
            setPreviousIndex(index);
            setIndex(target);
        }

        setExtendedIndex(manual ? target : null);
        setRestartKey((k) => k + 1);
    };

    const advance = () => {
        if (ready) goTo(nextIndex);
    };

    const handlePageClick = (e: MouseEvent, target: number) => {
        // The card is usually wrapped in a link; don't navigate when paging.
        e.preventDefault();
        e.stopPropagation();

        goTo(target, true);
    };

    // Hover handling is mouse-only so touch taps don't leave a stuck preview.
    const trackCursor = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || !wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const half = THUMB_W / 2 + THUMB_EDGE_GAP;
        const x = e.clientX - rect.left;

        // Follow the cursor on x only, but keep the thumbnail inside the card.
        setThumbX(
            Math.min(
                Math.max(x, half),
                Math.max(half, rect.width - half),
            ),
        );
    };

    const handlePagerEnter = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;

        setIsHovering(true);
        trackCursor(e);
    };

    const handleSegmentEnter = (e: PointerEvent, i: number) => {
        if (e.pointerType !== "mouse") return;

        setPreviewIndex(i);
    };

    const cursorOnSegment = useCursor({ type: "pointer" });

    return (
        <div
            ref={wrapperRef}
            className={`relative overflow-hidden ${
                className || "w-full h-full"
            }`}
        >
            {imageList.map((src, i) => {
                const lowResSrc = getLowResSrc(src);
                const isLoaded = loadedImages.has(src);

                return (
                    <div
                        key={src + i}
                        className={`absolute inset-0 transition-opacity duration-500 ease-bezier-in motion-reduce:transition-none ${
                            i === previousIndex ? "delay-100" : ""
                        } ${
                            i === index
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        {/* Low-resolution preview */}
                        <img
                            src={lowResSrc}
                            alt=""
                            aria-hidden="true"
                            className={`absolute inset-0 h-full w-full object-cover blur-md scale-105 transition-opacity duration-500 ease-bezier-in ${
                                isLoaded
                                    ? "opacity-0"
                                    : "opacity-100"
                            }`}
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                        />

                        {/* Full-resolution image */}
                        <img
                            src={src}
                            alt={title}
                            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-bezier-in motion-reduce:transition-none ${
                                isLoaded
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                            loading={i === 0 ? "eager" : "lazy"}
                            decoding="async"
                            fetchPriority={i === 0 ? "high" : "auto"}
                            onLoad={() => markLoaded(src)}
                        />
                    </div>
                );
            })}

            {hasMultiple && (
                <>
                    {/* Thumbnail preview, follows the cursor on x */}
                    <div
                        aria-hidden="true"
                        className={`pointer-events-none absolute bottom-10 z-20 overflow-hidden rounded-lg
                            border border-white/30 bg-black/40 shadow-lg transition-opacity duration-150
                            motion-reduce:transition-none ${
                                isHovering
                                    ? "opacity-100"
                                    : "opacity-0"
                            }`}
                        style={{
                            width: THUMB_W,
                            height: THUMB_H,
                            left: thumbX,
                            transform: "translateX(-50%)",
                        }}
                    >
                        <img
                            src={getLowResSrc(
                                imageList[previewIndex],
                            )}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    {/* Pager */}
                    <div
                        onPointerEnter={handlePagerEnter}
                        onPointerMove={trackCursor}
                        onPointerLeave={() =>
                            setIsHovering(false)
                        }
                        {...cursorOnSegment}
                        className={`absolute inset-x-3 bottom-1 z-10 flex gap-1 transition-opacity
                            duration-200 group-hover:duration-1000 ease-bezier-in group-hover:opacity-100
                            ${
                                isActive
                                    ? "opacity-100 pointer-events-auto"
                                    : "opacity-0 pointer-events-none group-hover:pointer-events-auto"
                            }`}
                    >
                        {imageList.map((_, i) => {
                            const isCurrent = i === index;

                            // Whole pager grows a little on hover,
                            // the hovered block a little more.
                            const barHeight = !isHovering
                                ? "h-1 max-mobile:h-2"
                                : previewIndex === i
                                  ? "h-4"
                                  : "h-2.5";

                            return (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Show image ${
                                        i + 1
                                    } of ${count}`}
                                    aria-current={
                                        isCurrent
                                            ? "true"
                                            : undefined
                                    }
                                    onClick={(e) =>
                                        handlePageClick(e, i)
                                    }
                                    onPointerEnter={(e) =>
                                        handleSegmentEnter(e, i)
                                    }
                                    className="flex h-7 flex-1 cursor-pointer items-end pb-2 max-mobile:pb-0"
                                >
                                    <span
                                        className={`pointer-events-none relative block w-full overflow-hidden rounded-full bg-black/20 max-mobile:bg-black/30
                                            transition-[height] duration-200 ease-out motion-reduce:transition-none
                                            ${barHeight}
                                            ${
                                                isActive &&
                                                isCurrent &&
                                                !ready
                                                    ? "animate-pulse"
                                                    : ""
                                            }`}
                                    >
                                        {isActive &&
                                            isCurrent && (
                                                <span
                                                    key={`${index}-${restartKey}`}
                                                    className="slideshow-fill absolute inset-0 origin-left bg-white"
                                                    style={{
                                                        animationDuration: `${currentDuration}ms`,
                                                        animationPlayState:
                                                            ready
                                                                ? "running"
                                                                : "paused",
                                                    }}
                                                    onAnimationEnd={
                                                        advance
                                                    }
                                                />
                                            )}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </>
            )}
        </div>
    );
}

