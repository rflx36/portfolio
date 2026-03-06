import { useRef } from "react";
import type { animationLoadStateType } from "../../types/types";


export default function ProjectsCard(props: {
    index: number,
    projectTitle: string,
    projectInformation: string,
    projectImageUrl: string,
    DisplayProperties: {
        dampening: number,
        featuredAmountLimit: number,
        inverseBoolValue: boolean,
        loadAnimation: animationLoadStateType,
    }
    onClick: () => void,
    isSelected: boolean
}) {

    const randomizedTransforms = useRef({
        rotation: Math.floor((Math.random() * 6) + 5) * (props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? -1 : 1),
        transform: Math.floor(Math.random() * 21) - 10,
    });
    const featuredAmountLimit = props.DisplayProperties.featuredAmountLimit;
    const dampening = props.DisplayProperties.dampening;
    const randomRotation = randomizedTransforms.current.rotation;
    const randomTransform = randomizedTransforms.current.transform;

    return (
        <div className="project-card-container top-0 flex items-center justify-start w-full h-full">
            <div
                className={`bg-bg rounded-4xl grid place-content-center aspect-268/133 project-card ${props.DisplayProperties.loadAnimation.preload ? " pointer-events-auto select-auto" : "pointer-events-none select-none"} hover:z-20! hover:delay-300! hover:shadow-2xl hover:duration-150  shadow-lg hover:-translate-y-3 ${props.index % 2 == (props.DisplayProperties.inverseBoolValue ? 1 : 0) ? "hover:rotate-3" : "hover:-rotate-5"} hover:scale-105 absolute border-4 ease-initial duration-300 border-black/10 overflow-hidden h-max w-full`}
                style={{
                    transform: props.DisplayProperties.loadAnimation.preload ? `rotate(${randomRotation}deg) translateX(${randomTransform}px)` : "scale(50%) translateY(300%)",
                    left: `calc(${props.index * (100 / featuredAmountLimit)}% ${props.index > 0 && `- ${dampening}px`})`,
                    transitionDelay: props.DisplayProperties.loadAnimation.postload ? "0ms" : `${props.index * 50}ms`,
                    maxWidth: `calc(${100 / featuredAmountLimit}% + ${dampening}px)`,
                    zIndex: 10 - props.index,
                }}
                id={`project-${props.index + 1}`}
                onClick={props.onClick}
            >
                <img src={`/assets/projects/${props.projectImageUrl}`} alt={props.projectTitle} className="object-cover" loading="lazy" />

            </div>

            <div className="-bottom-9 left-0 right-0 mx-auto w-full absolute translate-y-8  project-card-details">
                <p className=" text-base font-bold text-text text-center ">
                    {props.projectTitle}
                </p>
                <p className="mt-4 w-full max-w-[calc(480px+2vw)] absolute left-0 right-0 mx-auto text-justify text-base font-medium text-text">{props.projectInformation}</p>

            </div>

        </div>
    )

}
