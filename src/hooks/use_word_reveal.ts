import { useCallback, useEffect, useRef, useState } from "react";
import type { useWordRevealProps, useWordRevealStatus } from "../types/hook_types";
import shuffleIndices from "../utils/shuffle_indices";


export default function useWordReveal({
    words,
    batchSize = 0.1,
    interval = 500,
}: useWordRevealProps) {

    const total = words.length;
    const resolvedBatch = batchSize ?? Math.max(1, Math.ceil(total * 0.1));

    const [revealedWords, setRevealedWords] = useState<Set<number>>(new Set());
    const [status, setStatus] = useState<useWordRevealStatus>("idle");

    const queueRef = useRef<number[]>([]);
    const cursorRef = useRef<number>(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const clearTimer = () => {
        if (timerRef.current !== null) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }


    const tick = useCallback(() => {
        const start = cursorRef.current;
        if (start >= queueRef.current.length) {
            clearTimer();
            setStatus("done");
            return;
        }

        const end = Math.min(start + resolvedBatch, queueRef.current.length);
        const batch = queueRef.current.slice(start, end);
        cursorRef.current = end;

        setRevealedWords((prev) => {
            const next = new Set(prev);
            batch.forEach((idx) => next.add(idx));
            return next;
        });

        if (end >= queueRef.current.length) {
            clearTimer();
            setStatus("done");
        }
    }, [resolvedBatch]);

    const start = useCallback(() => {
        clearTimer();
        queueRef.current = shuffleIndices(total);
        cursorRef.current = 0;
        setRevealedWords(new Set());
        setStatus("running");
    }, [total]);

  

    useEffect(() => {
        if (status !== "running") return;
        tick();
        timerRef.current = setInterval(tick, interval);
        return clearTimer;
    }, [status, interval, tick]);


    return { revealedWords,  start  }
}