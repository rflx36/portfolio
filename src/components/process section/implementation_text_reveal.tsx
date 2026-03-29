import { useEffect } from "react";
import useWordReveal from "../../hooks/use_word_reveal";

interface implementationTextRevealProps {
    words: string[],
    interval?: number,
    batchSize?: number,
}


export default function ImplementationTextReveal(props: implementationTextRevealProps) {
    
    const { revealedWords, status, progress, start, reset } = useWordReveal({
        words: props.words,
        batchSize: Math.max(1, Math.ceil(props.words.length * (props.batchSize ?? 0.1))),
        interval: props.interval ?? 50,
    });

    useEffect(() => {
        start();
    }, [])
    return (
        <>
            {props.words.map((word, idx) => {
                return (
                    <span key={idx} className={`duration-100  ease-bezier-in ${revealedWords.has(idx) ? "opacity-50 blur-none" : "opacity-0 blur-sm"}`}>{word} </span>
                )
            })}
        </>
    )

}