import { useRef, useState } from "react";
import type { animationLoadStateType } from "../../types/types";
import { useCursor } from "../../hooks/use_cursor";
import ProjectsCardHover from "./projects_card_hover";


export default function ProjectsCard(props: {
    ref: React.Ref<HTMLDivElement> | undefined,
    index: number,
    projectTitle: string,
    projectInformation: string,
    projectImageUrl: string,
    projectImageShowcaseAmount: number,
    projectDate: string,
    projectStacks: Array<string>,
    DisplayProperties: {
        dampening: number,
        featuredAmountLimit: number,
        inverseBoolValue: boolean,
        loadAnimation: animationLoadStateType,
    }
    onClick: () => void,
    focus: number,
    isInView: boolean,
}) {
    const [active, setActive] = useState({ hovered: false, focused: false });

    const screenWidth = useRef(window.innerWidth);
    const randomizedTransforms = useRef({
        rotation: Math.floor((Math.random() * 6) + 5) * (props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? -1 : 1),
        transform: Math.floor(Math.random() * 21) - 10,
    });
    const featuredAmountLimit = props.DisplayProperties.featuredAmountLimit;
    const dampening = props.DisplayProperties.dampening;
    const randomRotation = randomizedTransforms.current.rotation;
    const randomTransform = randomizedTransforms.current.transform;
    const transformFocusMultiplier = props.index - (screenWidth.current <= 430 ? props.focus : props.focus - 1);

    const btnCursor = useCursor({ tooltip: `Click to view more `, type: "pointer" })

    const imageThumbnailUrl = `/assets/projects/${props.projectImageUrl.replace(".png", ".webp")}`;
    const imageList = [imageThumbnailUrl].concat(Array.from({ length: props?.projectImageShowcaseAmount || 0 }, (_, i) => `/assets/projects/${props.projectImageUrl.replace("project_thumbnail", "project_showcase").replace(".png", `_${i + 1}.webp`)}`));

    return (
        <div ref={props.ref} className="project-card-container   top-0 flex items-center justify-start w-full h-full">

            {/* <ProjectsCardHover
                imageList={imageList}
                title={props.projectTitle}
                style={{
                    transform: props.DisplayProperties.loadAnimation.preload ? `rotate(${randomRotation}deg) translateX(${randomTransform}px)` : "scale(50%) translateY(300%)",
                    left: screenWidth.current <= 820 ? `calc((${transformFocusMultiplier}* ${screenWidth.current <= 430 ? `100%) ${props.index > 0 ? "- 67px" : "- 10px"}` : `250px) ${props.index > 0 ? "+ (100% / 2) - 400px" : "- 400px + (100% / 2)"}`})` : `calc(${props.index * (100 / featuredAmountLimit)}% ${props.index > 0 && `- ${dampening}px`})`,
                    transitionDelay: props.DisplayProperties.loadAnimation.postload ? "0ms" : `${props.index * 50}ms`,
                    maxWidth: screenWidth.current <= 820 ? "320px" : `calc(${100 / featuredAmountLimit}% + ${dampening}px)`,
                    zIndex: 10 - props.index,
                }}
                id={`project-hover-${props.index + 1}`}
                onClick={props.onClick}
                onMouseEnter={btnCursor.onMouseEnter}
                onMouseLeave={btnCursor.onMouseLeave}
                className={`bg-bg rounded-4xl group  max-mobile-tablet-threshold:rounded-3xl grid place-content-center cursor-none! aspect-268/133 ${props.DisplayProperties.loadAnimation.preload ? " pointer-events-auto select-auto" : "pointer-events-none select-none"}   shadow-lg  ${(props.focus != -1) ? (props.focus == props.index ? "shadow-2xl -translate-y-3 z-20! scale-105 " : "grayscale-100 blur-[2.5px]") : ` project-card-hover  hover:z-20!  hover:delay-100! hover:shadow-2xl hover:duration-150 hover:-translate-y-3 ${props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? "hover:rotate-3" : "hover:-rotate-5"} hover:scale-105`}  absolute border-4 ease-initial duration-300 border-black/10 overflow-hidden h-max w-full`}
            /> */}

            <button
                className={`bg-bg rounded-4xl max-mobile-tablet-threshold:rounded-3xl grid place-content-center cursor-none! aspect-268/133 ${props.DisplayProperties.loadAnimation.preload ? " pointer-events-auto select-auto" : "pointer-events-none select-none"}   shadow-lg  ${(props.focus != -1) ? (props.focus == props.index ? "shadow-2xl -translate-y-3 z-20! scale-105 " : "grayscale-100 blur-[2.5px]") : ` project-card  hover:z-20!  hover:delay-100! hover:shadow-2xl hover:duration-150 hover:-translate-y-3 ${props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? "hover:rotate-3" : "hover:-rotate-5"} hover:scale-105`}  absolute border-4 ease-initial duration-300 border-black/10 overflow-hidden h-max w-full`}
                style={{
                    transform: props.DisplayProperties.loadAnimation.preload ? `rotate(${randomRotation}deg) translateX(${randomTransform}px)` : "scale(50%) translateY(300%)",
                    left: screenWidth.current <= 820 ? `calc((${transformFocusMultiplier}* ${screenWidth.current <= 430 ? `100%) ${props.index > 0 ? "- 67px" : "- 10px"}` : `250px) ${props.index > 0 ? "+ (100% / 2) - 400px" : "- 400px + (100% / 2)"}`})` : `calc(${props.index * (100 / featuredAmountLimit)}% ${props.index > 0 && `- ${dampening}px`})`,
                    transitionDelay: props.DisplayProperties.loadAnimation.postload ? "0ms" : `${props.index * 50}ms`,
                    maxWidth: screenWidth.current <= 820 ? "320px" : `calc(${100 / featuredAmountLimit}% + ${dampening}px)`,
                    zIndex: 10 - props.index,
                }}
                id={`project-${props.index + 1}`}
                onClick={props.onClick}
                onMouseEnter={() => {
                    setActive({ ...active, hovered: true });
                    btnCursor.onMouseEnter();
                }}
                onMouseLeave={() => {
                    setActive({ ...active, hovered: false });
                    btnCursor.onMouseLeave();
                }}
                onFocus={(e) => setActive({ ...active, focused: e.currentTarget.matches(":focus-visible") })}
                onBlur={() => setActive({ ...active, focused: false })}
                
            >
                {/* <img src={`/assets/projects/${props.projectImageUrl.replace(".png", ".webp")}`} alt={props.projectTitle} className="object-cover" fetchPriority="high" />
                <p className="absolute inset-0">value:{JSON.stringify(active)}</p> */}

                <ProjectsCardHover
                    imageList={imageList}
                    title={props.projectTitle}
                    isActive={props.focus == -1 ? (active.hovered || active.focused) : props.focus == props.index && props.isInView}
                />
            </button>
            
            {
                !(screenWidth.current <= 820) &&
                <div className="-bottom-9 left-0 right-0 mx-auto w-full flex absolute translate-y-8   project-card-details ">
                    <div className="max-w-270 w-full absolute left-0 right-0 mx-auto flex gap-12">

                        <div className="flex flex-col gap-4 flex-1  relative">

                            <p className=" text-lg font-bold text-text text-center ">

                                {props.projectTitle}
                            </p>
                            <p className=" text-justify text-base font-normal ">{props.projectInformation}</p>

                        </div>
                        <div className="flex flex-col gap-4 w-max  relative">
                            <p className="text-base font-bold text-text text-right">{props.projectDate}</p>
                            <div className="grid grid-cols-3  gap-2">
                                {
                                    props.projectStacks.map((x, i) => {

                                        const stack_name = x.toLowerCase().replace(" ", "");
                                        const image_source = `/assets/skills/${stack_name == "reactnative" ? "react" : stack_name}_3.png`;

                                        return (
                                            <img key={i} className={`size-[25px] [image-rendering:pixelated]  ${stack_name == "reactnative" ? "grayscale-100 " : ""}`}
                                                src={image_source}
                                                alt={x}
                                            />
                                        )
                                    }
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )

}
