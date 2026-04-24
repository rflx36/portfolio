import { useEffect, useRef, useState } from "react"
import { useCursor } from "../../hooks/use_cursor"
import type { resizeRegion, skillActiveStateType, skillInfo } from "../../types/types"
import SkillsItem from "./skills_item"
import "./skill_item_container.css"


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
    const buttonRef = useRef<HTMLButtonElement>(null);
    const images = props.data.flatMap((skill) => [
        skill.img_url,
        skill.img_url.replace(".png", "_disabled.png"),
        skill.img_url.replace(".png", "_sequence.png"),
    ]);

    // const width = useResizeRegion();

    // console.log(width);
    useEffect(() => {
        if (!props.isLoaded) return;

        if (loadProgression === images.length) {
            setIsLoaded(true);
        }
    }, [loadProgression, images.length, props.isLoaded]);


    const handleOnclick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
        if (window.innerWidth <= 430) {
            event.currentTarget.scrollIntoView({
                behavior: "smooth",
                block: "center"
            })
        }
        props.onClick();
    }

    // useEffect(() => {
    //     if (buttonRef.current) {
    //         // buttonRef.current.style.pointerEvents = "none";
    //         buttonRef.current.style.backgroundColor = props.isActiveState ?"green":"blue";
    //         // buttonRef.current
    //         if (props.isActiveState){
    //             buttonRef.current.onblur;
    //         }
    //         setTimeout(() => {
    //             if (buttonRef.current) {
    //                 buttonRef.current.style.backgroundColor = "none";
    //                 // buttonRef.current.style.pointerEvents = "";
    //             }
    //         }, 100);
    //     }
    // }, [props.isActiveState])
    console.log("child resize region"+ props.resizeRegion);
    return (
        <button
            onClick={handleOnclick}
            className={`${props.isActiveState ? "skill-card-container-selected   " : "skill-card-container-disabled   max-mobile:text-text/30! max-mobile:translate-y-4 "} pb-4 max-tablet:px-2 max-tablet:w-[calc(100px+3rem)]  max-tablet:ease-bezier-in max-tablet:duration-300  w-[calc(100px+6rem)] flex flex-col gap-12 font-bold px-8  text-lg max-mobile:w-full max-mobile:items-center  max-mobile:gap-2 skill-card-container skill-card-container-${props.type} skill-item-container-width`}
            style={{
                transform: (props.resizeRegion == "tablet") ? `translateX(calc((${props.indexPositioning - 1} * -100%) + 50% ))` : ""
            }}
            {...cursorOnHover}
            id={`skill-item-container-${props.type}-id`}
            // aria-label=""
            ref={buttonRef}

        >
            <div className=" h-6.25 w-full max-mobile:mb-2  skill-item-container-width max-mobile:text-left relative">
                <p>{props.type.toUpperCase()}</p>

                {
                    props.isActiveState &&

                    <div className="max-mobile:hidden absolute bg-accent-1 -bottom-3 h-0.5 w-full" />
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
            <div className={`grid grid-cols-2  gap-x-8 gap-y-9 ${props.isActiveState ? "max-tablet:scale-100 " : "max-tablet:scale-75 max-mobile:scale-100"} max-mobile:transition-none skill-item-container-width  max-tablet:origin-top max-tablet:ease-bezier-in max-tablet:duration-500 max-mobile:flex max-mobile:flex-row max-mobile:justify-start max-mobile:items-start max-mobile:flex-wrap`}>
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
                            <div key={index} className=" w-[50px] h-[50px] bg-container-soft-shadow animate-pulse rounded-xl " />
                        ))
                }
            </div>

        </button>
    )
};
