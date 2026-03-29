
export type useWordRevealStatus = "idle" | "running" | "done";


export interface useWordRevealProps {
    words: string[],
    batchSize?: number,
    interval?: number,
}

export interface useWordRevealResultProps {
    revealedWords: Set<number>,
    status: useWordRevealStatus,
    progress: number,
    start: () => void,
    reset: () => void,
}