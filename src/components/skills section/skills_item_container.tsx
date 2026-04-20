import { useEffect, useRef, useState } from "react"
import { useCursor } from "../../hooks/use_cursor"
import type { resizeRegion, skillActiveStateType, skillInfo } from "../../types/types"
import SkillsItem from "./skills_item"


export default function SkillsItemContainer(props: {
    isActiveState: boolean,
    isLoaded: boolean,
    data: Array<skillInfo>,
    onClick: () => void,
    type: skillActiveStateType,
    indexPositioning: number,
    resizeRegion: resizeRegion,
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

    // const width = useResizeRegion();

    console.log("re renders for index " + props.type);
    console.log("resize region")
    // console.log(width);
    useEffect(() => {
        if (!props.isLoaded) return;

        if (loadProgression === images.length) {
            setIsLoaded(true);
        }
    }, [loadProgression, images.length, props.isLoaded]);



    return (
        <button
            onClick={props.onClick}
            className={`${props.isActiveState ? "skill-card-container-selected" : "skill-card-container-disabled     "} max-mobile:px-2 max-mobile:w-[calc(100px+3rem)]   max-mobile:ease-bezier-in max-mobile:duration-300  w-[calc(100px+6rem)] flex flex-col gap-12 font-bold px-8  text-lg  skill-card-container`}
            style={{
                transform: (props.resizeRegion == "mobile") ? `translateX(calc((${props.indexPositioning} * -100% + 50vw - 50%)))` : ""
            }}
            {...cursorOnHover}

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
            <div className={`grid grid-cols-2 gap-x-8 gap-y-9 ${props.isActiveState ? "max-mobile:scale-100" : "max-mobile:scale-75"} max-mobile:origin-top max-mobile:ease-bezier-in max-mobile:duration-500`}>
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