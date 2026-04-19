import { useEffect, useRef, useState } from "react"
import { useCursor } from "../../hooks/use_cursor"
import type { skillActiveStateType, skillInfo } from "../../types/types"
import SkillsItem from "./skills_item"


export default function SkillsItemContainer(props: {
    isActiveState: boolean,
    isLoaded: boolean,
    data: Array<skillInfo>,
    onClick: () => void,
    type: skillActiveStateType,
    indexPositioning: number
}) {

    const [isLoaded, setIsLoaded] = useState(false);

    const cursorOnHover = useCursor({ type: "pointer" })
    const random_skeleton_amount = useRef(Math.ceil(Math.random() * 8));

    const [loadProgression, setLoadProgression] = useState(0);

    const images = props.data.flatMap((skill) => [
        skill.img_url,
        skill.img_url.replace(".png", "_disabled.png"),
        skill.img_url.replace(".png", "_sequence.png"),
    ]);

    useEffect(() => {
        if (!props.isLoaded) return;

        if (loadProgression === images.length) {
            setIsLoaded(true);
        }
    }, [loadProgression, images.length, props.isLoaded]);

    return (
        <button
            onClick={props.onClick}
            className={`${props.isActiveState ? "skill-card-container-selected max-table:relative" : "skill-card-container-disabled   max-mobile:scale-90 "} bg-blue-500 w-[calc(100px+6rem)] flex flex-col gap-12 font-bold px-8  text-lg  skill-card-container`}
            {...cursorOnHover}
            style={{
                // transform: (props.isActiveState || !isMobile()) ? "none" : `translateX(calc(${props.indexPositioning}*100%))`
            }}
        >
            <div className="h-6.25 w-full relative">
                <p>{props.type.toUpperCase()}</p>

                {
                    props.isActiveState &&

                    <div className="absolute bg-accent-1 -bottom-3 h-0.5 w-full" />
                }
            </div>

            {
                !isLoaded &&
                <div className="absolute hidden">
                    {

                        images.map((src, index) => (
                            <img
                                key={index}
                                src={src}
                                onLoad={() => setLoadProgression((x) => x + 1)}
                                onError={() => {
                                    console.error("Failed to load ", src)
                                    setLoadProgression((x) => x + 1)
                                }}
                            />
                        ))
                    }
                </div>
            }
            <div className="grid grid-cols-2 gap-x-8 gap-y-9">
                {
                    props.isLoaded && isLoaded ?
                        props.data.map((skill, index) =>
                            <SkillsItem
                                key={index}
                                index={index}
                                skill={skill}
                                styleState={props.isActiveState}
                            />
                        )
                        :
                        Array.from({ length: random_skeleton_amount.current }).map((_, index) => (
                            <div key={index} className="w-full h-[50px] bg-container-soft-shadow animate-pulse rounded-xl " />
                        ))
                }
            </div>

        </button>
    )
}